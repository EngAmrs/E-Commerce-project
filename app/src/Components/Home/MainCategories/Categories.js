import style from './Categories.module.css'
import { fetchCategories } from '../../../Redux/Slices/Shop/CategoriesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Categories = () => {
    const categories = useSelector((state) => state.categories.categories);
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(fetchCategories({limit: 3, page: 1}))
        },[dispatch])
    return ( 
        <>
        
        <div id={style.cards_landscape_wrap_2}>
        <div className={`${style.container} container`}>
            <div className="row">
                {categories.map((cat)=> (
                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4" key={cat.id}>
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                {cat.categoryPic &&
                                        <img src={require(cat.categoryPic)} alt="" />
                                    }
                                      {!cat.categoryPic &&
                                            <img src={require("../../../assets/Home/banner-01.jpg")} alt="" />
                                    }
                                </div>
                                <div className={style.text_container}>                                    
                                    <h6>{cat.name}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
     
            </div>
        </div>
    </div>

        
        </>

     );
}
 
export default Categories;