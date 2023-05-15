import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../forms/Form';
import classes from './MainNavigation.module.css';

function MainNavigation() {
    const [formIsShown, setformIsShown] = useState(false);

    const showFormHandler = ()=> {
      setformIsShown(true); 
    }
  
    const hideFormHandler = ()=> {
      setformIsShown(false);
    }
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
                to="?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
        
              {formIsShown && <Form onHideLogin={hideFormHandler}/>}
              <button onClick={showFormHandler}>Sign In</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
