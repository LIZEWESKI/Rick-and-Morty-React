import React, { useState, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthProtection } from './AuthProvider';
import { CiMenuFries } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { MdLogout } from "react-icons/md";
const MobileNavbar = () => {
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthProtection)
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const [isTvShowsOpen, setIsTvShowsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prevState => !prevState);
  const toggleTvShows = () => setIsTvShowsOpen(prevState => !prevState);
  function handleLogOut(){
    setIsLoggedIn(false);
    window.location.reload()
  }
  return (
    <>
      <div className='header_rs--mobile'>
      <li>
        {isLoggedIn ? 
          <button className='logout--button' onClick={handleLogOut}>Log out <MdLogout size={16}/></button> :
          location.pathname !== "/login"  && <Link to="/login" ><button>Log in</button></Link> 
        }
      </li>
      <button className='header_menu--btn' onClick={toggleMenu}>
        {isOpen ? <IoCloseOutline size={30} /> : <CiMenuFries size={30} />}
      </button>
      </div>
      <nav className={`header_mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="." onClick={toggleMenu}>Home</Link></li>
          <li className='header_collapsible'>
            <div className='header_collapsible--title' onClick={toggleTvShows}>
              <span>Browse Categories</span>
              <RiArrowDropDownLine size={30} className={`${isTvShowsOpen && "open"}`} />
            </div>
            {isTvShowsOpen && (
              <div className="header_collapsible--list">
                <NavLink to="characters" onClick={toggleMenu}>Characters</NavLink>
                <NavLink to="episodes" onClick={toggleMenu}>Episodes</NavLink>
                <NavLink to="locations" onClick={toggleMenu}>Locations</NavLink>
              </div>
            )}
          </li>
          <li><Link to="quiz" onClick={toggleMenu}>Jerry Quiz</Link></li>
          <li><Link to="favorites" onClick={toggleMenu}>Favorites</Link></li>
          <li><Link to="about" onClick={toggleMenu}>About</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavbar;
