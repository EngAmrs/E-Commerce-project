import {Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from "react-redux";
import style from './Cart.module.css'
import { useEffect} from 'react';
import { setProducts } from "../../Redux/Slices/Cart/CartProductsSlice";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const Cart = (props) => {
  const imageUrl = 'http://localhost:8000/'
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state) => state.cartProducts
  );
    useEffect(()=>{
      const cartData = JSON.parse(localStorage.getItem('AROACart'));
      dispatch(setProducts(cartData));

    }, [dispatch])


    const handleDelete = (id)=>{
      const cartData = JSON.parse(localStorage.getItem('AROACart'));
      const productIndex = cartData.findIndex((item) => item.data.id === id);
      cartData.splice(productIndex, 1);
      localStorage.setItem('AROACart', JSON.stringify(cartData));
      dispatch(setProducts(cartData));
    }

    const emptyCart = ()=>{
        if(!products || products.length === 0)
          return <p className={style.emptyCart}>The cart is empty</p>
      }
    
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
        products.map((product) => (
          <div className={`${style.item} row`} key={product.data.id}>
              <div className={`${style.buttons} col-md-1 row`}>
                <span onClick={()=> { handleDelete(product.data.id)}} className={style.delete_btn}><RiDeleteBin5Fill fill={'red'} size={'20'}/></span>
              </div>
              <div className={`${style.image} col-md-3`}>
                  <img width={110} height={75} src={`${imageUrl}${product.data.productPic}`} alt={product.data.name} />
              </div>

              <div className={`${style.description} col-md-3`}>
                <span>{product.data.name}</span>
              </div>

              <div className={`${style.quantity} col-md-2`}>
                  <select  className="form-control" name="select">
                      <option value="" disabled selected>QTY</option>
                      
                    </select>
              </div>
              <div className={`${style.total_price} col-md-2`}>$ {product.totalPrice}</div>     
        </div>
      ))
    }
    {emptyCart()}
    { products && products.length > 0 &&
      <div className={`${style.checkout_btns}`}>
        <Link className={style.check}>
          <Button className={`${style.check_out}`}>Check Out</Button>
        </Link>
        <Link to="/shop" className={style.shopping}>
          <Button className={`${style.continue_shopping} `}>Continue Shopping</Button>
        </Link>

      </div>
  }
    </Modal.Body>
  </Modal>
</>
         
        
     );
}
 
export default Cart;

