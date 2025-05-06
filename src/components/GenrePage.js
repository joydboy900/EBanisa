import React, { useEffect, useState } from 'react';
import { fetchMovieGenres, fetchTVGenres, discoverMovies, discoverTVShows } from '../api';
import { Link } from 'react-router-dom';

function GenrePage() {
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTVGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [contentType, setContentType] = useState('movie'); // 'movie' or 'tv'
    const [filteredContent, setFilteredContent] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch genres for movies and TV shows
        fetchMovieGenres().then(data => setMovieGenres(data.genres || []));
        fetchTVGenres().then(data => setTVGenres(data.genres || []));
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            const fetchContent = contentType === 'movie' ? discoverMovies : discoverTVShows;
            fetchContent({ with_genres: selectedGenre.id, page: currentPage }).then(data =>
                setFilteredContent(prevContent => [...prevContent, ...(data.results || [])])
            );
        }
    }, [selectedGenre, contentType, currentPage]);

    const handleGenreClick = (genre, type) => {
        setSelectedGenre(genre);
        setContentType(type);
        setFilteredContent([]);
        setCurrentPage(1);
    };

    const handleSortChange = e => {
        const sortValue = e.target.value;
        setSortOption(sortValue);

        const sortedContent = [...filteredContent]; // Create a new array to avoid mutating state directly
        if (sortValue === 'popularity') {
            sortedContent.sort((a, b) => b.popularity - a.popularity);
        } else if (sortValue === 'release_date') {
            sortedContent.sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date));
        }

        setFilteredContent(sortedContent); // Update state with the sorted array
    };

    const loadMoreContent = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            {/* Overview Section */}
            <div className="section">
                <h1>Explore Movies and TV Shows by Genre</h1>
                <p>Browse through a variety of genres to find your next favorite movie or TV show.</p>
            </div>

            {/* Genre List */}
            {!selectedGenre && (
                <div className="genre-grid">
                    <h2>Movie Genres</h2>
                    <ul>
                        {movieGenres.map(genre => (
                            <li key={genre.id} onClick={() => handleGenreClick(genre, 'movie')}>
                                <div className="genre-card">
                                    <h3>{genre.name}</h3>
                                    <p>Explore popular {genre.name} movies.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>TV Show Genres</h2>
                    <ul>
                        {tvGenres.map(genre => (
                            <li key={genre.id} onClick={() => handleGenreClick(genre, 'tv')}>
                                <div className="genre-card">
                                    <h3>{genre.name}</h3>
                                    <p>Explore popular {genre.name} TV shows.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Filtered Content View */}
            {selectedGenre && (
                <div>
                    <div className="section">
                        <h2>
                            {contentType === 'movie' ? 'Movies' : 'TV Shows'} in {selectedGenre.name}
                        </h2>
                        <button onClick={() => setSelectedGenre(null)}>Back to Genres</button>
                    </div>

                    {/* Sorting Options */}
                    <div className="filters">
                        <select onChange={handleSortChange} value={sortOption}>
                            <option value="">Sort By</option>
                            <option value="popularity">Popularity</option>
                            <option value="release_date">Release Date</option>
                        </select>
                    </div>

                    {/* Content Grid */}
                    <ul className="movie-grid">
                        {filteredContent.map(item => (
                            <li key={item.id} className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                                <div className="movie-info">
                                    <h3>{item.title || item.name}</h3>
                                    <p>{new Date(item.release_date || item.first_air_date).getFullYear()}</p>
                                    <span className="rating">{item.vote_average}</span>
                                </div>
                                <div className="movie-hover">
                                    <p>{item.overview.slice(0, 100)}...</p>
                                    <Link to={contentType === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
                                        <button>View Details</button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Load More Button */}
                    <div className="pagination">
                        <button onClick={loadMoreContent}>Load More</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GenrePage;
