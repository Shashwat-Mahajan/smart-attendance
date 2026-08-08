import axios from "axios";
import supabase from "./supabaseClient";

// Local dev: "" so requests go to same host — Vite proxy handles /api → localhost:5000
// Production (Vercel): VITE_API_URL must be set to the Render backend URL,
// since there's no dev-server proxy in a static production build.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  let token = data?.session?.access_token;

  const expiresAt = data?.session?.expires_at;
  const expiresSoon = !expiresAt || expiresAt * 1000 < Date.now() + 60000;

  if (!token || expiresSoon) {
    const { data: refreshed } = await supabase.auth.refreshSession();
    token = refreshed?.session?.access_token || token;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
