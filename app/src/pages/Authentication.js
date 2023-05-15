import React , {useState} from 'react';
import Form from "../Components/forms/Form";

function AuthenticationPage() {
    const [formIsShown, setformIsShown] = useState(false);
    
        const showFormHandler = ()=> {
          setformIsShown(true); 
        }
      
        const hideFormHandler = ()=> {
          setformIsShown(false);
        }
    return <>
        {formIsShown && <Form onHideLogin={hideFormHandler}/>};
    </>
}

export default AuthenticationPage;