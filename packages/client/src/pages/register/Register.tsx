import { Box } from "@mui/material";
import { LogoIcon } from "../../shared/components";
import { StyledPaper, RegisterForm } from "./components";

export const Register = () => {
  return (
    <Box sx={{ width: "100wh" }}>
      <StyledPaper elevation={1} sx={{ mt: "35px !important" }}>
        <Box display="flex" flexDirection={"column"} rowGap={12}>
          <LogoIcon />
          <RegisterForm />
        </Box>
      </StyledPaper>
    </Box>
  );
};
