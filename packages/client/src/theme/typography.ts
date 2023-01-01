import { TypographyOptions } from "@mui/material/styles/createTypography";

const PRIMARY_FONT = "Open Sans , sans-serif";

const typography: TypographyOptions = {
  fontFamily: PRIMARY_FONT,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  allVariants: {
    letterSpacing: 0,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
  },
  h2: {
    fontWeight: "bold",
    fontSize: 20,
  },
  h3: {
    fontWeight: 600,
    fontSize: 16,
  },
  h4: {
    fontWeight: "bold",
    fontSize: 12,
  },
  body1: {
    fontWeight: 600,
    fontSize: 16,
  },
  body2: {
    fontWeight: "regular",
    fontSize: 14,
  },
  button: {
    fontWeight: "bold",
    fontSize: 12,
  },
};

export default typography;
