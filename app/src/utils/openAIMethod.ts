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

    const prompt = `${systemPrompt}
    
    ${simulatedTransaction}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo-16k",
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
