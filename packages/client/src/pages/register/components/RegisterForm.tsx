import React from "react";
import { LoadingButton } from "@mui/lab";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useNavigation, Form, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import _ from "lodash";

export const RegisterForm = () => {
  const { getFieldProps, touched, errors, isValid, dirty } = useRegisterForm();
  const { state } = useNavigation();
  const navigate = useNavigate();

  return (
    <Box p={2}>
      <Form method="post">
        <Stack spacing={3}>
          <TextField
            id="firstName"
            label="First Name"
            required
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            {...getFieldProps("firstName")}
          />
          <TextField
            id="lastName"
            label="Last Name"
            required
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            {...getFieldProps("lastName")}
          />
          <TextField
            id="phone"
            label="Phone"
            required
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
            {...getFieldProps("phone")}
          />
          <TextField
            id="password"
            label="Password"
            required
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            {...getFieldProps("password")}
          />
          <Box mt={8} display="flex" flexDirection={"column"} rowGap={3}>
            <LoadingButton
              variant="contained"
              type="submit"
              form="loginForm"
              loading={state === "submitting"}
              loadingIndicator="Saving..."
              disabled={(!dirty || !isValid) && !_.isEmpty(touched)}
            >
              Register
            </LoadingButton>
            <Button color="secondary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
        </Stack>
      </Form>
    </Box>
  );
};
