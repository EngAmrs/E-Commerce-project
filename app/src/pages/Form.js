import React, {useState} from "react";
import Modal from "../Components/UI/Modal";
import Login from "../Components/forms/LogIn"
import Register from "../Components/forms/Register"
import { useSearchParams, useNavigate } from "react-router-dom";


const AuthForm = (props) => {
    const [formIsShown, setformIsShown] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const isLogin = searchParams.get('mode');
    const navigate = useNavigate();

    // const showFormHandler = ()=> {
    //   setformIsShown(true); 
    // }
  
    const hideFormHandler = ()=> {
      setformIsShown(false);
      navigate('/');
    }


    const viewLoginHandler = () => {
        setSearchParams({mode: 'login'});
    };
    
    const viewRegisterHandler = () => {
        setSearchParams({mode: 'signup'});
    };


    return <Modal onClick={props.onHideLogin}>
            {formIsShown && isLogin === 'login' ? <Login onClick={hideFormHandler} onViewHandler={viewRegisterHandler}/> : <Register onClick={hideFormHandler} onViewHandler={viewLoginHandler}/>}
    </Modal>
};

export default AuthForm;