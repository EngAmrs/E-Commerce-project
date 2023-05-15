import { Fragment, useEffect, useState } from 'react';
import styles from './Checkout.module.css'
import {useFormik} from 'formik';
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
const Checkout = () => {
    const [showDifferentAddress, setShowDifferentAddress] = useState(false);
    const  [subTotal, setSubTotal] = useState(0)
    const shipping = 1;
    const { products } = useSelector((state) => state.cartProducts);


    useEffect(()=>{
        const cartSubTotal = products.reduce((acc, product) => {

            return acc + product.totalPrice ;
            }, 0);
            setSubTotal(cartSubTotal)

    }, [products])

    const handleCheckboxChange = () => {
        setShowDifferentAddress(!showDifferentAddress);
      };
      const onSubmit = (values, actions) => {
        actions.resetForm();
    };


      console.log(products);
    const checkOutSchema = yup.object().shape({
          email: yup.string().email("Please Enter a valid email!").required("Required!"),
          phone: yup.string().matches(/^(?=.*[0-9])/, "Invalid number").min(11,"Invalid phone number").required("Required!"),
          floor_number: yup.string().min(3,"Min length is 3!").required("Required!"),
          apartment_number: yup.string().min(3,"Min length is 3!").required("Required!"),
          street_name: yup.string().min(3,"Min length is 3!").required("Required!"),
          district: yup.string().min(3,"Min length is 3!").required("Required!"),
          city: yup.string().min(3,"Min length is 3!").required("Required!"),
      })

      const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            user_name: "",
            floor_number: "",
            apartment_number: "",
            street_name: "",
            district: "",
            city: ""
        },
        validationSchema: checkOutSchema,
        onSubmit
    });

    return ( 
        <Fragment >
            <header>
			    <h1>Checkout</h1>
            </header>
            <div className={styles.whiteSpace}></div>
            <div className={`${styles.container} ${styles.checkout} container`}>
                    <div className={`${styles.row} row`}>
                            <form onSubmit={formik.handleSubmit}  className='row'>
                                <div className={`col-md-7`}>
                                        <h3 className={styles.topborder}>
                                            <span>Billing Details</span>
                                        </h3>
                                        <div className={`${styles.width50} ${styles.padright}`}>
                                            <label htmlFor="email">Email Address</label>
                                            <input value={formik.values.email} onChange={formik.handleChange} id="email" onBlur={formik.handleBlur} type="text" name="email"/>
                                            {(formik.errors.email && formik.touched.email) && <p className={styles.errorMessage}>{formik.errors.email}</p>}
                                            
                                        </div>
                                        <div className={styles.width50}>
                                            <label htmlFor="tel">Phone</label>
                                            <input value={formik.values.phone} onChange={formik.handleChange} id="tel" onBlur={formik.handleBlur} type="text" name="phone"/>
                                            {(formik.errors.phone && formik.touched.phone) && <p className={styles.errorMessage}>{formik.errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="notes" className={styles.notes}>
                                                Order Notes
                                            </label>
                                            <textarea name="notes" id="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                        </div>  
                                                        
                                        <h3 className={styles.topborder}>
                                            <span>Shipping Address</span>
                                        </h3>
                                        {!showDifferentAddress &&
                                            <div>  
                                                <label htmlFor="my_address">Choose one of your addresses</label>
                                                <select name="my_address" id="my_address">
                                                    <option value="not-canada">Not Canada</option>
                                                </select>
                                            </div>
                                        }
                                      
                                      <div> 
                                      <input 
                                           type="checkbox"
                                           name="new_address"
                                           id="new_address"
                                           checked={showDifferentAddress}
                                           onChange={handleCheckboxChange}

                                        />
                                        <label style={{}} className={styles.new_address} htmlFor="new_address">Have Different Address?</label>
                                        
                                      </div>
                                        <br/>
                                        <br/>
                                        {showDifferentAddress && (
                                            <div className={`${styles.different_address}`}>
                                                <div className={`${styles.width50} ${styles.padright}`}>
                                                    <label htmlFor="floor">Floor Number</label>
                                                    <input type="text" name="floor" id="floor" placeholder="Floor" />
                                                </div>
                                                <div className={`${styles.width50}`}>
                                                    <label htmlFor="apartment">Apartment Number</label>
                                                    <input type="text" name="apartment" id="apartment" placeholder="Apartment"/>
                                                </div>
                                              
                                                <div className={`${styles.width50} ${styles.padright}`}>
                                                    <label htmlFor="street">Street Name</label>
                                                    <input type="text" name="street" id="street" />
                                                </div>
                                                <div className={`${styles.width50}`}>
                                                <label htmlFor="street_number">Street No.</label>
                                                <input type="text" name="street_number" id="street_number" />
                                                </div>
                                                <div className={``}>
                                                    <label htmlFor="district">District</label>
                                                    <input type="text" name="district" id="district" placeholder="District"/>
                                                </div>
                                                <div className={``}>
                                                    <label htmlFor="city">Town / City</label>
                                                    <input type="text" name="city" id="city"/>
                                                </div>
                                            </div>
                                        )}
                                        
                                    </div>
                                <div className={`${styles.order} col-md-5`}>
                                    <h3 className={styles.topborder}>
                                    <span>Your Order</span>
                                    </h3>
                                    <div className={styles.row}>
                                        <h4 className={`${styles.inline}`}>Product</h4>
                                        <h4 className={`${styles.inline} ${styles.alignright}`}>Total</h4>
                                    </div>

                                    <div>
                                    {products && (
                                        products.map((product)=>(
                                            <div className={styles.cartProducts} key={product.data.id}>
                                                <p className={`${styles.prodDescription} ${styles.inline}`}>{product.data.name}
                                                    <div className={`${styles.qty} ${styles.inline}`}><span className={styles.smalltxt}>x </span>{product.qty}</div>
                                                </p>
                                                <p className={`${styles.inline} ${styles.alignright}`}>$ {product.totalPrice}</p>
                                            </div>
                                                               
                                        ))

                                    )}
                                    </div>
                                    <div className='row'>
                                        <h5 style={{paddingLeft: '10px'}} className='col-md-6' >Cart Subtotal</h5>
                                        <h4 style={{textAlign: 'right'}} className='col-md-6'>$ {subTotal}</h4>
                                         
                                    </div>
                                    
                                    <div>
                                    <h5 className={`${styles.inline} ${styles.difwidth}`}>Shipping and Handling</h5>
                                    <p className={`${styles.inline} ${styles.alignright} ${styles.center}`}>Free Shipping</p>
                                    </div>
                                    <div className='row'> 
                                        <h5 style={{paddingLeft: '10px'}} className='col-md-6' >Order Total</h5>
                                        <h4 style={{textAlign: 'right'}} className='col-md-6'>$ {subTotal * shipping}</h4>
                                    
                                    </div>

                                    <div>
                                    <h3 className={styles.topborder}><span>Payment Method</span></h3>
                                        <input id="banktransfer" type="radio" value="banktransfer" name="payment" checked />
                                        <label htmlFor="banktransfer" className={`${styles.banktransfer} p-2`}>
                                            Pay using your bank card
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <input id="cash" type="radio" value="cheque" name="payment" />
                                        <label htmlFor="cash" className={`${styles.cash} p-2`}> Cash</label>
                                    </div>
                                    <Button className='mt-4' type="submit">Proceed</Button>
                                </div>
                        </form>
                        </div>
                        
                    </div>
      
        </Fragment>
     );
}
 
export default Checkout;