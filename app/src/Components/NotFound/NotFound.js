import styles from './NotFound.module.css'

const NotFound = () => {
    return ( 
        <div className={styles.container}>
            <span className={styles.left}>404</span>
            <br />
            <div className={styles.pulse}></div>
            <i className={`fas fa-heart  ${styles.heartIcon}`}></i>
            <span className={styles.right}>Are you lost?</span>
        </div>
     );
}
 
export default NotFound

;