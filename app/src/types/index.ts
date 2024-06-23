import { SimulateTransactionArgs } from "@/utils/nethermindRPCMethod";
import { SimulatedTransaction } from "starknet";

export type TTransactionType =
  | "DECLARE"
  | "DEPLOY"
  | "DEPLOY_ACCOUNT"
  | "INVOKE"
  | "L1_HANDLER";

export type SimulationResponse = {
  requestId: string;
  simulateArgs: SimulateTransactionArgs;
  timestamp: number;
  tx?: SimulatedTransaction;
  error?: string;
  isSuccess: boolean;
  isSentForParsing: boolean;
  llmResponse: {
    message: string;
    variables?: { [key: string]: any };
  };
};

export type AllSimulationRespone = {
  requestId: string;
  timestamp: number;
  isSuccess: boolean;
}[];
