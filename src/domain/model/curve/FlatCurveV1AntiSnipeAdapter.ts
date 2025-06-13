import { FlatCurveV1AntiSnipe } from '@heliofi/launchpad-common';
import { BaseFlatCurveAdapter } from './BaseFlatCurveV1Adapter';

export class FlatCurveV1AntiSnipeAdapter extends BaseFlatCurveAdapter<FlatCurveV1AntiSnipe> {
  protected createCurve(collateralCollected: bigint): FlatCurveV1AntiSnipe {
    return new FlatCurveV1AntiSnipe(collateralCollected);
  }

  hasAntiSnipeProtection(): boolean {
    return true;
  }
}
