import React from 'react'
import { RiArrowRightSFill } from "react-icons/ri";
import { useLocation,NavLink } from 'react-router-dom';

const BreadCrumbs = ({currentPath}) => {
    const location = useLocation();
    const redirectSP = `?${location.state?.sp}` || ""
  return (
    <div className='breadcrumbs'>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink> 
              <RiArrowRightSFill size={20}/>
            </li> 
            <li>
              <NavLink to={`/favorites`}>Favorites</NavLink>
              <RiArrowRightSFill size={20}/>
            </li> 
            <li>
              <NavLink to={`/characters${redirectSP}`}>Characters</NavLink>
              <RiArrowRightSFill size={20}/>
            </li> 
            <li className='limit-text-to-1-lines' >{currentPath}</li> 
          </ul>
    </div>
  )
}

export default BreadCrumbs