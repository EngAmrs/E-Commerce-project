import React, { useState } from "react";
import Modal from "../UI/Modal";
import Login from "./LogIn";
import Register from "./Register";

const Form = (props) => {
    const [view, setView] = useState("login");

    const viewLoginHandler = () => {
        setView("login");
    };

    const viewRegisterHandler = () => {
        setView("register");
    };

    return <Modal onClick={props.onHideLogin}>
        {view === "login" ? <Login onClick={props.onHideLogin} onViewHandler={viewRegisterHandler}/> : <Register onClick={props.onHideLogin} onViewHandler={viewLoginHandler}/>}
    </Modal>
};

export default Form;