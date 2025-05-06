import React, { useEffect, useState } from 'react';
import { fetchTrendingContent } from '../api';
import { Link } from 'react-router-dom';

function TrendingPage() {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetchTrendingContent().then(data => setTrending(data.results || []));
    }, []);

    return (
        <div>
            <h1>Trending Page</h1>
            <p>Discover trending movies and TV shows here.</p>
            <ul className="movie-grid">
                {trending.map(item => (
                    <li key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
                        <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}>
                            {item.title || item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TrendingPage;
