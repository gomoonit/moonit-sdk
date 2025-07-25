import { InitTokenOptions } from './InitTokenOptions';
import { Moonit } from '../moonit';
import { PrepareTxOptions } from './PrepareTxOptions';
import { GetCollateralPriceOptions } from './GetCollateralPriceOptions';
import { GetTokenAmountOptions } from './GetTokenAmountOptions';
import { GetCollateralAmountOptions } from './GetCollateralAmountOptions';
import { getCurveAccount, TokenLaunchpadIdl } from '../../../solana';
import { calculateCurvePosition } from '../../../solana/utils/calculateCurvePosition';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Program } from '@coral-xyz/anchor';
import { getBuyTx, getSellTx, TradeRequest } from '../instructions';
import { CurveAccount, getCurveAdapter } from '../curve';
import { AbstractCurveAdapter } from '../curve/AbstractCurveAdapter';
import { FixedSide } from './FixedSide';

export class BaseToken {
  protected moonit: Moonit;

  protected readonly mintAddress: string;

  protected _curveAdapter?: AbstractCurveAdapter;

  constructor(options: InitTokenOptions) {
    this.moonit = options.moonit;
    this.mintAddress = options.mintAddress;
  }

  protected async curveAdapter(): Promise<AbstractCurveAdapter> {
    if (this._curveAdapter != null) {
      return this._curveAdapter;
    }
    const curveAccount = await this.getCurveAccount();
    return getCurveAdapter(
      curveAccount,
      this.moonit.provider,
      this.mintAddress,
    );
  }

  async getCurveAccount(): Promise<CurveAccount> {
    return getCurveAccount(this.moonit.provider, this.mintAddress);
  }

  async getCollateralPrice(
    options: GetCollateralPriceOptions,
  ): Promise<bigint> {
    return (await this.curveAdapter()).getCollateralPrice(options);
  }

  async getCurvePosition(): Promise<bigint> {
    const curveState = await getCurveAccount(
      this.moonit.provider,
      this.mintAddress,
    );

    return calculateCurvePosition(
      curveState.totalSupply,
      curveState.curveAmount,
    );
  }

  async getTokenAmountByCollateral(
    options: GetTokenAmountOptions,
  ): Promise<bigint> {
    return (await this.curveAdapter()).getTokenAmountByCollateral(options);
  }

  async getCollateralAmountByTokens(
    options: GetCollateralAmountOptions,
  ): Promise<bigint> {
    return (await this.curveAdapter()).getCollateralAmountByTokens(options);
  }

  async hasAntiSnipeProtection(): Promise<boolean> {
    return (await this.curveAdapter()).hasAntiSnipeProtection();
  }

  async prepareIxs(
    options: PrepareTxOptions,
  ): Promise<{ ixs: TransactionInstruction[] }> {
    const program = this.moonit.provider.program;

    const {
      tokenAmount,
      collateralAmount,
      slippageBps,
      creatorPK,
      tradeDirection,
    } = options;

    const curveAccountPK = this.deriveCurveAddress(program);

    const defaultFixedSide =
      tradeDirection === 'BUY' ? FixedSide.OUT : FixedSide.IN;
    const fixedSide = options.fixedSide ?? defaultFixedSide;

    const req: TradeRequest = {
      tokenAmount,
      collateralAmount,
      slippageBps,
      sender: new PublicKey(creatorPK),
      curveAccount: new PublicKey(curveAccountPK),
      mint: new PublicKey(this.mintAddress),
      fixedSide,
    };
    return {
      ixs: [await this.getTradeInstruction(program, req, tradeDirection)],
    };
  }

  protected async getTradeInstruction(
    program: Program<TokenLaunchpadIdl>,
    req: TradeRequest,
    direction: 'BUY' | 'SELL',
  ): Promise<TransactionInstruction> {
    if (direction === 'BUY') {
      if (await this.hasAntiSnipeProtection()) {
        throw new Error(
          `Go to https://moon.it/tokens/${this.mintAddress} to trade this token.`,
        );
      }

      return getBuyTx(program, req);
    }
    return getSellTx(program, req);
  }

  protected deriveCurveAddress(program: Program<TokenLaunchpadIdl>): string {
    const [address] = PublicKey.findProgramAddressSync(
      [Buffer.from('token'), new PublicKey(this.mintAddress).toBytes()],
      program.programId,
    );
    return address.toBase58();
  }
}
