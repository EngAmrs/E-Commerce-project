import React , {useState} from 'react';
import Login from './Components/forms/LogIn';
import Form from './Components/forms/Form';

function App() {
  const [formIsShown, setformIsShown] = useState(false);

  const showFormHandler = ()=> {
    setformIsShown(true);
  }

  const hideFormHandler = ()=> {
    setformIsShown(false);
  }

  return (
   <>
    {formIsShown && <Form onHideLogin={hideFormHandler}/>}
    <button onClick={showFormHandler}>Sign In</button>
   </>
  );
}

export default App;
