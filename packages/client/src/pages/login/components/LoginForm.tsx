import React from "react";
import { LoadingButton } from "@mui/lab";
import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigation, Form, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import _ from "lodash";

export const LoginForm = () => {
  const { getFieldProps, touched, errors, isValid, dirty } = useLoginForm();
  const { state } = useNavigation();
  const navigate = useNavigate();

  return (
    <Box p={2}>
      <Form method="post">
        <Stack spacing={3}>
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
              Login
            </LoadingButton>
            <Button color="secondary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Box>
        </Stack>
      </Form>
    </Box>
  );
};
