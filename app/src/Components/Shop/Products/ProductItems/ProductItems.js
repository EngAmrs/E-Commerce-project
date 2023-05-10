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

const ProductItems = () => {
    // productImage url
    const { id } = useParams();
    
    const test = ()=>{
        if(!id)
            return <AllProducts />
        else{
           return <CategorizedProducts categoryId={id} />
        }
    }
    return(
        // <CategorizedProducts/>
        <>
        {test()}
        </>
    );
}
 
export default ProductItems;