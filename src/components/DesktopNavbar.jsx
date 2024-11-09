import React , {useState,useEffect,useRef, useContext} from 'react'
import {NavLink, Link,useLocation} from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { AuthProtection } from './authProvider';
const DesktopNavbar = () => {
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthProtection)
    const location = useLocation();
    const [isDropDown, setIsDropDown] = useState(false)
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsDropDown(prevState => !prevState)
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = e => {if (dropdownRef.current && !dropdownRef.current.contains(e.target))setIsDropDown(false);};
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    },[dropdownRef]);
    function handleLogOut(){
      setIsLoggedIn(false);
      window.location.reload()
    }
  return (
    <nav className="header_rs">
        <ul>
          <div className='header_dropdown--wrapper' onClick={toggleDropdown} ref={dropdownRef}>
              <div className={`header_dropdown--title `}>
                <span>Browse Categories</span> 
                <RiArrowDropDownLine size={30} className={`${isDropDown && "open"}`}/>
              </div>
            { isDropDown && 
            <div className='header_dropdown'>
              <li><NavLink to="characters">Characters</NavLink></li>
              <li><NavLink to="episodes">Episodes</NavLink></li>
              <li><NavLink to="locations">Locations</NavLink></li>
            </div>}
          </div>
          <li><NavLink to="quiz" className={({isActive})=> isActive ? "link--selected" : null}>Jerry Quiz</NavLink></li>
          <li><NavLink to="favorites" className={({isActive})=> isActive ? "link--selected" : null}>Favorites</NavLink></li>
          <li><NavLink to="/about" className={({isActive})=> isActive ? "link--selected" : null}>About</NavLink></li>
          <li>
            {isLoggedIn  ? 
            <button className='logout--button' onClick={handleLogOut}><MdLogout size={16}/></button>:
            location.pathname !== "/login" && <Link to="/login" ><button>Log in</button></Link>}
          </li>
        </ul>
      </nav>
  )
}

export default DesktopNavbar