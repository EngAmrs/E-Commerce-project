import React, {Fragment, useEffect, useState} from 'react';
import Header from './Header/Header';
import Categories from './Categories/Categories';
import style from './Shop.module.css'
import ProductItems from './Products/ProductItems/ProductItems';
import Loader from '../Loader/Loader';
const Shop = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous operation
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);
    return ( 
        
        <Fragment>
            {loading ? <Loader /> : ''}
            <div>
                <Header/>
                <div className={`${style.container} container`}>
                    <div className={`${style.main} row`}>
                        <Categories/>      
                        <ProductItems/>
                    </div>
                </div>
            </div>
        </Fragment>
        

     );
}
 
export default Shop;