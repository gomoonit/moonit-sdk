import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { TokenLaunchpadIdl } from '../../../solana';
import { BN, Program } from '@coral-xyz/anchor';
import { convertBigIntToBN } from './utils';
import { dexFeeAccount, helioFeeAccount } from '../feeAccounts';
import { TradeRequest } from './types';

export const getSellTx = async (
  program: Program<TokenLaunchpadIdl>,
  req: TradeRequest,
): Promise<TransactionInstruction> => {
  const { sender, mint, curveAccount } = req;

  const [configAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('config_account')],
    program.programId,
  );

  const senderTokenAccount = await getAssociatedTokenAddress(
    mint,
    sender,
    true,
  );

  const curveTokenAccount = await getAssociatedTokenAddress(
    mint,
    curveAccount,
    true,
  );

  // WSOL mint and required WSOL ATAs per IDL v4
  const wsolMint = NATIVE_MINT;
  const senderWsolAccount = await getAssociatedTokenAddress(
    wsolMint,
    sender,
    true,
  );
  const curveWsolAccount = await getAssociatedTokenAddress(
    wsolMint,
    curveAccount,
    true,
  );
  const dexFeeWsolAccount = await getAssociatedTokenAddress(
    wsolMint,
    dexFeeAccount,
    true,
  );
  const helioFeeWsolAccount = await getAssociatedTokenAddress(
    wsolMint,
    helioFeeAccount,
    true,
  );

  const data = {
    tokenAmount: convertBigIntToBN(req.tokenAmount),
    fixedSide: req.fixedSide,
    collateralAmount: convertBigIntToBN(req.collateralAmount),
    slippageBps: new BN(req.slippageBps),
  };

  return program.methods
    .sell(data)
    .accounts({
      signerOrSession: sender,
      payer: sender,
      user: sender,
      senderTokenAccount,
      curveAccount,
      curveTokenAccount,
      wsolMint,
      senderWsolAccount,
      curveWsolAccount,
      mint,
      configAccount,
      dexFee: dexFeeAccount,
      dexFeeWsolAccount,
      helioFee: helioFeeAccount,
      helioFeeWsolAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};
