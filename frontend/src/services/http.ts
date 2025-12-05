import axios, { AxiosResponse } from "axios";

// Create axios instance
export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (attach tokens)
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (global error handling)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirecting to login");
      // Optionally trigger logout or redirect
    }
    return Promise.reject(error);
  }
);

// ✅ Typed wrappers
export async function get<T>(url: string, params?: Record<string, any>): Promise<T> {
  const res: AxiosResponse<T> = await http.get(url, { params });
  return res.data;
}

export async function post<T, B = any>(url: string, body: B): Promise<T> {
  const res: AxiosResponse<T> = await http.post(url, body);
  return res.data;
}

export async function put<T, B = any>(url: string, body: B): Promise<T> {
  const res: AxiosResponse<T> = await http.put(url, body);
  return res.data;
}

export async function del<T>(url: string): Promise<T> {
  const res: AxiosResponse<T> = await http.delete(url);
  return res.data;
}
