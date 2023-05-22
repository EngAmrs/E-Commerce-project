import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import {NavLink, useSearchParams} from 'react-router-dom';
import styles from './MainScreen.module.css';
import { BsEmojiHeartEyes, BsHearts } from "react-icons/bs";
import { RiShoppingBag2Line, RiUserLocationLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

function MainScreen({ children, title }) {
  const [isActive, setisActive] = useState(false)
  const [searchParams] = useSearchParams();
  const profileMode = searchParams.get('mode');

  
  return (

    <div className={styles.container}>
      <div className={'row'}>
        <div className="col-md-3">
          <div className={styles['profile-sidebar']}>
            <div className={styles['profile-usermenu']}>
              <ul className="nav row">
              <NavLink to='/userProfile?mode=profile' className={profileMode === 'profile' ? styles.active : undefined
              }>
                <li>           
                 <FaUser/>
                  <a href="#">
                    Overview
                  </a>
                </li>
              </NavLink>
              <NavLink to='/userProfile?mode=address' className={profileMode === 'address' ? styles.active : undefined }>
                <li>           
                 <RiUserLocationLine/>
                  <a href="#">
                    Addresses
                  </a>
                </li>
              </NavLink>
              <NavLink to='/userProfile?mode=orders' className={ profileMode === 'orders' ? styles.active : undefined
              }>
                <li>           
                 <RiShoppingBag2Line/>
                  <a href="#">
                    Orders
                  </a>
                </li>
              </NavLink>
              <NavLink to='/userProfile?mode=wishlist' className={profileMode === 'wishlist' ? styles.active : undefined
              }>
                <li>           
                 <BsHearts/>
                  <a href="#">
                    Wish List
                  </a>
                </li>
              </NavLink>
               
              </ul>
            </div>
          </div>
        </div>
        <div style={{margin: '1em 0' }} className="col-md-8">
        {children}
        </div>
      </div>
    </div>














    // <div className={classes.mainback}>
    //   <Container>
    //     <Row>
    //       <div className={classes.page}>
    //         <div className="d-flex w-50 mx-auto justify-content-evenly fs-3">
    //           <NavLink to='/userProfile?mode=profile' className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }>Profile</NavLink>

    //           <NavLink to='/userProfile?mode=address' className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }>Address</NavLink>

    //           <NavLink to='/userProfile?mode=orders' className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }>Orders</NavLink>
    //           <NavLink to='/userProfile?mode=wishlist' className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }>Wish List</NavLink>


    //           {/* <NavLink to>Orders</NavLink> */}
    //         </div>
    //         <hr/>
    //         {children}
    //       </div>
    //     </Row>
    //   </Container>
    // </div>
  );
}

export default MainScreen;