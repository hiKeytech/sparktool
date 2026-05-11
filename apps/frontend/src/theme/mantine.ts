import { createTheme } from "@mantine/core";

const funGreenPalette = [
  "var(--color-fun-green-50)",
  "var(--color-fun-green-100)",
  "var(--color-fun-green-200)",
  "var(--color-fun-green-300)",
  "var(--color-fun-green-400)",
  "var(--color-fun-green-500)",
  "var(--color-fun-green-600)",
  "var(--color-fun-green-700)",
  "var(--color-fun-green-800)",
  "var(--color-fun-green-900)",
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
    "fun-green": funGreenPalette,
  },
  fontFamily: "var(--font-sans)",
  primaryColor: "fun-green",
});
