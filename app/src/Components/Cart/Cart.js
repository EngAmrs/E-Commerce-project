import {Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from "react-redux";
import style from './Cart.module.css'
import { useEffect, useState} from 'react';
import { fetchUserCart} from "../../Redux/Slices/Cart/userCartSlice";
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { addProductToCart } from '../../Redux/Slices/Cart/AddToCartSlice';
import { deleteProduct} from "../../Redux/Slices/Cart/deleteFromCartSlice";



const Cart = (props) => {
    const imageUrl = 'http://localhost:8000/'
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.userCart);
    const { deletedProduct } = useSelector((state) => state.deleteFromCart);
    const { newproduct } = useSelector((state) => state.addtoCart);

    const token = useRouteLoaderData('root');
    

    useEffect(()=>{
      dispatch(fetchUserCart());
    },[dispatch, deletedProduct, newproduct])
    
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
          let cartData = JSON.parse(localStorage.getItem('AROACart'));
          dispatch(setProducts(cartData));
        } else {
          let cartData = JSON.parse(localStorage.getItem('AROACart'));
          
          if (cartData ===null || cartData.length === 0) return;
          
        }
    
        
      };
    
      fetchData();
    }, [token]);
    
    useEffect(() => {     
       
      const processCartData = async () => {
        if (!token || !products) return;
    
        let cartData = JSON.parse(localStorage.getItem('AROACart'));
        if (cartData === null) return;
          
          if(status === 'succeeded'){
            for (let i = 0; i < cartData.length; i++) {
              let test = products.findIndex((e) => e.data.id === cartData[i].data.id)
              if (test >= 0) continue;
        
              dispatch(addProductToCart({ product: cartData[i].data.id, quantity: cartData[i].qty }));
            }
            localStorage.removeItem('AROACart');
        }
      };
    
      processCartData();
      
    }, [dispatch, products, token, status]);

    // Handle pptions selections
    const handleSelectChange = (event, data) => {
      const selectedValue = parseInt(event.target.value);
      const cartData = JSON.parse(localStorage.getItem('AROACart'));
      const currentItem = cartData.findIndex(e => e.data.id === data.data.id);
      if (cartData[currentItem] && selectedValue <= 10) {
        cartData[currentItem].qty = selectedValue;
        cartData[currentItem].totalPrice = cartData[currentItem].qty * data.data.price;
        localStorage.setItem('AROACart', JSON.stringify(cartData));
        // Force the component to re-render to update the displayed total price
        dispatch(setProducts(cartData));
        setProducts(cartData)
      } 
    };

    // Delete items
    const handleDelete = (id, itemId)=>{
      if(!token){
        const cartData = JSON.parse(localStorage.getItem('AROACart'));
        const productIndex = cartData.findIndex((item) => item.data.id === id);
        cartData.splice(productIndex, 1);
        localStorage.setItem('AROACart', JSON.stringify(cartData));
        dispatch(setProducts(cartData));
      }else{
        dispatch(deleteProduct(itemId));

      }
    }
   

    // Push JSX options
    const qtyOptions = (quantity, qty)=>{
      const selections = []
      if(quantity >= 10){
          for(let i = 1; i <= 10; i++){
            
            if(qty === i){
              selections.push(<option selected   value={i}>{i}</option>)
            }
            else
              selections.push(<option value={i}>{i}</option>)
            
            }
      }
      else{
          for(let i = 1; i <= quantity; i++){
            if(qty === i)
              selections.push(<option selected value={i}>{i}</option>)
            else
              selections.push(<option value={i}>{i}</option>)
          
            }
      }
        return selections;
    }


    const emptyCart = ()=>{
      if(!products || products.length === 0)
        return <p className={style.emptyCart}>The cart is empty</p>
    }
    console.log("test", products);
    return ( 
      <>
        <Modal
          className={`${style.cartModal1} ${props.showCart ? 'modal-open' : 'modal_closed'}`}
          show={props.showCart}
          onHide={props.onCloseCart}
          dialogClassName={style.modalDialog}
          contentClassName={`${style.modalContent}`}>

          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            { products &&
              products.map((product) => (
                <div className={`${style.item} row`} key={product.data.id}>
                    <div className={`${style.buttons} col-md-1 row`}>
                      <span onClick={()=> { handleDelete(product.data.id, product.itemId)}} className={style.delete_btn}><RiDeleteBin5Fill fill={'red'} size={'20'}/></span>
                    </div>
                    <div className={`${style.image} col-md-3`}>
                        <img width={110} height={75} src={`${imageUrl}${product.data.productPic}`} alt={product.data.name} />
                    </div>

                    <div className={`${style.description} col-md-3`}>
                      <span>{product.data.name}</span>
                    </div>

                    <div className={`${style.quantity} col-md-2`}>
                    <select onChange={(event) => handleSelectChange(event,product)} className="form-control" name="select">
                          <option value="" disabled selected>QTY</option>
                          {qtyOptions(product.data.quantity, product.qty)}
                        </select>
                    </div>
                    <div className={`${style.total_price} col-md-2`}>$ {product.totalPrice}</div>     
              </div>
            ))
          }

          {emptyCart()}

          { products && products.length > 0 &&
            <div className={`${style.checkout_btns}`}>
              <Link to='/checkout' onClick={props.onCloseCart} className={style.check}>
                <Button className={`${style.check_out}`}>Check Out</Button>
              </Link>
              <Link to="/shop" onClick={props.onCloseCart} className={style.shopping}>
                <Button className={`${style.continue_shopping} `}>Continue Shopping</Button>
              </Link>
            </div>
          }

          </Modal.Body>
        </Modal>
      </>
                        
      )}
 
export default Cart;