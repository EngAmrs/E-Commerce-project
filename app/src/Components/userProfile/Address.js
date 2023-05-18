import React from "react";
import { addressSchema } from "../../schemas";
import {useFormik} from 'formik';
import {Button, Row, Col, Card, Header, Footer} from "react-bootstrap";
import classes from '../forms/Register.module.css';
import { Link, useActionData, Form, useNavigation, useLoaderData } from "react-router-dom";
import Cardd from '../UI/Card';
import styles from './Profile.module.css';
import DispalyAlert from "../UI/DisplayAlert";
import style from './Address.module.css';
const onSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
};
const Address = () => {
    const addresses = useLoaderData();
    // console.log('ana adresses', addresses);
    const data  = useActionData();
    
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';
    const formik = useFormik({
        initialValues: {
            street_name: "",
            street_no: "",
            government: "",
            district: "",
            house_no: "",
            apartment_no: "",
            floor_no: "",
            additional_info: "",

        },
        validationSchema: addressSchema,
        onSubmit: onSubmit
    });

    const btnClass = `${classes.btn} ${classes['btn-primary']}`;
    if(data) {
        // console.log("ana hena", data)
        // console.log("ana satus", data.status)
    }
    
    return (
        <>
        <Row className={styles.profileContainer}>
            <Col md={4}>
            <Cardd>
                <Form method="post" className={classes['login-form']}>
                    {data ? <DispalyAlert variant="danger">Invalid Entery</DispalyAlert> : undefined}
                    {/* {data && <p>Error!</p>} */}
                    {/* {data && data.message && <p>{data.message}</p>} */}
                    <div className="mb-4">
                        <label htmlFor="street_name">Street name</label>
                        <input value={formik.values.street_name} type="text" className={classes['form-control']} id="street_name" name="street_name" placeholder="Enter Street name" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.street_name && formik.touched.street_name) && <p className={classes['error-text']}>{formik.errors.street_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="street_no">Street no</label>
                        <input value={formik.values.street_no} type="text" className={classes['form-control']} id="street_no" name="street_no" placeholder="Enter street no" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.street_no && formik.touched.street_no)   && <p className={classes['error-text']}>{formik.errors.street_no}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="government">Government</label>
                        <input value={formik.values.government} type="text" className={classes['form-control']} id="government" name="government" placeholder="Enter government" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.government && formik.touched.government)   && <p className={classes['error-text']}>{formik.errors.government}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="district">District</label>
                        <input value={formik.values.district} type="text" className={classes['form-control']} id="district" name="district" placeholder="Enter district" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.district && formik.touched.district)   && <p className={classes['error-text']}>{formik.errors.district}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="house_no">House no.</label>
                        <input value={formik.values.house_no} type="text" className={classes['form-control']} id="house_no" name="house_no" placeholder="Enter house_no" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.house_no && formik.touched.house_no)   && <p className={classes['error-text']}>{formik.errors.house_no}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="apartment_no">Apartment no.</label>
                        <input value={formik.values.apartment_no} type="text" className={classes['form-control']} id="apartment_no" name="apartment_no" placeholder="Enter apartment_no" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.apartment_no && formik.touched.apartment_no)   && <p className={classes['error-text']}>{formik.errors.apartment_no}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="floor_no">Floor no.</label>
                        <input value={formik.values.floor_no} type="text" className={classes['form-control']} id="floor_no" name="floor_no" placeholder="Enter floor_no" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {(formik.errors.floor_no && formik.touched.floor_no)   && <p className={classes['error-text']}>{formik.errors.floor_no}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="additional_info">Additional info</label>
                        <textarea value={formik.values.additional_info} type="text" className={classes['form-control']} id="additional_info" name="additional_info" placeholder="Enter additional_info" onChange={formik.handleChange} onBlur={formik.handleBlur} row="3"></textarea>
                        {(formik.errors.additional_info && formik.touched.additional_info)   && <p className={classes['error-text']}>{formik.errors.additional_info}</p>}
                    </div>

                    <button disabled={!formik.isValid} type="submit" className={btnClass}>{isSubmitting? 'LOADING...' : 'ADD ADDRESS'}</button>
                </Form>
            </Cardd>
            </Col>

            <Col md={8}>
            <Card>
            <Card.Header>Addresses</Card.Header>
            <Card.Body>
                <Row>
                {addresses.map((address, index) => (
                    <Col md={6} key={index}>
                    <Card className={style['address-card']}>
                        <Card.Header>Address {index + 1}</Card.Header>
                        <Card.Body>
                        <div className={style.address}>
                            <p><span className={style.tit}>Street name:</span> {address.street_name}</p>
                            <p><span className={style.tit}>Street no:</span> {address.street_no}</p>
                            <p><span className={style.tit}>Government:</span> {address.government}</p>
                            <p><span className={style.tit}>District:</span> {address.district}</p>
                            <p><span className={style.tit}>House no:</span> {address.house_no}</p>
                            <p><span className={style.tit}>Apartment no:</span> {address.apartment_no}</p>
                            <p><span className={style.tit}>Floor no:</span> {address.floor_no}</p>
                            {address.additional_info ? <p><span className={style.tit}>Additional info:</span> {address.additional_info}</p> :<p><span className={style.tit}>Additional info:</span> No additional info</p>}
                        </div>
                        <div className={style.contact}>
                            {/* Add contact info for this address */}
                        </div>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="danger" className={style['edit-address']}>Delete</Button>
                        </Card.Footer>
                    </Card>
                    </Col>
                ))}
                </Row>
            </Card.Body>
            </Card>
            </Col>
        </Row>
      </>
    )
};

export default Address;



