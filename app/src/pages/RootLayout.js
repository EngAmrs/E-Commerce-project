import {Outlet} from 'react-router-dom';

import  NavbarCom from '../Components/Navbar/Navbar'
import  Footer from '../Components/Footer/Footer'

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
