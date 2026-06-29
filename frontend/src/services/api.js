import axios from "axios";

const api = axios.create({
  baseURL: "https://shophub-qv51.onrender.com",
});

export default api;