import React from "react";
import { Container, Row } from "react-bootstrap";
import classes from './MainScreen.module.css';

function MainScreen({ children, title }) {
  return (
    <div className={classes.mainback}>
      <Container>
        <Row>
          <div className={classes.page}>
            {title && (
              <>
                <h1 className={classes.heading}>{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;