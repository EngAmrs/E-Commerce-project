import React from "react";
import classes from './LogIn.module.css';
import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Register = (props) => {
    const {value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputHasError, valueChangeHandler: emailInputChangeHandler, inputBlurHandler: emailInputBlureHandler, reset: resetEmailInput} = useInput(value => value.trim() !== '' || value.includes('@'));
    const {value: enteredPassword, isValid: enteredPasswordIsValid, hasError: passwordInputHasError, valueChangeHandler: passwordInputChangeHandler, inputBlurHandler: passwordInputBlureHandler, reset: resetPasswordInput} = useInput(value => value.trim() !== '' && value.length >= 8);
    
    //checking the overall form validty [we dont need state here as we are using onChange so this function is re-evaluated with every key stroke]
    let formIsValid = false;

    if(enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        emailInputBlureHandler();
        passwordInputBlureHandler();

        if(!formIsValid){
            return;
        }

        console.log(enteredEmail, enteredPassword);
        resetEmailInput();
        resetPasswordInput();
        
    }

    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
 
    // these variables just for controlling the css classes added to the elements
    const emailInputClasses = emailInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;
    const passwordInputClasses = passwordInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;

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