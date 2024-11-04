import React from 'react';
import "./About.css"
const About = () => {
  return (
    <main className="about_main">
        <h1>About &amp; Copyright</h1>
        
        <section className="about">
            <h2>About</h2>
            <p>The Rick and Morty Cards, created by Saryah under the fictional company name Noah. This project is dedicated to showcasing interactive cards featuring characters from the Rick and Morty universe.</p>
        </section>
        
        <section className="credits">
          <h2>Copyright &amp; Credits</h2>
          <p><strong>Credits to:</strong></p>
          <p><strong>The Rick and Morty API</strong><br/>
          <br/>
          The data and images used in this project are sourced from <a href="https://rickandmortyapi.com/" target='blank_'>The Rick and Morty API.</a> We acknowledge that all data and images belong to their respective owners and are used without claim of ownership.</p>
          <p><strong>TheTVDB</strong><br/>
          <br/> 
          Rick and Morty artworks used in this project are sourced from <a href="https://www.thetvdb.com/" target='blank_'>TheTVDB.</a> Their contribution to the visual design and aesthetic of our project is greatly appreciated.</p>
          
          <p><strong>Disclaimer:</strong> All other trademarks, logos, and images are the property of their respective owners.</p>
        </section>
    </main>
  );
};

export default About;
