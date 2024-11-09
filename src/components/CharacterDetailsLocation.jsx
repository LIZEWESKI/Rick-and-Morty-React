import React from 'react'
import { useOutletContext } from "react-router-dom";
import capitalizeFirstLetter from '../utils/capitalFirstLetter';
const CharacterDetailsLocation = () => {
    const characterData = useOutletContext()
    console.log(characterData)
    const characterOrigin = characterData.origin.name === "unknown" ? "Unknown Origin" : characterData.origin.name
    const characterDimension = characterData.dimension === "unknown" ? "Unknown Dimension" : characterData.dimension
    return (
        <>
            <h3>Origin</h3>
            <p>{characterOrigin || "Unkown origin"}</p>
            <h3>Current Location</h3>
            <p>{capitalizeFirstLetter(characterData.locationName)}</p>
            <b>{capitalizeFirstLetter(characterData.locationType)} - {capitalizeFirstLetter(characterDimension) || "Unknown Dimension"}</b>
        </>
    )
}

export default CharacterDetailsLocation