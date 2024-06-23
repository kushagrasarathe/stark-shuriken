import OpenAI from "openai";
import fs from "fs";
import { SimulatedTransaction } from "starknet";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Parse the transaction into a human readable format or message
export const parseTransactionWithLLM = async (
  simulatedTransaction: SimulatedTransaction
): Promise<string | undefined | null> => {
  try {
    const systemPrompt = `Parse the transaction into a human readable format or message`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${simulatedTransaction}` },
      ],
      model: "gpt-3.5-turbo-16k",
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};

// parse the error message
export const parseErrorMessageWithLLM = async (
  errorMessage: string
): Promise<string | undefined | null> => {
  try {
    const systemPrompt = `User has simulated a transaction on the Starknet network , mainnet or sepolia to see what it is about before moving ahead. They have come across an execution error and they will enter that as an inputs.Parse the error into a human readable format or message. It should at-least show that what is error about in a way even if they don't understand the complexities of blockchain and other terminologies. Name this result as " message" .
    
    If there any type of values / variables like contract Address or account address or key , you should parse them as well and create an object with key-value pair for it. Name this result as "variables"
    
    Finally only return a JSON object containing message and variable as 
    
    {
      message: string,
      variable: {
        [key: string]: any
        },
    }
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `${systemPrompt}` },
        { role: "user", content: `${errorMessage}` },
      ],
      model: "gpt-3.5-turbo-16k",
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
