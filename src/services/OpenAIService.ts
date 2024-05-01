import axios from "axios";

const API_URL = "http://localhost:3000";

export const askQuestion = async (question: any) => {
  try {
    const response = await axios.post(`${API_URL}/openai`, { question });
    return response.data;
  } catch (error) {
    console.error("Error asking question:", error);
    return "Sorry, I cannot answer that right now.";
  }
};
