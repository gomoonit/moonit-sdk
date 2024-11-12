import 'dotenv/config';
import { TradeDirection } from '@heliofi/launchpad-common';
import { Environment, Moonshot, Token } from '../domain';

describe('Token', () => {
  let moonshot: Moonshot;
  let token: Token;

  // Read values from the .env file
  const rpcUrl = process.env.RPC_URL as string;
  const minimalPrice = BigInt(process.env.MINIMAL_PRICE as string);
  const mintAddress = process.env.MINT_ADDRESS as string;
  
  beforeAll(async () => {
    moonshot = new Moonshot({
      rpcUrl,
      authToken: 'YOUR_AUTH_TOKEN',
      environment: Environment.DEVNET,
    });

    token = moonshot.Token({
      mintAddress: mintAddress,
    });
    const curveAccount = await token.getCurveAccount();
  });

  test('get collateral price', async () => {
    const initalPrice = await token.getCollateralAmountByTokens({
      tokenAmount: BigInt(1e9), // 1 token in minimal units
      tradeDirection: TradeDirection.BUY,
      curvePosition: 0n,
    });
    expect(initalPrice).toBe(minimalPrice);
    const currentPrice = await token.getCollateralAmountByTokens({
      tokenAmount: BigInt(1_000_000_000),
      tradeDirection: TradeDirection.BUY,
    });
    expect(Number(currentPrice)).toBeGreaterThan(Number(minimalPrice));
  });

  test('get curve position price', async () => {
    const curvePosition = await token.getCurvePosition();
    expect(curvePosition).toBe(50000000000000n);
  });

  test('get token price per collaterall', async () => {
    const buyAmountAtBeginning = await token.getTokenAmountByCollateral({
      collateralAmount: BigInt(1e8), // 0.1 SOL
      tradeDirection: TradeDirection.BUY,
      curvePosition: 0n,
    });

    expect(buyAmountAtBeginning).toBeGreaterThan(BigInt(1e7) * minimalPrice); // price raises with curve advance

    const buyAmount = await token.getTokenAmountByCollateral({
      collateralAmount: BigInt(1e8), // 0.1 SOL
      tradeDirection: TradeDirection.BUY,
    });

    
    // TODO: fix this test
    // token.getCollateralAmountByTokens(options: {tokenAmount: string, tradeDirection: 'BUY' | 'SELL', curvePosition?: string});
    expect(buyAmount).toBeLessThan(buyAmountAtBeginning); // Less tokens for same amount as curve advances

    const sellAmount = await token.getTokenAmountByCollateral({
      collateralAmount: BigInt(1e8), // 0.1 SOL
      tradeDirection: TradeDirection.SELL,
    });

    expect(sellAmount).toBeGreaterThan(buyAmount); // On sell curve goes backward, 0.1 sol means more tokens

    // TODO: fix this test
    //expect(sellAmount).toBeLessThan(buyAmountAtBeginning); // price raises with curve advance
  });

  test('get collaterall price by tokens', async () => {
    const buyCollateralAtBeginning = await token.getCollateralAmountByTokens({
      tokenAmount: BigInt(1e15), // 1m tokens
      tradeDirection: TradeDirection.BUY,
      curvePosition: 0n,
    });

    expect(buyCollateralAtBeginning).toBeGreaterThan(
      BigInt(1e6) * minimalPrice,
    ); // price raises with curve advan

    const buyCollateral = await token.getCollateralAmountByTokens({
      tokenAmount: BigInt(1e15), // 1m tokens
      tradeDirection: TradeDirection.BUY,
    });

    expect(buyCollateral).toBeGreaterThan(buyCollateralAtBeginning); // Less tokens for same amount as curve advances

    const sellCollateral = await token.getCollateralAmountByTokens({
      tokenAmount: BigInt(1e15), // 1m tokens
      tradeDirection: TradeDirection.SELL,
    });

    expect(sellCollateral).toBeLessThan(buyCollateral); // On sell curve goes backward, less collateral for same amount of tokens
    // TO
    // expect(sellCollateral).toBeGreaterThan(buyCollateralAtBeginning); // but still more then in beginning of the curve
  });

  test('get prepared instructions, ready for the submit after signing', async () => {
    const preparedBuyIx = await token.prepareIxs({
      tokenAmount: 1000000000n,
      collateralAmount: 100000000n,
      slippageBps: 100,
      creatorPK: 'Cb8Fnhp95f9dLxB3sYkNCbN3Mjxuc3v2uQZ7uVeqvNGB',
      tradeDirection: TradeDirection.BUY,
    });

    expect(preparedBuyIx.ixs[0]).toBeDefined();
    const preparedSellIx = await token.prepareIxs({
      tokenAmount: 1000000000n,
      collateralAmount: 100000000n,
      slippageBps: 100,
      creatorPK: 'Cb8Fnhp95f9dLxB3sYkNCbN3Mjxuc3v2uQZ7uVeqvNGB',
      tradeDirection: TradeDirection.SELL,
    });

    expect(preparedSellIx.ixs[0]).toBeDefined();
  });
});
