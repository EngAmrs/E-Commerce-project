import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './Checkout.module.css'
import {useFormik} from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchUserAddresses } from '../../../Redux/Slices/Order/getAddressSlice'
import { addNewAddress } from '../../../Redux/Slices/Order/setNewAddressSlice';
import { createOrder } from '../../../Redux/Slices/Order/createOrderSlice';
import { useNavigate } from 'react-router';

const Checkout = () => {
    const [showDifferentAddress, setShowDifferentAddress] = useState(false);
    const  [subTotal, setSubTotal] = useState(0)
    const navigate = useNavigate();
    const shipping = 1;
    const { products } = useSelector((state) => state.cartProducts);
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.orderUserAddress);
    const {newAddress, status } = useSelector((state) => state.setNewAddress);
    // Order requeirements
    const selectionRef = useRef();
    const [paymentMethod, setPaymentMethod] = useState('banktransfer');

    

    // Check out schema
    const onSubmitOrder = (values, actions) => {
        dispatch(createOrder({
            'phone':values.phone,
            'note':values.description,
            'address_id':selectionRef.current.value,
            'payment_method':paymentMethod,
        }));

        actions.resetForm();
    };
    const checkOutSchema = yup.object().shape({
        email: yup.string().email("Please Enter a valid email!").required("Required!"),
        phone: yup.string().matches(/^(?=.*[0-9])/, "Invalid number").min(11,"Invalid phone number").required("Required!"),
        description: yup.string().min(5,"Must be more than 3").max(500,"Must be less than 500"),
        payment: yup.string().min(3,"Must be more than 3").max(100,"Must be less than 100"),
    })

    const checkOutFormik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            description: "",
            payment: ""
        },
        validationSchema: checkOutSchema,
        onSubmit: onSubmitOrder
    })


    // Add new Address

    const handleStatus = ()=>{
        if(status === 'succeeded'){
            return <p style={{color: 'green'}}>Address is added successfully!</p>
        }
    }
    
    const onSubmitAddress = (values, actions) => {
        dispatch(addNewAddress(values));
        actions.resetForm();
        setShowDifferentAddress(false)

    };
    const addressSchema = yup.object().shape({
        street_name: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
        street_no: yup.string().max(10,"Max length is 10!").required("Required!"),
        government: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
        district: yup.string().min(2,"Min length is 2!").max(100,"Max length is 100!").required("Required!"),
        house_no: yup.string().max(10,"Max length is 10!").required("Required!"),
        apartment_no: yup.string().max(10,"Max length is 10!").required("Required!"),
        floor_no: yup.string().max(10,"Max length is 10!").required("Required!"),
        additional_info: yup.string().max(500,"Must be less than 500"),
        
    })

    const addressFormik = useFormik({
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
        onSubmit: onSubmitAddress
    });


    // get Addresses
    useEffect(()=>{
        dispatch(fetchUserAddresses())
    }, [dispatch, newAddress])
    

    useEffect(()=>{
        if(products.length === 0)
             navigate('/shop')

        const cartSubTotal = products.reduce((acc, product) => {

            return acc + product.totalPrice ;
            }, 0);
            setSubTotal(cartSubTotal)

    }, [products])

     // Push JSX options
     const qtyOptions = ()=>{
        const selections = []
        if(addresses){                        
            for(let i = 0; i < addresses.addresses.length; i++){
                if(i === addresses.addresses.length - 1){
                    selections.push(<option key={addresses.addresses[i].id} selected value={addresses.addresses[i].id}>{`${addresses.addresses[i].id} - ${addresses.addresses[i].government}`}</option>)
                }
                else
                    selections.push(<option key={addresses.addresses[i].id} value={addresses.addresses[i].id}>{`${addresses.addresses[i].id} - ${addresses.addresses[i].government}`}</option>)
                }
        }
        return selections;
       
      }

    const handleCheckboxChange = () => {
        setShowDifferentAddress(!showDifferentAddress);
      };

      const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
      };

    return ( 
        <Fragment >
            <header>
			    <h1>Checkout</h1>
            </header>
            <div className={styles.whiteSpace}></div>
            <div className={`${styles.container} ${styles.checkout} container`}>
                    <div className={`${styles.row} row`}>
                                <div className={`col-md-7`}>
                                    <form id="Form1" onSubmit={checkOutFormik.handleSubmit}  className='row'>

                                        <h3 className={styles.topborder}>
                                            <span>Billing Details</span>
                                        </h3>
                                        <div className={`${styles.width50} ${styles.padright}`}>
                                            <label htmlFor="email">Email Address</label>
                                            <input value={checkOutFormik.values.email} onChange={checkOutFormik.handleChange} id="email" onBlur={checkOutFormik.handleBlur} type="text" name="email"/>
                                            {(checkOutFormik.errors.email && checkOutFormik.touched.email) && <p className={styles.errorMessage}>{checkOutFormik.errors.email}</p>}
                                            
                                        </div>
                                        <div className={styles.width50}>
                                            <label htmlFor="tel">Phone</label>
                                            <input value={checkOutFormik.values.phone} onChange={checkOutFormik.handleChange} id="tel" onBlur={checkOutFormik.handleBlur} type="text" name="phone"/>
                                            {(checkOutFormik.errors.phone && checkOutFormik.touched.phone) && <p className={styles.errorMessage}>{checkOutFormik.errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="notes" className={styles.notes}>
                                                Order Notes
                                            </label>
                                            <textarea value={checkOutFormik.values.description} onChange={checkOutFormik.handleChange} onBlur={checkOutFormik.handleBlur} name="description" id="description" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                            {(checkOutFormik.errors.description && checkOutFormik.touched.description) && <p className={styles.errorMessage}>{checkOutFormik.errors.description}</p>}
                
                                        </div>  
                                                        
                                        <h3 className={styles.topborder}>
                                            <span>Shipping Address</span>
                                        </h3>
                                        <div>  
                                            <label htmlFor="my_address">Choose one of your addresses</label>
                                            <select ref={selectionRef} className="form-control" name="select">
                                                <option value="" disabled selected>Choose Address</option>
                                                    {qtyOptions()}
                                                </select>
                                        </div>
                                    
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
                                    </form>                            
                                        <br/>
                                        <br/>
                                        {handleStatus()}
                                        {/* New address */}
                                        {showDifferentAddress && (
                                            <form id="Form2" onSubmit={addressFormik.handleSubmit}>
                                                    <div className={`${styles.width50} ${styles.padright}`}>
                                                        <label htmlFor="floor_no">Floor Number</label>
                                                        <input value={addressFormik.values.floor_no} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="floor_no" id="floor_no" placeholder="Floor" />
                                                        {(addressFormik.errors.floor_no && addressFormik.touched.floor_no) && <p className={styles.errorMessage}>{addressFormik.errors.floor_no}</p>}
                                                    </div>
                                                    <div className={`${styles.width50}`}>
                                                        <label htmlFor="apartment">Apartment Number</label>
                                                        <input value={addressFormik.values.apartment_no} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="apartment_no" id="apartment_no" placeholder="Apartment"/>
                                                        {(addressFormik.errors.apartment_no && addressFormik.touched.apartment_no) && <p className={styles.errorMessage}>{addressFormik.errors.apartment_no}</p>}
                                                    </div>
                                                    <div className={`${styles.width50}  ${styles.padright}`}>
                                                        <label htmlFor="house_no">House Number</label>
                                                        <input value={addressFormik.values.house_no} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="house_no" id="house_no" placeholder="Apartment"/>
                                                        {(addressFormik.errors.house_no && addressFormik.touched.house_no) && <p className={styles.errorMessage}>{addressFormik.errors.house_no}</p>}
                                                    </div>
                                                    <div className={`${styles.width50} `}>
                                                        <label htmlFor="street_name">Street Name</label>
                                                        <input value={addressFormik.values.street_name} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="street_name" id="street_name" />
                                                        {(addressFormik.errors.street_name && addressFormik.touched.street_name) && <p className={styles.errorMessage}>{addressFormik.errors.street_name}</p>}
                                                    </div>
                                                    <div className={`${styles.width50}  ${styles.padright}`}>
                                                        <label htmlFor="street_no">Street No.</label>
                                                        <input value={addressFormik.values.street_no} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="street_no" id="street_no" />                                                    
                                                        {(addressFormik.errors.street_no && addressFormik.touched.street_no) && <p className={styles.errorMessage}>{addressFormik.errors.street_no}</p>}
                                                    </div>
                                                    <div className={`${styles.width50}`}>
                                                        <label htmlFor="district">District</label>
                                                        <input value={addressFormik.values.district} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="district" id="district" placeholder="District"/>
                                                        {(addressFormik.errors.district && addressFormik.touched.district) && <p className={styles.errorMessage}>{addressFormik.errors.district}</p>}
                                                    </div>
                                                    <div className={``}>
                                                        <label htmlFor="government">Town / City</label>
                                                        <input value={addressFormik.values.government} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} type="text" name="government" id="government"/>
                                                        {(addressFormik.errors.government && addressFormik.touched.government) && <p className={styles.errorMessage}>{addressFormik.errors.government}</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="notes" className={styles.notes}>Additional Info</label>
                                                        <textarea value={addressFormik.values.additional_info} onChange={addressFormik.handleChange} onBlur={addressFormik.handleBlur} name="additional_info" id="additional_info" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                                        {(addressFormik.errors.additional_info && addressFormik.touched.additional_info) && <p className={styles.errorMessage}>{addressFormik.errors.additional_info}</p>}
                                                        </div>  
                                                <Button className='mt-4' type="submit">Add Address</Button>
                                            </form>
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
                                            <input
                                                type="radio"
                                                id="banktransfer"
                                                value="banktransfer"
                                                name="payment"
                                                checked={paymentMethod === 'banktransfer'}
                                                onChange={handlePaymentChange}
                                            />
                                            <label htmlFor="banktransfer" className={`${styles.banktransfer} p-2`}>
                                                Pay using your bank card
                                            </label>
                                            </div>
                                                <div>
                                                <input
                                                    type="radio"
                                                    id="cash"
                                                    value="cash"
                                                    name="payment"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={handlePaymentChange}
                                                />
                                                <label htmlFor="cash" className={`${styles.cash} p-2`}>
                                                    Cash
                                                </label>
                                        </div>
                                        <Button className='mt-4' type="submit" form="Form1">Proceed</Button>
                                    </div>
                                </div>                    
                            </div>
      
        </Fragment>
     );
}
 
export default Checkout;