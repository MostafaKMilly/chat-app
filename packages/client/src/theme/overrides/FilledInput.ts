import { Components, Theme } from "@mui/material";

export const FilledInputStylesOverrides: Components<Theme>["MuiFilledInput"] = {
  variants: [
    {
      props: {
        type: "search",
      },
      style: ({ theme }) => ({
        color: theme.palette.common.black,
        backgroundColor: `${theme.palette.grey[300]} !important`,
        border: "none",
        boxShadow: "none",
        "& .MuiFormLabel-root": {
          color: theme.palette.common.black,
        },
        "& .MuiInputAdornment-root": {
          color: theme.palette.common.black,
          marginTop: "0px !important",
        },
        "&:active , &:hover": {
          backgroundColor: `${theme.palette.grey[400]} !important`,
        },
        "& input": {
          paddingTop: "8px !important",
        },
        "& input::placeholder": {
          color: theme.palette.common.black,
          opacity: 1,
        },
      }),
    },
  ],
};
