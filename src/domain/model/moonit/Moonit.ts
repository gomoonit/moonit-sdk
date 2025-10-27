import { InitMoonitOptions } from './InitMoonitOptions';
import { Environment } from '../environment';
import { InitTokenOptions, Token } from '../token';
import {
  TokenLaunchpadIdl,
  AnchorProviderV1,
  BaseAnchorProvider,
} from '../../../solana';
import { MoonitApiAdapter } from '../../../infra';
import { PrepareMintTxOptions } from './PrepareMintTxOptions';
import { PrepareMintTxResponse } from './PrepareMintTxResponse';
import { SubmitMintTxOptions } from './SubmitMintTxOptions';
import { SubmitMintTxResponse } from './SubmitMintTxResponse';

export class Moonit {
  private environment: Environment;

  private apiAdapter: MoonitApiAdapter;

  provider: BaseAnchorProvider<TokenLaunchpadIdl>;

  constructor(options: InitMoonitOptions) {
    this.provider = new AnchorProviderV1(
      options.rpcUrl,
      options.chainOptions?.solana?.confirmOptions,
    );
    this.environment = options.environment;
    this.apiAdapter = new MoonitApiAdapter(
      options.authToken ?? '',
      this.environment,
    );
  }

  Token(options: Omit<InitTokenOptions, 'moonit'>): Token {
    return new Token({ ...options, moonit: this });
  }

  async prepareMintTx(
    options: PrepareMintTxOptions,
  ): Promise<PrepareMintTxResponse> {
    console.log('preparing mint tx');
    console.log('options', { ...options, icon: undefined, banner: undefined });
    const createMintRes = await this.apiAdapter.createMint({
      ...options,
    });

    console.log('createMintRes', createMintRes);

    const res = await this.apiAdapter.prepareMint(createMintRes.pairId, {
      amount: options.tokenAmount,
      creatorPK: options.creator,
    });

    return {
      token: res.token,
      tokenId: createMintRes.pairId,
      transaction: res.transaction,
    };
  }

  async submitMintTx(
    options: SubmitMintTxOptions,
  ): Promise<SubmitMintTxResponse> {
    const res = await this.apiAdapter.submitMint(options);
    return {
      txSignature: res.transactionSignature,
      status: res.status,
    };
  }
}
