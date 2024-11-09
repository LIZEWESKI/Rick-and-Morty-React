import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link} from 'react-router-dom'
import Logo from "../assets/logo-brand.png"
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import "./Header.css"
const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 668px)' });

  return (
    <header>
      <div className="header_ls">
        <Link to=".">
          <img src={Logo} alt="logo" className='header_logo' />
        </Link>
      </div>
      {!isMobile ? <DesktopNavbar/> :<MobileNavbar/>}
    </header>
  )
}

export default Header