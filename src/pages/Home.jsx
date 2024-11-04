import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
const Home = () => {
  return (
    <main className='home_main'>
      <h1>The Rick and Morty Cards</h1>
      <h2>Intergalactic chaos, science gone wild!</h2>
      <div className='explore_home'>
        <Link to="characters"><button>Browse Characters</button></Link>
        <Link to="quiz"><button className='home_personality-quiz-btn'>Personality Check!</button></Link>
      </div>
    </main>
  )
}
export default Home