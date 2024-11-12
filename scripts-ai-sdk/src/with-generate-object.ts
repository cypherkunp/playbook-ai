import { openai } from "@ai-sdk/openai";
import { generateObject, type LanguageModelV1 } from "ai";
import { z } from "zod";

type WithGenerateObjectType = {
  model: string;
  prompt: string;
};

export const withGenerateObject = async ({
  model,
  prompt,
}: WithGenerateObjectType) => {
  const response = await generateObject({
    model: openai(model),
    prompt,
    schema: z.object({
      setup: z.string().describe("The setup of the joke"),
      punchline: z.string().describe("The punchline of the joke"),
    }),
  });

  console.log(response.object);
};
