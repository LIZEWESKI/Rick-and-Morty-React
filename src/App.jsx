import React from 'react'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"
import Characters , {loader as charactersLoader} from './pages/Characters';
import Quiz from './pages/Quiz'
import ErrorElement from './components/ErrorElement'
import CharacterDetailsLocation from './components/CharacterDetailsLocation'
import CharacterDetailsEp from './components/CharacterDetailsEp'
import CharacterDetails , {loader as characterDetailsLoader } from './pages/CharacterDetails'
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='favorites' element={<Favorites/>}/>
      <Route path='characters' element={<Characters/>} loader={charactersLoader} errorElement={<ErrorElement/>}/>
      <Route path='characters/:id' element={<CharacterDetails/>} loader={characterDetailsLoader} errorElement={<ErrorElement/>}>
        <Route index element={<CharacterDetailsLocation/>}/>
        <Route path='episode' element={<CharacterDetailsEp/>}/>
      </Route>
      <Route path='quiz' element={<Quiz/>} errorElement={<ErrorElement/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App