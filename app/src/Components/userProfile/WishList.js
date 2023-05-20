import React from "react";
// import style from './WishList.module.css';
import { Card, Col, Row, Button} from 'react-bootstrap';
import { redirect, useLoaderData, useNavigate } from "react-router";
import { getAuthToken } from "../../util/auth";
import style from '../Shop/Products/ProductItems/ProductItemts.module.css';
import { BsHeart } from 'react-icons/bs';

const WishList = () => {
    const wishListItems = useLoaderData();
    const navigate = useNavigate();
    const token = getAuthToken();
    // console.log("ana items",wishListItems);
    const handleRemoveItem = (productId) => {
        fetch(`http://localhost:8000/wishlist/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to remove product to wishlist');
          }
          console.log('removed successfully')
          navigate('/userProfile?mode=wishlist')

        })
        .catch(error => {
          console.error(error);
        });
    }
    return (
      // <div className={`${style.container}`}>
      <div id={style.cards_landscape_wrap_2} className='col-md-9'>
        <div className={`${style.container} container`}></div>
          <div className="row">
            {/* {wishListItems.map(item => (
              <Col key={item.product.id} xs={12} sm={6} md={4} lg={3}>
                <Card className={`${style.product_card}`}>
                  <Card.Img variant="top" src={item.product.productPic} alt={item.product.name} />
                  <Card.Body>
                    <Card.Title>{item.product.name}</Card.Title>
                    <Card.Text>${item.product.price}</Card.Text>
                    <Card.Text>{item.product.avgRating} stars</Card.Text>
                    <Card.Text>Quantity: {item.product.quantity}</Card.Text>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))} */}
            {   wishListItems.map((product)=> (
                            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={product.product.id}>
                                <div className={style.card_flyer}>
                                    <div className={style.text_box}>
                                        <div className={style.image_box}>
                                        {/* <img onClick={() => onProductClick(product)} src={`${imageUrl}${product.product.productPic}`} alt={product.product.name} /> */}
                                        </div>
                                        <div className={`${style.text_container}`}>
                                            <span>{product.product.name}</span>
                                            {/* <span><BsHeart/></span> */}
                                            <span className={style.spanButton}>{product.product.price}$</span> 
                                            <div  className="d-flex justify-content-center align-items-center">
                                              <span className={style.spanButton}><Button variant="danger" onClick={() => handleRemoveItem(product.id)}>Remove</Button></span>  
                                            </div>

                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
          </div>
        
      </div>
  );
    
};

export default WishList;