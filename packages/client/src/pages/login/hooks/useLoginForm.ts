import { useFormik } from "formik";
import { loginFormValidationSchema } from "../utils";

export const useLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: loginFormValidationSchema,
  });
  return formik;
};
