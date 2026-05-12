import { createTheme } from "@mantine/core";

const funGreenPalette = [
  "var(--color-brand-50)",
  "var(--color-brand-100)",
  "var(--color-brand-200)",
  "var(--color-brand-300)",
  "var(--color-brand-400)",
  "var(--color-brand-500)",
  "var(--color-brand-600)",
  "var(--color-brand-700)",
  "var(--color-brand-800)",
  "var(--color-brand-900)",
] as const;

export const theme = createTheme({
  colors: {
    "chalet-green": [
      "#f6f8ed",
      "#e9f0d7",
      "#d5e2b4",
      "#b8ce88",
      "#9db962",
      "#7f9e44",
      "#627d33",
      "#4f642c",
      "#3e4e26",
      "#374324",
      "#1b240f",
    ],
    "brand": funGreenPalette,
  },
  fontFamily: "var(--font-sans)",
  primaryColor: "brand",
});
