import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Main/Home'
import NavbarCom from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Shop from './Components/Shop/Shop';
function App() {
  return (
    <>    
    <Router>
    <NavbarCom />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route element={<Shop />}>
            <Route path="/shop" />
            <Route path="/shop/:id"/>
         </Route>
          <Route path="/" element={<Home />} />          
        </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
