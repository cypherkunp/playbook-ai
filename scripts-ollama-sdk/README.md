# scripts-ollama-sdk

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

```zsh
bun start
$ bun run index.ts
{
  model: "llama3.2-vision",
  created_at: "2024-11-12T21:54:08.400652Z",
  message: {
    role: "assistant",
    content: "The image presents a striking close-up of a cat's face, with its head turned to the right and gazing upwards. The feline subject is attired in sunglasses, adding a touch of whimsy to the overall composition.\n\n**Key Features:**\n\n* **Cat:** The cat's fur is predominantly white, with subtle grey undertones visible on its nose and mouth.\n* **Sunglasses:** The sunglasses are black-framed and feature mirrored lenses that reflect light, creating an intriguing visual effect.\n* **Facial Expression:** The cat's expression appears calm and relaxed, as if it is enjoying the attention or simply basking in the warmth of the sun.\n\n**Background:**\n\n* The background of the image is a soft, gradient-like texture, which helps to create a sense of depth and dimensionality.\n\n**Overall Impression:**\n\nThe image exudes a sense of serenity and tranquility, inviting the viewer to appreciate the simple joys of life. The cat's sunglasses add a playful touch, making the image feel more lighthearted and humorous.",
  },
  done_reason: "stop",
  done: true,
  total_duration: 101368278083,
  load_duration: 41832041,
  prompt_eval_count: 15,
  prompt_eval_duration: 83212000000,
  eval_count: 217,
  eval_duration: 17975000000,
}
```
