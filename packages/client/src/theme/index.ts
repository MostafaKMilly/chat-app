import { ThemeOptions, createTheme } from "@mui/material";
import { componentsOverrides } from "./overrides";
import { palette } from "./pallete";
import { shadows } from "./shadows";
import typography from "./typography";

export const theme = createTheme({
  palette: palette,
  components: componentsOverrides,
  typography: typography,
  shadows,
});
