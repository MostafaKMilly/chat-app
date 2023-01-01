import { Components, Theme } from "@mui/material";

export const TextFieldStylesOverrides: Components<Theme>["MuiTextField"] = {
  variants: [
    {
      props: {
        type: "search",
      },
      style: {
        "& .MuiInputBase-root": {
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 16,
          paddingLeft: 10,
          height: 36,
        },
        "& .MuiInputBase-root input::-webkit-search-cancel-button": {
          opacity: 0,
          pointerEvents: "none",
        },
      },
    },
  ],
};
