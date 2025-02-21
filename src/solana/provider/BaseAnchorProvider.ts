import { Commitment, ConfirmOptions, Connection } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { AnchorProvider as Provider, Program } from '@coral-xyz/anchor';

export abstract class BaseAnchorProvider<T extends anchor.Idl> {
  private txOpts: ConfirmOptions & { commitment: Commitment } = {
    skipPreflight: false,
    commitment: 'confirmed',
    maxRetries: 5,
  };

  private readonly _program: Program<T>;

  private readonly _connection: Connection;

  protected constructor(
    protected connectionStr: string,
    protected IDL: T,
    protected PROGRAM_ID: anchor.web3.PublicKey,
    confirmOptions?: ConfirmOptions,
  ) {
    this.txOpts = { ...this.txOpts, ...confirmOptions };
    this._connection = new Connection(connectionStr, this.txOpts.commitment);
    this.setProvider();
    this._program = new Program<T>(this.IDL);
  }

  get commitment(): Commitment {
    return this.txOpts.commitment;
  }

  get program(): Program<T> {
    return this._program;
  }

  get connection(): Connection {
    return this._connection;
  }

  abstract get version(): string;

  private setProvider(): void {
    const provider = new Provider(this._connection, {} as never, this.txOpts);
    anchor.setProvider(provider);
  }
}
