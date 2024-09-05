import axios from "axios";

const API_BASE_URL = "http://localhost:8088"; // Your backend URL

export const generateImage = async (prompt: string, steps: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_image`, {
      prompt,
      steps
    }, {
      headers: {
        "Content-Type": "application/json", // Set the content type
        "Access-Control-Allow-Origin": "*"  // Set CORS policy (optional)
      },
      responseType: 'blob' // Expect a blob response for the image
    });

    // Create a URL for the image blob
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
