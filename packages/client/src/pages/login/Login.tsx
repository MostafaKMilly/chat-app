import { Box } from "@mui/material";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import API from "../../api/httpClient";
import { LogoIcon } from "../../shared/components";
import { LoginForm } from "./components";
import { StyledPaper } from "./components/StyledPaper";

export const loader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const user = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };
  const { data } = (await API.post("auth/login", { user })) ?? {};
  if (data) {
    localStorage.setItem("token", data.user.token);
    return redirect("/");
  }
  return null;
};

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

Login.action = action;
Login.loader = loader;
