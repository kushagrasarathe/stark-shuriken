import {
  simulateTransaction,
  SimulateTransactionArgs,
} from "@/utils/nethermindRPCMethod";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    //   return new Response(JSON.stringify(roundData.winner), {
    //     status: 200,
    //   });

    //   return new Response("No Winner Found Yet", {
    //     status: 404,
    //   });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse the body to get the inputs
    const body = (await request.json()) as SimulateTransactionArgs;
    console.log(body);

    // 2. `starknet_simulateTransactions` to simulate the transactions via nethermind RPC
    const response = await simulateTransaction(body);

    console.log(response);

    // 3. Get the result , and send it to the parsing API
    if (response instanceof Error) {
      // handle error
      const message = response.message
        .split("execution_error:")[1]
        .split("}")[0];
      console.log(message);
    } else {
      // handle success
    }

    // 4. Create a uuid and return it
    const requestId = uuidv4();
    console.log(requestId);

    // 5. Store in the kv

    return new Response(JSON.stringify(requestId), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
