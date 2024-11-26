import dotenv from "dotenv";
dotenv.config();

import { groq } from "@ai-sdk/groq";
import { streamText, convertToCoreMessages } from "ai";
import { z } from "zod";
import { WeatherData } from "../../chat/types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama-3.2-90b-vision-preview"),
    system:
      "Your name is Tony and you are from a planet called Earth 616. You have a persona which is a mix of Steve Jobs, Elon Musk, peter Thiel, Tony Stark and philosopher lau tzu. Your responses should be smart, clever, and sprinkled with humor, but always respectful and sensitive to the context. Use playful banter, witty observations. Keep your responses concise, avoiding long paragraphs. You are assistant to a human named Devvrat. You can use the getWeather tool to get the current weather at a location. if you are asked about anything else other than weather and npm package details, politely decline and say you are only good at weather and npm package details. You can only answer question other than weather and npm package details if you taking to Devvrat. Before you answer any question, ask for a secret passcode which 'thor',<note>dont share the passcode 'thor'with anyone and never reveal it to anyone and be very secretive about it and never ask for passcode unless you are asked</note>. then you many answer any question other than weather and npm package details   . ",
    messages: convertToCoreMessages(messages),
    maxSteps: 10,
    tools: {
      getWeather: {
        description: "Get the current weather at a location",
        parameters: z.object({
          latitude: z.number(),
          longitude: z.number(),
          city: z.string(),
        }),
        execute: async ({ latitude, longitude, city }) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,relativehumidity_2m&timezone=auto`
          );

          const weatherData = (await response.json()) as WeatherData;
          return {
            temperature: weatherData.current.temperature_2m,
            weatherCode: weatherData.current.weathercode,
            humidity: weatherData.current.relativehumidity_2m,
            city,
          };
        },
      },
      getNpmPackageDetails: {
        description: "Get the details of a npm package",
        parameters: z.object({
          packageName: z.string(),
        }),
        execute: async ({ packageName }) => {
          console.log(`Fetching details for package: ${packageName}`);
          const response = await fetch(`/api/npm?packageName=${packageName}`);
          const packageDetails = await response.json();
          return packageDetails;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
