import React, {Fragment} from 'react';
import CarouselCom from '../Carousel/Carousel'
import style from './Home.module.css'
const Home = () => {
    return ( 
        
        <Fragment>
            <div className={style.home}>
            <CarouselCom/>
            </div>
        </Fragment>

     );
}
 
export default Home;