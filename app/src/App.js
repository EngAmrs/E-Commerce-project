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
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
