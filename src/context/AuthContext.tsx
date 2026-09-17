"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ADMIN_API_URL } from "@/lib/config";
import { CustomerOrder, CustomerUser } from "@/types";

const TOKEN_KEY = "kay-raluxe-customer-token";

interface AuthContextValue {
  user: CustomerUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; phone?: string; password: string; password_confirmation: string }) => Promise<void>;
  updateProfile: (data: { name: string; email: string; phone?: string }) => Promise<void>;
  updatePassword: (data: { current_password: string; password: string; password_confirmation: string }) => Promise<void>;
  getOrders: () => Promise<CustomerOrder[]>;
  logout: () => Promise<void>;
}

interface AuthPayload {
  token: string;
  user: CustomerUser;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function authRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${ADMIN_API_URL}${path}`, {
    ...options,
    headers: { Accept: "application/json", "Content-Type": "application/json", ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validationMessage = body.errors ? Object.values(body.errors as Record<string, string[]>).flat()[0] : null;
    throw new Error(validationMessage || body.message || "Something went wrong. Please try again.");
  }
  return body as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) {
      // Hydrate the client-only session state after the first browser render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      return;
    }

    authRequest<{ user: CustomerUser }>("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ user: nextUser }) => setUser(nextUser))
      .catch(() => window.localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  const saveSession = useCallback((payload: AuthPayload) => {
    window.localStorage.setItem(TOKEN_KEY, payload.token);
    setUser(payload.user);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const payload = await authRequest<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveSession(payload);
  }, [saveSession]);

  const register = useCallback(async (data: { name: string; email: string; phone?: string; password: string; password_confirmation: string }) => {
    const payload = await authRequest<AuthPayload>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    saveSession(payload);
  }, [saveSession]);

  const updateProfile = useCallback(async (data: { name: string; email: string; phone?: string }) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const payload = await authRequest<{ user: CustomerUser }>("/auth/profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token || ""}` },
      body: JSON.stringify(data),
    });
    setUser(payload.user);
  }, []);

  const updatePassword = useCallback(async (data: { current_password: string; password: string; password_confirmation: string }) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    await authRequest("/auth/password", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token || ""}` },
      body: JSON.stringify(data),
    });
  }, []);

  const getOrders = useCallback(async () => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const response = await authRequest<{ data: CustomerOrder[] }>("/auth/orders", {
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    if (token) {
      await authRequest("/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => undefined);
    }
  }, []);

  const value = useMemo(() => ({ user, isLoading, login, register, updateProfile, updatePassword, getOrders, logout }), [user, isLoading, login, register, updateProfile, updatePassword, getOrders, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
