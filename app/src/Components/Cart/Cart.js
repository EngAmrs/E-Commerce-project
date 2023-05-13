import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from "react-redux";
import style from './Cart.module.css'
import { useEffect, useState } from 'react';
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state) => state.cartProducts
  );
    useEffect(()=>{
      const cartData = JSON.parse(localStorage.getItem('AROACart'));
      dispatch(setProducts(cartData));

    }, [])
    return ( 
<>
  <Modal
    className={`${style.cartModal1} ${props.showCart ? 'modal-open' : 'modal_closed'}`}
    show={props.showCart}
    onHide={props.onCloseCart}
    dialogClassName={style.modalDialog}
    contentClassName={`${style.modalContent}`}
  >
    <Modal.Header closeButton>
      <Modal.Title>Cart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      { products &&
        products.map((product)=>(
          <div>
            <p>{product.data.id}</p>
            <p>{product.qty}</p>
          </div>
        ))

      }
    </Modal.Body>
  </Modal>
</>
         
        
     );
}
 
export default Cart;

