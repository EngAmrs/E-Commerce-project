import React  from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products'
import AuthForm from './pages/Form';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'auth', element: <AuthForm/> },
      {path: 'products', element: <ProductsPage/>}
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
