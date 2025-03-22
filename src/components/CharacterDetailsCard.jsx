import React, { useContext} from 'react'
import { NavLink , Outlet, useLocation } from 'react-router-dom';
import { FavCharsContext } from './FavCharsProvider';
import capitalizeFirstLetter from '../utils/capitalFirstLetter';
import Heart from "react-heart"

const CharacterDetailsCard = ({characterData}) => {
    const location = useLocation()
    const spState = location.state?.sp || "";
    const classNameStatus = characterData.status.toLowerCase()
    // to Add favorites Characters
    const {favChars,setFavChars} = useContext(FavCharsContext)
    const isAlreadyFavorite = isLoggedIn ? favChars.some(prevChar => prevChar.id === characterData.id) : false || false;
    function addFavChar(char){
      setFavChars(prevChars=> {
        // if it exist delete it
        if(isAlreadyFavorite) {
          return prevChars.filter(prevChar => prevChar.id !== char.id )
        } else {
          // else add it
          return [char,...prevChars]
        }
      })
    }
  return (
    <div className="character--details__container">
          <div className="character--details__card-wrapper">
            <div className='character--details__generic'>
              <img src={characterData.image} alt={characterData.name} className="character-image" />
              <div className="character--details__generic-info">
                <h1>{characterData.name}</h1>
                <p> 
                  <span className={`status-indicator ${classNameStatus}`}></span> 
                  {capitalizeFirstLetter(characterData.status)} - {capitalizeFirstLetter(characterData.gender)}
                </p>
                <p>{characterData.species || "Unknown Species"} - {characterData.type || "Unknown Type"}</p>
                <div 
                onClick={()=> addFavChar(characterData)}
                className="character-details__favorite-icon"
                aria-label={isAlreadyFavorite ? "Remove from favorites" : "Add to favorites"}>
                    <Heart 
                      isActive={isAlreadyFavorite ? true : false}
                      onClick={() => isAlreadyFavorite ? true : false}
                      activeColor="#eb7ac6"
                      inactiveColor="#eb7ac6"
                      animationTrigger="both"
                      activeScale={1.55}
                      animationDuration={2}
                      className="custom-heart"
                      style={{ transition: 'all 300ms ease-in-out', cursor: 'pointer' }}
                    />
                </div>
              </div>
            </div>
            <ul>
              <li>
                <NavLink 
                end to="." 
                className={({isActive})=> isActive ? "selected--link" : null}
                state={{sp : spState }}
                >Location
                </NavLink>
              </li>
              <li>
                <NavLink 
                to="episode" 
                className={({isActive})=> isActive ? "selected--link" : null}
                state={{sp : spState }}
                >Episode
                </NavLink>
              </li>
            </ul>
            <div className='character--details__extra--info'>
              <Outlet context={characterData}/>
            </div>
          </div>
    </div>
  )
}

export default CharacterDetailsCard