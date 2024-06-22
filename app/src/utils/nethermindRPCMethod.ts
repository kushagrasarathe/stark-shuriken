import {
  RpcProvider,
  BlockIdentifier,
  AccountInvocationItem,
  SimulateTransactionResponse,
  SimulatedTransaction,
} from "starknet";
import dotenv from "dotenv";
dotenv.config();

interface SimulateTransactionArgs {
  blockId: BlockIdentifier; // could be hash , id , or "latest" / "pending"
  transaction: AccountInvocationItem;
  skipExecute?: boolean;
  skipFeeCharge?: boolean;
  skipValidate?: boolean;
}

const rpcProvider = new RpcProvider({
  nodeUrl: process.env.STARKNET_RPC_URL,
  headers: {
    "x-apikey": process.env.STARKNET_RPC_KEY,
  },
});

// simulate a transaction
export const simulateTransaction = async ({
  blockId,
  transaction,
  skipExecute,
  skipFeeCharge,
  skipValidate,
}: SimulateTransactionArgs): Promise<SimulatedTransaction> => {
  const response = await rpcProvider.simulateTransaction([transaction], {
    blockIdentifier: blockId,
    skipExecute,
    skipFeeCharge,
    skipValidate,
  });
  return response[0];
};

// get transaction trace
export const getTransactionTrace = async (transactionHash: string) => {
  const response = await rpcProvider.getTransactionTrace(transactionHash);
  return response;
};
