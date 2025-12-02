import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true
});

// Interceptors placeholder
http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
