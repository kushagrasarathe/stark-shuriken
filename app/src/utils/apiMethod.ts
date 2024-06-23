import { AllSimulationRespone, SimulationResponse } from "@/types";
import { SimulateTransactionArgs } from "./nethermindRPCMethod";
import { ClassDetailType, ContractDetailType } from "./voyagerAPIMethod";

export const startSimulateTransaction = async ({
  blockId,
  transaction,
  skipExecute,
  skipFeeCharge,
  skipValidate,
}: SimulateTransactionArgs) => {
  try {
    const body = {
      blockId,
      transaction,
      skipExecute,
      skipFeeCharge,
      skipValidate,
    };

    const response = await fetch("/api/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    return data as { requestId: string };
  } catch (error: any) {
    console.log(error);
  }
};

export const getSimulateTransactionResponse = async (
  requestId: string
): Promise<SimulationResponse | undefined> => {
  try {
    const response = await fetch(`/api/simulate?requestId=${requestId}`, {
      method: "GET",
    });

    console.log(response);

    const data = await response.json();
    console.log(data);
    return data as SimulationResponse;
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllSimulated = async () => {
  try {
    const response = await fetch(`/api/simulate`, {
      method: "GET",
    });

    const data = (await response.json()) as {
      allKeysBasicData: AllSimulationRespone;
    };

    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getContractInfo = async (
  contractAddress: string
): Promise<(ContractDetailType & ClassDetailType) | undefined> => {
  try {
    const response = await fetch(
      `/api/contract?contractAddress=${contractAddress}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
