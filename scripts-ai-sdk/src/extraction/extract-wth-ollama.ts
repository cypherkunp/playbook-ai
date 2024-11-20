import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { generateText, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

const essay = fs.readFileSync("./essay.txt", "utf8");

const prompts = {
  summarize: "Summarize the following essay: \n\n",
  extract:
    "Extract the key takeaways from the following essay in 50 words: \n\n",
  names: "Extract the names from the following essay: \n\n",
};

async function main() {
  const response = await generateText({
    model: ollama("llama3.2:3b"),
    prompt: prompts.names + essay,
  });
  console.log(response.text);
}
main().catch(console.error);
