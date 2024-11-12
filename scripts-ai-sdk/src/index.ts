import "dotenv/config";
import { withGenerateText } from "./with-generate-text";
import { withStreamText } from "./with-stream-text";
import { withGenerateObject } from "./with-generate-object";
import { withStreamAndTools } from "./with-stream-and-tools";

type WithArgs = string[];

const main = async (args: WithArgs) => {
  const command = args[0];

  if (command === "-wst") {
    await withStreamText({
      model: "gpt-4o-mini",
      prompt: "Whats the weather in London Today? and what should i do?",
    });
  } else if (command === "-wgt") {
    await withGenerateText({
      model: "gpt-4o-mini",
      prompt: "Whats the weather in London Today? and what should i do?",
    });
  } else if (command === "-wgo") {
    await withGenerateObject({
      model: "gpt-4o-mini",
      prompt: "Generate a random joke",
    });
  } else if (command === "-wstt") {
    await withStreamAndTools({
      model: "gpt-4o-mini",
      location: "London",
    });
  } else {
    console.log("No command provided");
  }
};

main(process.argv.slice(2)).catch(console.error);
