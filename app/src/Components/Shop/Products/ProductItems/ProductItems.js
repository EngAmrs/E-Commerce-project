// import style from './ProductItemts.module.css'
// import './Style.css'
// import {Button} from 'react-bootstrap';
// import { BsHeartFill } from "react-icons/bs";
// import Pagination from 'react-bootstrap/Pagination';
// import { fetchProducts } from '../../../../Redux/Slices/ProductsSlice'
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';

import CategorizedProducts from '../CategorizedProducts/CategorizedProducts'
import AllProducts from '../AllProducts/AllProducts'
import { useState } from 'react';
import ProductDetails from '../ProductDetails/ProductDetails';

const ProductItems = () => {
    // productImage url
    const { id } = useParams();
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
    
    const test = ()=>{
        if(!id)
            return <AllProducts onProductClick={handleProductClick} />
        else{
           return <CategorizedProducts onProductClick={handleProductClick} categoryId={id} />
        }
    }
    return(
        // <CategorizedProducts/>
        <>
        {test()}
        {selectedProduct && (
            <ProductDetails 
                product={selectedProduct}
                onCloseModal={handleCloseModal}
                show ={showModal}
             />
        )}
  
        </>
    );
}
 
export default ProductItems;