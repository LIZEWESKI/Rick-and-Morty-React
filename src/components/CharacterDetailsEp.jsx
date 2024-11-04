import React from 'react'
import { useOutletContext } from "react-router-dom";

const CharacterDetailsEp = () => {
  const characterData = useOutletContext()
  return (
    <>
      <h3>First Seen in</h3>
      <p>{characterData.episodeName} - {characterData.episode}</p>
      <b>Air Date: {characterData.air_date} </b>
    </>
  )
}

export default CharacterDetailsEp