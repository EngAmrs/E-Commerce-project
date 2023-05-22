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
    first_name: yup.string().min(3, "Min length is 3!").required("Required!"),
    last_name: yup.string().min(3,"Min length is 3!").required("Required!"),
    email: yup.string().email("Please Enter a valid email!").required("Required!"),
    password: yup.string().min(8, "Min length is 8!").matches(passwordRules, {message: "Please enter a strong password!"}),
    password_confirm: yup.string().oneOf([yup.ref('password'), null], "Passwords must match!")
})

export const addressSchema = yup.object().shape({
    street_name: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
    street_no: yup.string().max(10,"Max length is 10!").required("Required!"),
    government: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
    district: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
    house_no: yup.string().max(10,"Max length is 10!").required("Required!"),
    apartment_no: yup.string().max(10,"Max length is 10!").required("Required!"),
    floor_no: yup.string().max(10,"Max length is 10!").required("Required!"),
    additional_info: yup.string().max(500,"Must be less than 500"),
    
})

