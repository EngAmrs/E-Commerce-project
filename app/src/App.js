import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home/Main/Home'
import NavbarCom from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Shop from './Components/Shop/Shop';
import Cart from './Components/Cart/Cart';
import { Fragment } from 'react';
import Checkout from './Components/Orders/Checkout/Checkout';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = true;
  const { products } = useSelector((state) => state.cartProducts);
  const cartCheck = (component) => {
      if(!isAuthenticated)  return <Navigate to="/login" />;

      if(products.length === 0)
          return <Navigate to="/shop" />;
      else
          return component      
  };

  return (
    <Fragment>  
      <Router>
          <NavbarCom/>
          <Routes>
          <Route path="/checkout" element={cartCheck(<Checkout />)} />
            <Route path="/home" element={<Home />} />
            <Route element={<Shop />}>
              <Route path="/shop" />
              <Route path="/shop/:id"/>
          </Route>
            <Route path="/" element={<Home />} />       
          <Route path="/test" element={<Cart />} />
          </Routes>
          <Footer/>
      </Router>
    </Fragment>
  );
}

export default App;
