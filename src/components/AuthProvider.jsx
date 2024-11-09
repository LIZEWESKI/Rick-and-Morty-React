import React, {useState, createContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
export const AuthProtection = createContext(null)
let setAuthStatus = () => {}; // Module-level function
const AuthProvider = () => {
    const [isLoggedIn, setIsLoggedIn] = useState( JSON.parse(localStorage.getItem("auth")) || false)
    useEffect(()=> {
      localStorage.setItem("auth",JSON.stringify(isLoggedIn))
    },[isLoggedIn])
    setAuthStatus = setIsLoggedIn;
  return (
    <AuthProtection.Provider value={{isLoggedIn,setIsLoggedIn}}>
        <Outlet/>
    </AuthProtection.Provider>
  )
}
export { setAuthStatus };
export default AuthProvider