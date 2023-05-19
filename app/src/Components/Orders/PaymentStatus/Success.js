
import { useEffect } from 'react';
import styles from './Success.module.css';
import { useNavigate } from 'react-router';


const Success = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/userProfile?mode=orders')

        }, 5000)
        
    
    })
    return ( 
        <>
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
        </>
     );
}
 
export default Success;