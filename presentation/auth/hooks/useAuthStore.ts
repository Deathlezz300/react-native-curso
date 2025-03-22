import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
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
    const response = await authLogin(email, password);

    if (!response) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });

    return true;
  },

  checkStatus: async () => {
    const response = await authCheckStatus();

    if (!response) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }

    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });
  },

  logout: async () => {
    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
