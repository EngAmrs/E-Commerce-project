import { Button, Modal } from 'react-bootstrap';
import style from './ProductDetails.module.css';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../Redux/Slices/Cart/CartProductsSlice";
import {BsHeart} from 'react-icons/bs'
import {fetchUserCart} from '../../../../Redux/Slices/Cart/userCartSlice'
import { useRouteLoaderData } from 'react-router';
import { addProductToCart } from '../../../../Redux/Slices/Cart/AddToCartSlice';
import { updateUserCart } from '../../../../Redux/Slices/Cart/UpdateCartSlice';

function ProductDetails({ show, onCloseModal ,product }) {
  const token = useRouteLoaderData('root');
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.userCart);
  const { updatedCart } = useSelector((state) => state.updateCart);
  const imageUrl = 'http://localhost:8000/'
  const [selectedValue, setSelectedValue] = useState('');
  const  [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('AROACart')))
  
      useEffect(()=>{
        setCartData(JSON.parse(localStorage.getItem('AROACart')));
        dispatch(setProducts(cartData));
        dispatch(fetchUserCart())
  
      }, [dispatch, updatedCart])

      
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const submitProductToCart = (data) => {
      if(selectedValue === '') return
      if(token){
   
         dispatch(fetchUserCart())
        console.log('prods2',products);

          if(products.length === 0){
            dispatch(addProductToCart({ product: data.id, quantity: parseInt(selectedValue) }));
            
          }else{
           
            let productIndex = products.findIndex((e) => e.data.id === data.id)

            if(products[productIndex] && products[productIndex].qty + parseInt(selectedValue) <= 10){ 
                dispatch(updateUserCart({product: products[productIndex].data.id, quantity: products[productIndex].qty + parseInt(selectedValue), id: products[productIndex].itemId}))
  
            }else if (!products[productIndex]){
              dispatch(addProductToCart({ product: data.id, quantity: parseInt(selectedValue) }));

              

            }
          }
      }

      else{
          const cartData = JSON.parse(localStorage.getItem('AROACart'));
          if (!cartData) {
            localStorage.setItem('AROACart', JSON.stringify([{ data, qty: parseInt(selectedValue), totalPrice:  parseInt(selectedValue) * data.price}]));
            return
          }

          const CurrentItem = cartData.findIndex(e => e.data.id === data.id)
          if(cartData[CurrentItem] && cartData[CurrentItem].qty + parseInt(selectedValue) <= 10){  
              cartData[CurrentItem].qty += parseInt(selectedValue) 
              cartData[CurrentItem].totalPrice = cartData[CurrentItem].qty * data.price
              localStorage.setItem('AROACart', JSON.stringify(cartData));

          }else if (!cartData[CurrentItem]){
            cartData.push({ data, qty: parseInt(selectedValue), totalPrice:  parseInt(selectedValue) * data.price });
            localStorage.setItem('AROACart', JSON.stringify(cartData));
          }     
      } 
    };

    const qtyOptions = ()=>{
        const selections = []
        if(product.quantity >= 10){
            for(let i = 1; i <= 10; i++){
                selections.push(<option value={i}>{i}</option>)
              }
        }
        else{
            for(let i = 1; i <= product.quantity; i++){
                selections.push(<option value={i}>{i}</option>)
              }
        }
        return selections;
    }
    console.log('prods',products);
  return (
    <>
      <Modal
      size='xl'
        show={show}
        onHide={onCloseModal}
        dialogClassName={style.productModalDialog}
        contentClassName={style.productModalContent}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={` ${style.modal_body} row`}>
              <img
                src={`${imageUrl}${product.productPic}`} 
                className="img-responsive col-md-6"
                alt="product"
                height={500}
              />
            <div className={` ${style.product_content} col-md-6`}>
              <h5>
                Product ID: <span>{product.id}</span>
              </h5>
              <p className={style.description}>{product.description}</p>
              <h3 className={style.cost}>
                <span className="glyphicon glyphicon-usd"></span>{'$'} {product.price}
                <small className={style.pre_cost}>
                  <span className="glyphicon glyphicon-usd"></span> 60.00
                </small>
              </h3>
              <div className={`${style.action} row`}>
                <div className="col-sm-12 quantity">
                  <select onChange={handleSelectChange} className="form-control" name="select">
                    <option value="" disabled selected>QTY</option>
                    {qtyOptions()}
                  </select>
                </div>
                <div className='row'>
                <Button onClick={() => submitProductToCart({id:product.id, name:product.name, price:product.price, productPic:product.productPic, quantity: product.quantity})} className={`${style.add_to_cart} col-sm-10 `}>Add to Cart</Button>  
                <Button className={`${style.add_to_fav} col-sm-1 `}><BsHeart /></Button>
                </div>                                
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductDetails;