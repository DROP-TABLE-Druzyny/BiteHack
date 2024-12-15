import type { NextConfig } from "next";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: './frontend/local.env' });

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
  env: {
    REACT_APP_WEATHER_API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
  },
  /* other config options here */
};

export default nextConfig;
