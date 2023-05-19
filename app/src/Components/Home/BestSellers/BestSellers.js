import style from '../../Shop/Products/ProductItems/ProductItemts.module.css'
import styles from './BestSellers.module.css'

import {Button} from 'react-bootstrap';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { fetchAllProducts } from '../../../Redux/Slices/Shop/allProductsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import formattedCurrency from '../../UI/Currency';
import ProductDetails from '../../Shop/Products/ProductDetails/ProductDetails';


const BestSellers = ({onProductClick}) => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
    const imageUrl = 'http://localhost:8000/'
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
      };
    useEffect(()=>{
        dispatch(fetchAllProducts({limit: 3, page: 1}))
    },[dispatch])
    
    return ( 
        <>
        <div id={`${style.cards_landscape_wrap_2}`}>
        <div className={`${styles.container} container`}>
        <h1>Best <span>Sellers</span></h1>
            <hr/>
            <div className="row">
            {
                    products.map((product)=> (
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={product.id}>
                            <div className={style.card_flyer}>
                                <div className={style.text_box}>
                                    <div className={style.image_box}>
                                    <img onClick={() => handleProductClick(product)} src={`${imageUrl}${product.productPic}`} alt={product.name} />
                                    </div>
                                    <div className={`${style.text_container}`}>
                                        <span>{product.name}</span>
                                        <span><BsHeart/></span>       
                                        <span>{formattedCurrency.format(product.price)}</span> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }        
                
            </div>
        </div>
    </div>

    {showModal && selectedProduct && (
            <ProductDetails
                product={selectedProduct}
                onCloseModal={handleCloseModal}
                show ={showModal}
             />
        )}
    </>
     );
}
 
export default BestSellers;