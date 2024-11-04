import React from 'react'
import "./Footer.css"
const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="copyright_wrapper">
        <p> &copy;  {year} The Rick and Morty Cards. All rights reserved.</p>
        <p>This collection's design and content are owned by The Rick and Morty Cards, with images and data sourced externally.</p>
      </div>
    </footer>
  )
}

export default Footer