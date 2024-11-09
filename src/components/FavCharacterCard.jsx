import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { FavCharsContext } from './FavCharsProvider';
import { FaRegTrashAlt } from "react-icons/fa";
import capitalizeFirstLetter from '../utils/capitalFirstLetter';
const FavCharacterCard = ({ character }) => {
  const {
    id,
    image,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    episodeName,
    episode
  } = character;
  // to Delete Favorites Characters
  const {setFavChars} = useContext(FavCharsContext)
  const classNameStatus = status.toLowerCase()
  function deleteFavChar(id){
    setFavChars(prevChar => prevChar.filter(char => char.id !== id ))
  }
  return (
    <div className="fav-character_card">
      <div className="fav-character_img">
        <button className="remove-character__btn" onClick={()=> deleteFavChar(id)}>
          <FaRegTrashAlt/>
        </button>
        <Link to={`/characters/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="fav-character__info">
        <h2 className="limit-text-to-1-lines">{name}</h2>
        <small>
        <span className={`status-indicator ${classNameStatus}`}></span>
          {capitalizeFirstLetter(status)} - {capitalizeFirstLetter(gender)} 
        </small>
        <p>{species || "Unknown Species"} - {type || "Unknown Type"}</p>
        <p><strong>Origin: </strong>{origin.name}</p>
        <p><strong>Location: </strong>{location.name}</p>
        <p><strong>First seen in:</strong> {episodeName} - {episode}</p>
      </div>
    </div>
  );
};

export default FavCharacterCard;
