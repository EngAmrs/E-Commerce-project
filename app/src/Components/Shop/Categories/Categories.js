import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import './Categories.css'
const Categories = () => {

    return ( 

        <div className="col-md-3">
            <div className="card mb-4">
                <div className={`card_header card-header`}>Categories</div>
                <ul className="list-group list-group-flush">
                    <LinkContainer to="/categories/1">
                        <Link activeClassName={`active`} className="list-group-item list-group-item-action">Desktops (13)</Link>
                    </LinkContainer>
                    <LinkContainer to="/categories/1">
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
                    </LinkContainer>
                </ul>
                    <p className={`load_more`}>Load more</p>
            </div>
        </div>


     );
}
 
export default Categories;