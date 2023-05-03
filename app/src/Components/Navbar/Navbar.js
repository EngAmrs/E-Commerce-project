import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaRegHeart } from "react-icons/fa";
// Bootstrap
import {
        Container,
        Nav, Navbar,
    } from 'react-bootstrap';

import './Navbar.css'

const NavbarCom = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 25;
        if (isScrolled !== scrolled) {
            setTimeout(()=>{
            setScrolled(isScrolled);
        }, 150)
        }
      };
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }, [scrolled]);
    return (   
        <>  
            <div id="header" className={`navbar-fixed-top ${scrolled ? "scrolledHeader" : ""} `}>
                <Container>
                    <p>Free shipping for standard order over $100</p>
                    <ul className="account-options">
                        <li>My Account</li>
                        <li className="signIn-btn">Sign In</li>
                        <li>EN</li>
                        <li>USD</li>
                    </ul>
                </Container>
            </div>
            <Navbar className={`navbar-fixed-top ${scrolled ? "scrolled" : ""} navbar`} collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand to="home"><span>A</span>ROA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto links">
                        <Nav.Link className="activated" to="home">Home</Nav.Link>
                        <Nav.Link to={"s"}>Shop</Nav.Link>
                        <Nav.Link  to="home">Features</Nav.Link>
                        <Nav.Link to={"s"}>Blog</Nav.Link>
                        <Nav.Link to="home">About</Nav.Link>
                        <Nav.Link to="home">Contact</Nav.Link>

                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Features</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown> */}
                    
                    </Nav>
                    <Nav className="nav_icons">
                        <Nav.Link href="#deets"><FaSearch/></Nav.Link>
                        <Nav.Link href="#deets"><FaShoppingCart/></Nav.Link>
                        <Nav.Link href="#deets"><FaRegHeart/></Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
        </>

     );
}
 
export default NavbarCom;

            // {/* Modal Search  */}
            // {/* <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
            //     <button className="flex-c-m btn-hide-modal-search trans-04">
            //         <i className="zmdi zmdi-close"></i>
            //     </button>
    
            //     <form className="container-search-header">
            //         <div className="wrap-search-header">
            //             <input className="plh0" type="text" name="search" placeholder="Search...">
    
            //             <button className="flex-c-m trans-04">
            //                 <i className="zmdi zmdi-search"></i>
            //             </button>
            //         </div>
            //     </form>
            // </div> */}