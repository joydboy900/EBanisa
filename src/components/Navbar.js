import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">EBanisa</Link>
            </div>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/tv">TV Shows</Link>
                <Link to="/genres">Genres</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/search">Search</Link>
            </div>
        </nav>
    );
}

export default Navbar;
