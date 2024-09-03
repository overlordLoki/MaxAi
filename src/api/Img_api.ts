// src/api/Img_api.ts
import axios from "axios";

const API_BASE_URL = "https://staci.overlord-loki.com"; // Replace with your actual API URL

export const fetchLatestPNG = async (): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/imggen`, {
      responseType: 'blob'  // Important for handling binary data
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch the latest PNG image.");
  }
};

