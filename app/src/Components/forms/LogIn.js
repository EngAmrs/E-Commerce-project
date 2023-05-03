import React, {useState, useRef} from "react";
import Card from '../UI/Card';
import classes from './LogIn.module.css';
import logInImg from '../../assets/undraw_Login_re_4vu2.png';

const Login = () => {
    const [enteredEmail, setEnterdEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredEmailIsValid, setEnterdEmailIsValid] = useState(true);
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);

    const emailInputChangeHandler = event => {
        setEnterdEmail(event.target.value);
    }

    const passwordInputChangeHandler = event => {
        setEnteredPassword(event.target.value);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        if(enteredEmail.trim() === '' || !enteredEmail.includes('@')){
            setEnterdEmailIsValid(false);
            return;
        }

        if(enteredPassword.length < 8){
            setEnteredPasswordIsValid(false);
            return;
        }

        setEnterdEmailIsValid(true);
        setEnteredPasswordIsValid(true);
        console.log(enteredEmail, enteredPassword);
        setEnterdEmail('');
        setEnteredPassword('');
    }

    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
    const mainContainer = `container ${classes.mainContainer}`
    const subContainer = `row  ${classes.subContainer}`;

    const emailInputClasses = enteredEmailIsValid ? `${classes['form-group']}` : `${classes['form-group']} ${classes.invalid}`;
    const passwordInputClasses = enteredPasswordIsValid ? `${classes['form-group']}` : `${classes['form-group']} ${classes.invalid}`;
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
                                    <input value={enteredEmail} type="email" className={classes['form-control']} id="email" placeholder="Enter email" onChange={emailInputChangeHandler}/>
                                    {!enteredEmailIsValid && <p className={classes['error-text']}>Invalid email!</p>}
                                </div>
                                <div className={passwordInputClasses}>
                                    <label htmlFor="password">Password</label>
                                    <input value={enteredPassword} type="password" className={classes['form-control']} id="password" placeholder="Password" onChange={passwordInputChangeHandler}/>
                                    {!enteredPasswordIsValid && <p className={classes['error-text']}>Invalid password!</p>}
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