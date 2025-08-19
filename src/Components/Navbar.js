import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#000000', '#006600', '#FFFFFF', '#BB0000']; // Black, Green, White, Red

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle color change every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 60000); // Change color every minute

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ 
        backgroundColor: colors[colorIndex],
        transition: 'background-color 1s ease'
      }}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg" 
            alt="Kenyan Flag" 
            className="kenya-flag"
          />
          <Link to="/" className="navbar-title">
            Tembea Kenya
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>About</Link>
          </li>
          <li>
            <Link to="/places" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Places</Link>
          </li>
          <li>
            <Link to="/hotels" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Hotels</Link>
          </li>
          <li>
            <Link to="/car_hire" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Car Hire</Link>
          </li>
          <li>
            <Link to="/tourguide" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Tour Guide</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" style={{ color: colorIndex === 2 ? '#000' : '#fff' }}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;