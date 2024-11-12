import { CurveType } from '@heliofi/launchpad-common';
import { Environment, Moonshot, Token } from '../domain';
import 'dotenv/config';

describe('Curve account', () => {
  let moonshot: Moonshot;
  let token: Token;

  // Read values from the .env file
  const rpcUrl = process.env.RPC_URL as string;
  const mintAddress = process.env.MINT_ADDRESS as string;

  beforeAll(() => {
    moonshot = new Moonshot({
      rpcUrl,
      authToken: 'YOUR_AUTH_TOKEN',
      environment: Environment.MAINNET,
    });

    token = moonshot.Token({
      mintAddress,
    });
  });

  test('get collateral price', async () => {
    const account = await token.getCurveAccount();
    expect(account).toBeDefined();

    expect(account.curveType).toBe(CurveType.FLAT_V1);
    expect(String(account.mint)).toBe(mintAddress);
  });
});
