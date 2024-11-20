import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateObject, generateText, streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import issues from "./issues-lang.json";
import { z } from "zod";

const prompts = {
  extract:
    "Classify the following support request into one of the following categories (bug, feature request, question, other): \n\n",
  names: "Extract the names from the following essay: \n\n",
};

async function main() {
  const response = await generateObject({
    model: groq("llama-3.2-90b-vision-preview"),
    system:
      "You are a support agent.You are given a support request and you need to classify it into one of the following categories (billing, product_request, sales, account_issues, product_feedback) and one of the following urgencies (low, medium, high).",
    prompt: prompts.extract + JSON.stringify(issues),
    schema: z.object({
      request: z.string().describe("The support request description "),
      id: z.string().describe("The support request id"),
      category: z
        .enum([
          "billing",
          "product_request",
          "sales",
          "account_issues",
          "product_feedback",
        ])
        .describe("The category of the support request"),
      urgency: z
        .enum(["low", "medium", "high"])
        .describe("The urgency of the support request"),
      urgencyReason: z
        .string()
        .describe("The reason for the urgency of the support request"),
      translationToEnglish: z
        .string()
        .describe("The translation of the support request to English"),
      language: z.string().describe("The language of the support request"),
    }),
    output: "array",
  });
  console.log(response.object);
}
main().catch(console.error);
