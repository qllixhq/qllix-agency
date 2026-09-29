"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type AdminTheme = "dark" | "light";

interface AdminThemeContextType {
  theme: AdminTheme;
  toggleTheme: () => void;
  setTheme: (theme: AdminTheme) => void;
  isDark: boolean;
}

const AdminThemeContext = createContext<AdminThemeContextType | null>(null);

const STORAGE_KEY = "qllix_admin_theme";

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>("dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
      }
    } catch (e) {
      console.warn("Theme load failed", e);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light", "admin-light");
        document.body.classList.add("admin-dark");
        document.body.classList.remove("admin-light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light", "admin-light");
        document.body.classList.add("admin-light");
        document.body.classList.remove("admin-dark");
      }
    }
  }, [theme]);

  const setTheme = (newTheme: AdminTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AdminThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === "dark",
      }}
    >
      <div className={theme === "dark" ? "admin-dark" : "admin-light"}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    // Fallback if rendered outside provider
    return {
      theme: "dark" as AdminTheme,
      toggleTheme: () => {},
      setTheme: () => {},
      isDark: true,
    };
  }
  return ctx;
}
