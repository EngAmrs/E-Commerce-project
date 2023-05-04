import React from "react";
import classes from './LogIn.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {useFormik} from 'formik';

const Register = (props) => {

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            user_name: "",
            email: "",
            password: ""
        }
    })


    return (
        <>
            <div className="d-flex justify-content-end">
                <button onClick={props.onClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>

            <div className="mb-5">
                <h2 className={classes.sign}>Create an account</h2>
            </div>

            <form className={classes['login-form']} onSubmit={formSubmissionHandler}>

                <div className={emailInputClasses}>
                    <label htmlFor="first_name">First name</label>
                    <input value={enteredEmail} type="text" className={classes['form-control']} id="first_name" placeholder="First Name"/>
                    {emailInputHasError && <p className={classes['error-text']}>Invalid email!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="last_name">Last name</label>
                    <input value={enteredPassword} type="text" className={classes['form-control']} id="last_name" placeholder="Last Name"/>
                    {passwordInputHasError && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="user_name">User name</label>
                    <input value={enteredPassword} type="text" className={classes['form-control']} id="user_name" placeholder="User Name"/>
                    {passwordInputHasError && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <div className={emailInputClasses}>
                    <label htmlFor="email">Email address</label>
                    <input value={enteredEmail} type="email" className={classes['form-control']} id="email" placeholder="Enter email" onChange={emailInputChangeHandler} onBlur={emailInputBlureHandler}/>
                    {emailInputHasError && <p className={classes['error-text']}>Invalid email!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="password">Password</label>
                    <input value={enteredPassword} type="password" className={classes['form-control']} id="password" placeholder="Password" onChange={passwordInputChangeHandler} onBlur={passwordInputBlureHandler}/>
                    {passwordInputHasError && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <button type="submit" className={btnClass}>Register</button>
            </form>

            <footer className={classes['login-form-footer']}>
                <p>Already have an account<a href="#" onClick={props.onViewHandler}>Sign in</a></p>
            </footer>

        </>
        
      );
};

export default Register;