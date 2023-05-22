import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaRegHeart } from "react-icons/fa";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar,} from 'react-bootstrap';
import './Navbar.css'
import Cart from "../Cart/Cart";
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, NavLink, useLoaderData, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import VisitorCart from "../Cart/visitorCart/VisitorCar";
import { fetchUserCart } from "../../Redux/Slices/Cart/userCartSlice";
import ProductDetails from "../Shop/Products/ProductDetails/ProductDetails";
import { getAuthToken } from "../../util/auth";
import { debounce } from 'lodash';
const NavbarCom = () => {

    // Auth
    const token = getAuthToken();
    const dispatch = useDispatch();
    const imageUrl = 'http://localhost:8000/'
    // eslint-disable-next-line no-unused-vars
    const [scrolled, setScrolled] = useState(false);
    const { visitorProducts} = useSelector((state) => state.cartProducts);
    const { products} = useSelector((state) => state.userCart);
    const [showModal, setShowModal] = useState(false);
    const { updatedCart } = useSelector((state) => state.updateCart);
    const { newproduct } = useSelector((state) => state.addtoCart);
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('AROACart')))
    const [searchParams] = useSearchParams();
    const [wishList,setWishList] = useState('');
    const {wishlistProduct} = useSelector((state) => state.addToWishlist); 
    const {DeletedProduct} = useSelector((state) => state.deleteFromWishlist); 
    
    const isLogin = searchParams.get('mode');



    useEffect(()=>{
        // Wishlist
        fetch('http://localhost:8000/wishlist/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            })
            .then(res => res.json()) // Parse the response body as JSON
            .then(data => {
                setWishList(data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request
                console.error('Error:', error);
            });
    }, [wishlistProduct, DeletedProduct])


    // Search Logic // 

    // Open
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [islogOut, setIslogOut] = useState(false);


    const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
    };
    const [searchResults, setSearchResults] = useState([]);
    
    const debouncedSearch = debounce((searchTerm) => {
        fetchData(searchTerm)
      }, 600); 
  
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        debouncedSearch(searchTerm);
    };
  
    const fetchData = async (searchTerm) => { 
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
            setCartData(JSON.parse(localStorage.getItem('AROACart')))
        
      }, [islogOut, isLogin]);
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
      if(cartData === null){
            localStorage.setItem('AROACart', JSON.stringify([]));
            setCartData(JSON.parse(localStorage.getItem('AROACart')));
      }

      dispatch(setProducts(cartData));
      if(token)
        dispatch(fetchUserCart());
    }, [dispatch, updatedCart, newproduct, cartData])

 
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
                                <button onClick={()=> {setIslogOut(!islogOut)}} className="logoutNav">Logout</button>
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
                        <LinkContainer to="/contact">
                            <Nav.Link to="home">Contact</Nav.Link>

                        </LinkContainer>

                    
                    </Nav>
                    <div className="search_res_par">
                    {isSearchOpen && (
                            <div className="search-input">
                                <input type="text" onChange={handleInputChange} placeholder="Search" />
                            </div>
                        )}
                        <ul className="search_res">
                            {searchResults.results && searchResults.results.map((result) => (
                                <li className="row" onClick={() => handleProductCli(result)}   key={result.id}>
                                    <div style={{marginRight: '10px'}} className="col-md-4">
                                        <img  height={50} width={60} src={`${imageUrl}${result.productPic}`} />
                                    </div>
                                    <p className="col-md-5">{result.name}</p>

                                </li>
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

                    <Nav.Link data-notify={wishList.length || 0}>
                      <Link to={{ pathname: '/userProfile', search: '?mode=wishlist' }}>
                                <FaRegHeart fill={'#555'} />
                        </Link>
                    </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 


            {showSearchModal && selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    onCloseModal={handleCloseCli}
                    show ={showSearchModal}
                    pr={setCartData}
                />
    )}  
        </>

     );
}
 
export default NavbarCom;

  