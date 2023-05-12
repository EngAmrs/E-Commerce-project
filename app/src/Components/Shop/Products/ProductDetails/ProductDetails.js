import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import style from './ProductDetails.module.css';
import {BsHeart, BsHeartFill} from 'react-icons/bs'
function ProductDetails({ show, onCloseModal ,product }) {

    const imageUrl = 'http://localhost:8000/'
    const qtyOptions = ()=>{
        const selections = []
        if(product.quantity >= 10){
            for(let i = 1; i <= 10; i++){
                selections.push(<option>{i}</option>)
              }
        }
        else{
            for(let i = 1; i <= product.quantity; i++){
                selections.push(<option>{i}</option>)
              }
        }
        return selections;
    }

  return (
    <>
      <Modal size="xl" show={show} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={` ${style.modal_body} row`}>
            <div className="col-lg-6 col-sm-12 product_img">
              <img
                src={`${imageUrl}${product.productPic}`} 
                className="img-responsive"
                alt="product"
                width={500}
                height={500}
              />
            </div>
            <div className={` ${style.product_content} col-lg-6 col-sm-12`}>
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
                  <select className="form-control" name="select">
                    <option value="" disabled selected>QTY</option>
                    {qtyOptions()}
                  </select>
                </div>
                <div className='row'>
                <Button className={`${style.add_to_cart} col-sm-10 `}>Add to Cart</Button>  
                <Button className={`${style.add_to_fav} col-sm-1 `}><BsHeart size="18" /></Button>
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
