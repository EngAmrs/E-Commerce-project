import {Outlet} from 'react-router-dom';

import  NavbarCom from '../Components/Navbar/Navbar';
import  Footer from '../Components/Footer/Footer';
import { getAuthToken } from '../util/auth';

function RootLayout() {
  return (
    <>
      <NavbarCom/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default RootLayout;

export async function loader() {
  const token = getAuthToken();
  if(!token){
    return false
  }else {
    const response = await fetch('http://127.0.0.1:8000/account/user/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` 
    }, 
    })
    if(!response.ok){
      //...
    }else {
      const resData = await response.json();
      return resData;
    }
      
  }
}
