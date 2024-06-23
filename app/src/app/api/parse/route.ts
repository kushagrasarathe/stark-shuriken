import {
  parseErrorMessageWithLLM,
  parseTransactionWithLLM,
} from "@/utils/openAIMethod";
import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { SimulatedTransaction } from "starknet";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId: string | null = searchParams.get("requestId");

    if (!requestId) {
      return new Response("Invalid Request", {
        status: 400,
      });
    }

    const simulationRequest = await kv.get(`simulate:${requestId}`);

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
    const body = await request.json();
    console.log(body);
    console.log("Parsing the request...");

    // 1. Take in the result
    const { requestId, tx, error, isSuccess } = body as {
      requestId: string;
      tx: SimulatedTransaction;
      error: string | null;
      isSuccess: boolean;
    };

    let executionError: string | null;
    let llmResponseJson:
      | {
          message: string;
          variables?: { [key: string]: any };
        }
      | undefined;

    if (isSuccess === false && error) {
      // 2a. If Revert , then parse the revert message using ChatGPT
      console.log("Error");
      const errorMessage = error as string;
      const jsonMatch = errorMessage.match(
        /Transaction execution error: (\{[\s\S]*\})/
      );

      if (jsonMatch && jsonMatch[1]) {
        const errorJson = JSON.parse(jsonMatch[1]);
        executionError = errorJson.execution_error.replace(/\\"/g, '"'); // Replace escaped quotes with actual quotes
        console.log("Execution Error:", executionError);
      } else {
        executionError = errorMessage;
        console.log("No execution error found in the error message.");
      }

      // 3a. Finally send all the info to chatGPT for a human conversion of the response
      if (executionError) {
        const llmResponse = await parseErrorMessageWithLLM(executionError);

        if (llmResponse) {
          llmResponseJson = JSON.parse(llmResponse) as {
            message: string;
            variables: { [key: string]: any };
          };
          console.log(llmResponseJson);
        } else {
          llmResponseJson = {
            message: "No valid response from the LLM model.",
          };
        }
      } else {
        llmResponseJson = {
          message: "No execution error found in the error message.",
        };
      }
    } else {
      // 2b. If success , then parse using Voyager API
      // 3b. Get the information for the addresses present in the success message

      // Finally pass it to chatGPT for making sense of it
      const llmResponse = await parseTransactionWithLLM(tx);
      if (llmResponse) {
        llmResponseJson = JSON.parse(llmResponse) as {
          message: string;
          variables: { [key: string]: any };
        };
        console.log(llmResponseJson);
      } else {
        llmResponseJson = {
          message: "No valid response from the LLM model.",
        };
      }
    }

    // 4a. Get the information for the addresses present in the error message
    if (llmResponseJson.variables) {
      // Get the information for the addresses present in the error message
    }

    // 5. Store the response back in the KV
    const requestData = await kv.get(`simulate:${requestId}`);
    if (requestData && llmResponseJson) {
      const updatedRequestData = {
        ...requestData,
        llmResponse: llmResponseJson,
      };

      console.log("Updated Request Data:", updatedRequestData);
      await kv.set(`simulate:${requestId}`, JSON.stringify(updatedRequestData));
    }

    return new Response("Parsing & decoding complete", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
