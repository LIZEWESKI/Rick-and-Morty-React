import React, {useState, createContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
export const FavCharsContext = createContext(null)
const FavCharsProvider = () => {
    const [favChars, setFavChars] = useState( JSON.parse(localStorage.getItem("favChars")) || [])
    useEffect(()=> {
      localStorage.setItem("favChars",JSON.stringify(favChars))
    },[favChars])
  return (
    <FavCharsContext.Provider value={{favChars,setFavChars}}>
        <Outlet/>
    </FavCharsContext.Provider>
  )
}

export default FavCharsProvider