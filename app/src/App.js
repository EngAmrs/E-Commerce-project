import React , {useState} from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './Components/forms/Form';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>
  }
])

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
