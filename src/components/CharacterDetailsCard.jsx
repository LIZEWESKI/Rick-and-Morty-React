import React from 'react'
import capitalizeFirstLetter from '../utils/capitalFirstLetter';
import { NavLink , Outlet, useLocation } from 'react-router-dom';
const CharacterDetailsCard = ({characterData}) => {
    const location = useLocation()
    const spState = location.state?.sp || ""
    const classNameStatus = characterData.status.toLowerCase()
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
                <button>Add to Favorite</button>
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