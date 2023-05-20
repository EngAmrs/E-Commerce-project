import React, {Fragment, useEffect, useState} from 'react';
import CarouselCom from '../Carousel/Carousel'
import style from './Home.module.css'
import Categories from '../MainCategories/Categories';
import BestSellers from '../BestSellers/BestSellers';
import GetOffer from '../GetOffer/GetOffer';
import Loader from '../../Loader/Loader';
const Home = () => {
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
                <div className={style.home}>
                    <CarouselCom/>
                    <Categories/>
                    <GetOffer/>
                    <BestSellers/>
                </div>        
        </Fragment>

     );
}
 
export default Home;