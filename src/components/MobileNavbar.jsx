import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prevState => !prevState);
  return (
    <>
      <div className='header_rs--mobile'>
      <button className='header_menu--btn' onClick={toggleMenu}>
        {isOpen ? <IoCloseOutline size={30} /> : <CiMenuFries size={30} />}
      </button>
      </div>
      <nav className={`header_mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="." onClick={toggleMenu}>Home</Link></li>
          <li><NavLink to="characters" onClick={toggleMenu}>Characters</NavLink></li>
          <li><Link to="quiz" onClick={toggleMenu}>Jerry Quiz</Link></li>
          <li><Link to="favorites" onClick={toggleMenu}>Favorites</Link></li>
          <li><Link to="about" onClick={toggleMenu}>About</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavbar;
