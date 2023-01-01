import { alpha, Components } from "@mui/material";

export const ButtonStylesOverrides: Components["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableElevation: true,
    variant: "contained",
  },
  styleOverrides: {
    root: ({ ownerState }) => ({
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "6px",
      paddingRight: ownerState.endIcon ? "10px" : "16px",
      paddingLeft: ownerState.startIcon ? "10px" : "16px",
      textTransform: "initial",
      "&:disabled": {
        color: "#fff",
      },
      "& .MuiButton-startIcon , .MuiButton-endIcon": {
        padding: 4,
        "& svg": {
          fontSize: "medium",
        },
      },
    }),
  },
  variants: [
    {
      props: {
        color: "secondary",
      },
      style: ({ theme }) => ({
        color: theme.palette.common.black,
      }),
    },
    {
      props: {
        color: "primary",
      },
      style: ({ theme }) => ({
        color: theme.palette.common.white,
      }),
    },
  ],
};
