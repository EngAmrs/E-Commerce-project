import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './Checkout.module.css'
import {useFormik} from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses } from '../../../Redux/Slices/Order/getAddressSlice'
import { addNewAddress } from '../../../Redux/Slices/Order/setNewAddressSlice';
import { createOrder } from '../../../Redux/Slices/Order/createOrderSlice';
import { redirect, useLoaderData, useNavigate } from 'react-router';
import {Button, Modal, Row } from 'react-bootstrap';
import { deleteProduct} from "../../../Redux/Slices/Cart/deleteFromCartSlice";
import formattedCurrency from '../../UI/Currency';
import { paymentCard } from '../../../Redux/Slices/Order/PaymentSlice'
import axios from 'axios';
const Checkout = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDifferentAddress, setShowDifferentAddress] = useState(false);
    const  [subTotal, setSubTotal] = useState(0)
    const {payment} = useSelector((state) => state.paymentCard);
    const navigate = useNavigate();
    const shipping = 0;
    const { products } = useSelector((state) => state.userCart);
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.orderUserAddress);
    const {newOrder, orderStatus } = useSelector((state) => state.createNewOrder);
    const {newAddress, status } = useSelector((state) => state.setNewAddress);
    
    // Order requeirements
    const selectionRef = useRef('');
    const [paymentMethod, setPaymentMethod] = useState('VISA');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');


    

    
    const handleOpenModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

    // Check out schema
    const onSubmitOrder = async(values, actions) => {
        setNote(values.description)
        setPhone(values.phone);
        if(paymentMethod === "VISA"){
           await dispatch(paymentCard())
        }
        handleOpenModal();
        actions.resetForm();
    };

    const confirmOrder = async ()=>{
        const data = {
            address: selectionRef.current.value,
            phone: "+2" + phone,
            payment_method: paymentMethod,
            note: note,
        }

        if(paymentMethod === 'CASH'){
           dispatch(createOrder({
                'phone': data.phone,
                'note': data.note,
                'address': data.address,
                'payment_method': data.payment_method,
             }));

            if(newOrder){
                products.forEach((e)=>{
                    dispatch(deleteProduct(e.itemId));
    
                })
                navigate('/orderiscreated')
            }
        
        }else if(paymentMethod === 'VISA')
            localStorage.setItem('orderData', JSON.stringify(data));
            window.location.href = payment
    }
    const checkOutSchema = yup.object().shape({
        email: yup.string().email("Please Enter a valid email!").required("Required!"),
        phone: yup.string().matches(/^01[0-9]*$/, "Invalid number").min(11,"Invalid phone number").max(11, 'Invalid phone number').required("Required!"),
        description: yup.string().min(5,"Must be more than 5").max(500,"Must be less than 500"),
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

    }, [dispatch, newAddress, newOrder, payment])
    

    useEffect(()=>{
        if(products.length === 0)
             navigate('/shop')

        const cartSubTotal = products.reduce((acc, product) => {

            return acc + +product.totalPrice ;
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
           
            <div className={`${styles.container} ${styles.checkout} container`}>
                    <header>
                        <h1>Check Out</h1>
                    </header>
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
                                            <label htmlFor="tel">Phone (Egypt Only)</label>
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
                                                    <p className={`${styles.inline} ${styles.alignright}`}>{formattedCurrency.format(product.totalPrice)}</p>
                                                </div>
                                                                
                                            ))

                                        )}
                                        </div>
                                        <div className='row'>
                                            <h5 style={{paddingLeft: '10px'}} className='col-md-6' >Cart Subtotal</h5>
                                            <h4 style={{textAlign: 'right'}} className='col-md-6'>{formattedCurrency.format(subTotal)}</h4>
                                            
                                        </div>
                                        
                                        <div>
                                        <h5 className={`${styles.inline} ${styles.difwidth}`}>Shipping and Handling</h5>
                                        <p className={`${styles.inline} ${styles.alignright} ${styles.center}`}>Free Shipping</p>
                                        </div>
                                        <div className='row'> 
                                            <h5 style={{paddingLeft: '10px'}} className='col-md-6' >Order Total</h5>
                                            <h4 style={{textAlign: 'right'}} className='col-md-6'>{formattedCurrency.format(subTotal + shipping)}</h4>
                                        
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="VISA"
                                                value="VISA"
                                                name="payment"
                                                checked={paymentMethod === 'VISA'}
                                                onChange={handlePaymentChange}
                                            />
                                            <label htmlFor="VISA" className={`${styles.banktransfer} p-2`}>
                                                Pay using your bank card
                                            </label>
                                            </div>
                                                <div>
                                                <input
                                                    type="radio"
                                                    id="CASH"
                                                    value="CASH"
                                                    name="payment"
                                                    checked={paymentMethod === 'CASH'}
                                                    onChange={handlePaymentChange}
                                                />
                                                <label htmlFor="casCASHh" className={`${styles.cash} p-2`}>
                                                    Cash
                                                </label>
                                        </div>
                                        <Button className='mt-4' type="submit" form="Form1">Proceed</Button>
                                    </div>
                                </div>                    
                            </div>

      <Modal 
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName={styles.confirmCart}
        contentClassName={`${styles.confirmCartContent}`}
        size={'lg'}
        >
        
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Address:</h3>
          {(() => {
            const foundAddress = addresses.addresses.find((address) => {
                return address.id === parseInt(selectionRef.current.value);
            });

            if (foundAddress) {
                return (
                <div className={`${styles.address} row`}>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >Street name:</span> {foundAddress.street_name}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span>Street no:</span> {foundAddress.street_no}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >Government:</span> {foundAddress.government}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >District:</span> {foundAddress.district}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >House no:</span> {foundAddress.house_no}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >Apartment no:</span> {foundAddress.apartment_no}
                    </p>
                    <p className={`${styles.tit} col-md-6`}>
                    <span >Floor no:</span> {foundAddress.floor_no}
                    </p>
                    {foundAddress.additional_info ? (
                    <p className={`${styles.tit} col-md-6`}>
                        <span >Additional info:</span> {foundAddress.additional_info}
                    </p>
                    ) : (
                    <p className={`${styles.tit} col-md-6`}>
                        <span >Additional info:</span> No additional info
                    </p>
                    )}
                </div>
                );
            }

            return null; // Address not found, return null or handle it accordingly
            })()}
          <br/>
          <h3>Payment Method:</h3>
          <p>{paymentMethod}</p>
          <br/>
        
          <h3>Phone Number:</h3>
          <p>{phone}</p>
          <br/>
          <h3>Notes:</h3>
          <p>{note}</p>               
                                 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={confirmOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      
        </Fragment>
     );
}
 
export default Checkout;