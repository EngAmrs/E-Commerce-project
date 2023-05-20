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
import ProductDetails from "../Shop/Products/ProductDetails/ProductDetails";

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

    // Search Logic // 

    // Open
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const fetchData = async () => { 
            try {
                if(searchTerm){
                    const response = await fetch(`http://127.0.0.1:8000/product/search?key=${searchTerm}&limit=10&page=1`);
                    const data = await response.json();
                    setSearchResults(data);
                }
                else if (searchTerm === ''){
                    setSearchResults('');

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    };

    useEffect(() => {    
            fetchData();
        
      }, [searchTerm]);
      const [showSearchModal, setShowSearchModal] = useState(false);



      const [selectedProduct, setSelectedProduct] = useState(null);

      const handleProductCli = (product) => {
        setSelectedProduct(product);
        setShowSearchModal(true);
      };
  
      const handleCloseCli = () => {
          setSelectedProduct(null);
          setShowSearchModal(false);
        };

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
                        <LinkContainer to="/about">
                            <Nav.Link >About</Nav.Link>
                        </LinkContainer>

                        <Nav.Link to="home">Contact</Nav.Link>
                    
                    </Nav>
                    <div className="search_res_par">
                    {isSearchOpen && (
                            <div className="search-input">
                                <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search" />
                            </div>
                        )}
                        <ul className="search_res">
                            {searchResults.results && searchResults.results.map((result) => (
                                <li onClick={() => handleProductCli(result)}   key={result.id}>{result.name}</li>
                            ))}
                        </ul>
                    </div>
                    <Nav className="nav_icons">
                       
                        <Nav.Link> 
                            <div className="" onClick={toggleSearch}>
                            <FaSearch fill={'#555'} />
                            </div>
                        </Nav.Link>


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


            {showSearchModal && selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    onCloseModal={handleCloseCli}
                    show ={showSearchModal}
                />
    )}  
        </>

     );
}
 
export default NavbarCom;

  