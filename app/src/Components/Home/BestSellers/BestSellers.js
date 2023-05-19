import style from './BestSellers.module.css'
import {Button} from 'react-bootstrap';
import { BsHeartFill } from "react-icons/bs";
import { fetchCategories } from '../../../Redux/Slices/Shop/CategoriesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const BestSellers = () => {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategories({limit: 3, page: 1}))
    },[dispatch])
    console.log(categories);
    
    return ( 
        <div id={style.cards_landscape_wrap_2}>
        <div className={`${style.container} container`}>
        <h1>Best <span>Sellers</span></h1>
            <hr/>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <div className={style.card_flyer}>
                        <div className={style.text_box}>
                            <div className={style.image_box}>
                            <img src={require("../../../assets/Home/banner-01.jpg")} alt="" />
                            </div>
                            <div className={`${style.text_container} row`}>
                                <span className='col-sm-6'>dsadqw</span>
                                <span className='col-sm-6'>45.55$</span> 
                                <span className='col-sm-2'><BsHeartFill/></span>       
                                <Button href='' className={`col-sm-7 ${style.add_to_cart}`}>Add to Cart</Button>                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default BestSellers;