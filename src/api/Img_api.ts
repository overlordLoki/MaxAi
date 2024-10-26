import axios from "axios";

const API_BASE_URL = "http://192.168.1.88:8088"; // Your backend URL

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

export const isAiOnline = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/is_online`);
    
    // Access the `online` field within `response.data`
    return response.data.online === true;
  } catch (error) {
    console.error("Error checking AI status:", error);
    return false; // Set to offline if there's an error
  }
};

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_BASE_URL}/upload_image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type
        "Access-Control-Allow-Origin": "*"  // Set CORS policy (optional)
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};