import axios from "axios";

export const api = axios.create({
  baseURL: "https://helpdeskapi.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
