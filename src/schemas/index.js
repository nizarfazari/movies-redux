import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(3).required("Required"),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string("Only character needed").required("Required"),
  lastName: yup.string("Only character needed").required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(3).required("Required"),
  passConf: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Required"),
});
