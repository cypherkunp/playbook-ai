import { generateObject } from "ai";
import dotenv from "dotenv";
dotenv.config();
import messages from "./messages.json";
import { z } from "zod";
import { groq } from "@ai-sdk/groq";

const prompts = {
  summarize:
    "Please summarize the following comments: \n\n --- comments --- \n\n",
  action:
    "Whats the action you would take based on the following comments? and should we setup a follow up call?",
};

async function summarize(comments: typeof messages) {
  const response = await generateObject({
    model: groq("gemma2-9b-it"),
    system: "You are a the product manager of a company",
    prompt: prompts.summarize + JSON.stringify(comments),
    schema: z.object({
      headline: z.string().describe("The headline of the summary. max 5 words"),
      context: z
        .string()
        .describe("The context of the summary, max 2 sentences"),
      discussionPoints: z
        .array(z.string())
        .describe("The discussion points of the summary. Max 2 sentences"),
      takeaways: z
        .array(z.string())
        .describe("What are the key takeaways / next steps? Include names"),
    }),
  });
  console.log(response.object);

  const actionResponse = await generateObject({
    model: groq("llama-3.2-90b-vision-preview"),
    system: "You are a the product manager of a company",
    prompt: prompts.action + JSON.stringify(comments),
    schema: z.object({
      emoji: z.string().describe("The emoji that best describes the action"),
      action: z.string().describe("The action to take"),
      nextCallTime: z.string().describe("The time to setup a follow up call"),
    }),
  });
  console.log(actionResponse.object);
}

summarize(messages).catch(console.error);
