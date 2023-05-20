
import { useEffect, useState } from 'react';
import styles from './Success.module.css';
import { useNavigate } from 'react-router';
import { createOrder } from '../../../Redux/Slices/Order/createOrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct} from "../../../Redux/Slices/Cart/deleteFromCartSlice";


const Success = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.userCart);

    useEffect(()=>{
        const savedData = JSON.parse(localStorage.getItem('orderData'));
        const urlParams = new URLSearchParams(window.location.search);
        const stpValue = urlParams.get('stp');

        if(savedData && savedData.payment_method === "VISA" && stpValue){
            savedData.token = stpValue
            dispatch(createOrder(savedData))
            products.forEach((e)=>{
                dispatch(deleteProduct(e.itemId));
        
            })
            localStorage.removeItem('orderData');
        }
    setIsLoaded(true);
    setTimeout(()=>{
        navigate('/userProfile?mode=orders')

    }, 5000)
    },[isLoaded])

    return ( 
        <>
        {isLoaded &&
            <div className={styles.modal}>
            <div id={styles['success-icon']}>
                <div></div>
            </div>

            <h1><strong>Success!</strong></h1>
            <svg className={styles.progress} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 4.5">
                <rect height="4.5" width="100" rx="2" ry="2" />
            </svg>
            <p className={styles.points}>We will return you back within 5 seconds</p>
            <hr />
            <p className={styles.message}>Thanks for Shopping with us!</p>
            </div>
        }
        </>
     );
}
 
export default Success;