import React  from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './Components/Home/Main/Home';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Orders/Checkout/Checkout';
import UserProfilePage from './pages/UserProfile'
import AuthForm, {action as authAction} from './pages/Form';
import {action as logoutAction} from './pages/Logout';
import {checkAuthLoader, tokenLoader} from './util/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    id: 'root',
    loader: tokenLoader,
    children: [
      {index: true, element: <Home/>},
      {path: 'shop', element: <Shop/> },
      {path: 'shop/:id', element: <Shop/> },
      {path: 'checkout', element: <Checkout/>, loader: checkAuthLoader},
      {path: 'auth', element: <AuthForm/>, action: authAction },
      {path: 'userProfile', element: <UserProfilePage/>, loader: checkAuthLoader},
      {path: 'logout', action:logoutAction}
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
