import React, { useState, useEffect } from "react";
import {Button, Row, Col} from "react-bootstrap";
import styles from './Profile.module.css';
import classes from '../forms/Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useFormik} from 'formik';
import { updateSchema } from '../../schemas/index';
import { Link, useActionData, Form } from "react-router-dom";
import Card from '../UI/Card';
import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
import Loading from "../UI/Loading";
import axios from "axios";




const Profile = ({ location, history }) => {
  const [updated, setUpdated] = useState(false);
  const [update, setUpdate] = useState("SUBMIT");

  const dispatch = useDispatch()

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setPasswordIsVisible((prevState) => !prevState);
      };

      const submitRequest = (postData)=>{
        axios.put('http://127.0.0.1:8000/account/user/update/', postData)
        .then(response => {
          // Handle the response
          setUpdated(true)
          setUpdate("UPDATED")
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
      }

      const onSubmit = (values, actions) => {
        console.log(values);
        submitRequest(values)
        actions.resetForm();
    };



    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirm: "",
        },
        validationSchema: updateSchema,
        onSubmit,
    });


//   const submitHandler = (e) => {
//     e.preventDefault();

//     dispatch(updateProfile({ name, email, password, pic }));
//   };

  return (
      <>
        <Row className={styles.profileContainer}>
          <Col md={12}>
            <Card>
                <Form  onSubmit={formik.handleSubmit}  className={`classes['login-form'] row`}>
                    {/* {data && data.message && <p>{data.message}</p>} */}
                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="first_name">First name</label>
                        <input value={formik.values.first_name} type="text" className={classes['form-control']} id="first_name" name="first_name" placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.first_name && formik.touched.first_name) && <p className={classes['error-text']}>{formik.errors.first_name}</p>}
                    </div>

                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="last_name">Last name</label>
                        <input value={formik.values.last_name} type="text" className={classes['form-control']} id="last_name" name="last_name" placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.last_name && formik.touched.last_name)   && <p className={classes['error-text']}>{formik.errors.last_name}</p>}
                    </div>

                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="user_name">User name</label>
                        <input value={formik.values.username} type="text" className={classes['form-control']} id="user_name" name="username" placeholder="User Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.username && formik.touched.username)   && <p className={classes['error-text']}>{formik.errors.user_name}</p>}
                    </div>

                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="email">Email address</label>
                        <input value={formik.values.email} type="email" className={classes['form-control']} id="email" name="email" placeholder="Enter email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.email && formik.touched.email)   && <p className={classes['error-text']}>{formik.errors.email}</p>}
                    </div>

                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="password">Password</label>
                        <div className={classes.password}>
                            <input value={formik.values.password} type={passwordIsVisible ? 'text' : 'password'} className={classes['form-control']} id="password" name="password" placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            <button className={classes.showIcon} onClick={togglePasswordVisibility}>
                                {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                        {(formik.errors.password && formik.touched.password)  && <p className={classes['error-text']}>{formik.errors.password}</p>}
                    </div>

                    <div className="mt-5 mb-4 col-md-6">
                        <label htmlFor="password_confirm">Confirm Password</label>
                        <div className={classes.password}>
                            <input value={formik.values.password_confirm} type={passwordIsVisible ? 'text' : 'password'} className={classes['form-control']} id="password_confirm" placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            <button className={classes.showIcon} onClick={togglePasswordVisibility}>
                                {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                        {(formik.errors.password_confirm && formik.touched.password_confirm)  && <p className={classes['error-text']}>{formik.errors.password_confirm}</p>}
                    </div>

                    <button  disabled={!formik.isValid || updated === true} type="submit" className={`btn btn-primary  col-md-2 ${classes.updatebtn}`}>{update}</button>
                </Form>
            </Card>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={pic} alt={name} className="profilePic" /> */}
          </Col>
        </Row>
      </>
    
  );
};

export default Profile;