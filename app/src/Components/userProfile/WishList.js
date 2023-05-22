import React, { useEffect, useState } from "react";
// import style from './WishList.module.css';
import { Card, Col, Row, Button} from 'react-bootstrap';
import { redirect, useLoaderData, useNavigate } from "react-router";
import { getAuthToken } from "../../util/auth";
import style from '../Shop/Products/ProductItems/ProductItemts.module.css';
import { BsHeart } from 'react-icons/bs';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../Redux/Slices/Wishlist/DeleteItems";
import ProductDetails from "../Shop/Products/ProductDetails/ProductDetails";

const WishList = () => {
    const dispatch = useDispatch();
    const wishListItems = useLoaderData();
    const [items, setItems] = useState(wishListItems)
    const {DeletedProduct} = useSelector((state) => state.deleteFromWishlist); 
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(()=>{
      setItems(wishListItems)
    },[DeletedProduct, wishListItems])

    const handleRemoveItem = async(productId) => {
      await dispatch(deleteItem(productId));
      const productIndex = items.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        const updatedItems = [...items]; // Create a copy of the items array
        updatedItems.splice(productIndex, 1); // Modify the copy
        setItems(updatedItems); // Update the state with the modified copy
      }
    };

    const handleProductClick = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
      };

    console.log(items);
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
            {wishListItems &&  items.map((product)=> (
                            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={product.product.id}>
                                <div className={style.card_flyer}>
                                    <div className={style.text_box}>
                                        <div className={style.image_box}>
                                         <img onClick={() => handleProductClick(product.product)} src={`${product.product.productPic}`} alt={product.product.name} /> 
                                        </div>
                                        <div className={`${style.text_container}`}>
                                            <span>{product.product.name}</span>
                                            {/* <span><BsHeart/></span> */}
                                            <span >{product.product.price}$</span> 
                                            <span className={style.spanButton}><Button variant="danger" onClick={() => handleRemoveItem(product.id)}>Remove</Button></span>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
            {showModal && selectedProduct && (
              <ProductDetails
                  product={selectedProduct}
                  onCloseModal={handleCloseModal}
                  show ={showModal}
              />
        )}
          </div>
        
      </div>
  );
    
};

export default WishList;