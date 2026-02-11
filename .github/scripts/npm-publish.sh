#!/usr/bin/env bash
set -euo pipefail

CURRENT_VERSION=$(node -p "require('./package.json').version")
BASE_VERSION="${CURRENT_VERSION%%-*}"
IFS='.' read -r MAJOR MINOR PATCH <<< "$BASE_VERSION"

if [[ -z "${MAJOR:-}" || -z "${MINOR:-}" || -z "${PATCH:-}" ]]; then
  echo ""
  echo "  ERROR: Invalid version: $CURRENT_VERSION"
  echo "  Expected valid semver (e.g. 1.2.3)"
  echo ""
  exit 1
fi

if [[ "$BRANCH_NAME" == "main" ]]; then
  if [[ -z "${INPUT_VERSION:-}" ]]; then
    echo ""
    echo "  ERROR: Version input is required on the main branch"
    echo "  Please provide a version (e.g. 1.2.3)"
    echo ""
    exit 1
  fi
  FINAL_VERSION="$INPUT_VERSION"
  DIST_TAG="latest"
else
  FINAL_VERSION="${MAJOR}.${MINOR}.$((PATCH + 1))-alpha.$(date +%s)"
  DIST_TAG="alpha"
fi

TAG_NAME="v${FINAL_VERSION}"

echo ""
echo "  ========================================"
echo "        Release Summary"
echo "  ========================================"
echo "  Branch:          $BRANCH_NAME"
echo "  Current version: $CURRENT_VERSION"
echo "  New version:     $FINAL_VERSION"
echo "  Dist-tag:        $DIST_TAG"
echo "  Git tag:         $TAG_NAME"
echo "  ========================================"
echo ""

echo "  Writing version $FINAL_VERSION to package.json ..."

export FINAL_VERSION
node -e "
  const fs = require('fs');
  const path = './package.json';
  const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
  pkg.version = process.env.FINAL_VERSION;
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
"

echo "  Version stamped!"

TICKET=$(echo "$BRANCH_NAME" | tr '[:lower:]' '[:upper:]' | grep -Eo '[A-Z]+-[0-9]+' | head -n1 || true)
TICKET="${TICKET:-MOON-000}"

echo ""
echo "  Committing version bump ($TICKET) ..."

git config user.name  "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add package.json
git commit -m "chore($TICKET): release @moonit/sdk v$FINAL_VERSION"

echo "  Committed!"

echo ""
echo "  Tagging release $TAG_NAME ..."

git tag "$TAG_NAME"

echo "  Tagged $TAG_NAME!"

echo ""
echo "  Publishing @moonit/sdk@$FINAL_VERSION to npm (tag: $DIST_TAG) ..."

# Trusted Publishers on GHA -- no NPM_TOKEN needed.
npm publish --tag "$DIST_TAG" --access public

echo ""
echo "  Published @moonit/sdk@$FINAL_VERSION -> npm ($DIST_TAG)!"

if [[ "$BRANCH_NAME" == "main" ]]; then
  echo ""
  echo "  Pushing version bump via PR to $BRANCH_NAME ..."

  BUMP_BRANCH="chore/version-bump-sdk-v${FINAL_VERSION}"
  git checkout -b "$BUMP_BRANCH"
  git push -u origin "$BUMP_BRANCH"
  git push origin "$TAG_NAME"

  echo "  Pushed branch $BUMP_BRANCH!"
  echo ""
  echo "  Creating PR to merge into $BRANCH_NAME ..."

  PR_URL=$(gh pr create \
    --base "$BRANCH_NAME" \
    --head "$BUMP_BRANCH" \
    --title "chore($TICKET): bump @moonit/sdk to v$FINAL_VERSION" \
    --body "$(cat <<EOF
## Auto-generated version bump

| Field | Value |
|-------|-------|
| **Package** | \`@moonit/sdk\` |
| **Version** | \`$FINAL_VERSION\` |
| **npm tag** | \`$DIST_TAG\` |
| **Branch** | \`$BRANCH_NAME\` |

This PR was created automatically by the npm publish workflow.
The package has **already been published** to npm -- this PR just syncs the version bump back into \`$BRANCH_NAME\`.

> Merge when ready. No code changes, only \`package.json\` version.
EOF
)")

  echo "  PR created: $PR_URL"

  echo ""
  echo "  Creating GitHub Release $TAG_NAME ..."

  gh release create "$TAG_NAME" \
    --title "@moonit/sdk v$FINAL_VERSION" \
    --generate-notes

  echo "  GitHub Release created!"
else
  echo ""
  echo "  Pushing version bump to $BRANCH_NAME ..."

  git push origin HEAD:"$BRANCH_NAME"
  git push origin "$TAG_NAME"

  echo ""
  echo "  Creating GitHub pre-release $TAG_NAME ..."

  gh release create "$TAG_NAME" \
    --title "@moonit/sdk v$FINAL_VERSION" \
    --prerelease \
    --generate-notes

  echo "  GitHub pre-release created!"
fi

echo ""
echo "  ========================================"
echo "       ALL DONE"
echo "  ========================================"
echo ""

if [[ -n "${PR_URL:-}" ]]; then
  echo "  Merge the version bump PR: $PR_URL"
fi
