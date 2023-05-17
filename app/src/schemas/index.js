import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = yup.object().shape({
    first_name: yup.string().min(3, "Min length is 3!").required("Required!"),
    last_name: yup.string().min(3,"Min length is 3!").required("Required!"),
    user_name: yup.string().min(3,"Min length is 3!").required("Required!"),
    email: yup.string().email("Please Enter a valid email!").required("Required!"),
    password: yup.string().min(8, "Min length is 8!").matches(passwordRules, {message: "Please enter a strong password!"}).required("Required!"),
})

export const updateSchema = yup.object().shape({
    first_name: yup.string().min(3, "Min length is 3!"),
    last_name: yup.string().min(3,"Min length is 3!"),
    user_name: yup.string().min(3,"Min length is 3!"),
    email: yup.string().email("Please Enter a valid email!"),
    password: yup.string().min(8, "Min length is 8!").matches(passwordRules, {message: "Please enter a strong password!"})
})