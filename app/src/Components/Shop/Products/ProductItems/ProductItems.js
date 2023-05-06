import style from './ProductItemts.module.css'
import './Style.css'
import {Button} from 'react-bootstrap';
import { BsHeartFill } from "react-icons/bs";
import Pagination from 'react-bootstrap/Pagination';
import { useState } from 'react';

const ProductItems = () => {

    /*
    *
    * Start Pagination 
    * 
    */
    const [activePage, setActivePage] = useState(1);
    const totalPages = 10;

    const handleClick = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <=   totalPages)
            setActivePage(pageNumber);
    };

    const renderPages = () => {
      const pages = [];  
      // Render 5 pages at a time
      const startPage = Math.max(1, activePage - 1);
      const endPage = Math.min(totalPages, activePage + 1);
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === activePage}
            onClick={() => handleClick(i)}
            className={style['page-link']}
          >
            {i}
          </Pagination.Item>     
        );
      }

      if(activePage > totalPages - 2){
        pages.pop();
        pages.push(
            <>
            <Pagination.Item
             key={totalPages}
             active={totalPages === activePage}
             onClick={() => handleClick(totalPages)}
             className={style['page-link']}
            >{totalPages}</Pagination.Item>
            </>
          )
      }else{
      pages.push(
        <>
        <Pagination.Ellipsis />
        <Pagination.Item
         key={totalPages}
         active={totalPages === activePage}
         onClick={() => handleClick(totalPages)}
         className={style['page-link']}
        >{totalPages}</Pagination.Item>
        </>
      )
      }
      return pages;
    };

   /*
    *
    * End Pagination 
    * 
    */

    return ( 

        <div id={style.cards_landscape_wrap_2} className='col-md-9'>
        <div className={`${style.container} container`}>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={require("../../../../assets/Home/banner-01.jpg")} alt="" />
                                </a>
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

        {/* Pagination */}
        <div className={style.pagination}>
            <Pagination>
                <Pagination.First onClick={()=> {setActivePage(1)}}className={style['page-link']} />
                <Pagination.Prev onClick={() => handleClick(activePage - 1)} className={style['page-link']} />
                {renderPages()}
                <Pagination.Next onClick={() => handleClick(activePage + 1)} className={style['page-link']} />
                <Pagination.Last onClick={()=> {setActivePage(totalPages)}} className={style['page-link']} />
            </Pagination>
        </div>
        </div>

  
        </div>
     );
}
 
export default ProductItems;