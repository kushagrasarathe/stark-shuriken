import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export type ContractDetailType = {
  address: string;
  blockNumber: number;
  isAccount: boolean;
  isErcToken: boolean;
  isProxy: boolean;
  type: string | number;
  creationTimestamp: number;
  verifiedTimestamp: number | null;
  classAlias: string | null;
  contractAlias: string | null;
  classHash: string;
  version: string;
  blockHash: string;
  nonce: number | null;
  tokenName: string | null;
  tokenSymbol: string | null;
};

export const getContractDetails = async (
  contractAddress: string
): Promise<ContractDetailType> => {
  const response = await axios.get(
    `${process.env.VOYAGER_API_URL}/contract/${contractAddress}`,
    {
      headers: {
        "X-Api-Key": process.env.VOYAGER_API_KEY,
      },
    }
  );
  const body = response.data.items[0] as ContractDetailType;
  return body;
};

export type ClassDetailType = {
  hash: string;
  transactionHash: string;
  type: number;
  creationTimestamp: number;
  verifiedTimestamp: number | null;
  classAlias: string | null;
  version: string;
  byteCode: string[];
  abi: {}[];
  code: {} | null;
  license: string | null;
  contractsCount: string;
  declaredBy: string;
  isAccount: boolean;
  isErcToken: boolean;
  isProxy: boolean;
};

export const getClassDetails = async (
  classHash: string
): Promise<ClassDetailType> => {
  const response = await axios.get(
    `${process.env.VOYAGER_API_URL}/classes/${classHash}`,
    {
      headers: {
        "X-Api-Key": process.env.VOYAGER_API_KEY,
      },
    }
  );

  const body = response.data as ClassDetailType;
  return body;
};

type Status =
  | "Received"
  | "Accepted on L2"
  | "Accepted on L1"
  | "Rejected"
  | "Reverted";

type TransactionType =
  | "DEPLOY"
  | "INVOKE"
  | "DECLARE"
  | "L1_HANDLER"
  | "DEPLOY_ACCOUNT";

export type TransactionDetailType = {
  status: Status;
  type: TransactionType;
  blockNumber: number;
  hash: string;
  index: number;
  l1VerificationHash: string;
  classHash: string | null;
  contractAddress: string;
  timestamp: number | null;
  actualFee: string;
  actions: string | null;
  contractAlias: string | null;
  classAlias: string | null;
  signature: string[] | null;
  senderAddress: string | null;
  contractAddressSalt: string | null;
  maxFee: string;
  nonce: string | null;
  version: string | null;
};

export const getTransactionDetails = async (transactionHash: string) => {
  const response = await axios.get(
    `${process.env.VOYAGER_API_URL}/txns/${transactionHash}`,
    {
      headers: {
        "X-Api-Key": process.env.VOYAGER_API_KEY,
      },
    }
  );

  const body = response.data as TransactionDetailType;
  return body;
};
