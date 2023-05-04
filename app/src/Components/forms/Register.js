import React, {useState} from "react";
import classes from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useFormik} from 'formik';
import useInput from "../../hooks/use-input";
import { registerSchema } from '../../schemas/index';

const onSubmit = () => {
    window.alert("asfadsf")
};

const Register = (props) => {
    const {value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputHasError, valueChangeHandler: emailInputChangeHandler, inputBlurHandler: emailInputBlureHandler, reset: resetEmailInput} = useInput(value => value.trim() !== '' || value.includes('@'));
    const {value: enteredPassword, isValid: enteredPasswordIsValid, hasError: passwordInputHasError, valueChangeHandler: passwordInputChangeHandler, inputBlurHandler: passwordInputBlureHandler, reset: resetPasswordInput} = useInput(value => value.trim() !== '' && value.length >= 8);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setPasswordIsVisible((prevState) => !prevState);
      };


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit,
    });

    console.log(formik.errors);

    // const formSubmissionHandler = event => {
    //     event.preventDefault();
        
    // }

    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
 
    // these variables just for controlling the css classes added to the elements
    const emailInputClasses = emailInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;
    const passwordInputClasses = passwordInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;


    console.log(formik);

    return (
        <div>
            <div className="d-flex justify-content-end">
                <button className={classes.showIcon} onClick={props.onClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
            <div className="mb-1">
                <h2 className={classes.sign}>Create an account</h2>
            </div>

            <form onSubmit={formik.handleSubmit} className={classes['login-form']}>

                <div >
                    <label htmlFor="first_name">First name</label>
                    <input value={formik.values.first_name} type="text" className={classes['form-control']} id="first_name" placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.first_name && <p className={classes['error-text']}>Invalid email!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="last_name">Last name</label>
                    <input value={formik.values.last_name} type="text" className={classes['form-control']} id="last_name" placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.last_name  && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="user_name">User name</label>
                    <input value={formik.values.user_name} type="text" className={classes['form-control']} id="user_name" placeholder="User Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.user_name  && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <div className={emailInputClasses}>
                    <label htmlFor="email">Email address</label>
                    <input value={formik.values.email} type="email" className={classes['form-control']} id="email" placeholder="Enter email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.email  && <p className={classes['error-text']}>Invalid email!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="password">Password</label>
                    <div className={classes.password}>
                        <input value={enteredPassword} type={passwordIsVisible ? 'text' : 'password'} className={classes['form-control']} id="password" placeholder="Password" onChange={passwordInputChangeHandler} onBlur={passwordInputBlureHandler}/>
                        <button className={classes.showIcon} onClick={togglePasswordVisibility}>
                            {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                    </div>
                    {formik.errors.password && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <button type="submit" className={btnClass}>Register</button>
            </form>

            <footer className={classes['login-form-footer']}>
                <p>Already have an account<a href="#" onClick={props.onViewHandler}>Sign In</a></p>
            </footer>

        </div>
        
      );
};

export default Register;