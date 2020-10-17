import axios from "axios";

export const searchNews = () => {
  // TODO: Handle 429s from Finnhub
  return axios.get("/api/finnhub/general");
};
