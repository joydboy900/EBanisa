import React, { useEffect, useState } from 'react';
import { fetchTrendingContent, fetchPopularMovies } from '../api';
import { Link } from 'react-router-dom';

function HomePage() {
    const [heroContent, setHeroContent] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetchTrendingContent('movie', 'day').then(data => setHeroContent(data.results[0]));
        fetchTrendingContent('movie', 'day').then(data => setTrendingMovies(data.results || []));
        fetchPopularMovies().then(data => setPopularMovies(data.results || []));
    }, []);

    return (
        <div className="homepage">
            {/* Hero Section */}
            {heroContent && (
                <div
                    className="hero"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${heroContent.backdrop_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '80vh',
                    }}
                >
                    <div className="hero-overlay">
                        <h1>Discover Your Next Favorite Movie</h1>
                        <p>{heroContent.overview}</p>
                        <div className="cta-buttons">
                            <Link to={`/movie/${heroContent.id}`}>
                                <button className="cta-button watch-now">Watch Now</button>
                            </Link>
                            <Link to={`/movie/${heroContent.id}`}>
                                <button className="cta-button learn-more">Learn More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Trending Movies */}
            <div className="section">
                <h2>Trending Movies</h2>
                <div className="carousel">
                    {trendingMovies.map(movie => (
                        <div key={movie.id} className="carousel-item">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <div className="carousel-overlay">
                                <p>{movie.title}</p>
                                <span className="rating-badge">{movie.vote_average}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Movies */}
            <div className="section">
                <h2>Popular Movies</h2>
                <ul className="movie-grid">
                    {popularMovies.map(movie => (
                        <li key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{new Date(movie.release_date).getFullYear()}</p>
                                <span className="rating">{movie.vote_average}</span>
                            </div>
                            <div className="movie-hover">
                                <p>{movie.overview.slice(0, 100)}...</p>
                                <Link to={`/movie/${movie.id}`}>
                                    <button>View Details</button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                        TMDB Attribution
                    </a>
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <p>&copy; {new Date().getFullYear()} TMDB Movies. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
