import React, {Fragment} from 'react';
import CarouselCom from '../Carousel/Carousel'
import style from './Home.module.css'
import Categories from '../MainCategories/Categories';
const Home = () => {
    return ( 
        
        <Fragment>
            <div className={style.home}>
            <CarouselCom/>
            <Categories/>
            </div>
        </Fragment>

     );
}
 
export default Home;