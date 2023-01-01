import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registerFormValidationSchema = Yup.object({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone is required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .test(
      "Is valid password",
      "Password should contained at least one upercase character",
      (value) => {
        if (!value) {
          return false;
        }
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 2;
        const conditions = [hasLowerCase, hasUpperCase];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions === numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
});
