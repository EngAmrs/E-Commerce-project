import React  from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products'
import AuthForm, {action as authAction} from './pages/Form';
import {action as logoutAction} from './pages/Logout';
import {tokenLoader} from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    id: 'root',
    loader: tokenLoader,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'auth', element: <AuthForm/>, action: authAction },
      {path: 'products', element: <ProductsPage/>},
      {path: 'logout', action:logoutAction}

    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
