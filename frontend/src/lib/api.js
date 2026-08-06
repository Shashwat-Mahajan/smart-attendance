import axios from "axios";
import supabase from "./supabaseClient";

// Empty string means requests go to same host — Vite proxy handles /api → localhost:5000
const api = axios.create({
  baseURL: "",
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
