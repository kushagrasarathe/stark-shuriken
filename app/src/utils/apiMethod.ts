import { SimulateTransactionArgs } from "./nethermindRPCMethod";

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
    return data as { reqId: string };
  } catch (error: any) {
    console.log(error);
  }
};
