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

    // 1. Take in the result
    // 2a. If success , then parse using Voyager API
    // 2b. If Revert , then parse the revert message using ChatGPT

    // 3. Finally send all the info to chatGPT for a human conversion of the response

    // 4. Send the response back to the user

    return new Response("", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
