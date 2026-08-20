import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const COLOR_THEMES = {
  laranja: {
    label: "Laranja",
    primary: "#EF895F",
    primaryVariant: "#c96a3a",
    color: "#EF895F",
  },
  azul: {
    label: "Azul",
    primary: "#4facfe",
    primaryVariant: "#111e88",
    color: "#4facfe",
  },
  verde: {
    label: "Verde",
    primary: "#22c55e",
    primaryVariant: "#166534",
    color: "#22c55e",
  },
  roxo: {
    label: "Roxo",
    primary: "#a855f7",
    primaryVariant: "#6b21a8",
    color: "#a855f7",
  },
  rosa: {
    label: "Rosa",
    primary: "#ec4899",
    primaryVariant: "#9d174d",
    color: "#ec4899",
  },
};

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem("color-theme") || "laranja";
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("dark-mode") !== "false";
  });

  useEffect(() => {
    const body = document.body;

    COLOR_THEMES[themeName] &&
      body.style.setProperty("--color-primary", COLOR_THEMES[themeName].primary);
    COLOR_THEMES[themeName] &&
      body.style.setProperty("--color-primary-variant", COLOR_THEMES[themeName].primaryVariant);

    if (isDark) {
      body.classList.add("dark-theme-variables");
    } else {
      body.classList.remove("dark-theme-variables");
    }

    localStorage.setItem("color-theme", themeName);
    localStorage.setItem("dark-mode", isDark);
  }, [themeName, isDark]);

  function changeTheme(name) {
    if (COLOR_THEMES[name]) {
      setThemeName(name);
    }
  }

  function toggleDark() {
    setIsDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider
      value={{ themeName, changeTheme, isDark, toggleDark, themes: COLOR_THEMES }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
