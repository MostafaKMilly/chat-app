import { Components, Theme } from "@mui/material";
import { ButtonStylesOverrides } from "./Button";
import { CssBaselineStylesOverrides } from "./CssBaseline";
import { FilledInputStylesOverrides } from "./FilledInput";
import { TextFieldStylesOverrides } from "./TextField";

export const componentsOverrides: Components<Theme> = {
  MuiButton: ButtonStylesOverrides,
  MuiCssBaseline: CssBaselineStylesOverrides,
  MuiTextField: TextFieldStylesOverrides,
  MuiFilledInput: FilledInputStylesOverrides,
};
