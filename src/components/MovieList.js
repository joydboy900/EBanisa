import React, { useEffect, useState } from 'react';
import { fetchTrendingContent, fetchPopularMovies, fetchPopularTVShows } from '../api';
import { Link } from 'react-router-dom';

function MovieList() {
    const [heroContent, setHeroContent] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);

    useEffect(() => {
        // Fetch hero content (first trending item)
        fetchTrendingContent().then(data => setHeroContent(data.results[0]));

        // Fetch trending movies
        fetchTrendingContent().then(data => setTrendingMovies(data.results || []));

        // Fetch popular movies
        fetchPopularMovies().then(data => setPopularMovies(data.results || []));

        // Fetch popular TV shows
        fetchPopularTVShows().then(data => setPopularTVShows(data.results || []));
    }, []);

    return (
        <div>
            {/* Hero Section */}
            {heroContent && (
                <div
                    className="hero"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${heroContent.backdrop_path})`,
                    }}
                >
                    <div className="hero-overlay">
                        <h1>Discover Your Next Favorite Movie</h1>
                        <p>{heroContent.overview}</p>
                        <Link to={heroContent.media_type === 'movie' ? `/movie/${heroContent.id}` : `/tv/${heroContent.id}`}>
                            <button className="cta-button">Learn More</button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Featured Content */}
            <div className="section">
                <h2>Popular Movies</h2>
                <div className="carousel">
                    {popularMovies.map(movie => (
                        <div key={movie.id} className="carousel-item">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Popular TV Shows</h2>
                <div className="carousel">
                    {popularTVShows.map(show => (
                        <div key={show.id} className="carousel-item">
                            <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                            <Link to={`/tv/${show.id}`}>{show.name}</Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest/Trending Section */}
            <div className="section">
                <h2>Trending Now</h2>
                <ul className="movie-grid">
                    {trendingMovies.map(item => (
                        <li key={item.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
                            <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
                                {item.title || item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MovieList;

