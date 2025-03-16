import { User } from "@/core/interfaces";
import { create } from "zustand";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: "loading",
  token: undefined,
  user: undefined,

  login: async (email, password) => {
    //API Call
    return true;
  },

  checkStatus: async () => {
    //API Call
  },

  logout: async () => {
    //API Call
  },
}));
