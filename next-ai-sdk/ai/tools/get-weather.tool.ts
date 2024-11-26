import { z } from "zod";

export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    weathercode: string;
    relativehumidity_2m: string;
  };
  current: {
    time: string;
    interval: number;
    interval: number;
    interval: number;
    temperature_2m: number;
    weathercode: number;
    relativehumidity_2m: number;
  };
};

export const getWeatherTool = {
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
};
