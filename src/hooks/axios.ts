import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
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
  async (error) => {
    const originalRequest = error?.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        const response: any = await protectedAxiosInstance.post(
          "/iam/refresh/",
          {
            refresh: refreshToken,
          }
        );
        setCookie("accessToken", response.access, 1);
        return response.data;
      } else {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error.response.data);
  }
);
