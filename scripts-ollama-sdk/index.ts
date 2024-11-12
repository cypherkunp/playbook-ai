import ollama from "ollama";

async function main() {
  const response = await ollama.chat({
    model: "llama3.2-vision",
    messages: [
      {
        role: "user",
        content: "Describe the image",
        images: ["assets/cat-image.jpg"],
      },
    ],
  });

  console.log(response);
}

main();
