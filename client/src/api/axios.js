import axios from "axios";

// single source of truth for the backend URL.
// set VITE_API_URL in your .env (dev) and in Vercel project settings (production).
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL });

// automatically attach the auth token (if present) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer") ? token : `Bearer ${token}`;
  }
  return config;
});

export default api;
