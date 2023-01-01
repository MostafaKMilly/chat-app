import { PaletteColorOptions, PaletteOptions } from "@mui/material";

const PRIMARY: PaletteColorOptions = {
  main: "#82cd47",
  dark: "#4f9b0e",
  light: "#b5ff78",
};

const SECONDARY: PaletteColorOptions = {
  main: "#f0ff42",
  dark: "#bacc00",
  light: "#ffff79",
};

const ERROR: PaletteColorOptions = {
  main: "#f32424",
  dark: "#b70000",
  light: "#ff644f",
};

const SUCCESS: PaletteColorOptions = {
  main: "#379237",
  dark: "#006306",
  light: "#6ac364",
};

export const palette: PaletteOptions = {
  common: {
    black: "222222",
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  error: ERROR,
  success: SUCCESS,
};
