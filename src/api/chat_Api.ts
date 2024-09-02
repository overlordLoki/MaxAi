// src/api/chat_Api.ts
import axios from "axios";

const URL = "https://llm.overlord-loki.com";

/**
 * Sends the full conversation to the server and returns the response.
 * @param messages The full conversation history.
 * @returns A Promise that resolves to the server response.
 * @throws If an error occurs during the API call.
 */
export const chatApi = async (messages: Array<{ role: string, content: string }>): Promise<string> => {
  try {
    const response = await axios.post(`${URL}/chat`, { messages });
    return response.data.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
