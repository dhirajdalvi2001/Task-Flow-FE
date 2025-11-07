import { getCookie } from "@/lib/cookies";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const openAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

protectedAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
    (error) => {
      return Promise.reject(error.response.data);
    }
);
