import React, {Fragment} from 'react';
import Header from './Header/Header';
import Categories from './Categories/Categories';
import style from './Shop.module.css'
import ProductItems from './Products/ProductItems/ProductItems';
const Shop = () => {
    return ( 
        
        <Fragment>
            <Header/>
            <div className={`${style.container} container`}>
                <div className='row'>
                    <Categories/>
                    <ProductItems/>
                </div>
            </div>
        </Fragment>

     );
}
 
export default Shop;