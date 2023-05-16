import React, {Fragment} from 'react';
import CarouselCom from '../Carousel/Carousel'
import style from './Home.module.css'
import Categories from '../MainCategories/Categories';
import BestSellers from '../BestSellers/BestSellers';
import GetOffer from '../GetOffer/GetOffer';
const Home = () => {
    return ( 
        
        <Fragment>
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