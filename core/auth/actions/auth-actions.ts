import { productsApi } from "@/core/api/productsApi";
import { User } from "../../interfaces";
import { AxiosError } from "axios";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

interface userTokenReturn {
  token: string;
  user: User;
}

const returnUserToken = (data: AuthResponse): userTokenReturn => {
  const { token, ...user } = data;

  return {
    token,
    user,
  };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error: AxiosError | any) {
    console.error(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");

    return returnUserToken(data);
  } catch (error: AxiosError | any) {
    console.error(error);
    return null;
  }
};
