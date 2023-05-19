import React from "react";
import { Container, Row } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import classes from './MainScreen.module.css';

function MainScreen({ children, title }) {
  return (
    <div className={classes.mainback}>
      <Container>
        <Row>
          <div className={classes.page}>
            <div className="d-flex w-50 mx-auto justify-content-evenly fs-3">
              <NavLink to='/userProfile?mode=profile' className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>Profile</NavLink>

              <NavLink to='/userProfile?mode=address' className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>Address</NavLink>

              <NavLink to='/userProfile?mode=orders' className={({ isActive }) =>
                isActive ? classes.active : undefined
              }>Orders</NavLink>
            </div>
            <hr/>
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;