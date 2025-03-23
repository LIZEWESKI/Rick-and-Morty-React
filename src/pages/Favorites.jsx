import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import FavCharacterCard from '../components/FavCharacterCard'
import { FavCharsContext } from '../components/FavCharsProvider'
import ScrollToTopButton from '../components/ScrollToTopButton';
import "./Favorites.css"
const Favorites = () => {
    // to Render favorites Characters
    const {favChars} = useContext(FavCharsContext)
  return (
      <main className="favorites__main">
        <h1>Your Favorites Characters</h1>
        { favChars.length === 0 ? 
          <div className="empty-characters__wrapper">
              <h2>You don't have favorites characters yet.</h2>
              <Link to="/characters">
                <button>Explore Characters</button>
              </Link>
          </div> : 
          <div className="characters-grid js-characters-grid">
            {favChars.map(resident => {
                return <FavCharacterCard key={resident.id} character={resident}/>
              })
            }
          </div>
        }
        <ScrollToTopButton/>
    </main>

  )
}

export default Favorites;