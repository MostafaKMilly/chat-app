import { Box } from "@mui/material";
import { LogoIcon } from "../../shared/components";
import { LoginForm } from "./components";
import { StyledPaper } from "./components/StyledPaper";

export const Login = () => {
  return (
    <Box sx={{ width: "100wh" }}>
      <StyledPaper elevation={1}>
        <Box display="flex" flexDirection={"column"} rowGap={12}>
          <LogoIcon />
          <LoginForm />
        </Box>
      </StyledPaper>
    </Box>
  );
};
