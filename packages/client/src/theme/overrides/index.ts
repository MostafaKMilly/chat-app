import { Components, Theme } from "@mui/material";
import { ButtonStylesOverrides } from "./Button";
import { CssBaselineStylesOverrides } from "./CssBaseline";

export const componentsOverrides: Components<Theme> = {
  MuiButton: ButtonStylesOverrides,
  MuiCssBaseline: CssBaselineStylesOverrides,
};
