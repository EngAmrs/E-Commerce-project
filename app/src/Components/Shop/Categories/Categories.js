import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import { fetchCategories } from '../../../Redux/Slices/CategoriesSlice'
import React, { useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux";
import './Categories.css'
const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);
  

      useEffect(() => {
        dispatch(fetchCategories());
      }, [dispatch]);
        console.log(categories);

    return ( 

        <div className="col-md-3">
            <div className="card mb-4">
                <div className={`card_header card-header`}>Categories</div>
                <ul className="list-group list-group-flush">
                    {categories.map((category) => 
                        <LinkContainer to={`/shop/${category.id}`} key={category.id}>
                        <Link activeClassName={`active`} className="list-group-item list-group-item-action">{category.title} (13)</Link>
                        </LinkContainer>
                    )}
                   
                    {/* <LinkContainer to="/categories/1">
                        <Link  activeClassName={`active`} className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer>
                    <LinkContainer to="/categories/1">
                        <Link activeClassName={`active`} className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer>
                    <LinkContainer to="/shop">
                        <Link activeClassName={`actived`} className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer>
                    <LinkContainer to="/categories/1">
                        <Link activeClassName="active" className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer>
                    <LinkContainer to="/categories/1">
                        <Link activeClassName="active" className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer> */}
                </ul>
                    <p className={`load_more`}>Load more</p>
            </div>
        </div>


     );
}
 
export default Categories;