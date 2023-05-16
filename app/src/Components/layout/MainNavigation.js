import React , {useState} from 'react';
import { Form, NavLink, useNavigate, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
    const token = useRouteLoaderData('root');

    const [formIsShown, setformIsShown] = useState(false);
    const navigate = useNavigate();

    const showFormHandler = ()=> {
      setformIsShown(true); 
    }
  
    const hideFormHandler = ()=> {
      setformIsShown(false);
      navigate('/');
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
          {!token && 
           (<li>
              <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Sign in
              </NavLink>
            </li>
          )}
          
          {token && 
            <li>
              <Form action="/logout" method='post'>
                <button>Logout</button>
              </Form>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
