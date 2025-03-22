import React from 'react'
import {NavLink} from 'react-router-dom';
const DesktopNavbar = () => {
  return (
    <nav className="header_rs">
        <ul>
          <li><NavLink to="characters">Characters</NavLink></li>
          <li><NavLink to="quiz" className={({isActive})=> isActive ? "link--selected" : null}>Jerry Quiz</NavLink></li>
          <li><NavLink to="favorites" className={({isActive})=> isActive ? "link--selected" : null}>Favorites</NavLink></li>
          <li><NavLink to="/about" className={({isActive})=> isActive ? "link--selected" : null}>About</NavLink></li>
        </ul>
      </nav>
  )
}

export default DesktopNavbar