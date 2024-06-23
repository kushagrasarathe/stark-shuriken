import {
  simulateTransaction,
  SimulateTransactionArgs,
} from "@/utils/nethermindRPCMethod";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { SimulatedTransaction } from "starknet";
import { kv } from "@vercel/kv";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId: string | null = searchParams.get("requestId");

    if (!requestId) {
      return new Response("Invalid Request", {
        status: 400,
      });
    }

    const simulationRequest = await kv.get(requestId);

    if (!simulationRequest) {
      return new Response("Request Not Found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(simulationRequest), {
      status: 200,
    });
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
    const simulateResponse = await simulateTransaction(body);
    console.log(simulateResponse);

    // 3. Create a uuid and return it
    const requestId = uuidv4();
    console.log(requestId);

    // 4. Get the result , and send it to the parsing API
    const { tx, error, isSuccess } = simulateResponse;
    // console.log(tx, error, isSuccess);
    fetch(`${process.env.HOST_URL}/api/parse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        tx,
        error: error?.message,
        isSuccess,
      }),
    });

    // 5. Store in the kv
    await kv.set(requestId, {
      tx,
      error: error?.message,
      isSuccess,
      isSentForParsing: true,
    });
    console.log("Stored in KV");

    return new Response(JSON.stringify({ requestId }), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
