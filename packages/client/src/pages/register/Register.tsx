import { Box } from "@mui/material";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import API from "../../api/httpClient";
import { LogoIcon } from "../../shared/components";
import { StyledPaper, RegisterForm } from "./components";

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
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  };
  const { data } = (await API.post("auth/register", { user })) ?? {};
  if (data) {
    localStorage.setItem("token", data.user.token);
    return redirect("/");
  }
  return null;
};

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

Register.loader = loader;
Register.action = action;
