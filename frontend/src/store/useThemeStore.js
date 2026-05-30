import { create } from "zustand";

const getSavedTheme = () =>
  localStorage.getItem("fluently-theme") || localStorage.getItem("streamify-theme") || "dim";

export const useThemeStore = create((set) => ({
  theme: getSavedTheme(),
  setTheme: (theme) => {
    localStorage.setItem("fluently-theme", theme);
    set({ theme });
  },
}));