import {
  GetCollateralAmountOptions,
  GetCollateralPriceOptions,
  GetTokenAmountOptions,
} from '../token';
import { CurveAccount } from './CurveAccount';
import {
  BaseAnchorProvider,
  getCurveAccount,
  TokenLaunchpadIdl,
} from '../../../solana';
import { calculateCurvePosition } from '../../../solana/utils/calculateCurvePosition';
import { GetCollateralAmountSyncOptions } from '../token/GetCollateralAmountSyncOptions';
import { GetTokenAmountSyncOptions } from '../token/GetTokenAmountSyncOptions';

export abstract class AbstractCurveAdapter {
  constructor(
    protected moonitProgram: BaseAnchorProvider<TokenLaunchpadIdl>,
    protected mintAddress: string,
  ) {}

  abstract getCollateralPrice(
    options: GetCollateralPriceOptions,
  ): Promise<bigint>;

  abstract getCollateralAmountByTokens(
    options: GetCollateralAmountOptions,
  ): Promise<bigint>;

  abstract getCollateralAmountByTokensSync(
    options: GetCollateralAmountSyncOptions,
  ): bigint;

  abstract getTokenAmountByCollateral(
    options: GetTokenAmountOptions,
  ): Promise<bigint>;

  abstract getTokenAmountByCollateralSync(
    options: GetTokenAmountSyncOptions,
  ): bigint;

  async getCurveAccount(): Promise<CurveAccount> {
    return getCurveAccount(this.moonitProgram, this.mintAddress);
  }

  async getCurvePosition(): Promise<bigint> {
    const curveState = await this.getCurveAccount();

    return calculateCurvePosition(
      curveState.totalSupply,
      curveState.curveAmount,
    );
  }

  hasAntiSnipeProtection(): boolean {
    return false;
  }
}
