import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { getClassDetails, getContractDetails } from "@/utils/voyagerAPIMethod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractAddress: string | null = searchParams.get("contractAddress");

    if (!contractAddress) {
      return new Response("Invalid Request", {
        status: 400,
      });
    }

    const contractDetails = await getContractDetails(contractAddress);
    console.log(contractDetails);

    const classDetails = await getClassDetails(contractDetails.classHash);
    console.log(classDetails);
    return new Response(
      JSON.stringify({ ...contractDetails, ...classDetails }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
