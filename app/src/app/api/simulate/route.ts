import { NextRequest } from "next/server";

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
    const body = await request.json();
    console.log(body);

    // 1. Parse the body to get the inputs
    // 2. `starknet_simulateTransactions` to simulate the transactions via nethermind RPC
    // 3. Get the result , and send it to the parsing API

    return new Response("", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
