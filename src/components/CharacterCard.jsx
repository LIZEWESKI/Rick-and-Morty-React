import React, {useContext} from 'react'
import { Link} from 'react-router-dom';
import {SpContext} from "../pages/Characters"
import capitalizeFirstLetter from '../utils/capitalFirstLetter';
const CharacterCard = ({character}) => {
    const spState = useContext(SpContext) || ""
    const classNameStatus = character.status.toLowerCase()
    
  return (
    <div className="character_card" >
        <Link to={`./${character.id}`} state={{sp : spState }} ><img src={character.image} alt={`${character.name} image`} loading='lazy' /></Link>
        <div className="character_info">
            <div className="character_name--status">
                <Link to={`./${character.id}`} state={{sp : spState }}><h2 className="limit-text-to-1-lines">{character.name}</h2></Link> 
                <p className="limit-text-to-1-lines"> <span className={`status-indicator ${classNameStatus}`}></span> {capitalizeFirstLetter(character.status)} - {character.species} </p>
            </div>
            <div className="character_location">
                <h3 className="character_location--title">Last known location:</h3>
                <p className="limit-text-to-1-lines character_location--value">{capitalizeFirstLetter(character.location.name)}</p>
            </div>
        </div>
        <Link className="character_btn"  to={`./${character.id}`} state={{sp : spState }} >
                View Character Details
        </Link>
    </div>
  )
}

export default CharacterCard