import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import Loader from '../Loader/Loader';

const Contact = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous operation
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);
  return (
    <>
      {loading ? <Loader /> : ''}
    
    <h2>Contact Us</h2>
    <div className={`${styles.contactPage}`}>
        
      <div className={`${styles.contactInfo } container`}>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod euismod faucibus. Morbi aliquet
          volutpat justo at convallis. Integer non bibendum lorem, a consequat lacus.
        </p>
        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <i className="fa fa-map-marker"></i>
            <p>123 Street, City, Country</p>
          </div>
          <div className={styles.contactItem}>
            <i className="fa fa-phone"></i>
            <p>+1 234 567 890</p>
          </div>
          <div className={styles.contactItem}>
            <i className="fa fa-envelope"></i>
            <p>contact@example.com</p>
          </div>
        </div>
      </div>
      <div className={styles.mapContainer}>
        {/* Insert your map component or embed code here */}
        <iframe
          src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
          width="100%"
          height="600"
          title="Map"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>      </div>
    </div>
    </>
  );
};

export default Contact;
