import {Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from "react-redux";
import style from './Cart.module.css'
import { useEffect} from 'react';
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";
import { RiDeleteBin5Fill } from 'react-icons/ri';
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
    <div className={`${style.item} row`}>
        <div className={`${style.buttons} col-md-1 row`}>
          <span  className={style.delete_btn}><RiDeleteBin5Fill fill={'red'} size={'20'}/></span>
        </div>
        <div className={`${style.image} col-md-3`}>
          <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
        </div>

        <div className={`${style.description} col-md-3`}>
          <span>Common Projects</span>
        </div>

        <div className={`${style.quantity} col-md-2`}>
            <select  className="form-control" name="select">
                <option value="" disabled selected>QTY</option>
                
              </select>
        </div>
        <div className={`${style.total_price} col-md-2`}>$549</div>
      </div>
    </Modal.Body>
  </Modal>
</>
         
        
     );
}
 
export default Cart;

