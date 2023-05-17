import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import MainScreen from "../UI/MainScreen";
import './Profile.css';
import classes from '../forms/Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useFormik} from 'formik';
import { registerSchema } from '../../schemas/index';
import { Link, useActionData } from "react-router-dom";
import Card from '../UI/Card';
import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";

const onSubmit = (values, actions) => {
    actions.resetForm();
};

const Profile = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const { loading, error, success } = userUpdate;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/");
//     } else {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setPic(userInfo.pic);
//     }
//   }, [history, userInfo]);

//   const postDetails = (pics) => {
//     setPicMessage(null);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "notezipper");
//       data.append("cloud_name", "piyushproj");
//       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(pic);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       return setPicMessage("Please Select an Image");
//     }
//   };
  const data = useActionData();

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setPasswordIsVisible((prevState) => !prevState);
      };


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit,
    });

    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
    if(data) {
        console.log("ana hena", data)
    }

//   const submitHandler = (e) => {
//     e.preventDefault();

//     dispatch(updateProfile({ name, email, password, pic }));
//   };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Card>
                <Form method="post" className={classes['login-form']}>
                    {data && <p>Error!</p>}
                    {/* {data && data.message && <p>{data.message}</p>} */}
                    <div className="mb-4">
                        <label htmlFor="first_name">First name</label>
                        <input value={formik.values.first_name} type="text" className={classes['form-control']} id="first_name" name="first_name" placeholder="First Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.first_name && formik.touched.first_name) && <p className={classes['error-text']}>{formik.errors.first_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name">Last name</label>
                        <input value={formik.values.last_name} type="text" className={classes['form-control']} id="last_name" name="last_name" placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.last_name && formik.touched.last_name)   && <p className={classes['error-text']}>{formik.errors.last_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="user_name">User name</label>
                        <input value={formik.values.username} type="text" className={classes['form-control']} id="user_name" name="username" placeholder="User Name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.username && formik.touched.username)   && <p className={classes['error-text']}>{formik.errors.user_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Email address</label>
                        <input value={formik.values.email} type="email" className={classes['form-control']} id="email" name="email" placeholder="Enter email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.email && formik.touched.email)   && <p className={classes['error-text']}>{formik.errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <div className={classes.password}>
                            <input value={formik.values.password} type={passwordIsVisible ? 'text' : 'password'} className={classes['form-control']} id="password" name="password" placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            <button className={classes.showIcon} onClick={togglePasswordVisibility}>
                                {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </button>
                        </div>
                        {(formik.errors.password && formik.touched.password)  && <p className={classes['error-text']}>{formik.errors.password}</p>}
                    </div>

                    <button type="submit" className={btnClass}>UPDATE</button>
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
      </div>
    </MainScreen>
  );
};

export default Profile;