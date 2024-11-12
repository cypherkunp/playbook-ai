import "dotenv/config";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateText, streamText, tool } from "ai";

type WithStreamTextType = {
  model: string;
  prompt: string;
};

export const withStreamText = async ({ model, prompt }: WithStreamTextType) => {
  const result = await streamText({
    model: openai(model),
    prompt,
    tools: {
      weather: tool({
        description: "Get the weather in a given city",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72,
        }),
      }),
      attractions: tool({
        description: "Get the attractions in a given city",
        parameters: z.object({
          location: z
            .string()
            .describe("The location to get the attractions for"),
          temperature: z.number().describe("The temperature in the location"),
        }),
        execute: async ({ location, temperature }) => {
          const response = await generateText({
            model: openai("gpt-4o-mini"),
            prompt: `What are the top 5 attractions in ${location} with a temperature of ${temperature} degrees?`,
          });
          return response.text;
        },
      }),
    },
    maxSteps: 5,
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};
