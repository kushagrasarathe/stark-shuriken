import {
  simulateTransaction,
  SimulateTransactionArgs,
} from "@/utils/nethermindRPCMethod";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { SimulatedTransaction } from "starknet";
import { kv } from "@vercel/kv";
import { AllSimulationRespone } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId: string | null = searchParams.get("requestId");

    if (requestId) {
      const simulationRequest = await kv.get(`simulate:${requestId}`);

      if (!simulationRequest) {
        return new Response("Request Not Found", {
          status: 404,
        });
      }

      return new Response(JSON.stringify(simulationRequest), {
        status: 200,
      });
    } else {
      const allKeys = await kv.keys(`simulate:*`);

      const allKeysData = (await kv.mget(allKeys)) as Object[];

      const allKeysBasicData: AllSimulationRespone = [];

      allKeys.map((key, index) => {
        const data = {
          requestId: key.replace("simulate:", ""),
          //@ts-ignore
          timestamp: allKeysData[index].timestamp,
          //@ts-ignore
          isSuccess: allKeysData[index].isSuccess,
        };

        allKeysBasicData.push(data);
      });

      return new Response(JSON.stringify({ allKeysBasicData }), {
        status: 200,
      });
    }
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

    // 4a. Get the result , and send it to the parsing API
    const { tx, error, isSuccess } = simulateResponse;

    // 4b. Store in the kv
    await kv.set(`simulate:${requestId}`, {
      simulateArgs: body,
      timestamp: Date.now(),
      tx,
      error: error?.message,
      isSuccess,
      isSentForParsing: true,
    });
    console.log("Stored in KV");

    // 5. Send the result to the parsing API
    await fetch(`${process.env.HOST_URL}/api/parse`, {
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

    return new Response(JSON.stringify({ requestId }), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
