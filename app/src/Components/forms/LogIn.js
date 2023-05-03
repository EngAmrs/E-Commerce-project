import React from "react";
import Card from '../UI/Card';
import classes from './LogIn.module.css';
import logInImg from '../../assets/undraw_Login_re_4vu2.png';

const Login = () => {
    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
    const mainContainer = `container ${classes.mainContainer}`
    const subContainer = `row  ${classes.subContainer}`;

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
                            <form className={classes['login-form']}>
                                <div className={classes['form-group']}>
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className={classes['form-control']} id="email" placeholder="Enter email"/>
                                </div>
                                <div className={classes['form-group']}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className={classes['form-control']} id="password" placeholder="Password"/>
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