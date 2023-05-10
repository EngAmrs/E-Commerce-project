import style from '../ProductItems/ProductItemts.module.css'
import '../ProductItems/Style.css'
import {BsHeart } from "react-icons/bs";
import Pagination from 'react-bootstrap/Pagination';
import { fetchProducts } from '../../../../Redux/Slices/ShopSlices/ProductsSlice'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CategorizedProducts = (params) => {
    // productImage url
    const imageUrl = 'http://localhost:8000/'
    const id = params.categoryId;
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const categoriesCount = useSelector((state) => state.products.count);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [limit, setLimit] = useState(2);
    const [activePage, setActivePage] = useState(1);

    // Status from fech data 
    const fechStatus = ()=>{
        if(status === "loading"){
            return <p className={style.loading}>{status}</p>
        } else if(error){
            return <p className='failed'>Failed to get data, please try again!</p>
        }
    }
    const noProducts = ()=>{
        if(products.length === 0){
            return <p className={style.noProducts}>There are no products to show...</p>
        }
    }

    useEffect(() => {
        dispatch(fetchProducts({limit: limit, page: activePage, id: id}));
      }, [dispatch, limit, activePage, id]);
    /*
    *
    * Start Pagination 
    * 
    */
    
    const totalPages = Math.ceil(categoriesCount/limit);

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
            {fechStatus()}
            {noProducts()}
                {
                    products.map((product)=> (
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={product.id}>
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                <a href="">
                                    <img src={`${imageUrl}${product.productPic}`} alt={product.name} />
                                </a>
                                </div>
                                <div className={`${style.text_container}`}>
                                    <span>{product.name}</span>
                                    <span><BsHeart/></span>       
                                    <span>{product.price} $</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                }        
            </div>

        {/* Pagination */}
        <div style={{ display: products.length === 0 ? 'none' : '' }} className={style.pagination}>
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
 
export default CategorizedProducts;



