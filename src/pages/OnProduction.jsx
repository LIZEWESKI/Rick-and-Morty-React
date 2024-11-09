import React from 'react';
import { Link } from 'react-router-dom';
import './OnProduction.css';
const OnProduction = () => {
  return (
    <main className="production-page">
      <h1>🚧 Page Under Production 🚧</h1>
      <p>We’re working hard to bring this page to life. Stay tuned!</p>
      <div className="button-group">
        <Link to="/" className="production-button">Home</Link>
        <Link to="/characters" className="production-button">Characters</Link>
      </div>
    </main>
  );
};

export default OnProduction;
