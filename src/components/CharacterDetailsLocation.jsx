import React from 'react'
import { useOutletContext } from "react-router-dom";

const CharacterDetailsLocation = () => {
    const characterData = useOutletContext()
    const characterOrigin = characterData.origin.name === "unknown" ? "Unknown Origin" : characterData.origin.name
    const characterDimension = characterData.dimension === "unknown" ? "Unknown Dimension" : characterData.dimension
    return (
        <>
            <h3>Origin</h3>
            <p>{characterOrigin || "Unkown origin"}</p>
            <h3>Current Location</h3>
            <p>{characterData.locationName}</p>
            <b>{characterData.locationType} - {characterDimension || "Unknown Dimension"}</b>
        </>
    )
}

export default CharacterDetailsLocation