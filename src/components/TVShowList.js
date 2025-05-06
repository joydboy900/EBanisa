import React, { useEffect, useState } from 'react';
import { fetchTrendingContent, fetchPopularTVShows } from '../api';
import { Link } from 'react-router-dom';

function TVShowList() {
    const [trendingTV, setTrendingTV] = useState([]);
    const [popularTV, setPopularTV] = useState([]);

    useEffect(() => {
        fetchTrendingContent('tv', 'day').then(data => setTrendingTV(data.results || [])); // Trending TV Shows
        fetchPopularTVShows().then(data => setPopularTV(data.results || [])); // Popular TV Shows
    }, []);

    return (
        <div>
            <h2>Trending TV Shows</h2>
            <ul>
                {trendingTV.map(show => (
                    <li key={show.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                        <Link to={`/tv/${show.id}`}>{show.name}</Link>
                    </li>
                ))}
            </ul>
            <h2>Popular TV Shows</h2>
            <ul>
                {popularTV.map(show => (
                    <li key={show.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                        <Link to={`/tv/${show.id}`}>{show.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TVShowList;
