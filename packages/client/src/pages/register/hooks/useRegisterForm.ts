import { useFormik } from "formik";
import { registerFormValidationSchema } from "../utils";

export const useRegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: registerFormValidationSchema,
  });
  return formik;
};
