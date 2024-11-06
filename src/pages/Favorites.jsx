import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FavCharacterCard from '../components/FavCharacterCard'
import "./Favorites.css"
const Favorites = () => {

const residentsChar = [
  {
      "id": 744,
      "name": "Cenobite",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Male",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/744.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/744",
      "created": "2021-10-17T13:53:11.250Z"
  },
  {
      "id": 745,
      "name": "Cenobite",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Female",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/745.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/745",
      "created": "2021-10-17T13:53:59.978Z"
  },
  {
      "id": 746,
      "name": "Cenobite",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Male",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/746.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/746",
      "created": "2021-10-17T13:55:11.551Z"
  },
  {
      "id": 747,
      "name": "Cenobite",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Male",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/747.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/747",
      "created": "2021-10-17T13:56:15.096Z"
  },
  {
      "id": 748,
      "name": "Cenobite",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Male",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/748.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/748",
      "created": "2021-10-17T13:57:04.213Z"
  },
  {
      "id": 750,
      "name": "Mousetrap Nipples",
      "status": "unknown",
      "species": "Mythological Creature",
      "type": "Demon",
      "gender": "Male",
      "origin": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "location": {
          "name": "Hell",
          "url": "https://rickandmortyapi.com/api/location/116"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/750.jpeg",
      "episode": [
          "https://rickandmortyapi.com/api/episode/46"
      ],
      "url": "https://rickandmortyapi.com/api/character/750",
      "created": "2021-10-17T13:58:37.737Z"
  }
]
console.log(residentsChar)
  const [isEmpty, setIsEmpty] = useState(false)
  return (
      <main className="favorites__main">
        <h1>Your Favorites Characters</h1>
        { isEmpty ? 
          <div className="empty-characters__wrapper">
              <h2>You don't have favorites characters yet.</h2>
              <Link to="/characters">
                <button>Explore Characters</button>
              </Link>
          </div> : 
          <div className="characters-grid js-characters-grid">
            {residentsChar.map(resident => {
                return <FavCharacterCard key={resident.id} character={resident}/>
              })
            }
          </div>
        }
    </main>

  )
}

export default Favorites