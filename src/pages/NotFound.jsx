import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"
const NotFound = () => {
  return (
    <main className="notfound_main">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </main>
  )
}

export default NotFound