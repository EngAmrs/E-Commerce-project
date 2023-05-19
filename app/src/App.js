import React  from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './Components/Home/Main/Home';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Orders/Checkout/Checkout';
import UserProfilePage, {action as userProfileAction, loader as addressLoader} from './pages/UserProfile'
import AuthForm, {action as authAction} from './pages/Form';
import {action as logoutAction} from './pages/Logout';
import {checkAuthLoader, tokenLoader} from './util/auth';
import Success from './Components/Orders/PaymentStatus/Success';
import NotFound from './Components/NotFound/NotFound';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    id: 'root',
    loader: tokenLoader,
    children: [
      {index: true, element: <Home/>},
      {path: 'auth', element: <AuthForm/>, action: authAction },
      {path: 'shop', element: <Shop/> },
      {path: 'shop/:id', element: <Shop/> },
      {path: 'checkout', element: <Checkout/>, loader: checkAuthLoader},
      {path: 'userProfile', element: <UserProfilePage/>, loader: addressLoader, action: userProfileAction},
      {path: 'logout', action:logoutAction},
      {path: '*', element: <NotFound/>, loader: checkAuthLoader,  hidden: true},
    ]
  },
  {path: 'orderiscreated', element: <Success/>, loader: checkAuthLoader,  hidden: true},
  

])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
