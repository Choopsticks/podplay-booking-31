
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Run this only on client side
    if (typeof window !== "undefined") {
      // Check if theme is stored in localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      // Check for system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme || (prefersDark ? "dark" : "light");
    }
    return "light"; // Default for SSR
  });

  // Track system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    
    // Remove old theme class and add new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content", 
        theme === "dark" ? "#1e293b" : "#ffffff"
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
