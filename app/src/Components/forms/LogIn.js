import React, {useState} from "react";
import classes from './LogIn.module.css';
import useInput from "../../hooks/use-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const Login = (props) => {
    const data = useActionData();
    const navigation = useNavigation();

    const {value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputHasError, valueChangeHandler: emailInputChangeHandler, inputBlurHandler: emailInputBlureHandler, reset: resetEmailInput} = useInput(value => value.trim() !== '');
    const {value: enteredPassword, isValid: enteredPasswordIsValid, hasError: passwordInputHasError, valueChangeHandler: passwordInputChangeHandler, inputBlurHandler: passwordInputBlureHandler, reset: resetPasswordInput} = useInput(value => value.trim() !== '' && value.length >= 8);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const isSubmitting = navigation.state === 'submitting';

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setPasswordIsVisible((prevState) => !prevState);
      };
    
    //checking the overall form validty [we dont need state here as we are using onChange so this function is re-evaluated with every key stroke]
    let formIsValid = false;

    if(enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        // event.preventDefault();

        emailInputBlureHandler();
        passwordInputBlureHandler();

        if(!formIsValid){
            return;
        }

        // console.log(enteredEmail, enteredPassword);
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
                <button className={classes.showIcon} onClick={props.onClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>

            <div className="mb-5">
                <h2 className={classes.welcome}>Welcome back!</h2>
                <h2 className={classes.sign}>Sign in to your account</h2>
            </div>

            <Form method="post" className={classes['login-form']} onSubmit={formSubmissionHandler}>
                {data && <p className="text-danger">Could not authenticate user!</p>}
                <div className={emailInputClasses}>
                    <label htmlFor="username">Username</label>
                    <input value={enteredEmail} type="text" className={classes['form-control']} id="username" name="username" placeholder="Enter username" onChange={emailInputChangeHandler} onBlur={emailInputBlureHandler}/>
                    {emailInputHasError && <p className={classes['error-text']}>Invalid username!</p>}
                </div>

                <div className={passwordInputClasses}>
                    <label htmlFor="password">Password</label>
                    <div className={classes.password}>
                        <input value={enteredPassword} type={passwordIsVisible ? 'text' : 'password'} className={classes['form-control']} id="password" name="password" placeholder="Password" onChange={passwordInputChangeHandler} onBlur={passwordInputBlureHandler}/>
                        <button className={classes.showIcon} onClick={togglePasswordVisibility}>
                            {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                    </div>
                    {passwordInputHasError && <p className={classes['error-text']}>Invalid password!</p>}
                </div>

                <button disabled={isSubmitting} type="submit" className={btnClass}>{isSubmitting? 'Loading...' : 'SIGN IN'}</button>
            </Form>

            <footer className={classes['login-form-footer']}>
                <p>Don't have an account yet? <Link to="/auth?mode=register">Sign up</Link></p>
            </footer>

        </>
        
      );
};

export default Login;