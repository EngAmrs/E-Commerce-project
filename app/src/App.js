import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Main/Home'
import NavbarCom from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Shop from './Components/Shop/Shop';
import Cart from './Components/Cart/Cart';
import { Fragment } from 'react';
import Checkout from './Components/Orders/Checkout/Checkout';
function App() {
  return (
    <Fragment>  
      <Router>
          <NavbarCom/>
          <Routes>
          <Route path="/test" element={<Checkout />} />
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
