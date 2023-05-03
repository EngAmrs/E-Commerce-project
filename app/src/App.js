import React , {useState} from 'react';
import Login from './Components/forms/LogIn';

function App() {
  const [logInIsShown, setLogInIsShown] = useState(false);

  const showLoginHandler = ()=> {
    setLogInIsShown(true);
  }

  const hideLoginHandler = ()=> {
    setLogInIsShown(false);
  }

  return (
   <>
    {logInIsShown && <Login onHideLogin={hideLoginHandler}/>}
    <button onClick={showLoginHandler}>Sign In</button>
    {/* <Login/> */}
   </>
  );
}

export default App;
