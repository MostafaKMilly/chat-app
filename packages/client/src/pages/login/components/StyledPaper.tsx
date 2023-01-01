import { Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) =>
  theme.unstable_sx({
    margin: "0 auto",
    mt: {
      xs: 4,
      md: 13,
    },
    p: 4,
    maxWidth: {
      xs: "auto",
      md: "500px",
    },
    minHeight: "500px",
  })
);
