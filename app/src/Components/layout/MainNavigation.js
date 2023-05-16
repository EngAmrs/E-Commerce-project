import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root');
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
          {token && 
            <li>
              <NavLink
                to="/userProfile"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                User Profiel
              </NavLink>
            </li>
          }

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
