import React, { useState } from "react";
import Modal from "../UI/Modal";
import Login from "./LogIn";
import Register from "./Register";
import { useSearchParams } from "react-router-dom";

const Form = (props) => {
    // const [view, setView] = useState("login");

    
    const [searchParams, setSearchParams] = useSearchParams();
    const isLogin = searchParams.get('mode');

    const viewLoginHandler = () => {
        setSearchParams({mode: 'login'});
    };
    
    const viewRegisterHandler = () => {
        console.log("sh8al");
        setSearchParams({mode: 'signup'});
    };


    return <Modal onClick={props.onHideLogin}>
        {isLogin === 'login' ? <Login onClick={props.onHideLogin} onViewHandler={viewRegisterHandler}/> : <Register onClick={props.onHideLogin} onViewHandler={viewLoginHandler}/>}
    </Modal>
};

export default Form;