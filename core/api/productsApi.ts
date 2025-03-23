import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_API_URL_ANDROID
    : process.env.EXPO_PUBLIC_API_URL_IOS;

const productsApi = axios.create({
  baseURL: API_URL,
});

productsApi.interceptors.request.use(async (config: any) => {
  const token = await SecureStorageAdapter.get("token");

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 

  return config;
});

export { productsApi };
