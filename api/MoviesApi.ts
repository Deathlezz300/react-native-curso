import axios, { InternalAxiosRequestConfig } from "axios";

const MoviesApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
  params:{
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY,
    language: "es-MX"
  }
});

MoviesApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers[
    "Authorization"
  ] = `Bearer ${process.env.EXPO_PUBLIC_MOVIE_DB_READ_KEY}`;

  return config;
});

export default MoviesApi;
