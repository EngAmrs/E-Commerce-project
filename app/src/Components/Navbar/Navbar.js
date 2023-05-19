import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaRegHeart } from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar,} from 'react-bootstrap';
import './Navbar.css'
import Cart from "../Cart/Cart";
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import VisitorCart from "../Cart/visitorCart/VisitorCar";
import { fetchUserCart } from "../../Redux/Slices/Cart/userCartSlice";

const NavbarCom = () => {

    // Auth
    const token = useRouteLoaderData('root');
    console.log(token);
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [scrolled, setScrolled] = useState(false);
    const { visitorProducts } = useSelector((state) => state.cartProducts);
    const { products} = useSelector((state) => state.userCart);
    const [showModal, setShowModal] = useState(false);
    const { updatedCart } = useSelector((state) => state.updateCart);
    const { newproduct } = useSelector((state) => state.addtoCart);
    
    // Handle Cart
    useEffect(()=>{ 
      let cartData = JSON.parse(localStorage.getItem('AROACart'));
      if(cartData === null){
            localStorage.setItem('AROACart', JSON.stringify([]));
            cartData = JSON.parse(localStorage.getItem('AROACart'));
      }

      dispatch(setProducts(cartData));
      dispatch(fetchUserCart());
    }, [dispatch, updatedCart, newproduct])

    // Handle Scroll
    // useEffect(() => {
    //   const handleScroll = () => {
    //     const isScrolled = window.scrollY > 25;
    //     if (isScrolled !== scrolled) {
    //         setTimeout(()=>{
    //         setScrolled(isScrolled);
    //     }, 150)
    //     }
    //   };
    //   document.addEventListener("scroll", handleScroll);
    //   return () => {
    //     document.removeEventListener("scroll", handleScroll);
    //   };
    // }, [scrolled]);



    /***  Cart ***/

    // Cart On click
    const handleProductClick = () => {
        setShowModal(true);
    };

    // Cart On close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Render Cart under Navbar
    const cartRender = ()=>{

        if(token){
            if (showModal){
                return <Cart
                    onCloseCart={handleCloseModal}
                    showCart ={showModal}
                    />
            }      
       }else{
        if (showModal){
            return <VisitorCart
                onCloseCart={handleCloseModal}
                showCart ={showModal}
                />
        } 
       }
      
    }


console.log(products.length);

    return (   
        <>  
            {/* Cart */}
            {cartRender()}

            {/* Header */}
            <div id="header" className={`navbar-fixed-top ${scrolled ? "scrolledHeader" : ""} `}>
                <Container>
                    <p>Free shipping for standard order over $100</p>
                    <ul className="account-options">
                    {token && 
                            (<li>
                                <NavLink
                                    to="/userProfile?mode=profile"
                                    >My Account</NavLink>
                            </li>
                        )}

                        {!token && 
                            (<li>
                                <NavLink
                                    className="signIn-btn"
                                    to="/auth?mode=login"
                                    >Sign in</NavLink>
                            </li>
                        )}
                        <li>EN</li>
                        <li>EGP</li>
                        {token && 
                            <li>
                            <Form action="/logout" method='post'>
                                <button>Logout</button>
                            </Form>
                            </li>
                        }
                    </ul>
                </Container>
            </div>

            {/* Navbar */}
            <Navbar className={`navbar-fixed-top ${scrolled ? "scrolled" : ""} navbar`} collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><span>A</span>ROA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto links">
                        <LinkContainer to="/">
                                <Nav.Link className={(navData) => (navData.isActive ? "active" : 'none')}>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/shop">
                            <Nav.Link className={(navData) => (navData.isActive ? "active" : 'none')}>Shop</Nav.Link>
                        </LinkContainer>
                        <Nav.Link to="home">About</Nav.Link>
                        <Nav.Link to="home">Contact</Nav.Link>
                    
                    </Nav>
                    <Nav className="nav_icons">
                        {!token && visitorProducts &&
                             <Nav.Link  data-notify={visitorProducts.length} onClick={handleProductClick}><FaShoppingCart fill={'#555'}/></Nav.Link>
                        }
                        {token && products &&
                             <Nav.Link  data-notify={products.length} onClick={handleProductClick}><FaShoppingCart fill={'#555'}/></Nav.Link>
                        }                  
                        <Nav.Link ><FaRegHeart fill={'#555'}/></Nav.Link>
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