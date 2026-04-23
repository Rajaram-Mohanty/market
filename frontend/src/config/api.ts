import axios from "axios";

export const API_URL = "https://market-backend-mcd7.onrender.com";
// export const API_URL = "http://localhost:5454";

// Proactively clear expired JWT from localStorage on app startup
// This prevents sending stale tokens that trigger backend 403 errors
const jwt = localStorage.getItem("jwt");
if (jwt) {
  try {
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.clear();
    }
  } catch {
    // Malformed token — remove it
    localStorage.clear();
  }
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers = config.headers || {};

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // Clear stale/expired tokens on both 401 (Unauthorized) and 403 (Forbidden)
    if (status === 401 || status === 403) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
