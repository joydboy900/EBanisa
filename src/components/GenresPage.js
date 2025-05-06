import React, { useEffect, useState } from 'react';
import { discoverMovies } from '../api';
import { Link } from 'react-router-dom';

function GenresPage() {
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);

    useEffect(() => {
        discoverMovies({ with_genres: 28 }).then(data => setActionMovies(data.results || [])); // Action
        discoverMovies({ with_genres: 35 }).then(data => setComedyMovies(data.results || [])); // Comedy
    }, []);

    return (
        <div>
            <h1>Genres Page</h1>
            <p>Explore movies by genre here.</p>

            <div className="section">
                <h2>Action Movies</h2>
                <ul className="movie-grid">
                    {actionMovies.map(movie => (
                        <li key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>Comedy Movies</h2>
                <ul className="movie-grid">
                    {comedyMovies.map(movie => (
                        <li key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GenresPage;
