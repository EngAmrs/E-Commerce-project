import React from 'react';
import styles from './About.module.css';

const About = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.description}>
      In our computer science program at ITI, we have a diverse group of talented students who are passionate about technology and eager to pursue their careers in the field of computer science.

      </p>
      <p className={styles.description}>
      These students are dedicated and hardworking, constantly pushing their boundaries to expand their knowledge and skills. They have a strong foundation in programming languages, algorithms, and data structures. Their enthusiasm for problem-solving and analytical thinking sets them apart.

      </p>
      <div className={`${styles.imageContainer} row`}>
            <img src={require("../../assets/Team/1683789561503.jpeg")} alt="About" className={`${styles.image} col-md-3`} />
            <img src={require("../../assets/Team/1665162500328.jpeg")} alt="About" className={`${styles.image} col-md-3`} />
            <img src={require("../../assets/Team/321189502_238414365439443_6005200883186527167_n.jpg")} alt="About" className={`${styles.image} col-md-3`} />
            <img src={require("../../assets/Team/340781572_3453731918239134_1164565369547272369_n.jpg")} alt="About" className={`${styles.image} col-md-3`} />
        </div>
    </div>
  );
};

export default About;
