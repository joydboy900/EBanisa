import React, { useState, useEffect } from 'react';
import { multiSearch } from '../api';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const fetchResults = async (searchQuery, page = 1) => {
        if (searchQuery.trim() === '') {
            setResults([]);
            setTotalResults(0);
            return;
        }
        const data = await multiSearch(searchQuery, page);
        if (page === 1) {
            setResults(data.results || []);
        } else {
            setResults(prevResults => [...prevResults, ...(data.results || [])]);
        }
        setTotalResults(data.total_results || 0);
        setCurrentPage(page);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        setQuery(value);

        // Clear the previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to fetch results after a delay
        setTypingTimeout(
            setTimeout(() => {
                fetchResults(value, 1);
            }, 300) // Debounce delay of 300ms
        );
    };

    const loadMoreResults = () => {
        fetchResults(query, currentPage + 1);
    };

    return (
        <div className="search-page">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for movies, TV shows, or people..."
                />
            </div>

            {/* Search Results */}
            <div className="search-results">
                {results.length > 0 ? (
                    <ul className="results-grid">
                        {results.map(item => (
                            <li key={item.id}>
                                <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
                                    <div className="result-overlay">
                                        <p>{item.title || item.name}</p>
                                        <span>{item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}</span>
                                    </div>
                                    <img
                                        src={
                                            item.poster_path
                                                ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                                                : 'https://via.placeholder.com/200x300?text=No+Image'
                                        }
                                        alt={item.title || item.name}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    query && (
                        <div className="no-results">
                            <img src="https://via.placeholder.com/300x200" alt="No results" />
                            <p>No results found for "{query}".</p>
                        </div>
                    )
                )}
            </div>

            {/* Load More Button */}
            {results.length > 0 && results.length < totalResults && (
                <div className="pagination">
                    <button onClick={loadMoreResults}>Load More</button>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
