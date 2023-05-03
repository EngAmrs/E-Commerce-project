import React from "react";
import Card from '../UI/Card';
import classes from './LogIn.module.css';
import logInImg from '../../assets/undraw_Login_re_4vu2.png';
import useInput from "../../hooks/use-input";

const Login = () => {
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
    const mainContainer = `container ${classes.mainContainer}`
    const subContainer = `row  ${classes.subContainer}`;

    // these variables just for controlling the css classes added to the elements
    const emailInputClasses = emailInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;
    const passwordInputClasses = passwordInputHasError ? `${classes['form-group']} ${classes.invalid}` : `${classes['form-group']}`;

    return (
        <div className={classes.wrapper}>
            <Card className={mainContainer}>
                <div className={subContainer}>
                    <h1 className="text-center mt-5">Welcome back!</h1>
                    <div className="col-lg-6 col-md-6">
                        <img className="w-100" src={logInImg} alt="Login Image"/>
                    </div>
                    <div className="col-lg-6 col-md-6 ">
                        <Card className={classes['login-form-container']}>
                            <h2>Sign in to your account</h2>
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
                                <button type="submit" className={btnClass}>Sign in</button>
                            </form>
                            <div className={classes['login-form-footer']}>
                                <p>Don't have an account yet? <a href="#">Sign up</a></p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
        
      );
};

export default Login;