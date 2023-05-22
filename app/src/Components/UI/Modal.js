import React from "react";
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';


const BackDrop = (props) => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModelOverlay = (props) => {
    
    return  <div className={classes.modelLayer}>
                <div className={classes.modal}>
                    <div className={classes.content}>{props.children}</div>
                </div>
            </div>
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <>
        {ReactDOM.createPortal(<BackDrop  onClick={props.onClick}/>, portalElement)}
        {ReactDOM.createPortal(<ModelOverlay  className={props.className}>{props.children}</ModelOverlay>, portalElement)}
    </>
}

export default Modal;