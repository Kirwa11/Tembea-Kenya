import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-logo- title">
            <img src="" alt=""/>
            <h2 className="navbar-title">Tembea Kenya</h2>
        </div>

        <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/car_hire">Car_Hire</Link></li>
            <li><Link to="/toureguide">Tourguide</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </nav>
);
export default Navbar;