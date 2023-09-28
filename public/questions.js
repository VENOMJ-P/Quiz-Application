import { API_TOKEN } from "./config.js";

export const questionsList = async () => {
  try {
    const url = `https://quizapi.io/api/v1/questions?apiKey=${API_TOKEN}&category=code&difficulty=Easy&limit=5`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
