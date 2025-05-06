import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieCredits, fetchSimilarMovies, fetchMovieVideos, fetchMovieImages } from '../api';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        fetchMovieDetail(id).then(data => setMovie(data));
        fetchMovieCredits(id).then(data => setCast(data.cast || []));
        fetchSimilarMovies(id).then(data => setRelatedMovies(data.results || []));
        fetchMovieVideos(id).then(data => setVideos(data.results || []));
        fetchMovieImages(id).then(data => setImages(data.backdrops || []));
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail">
            {/* Backdrop Section */}
            <div
                className="backdrop"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="backdrop-overlay">
                    <h1>{movie.title}</h1>
                    <p>{movie.tagline}</p>
                </div>
            </div>

            {/* Main Details Section */}
            <div className="details-container">
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="details">
                    <h2>{movie.title}</h2>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                    <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Spoken Languages:</strong> {movie.spoken_languages.map(lang => lang.name).join(', ')}</p>
                    <p><strong>Production Companies:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p>{movie.overview}</p>
                </div>
            </div>

            {/* Movie Images Section */}
            <div className="section">
                <h2>Images</h2>
                <div className="slider">
                    {(showAllImages ? images : images.slice(0, 3)).map((image, index) => (
                        <div key={index} className="slider-item">
                            <img src={`https://image.tmdb.org/t/p/w780${image.file_path}`} alt={`Movie Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                {!showAllImages && images.length > 3 && (
                    <button className="view-all-button" onClick={() => setShowAllImages(true)}>
                        View All Images
                    </button>
                )}
            </div>

            {/* Cast Section */}
            <div className="section">
                <h2>Cast</h2>
                <div className="slider">
                    {cast.map(member => (
                        <div key={member.id} className="slider-item">
                            <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
                            <p>{member.name}</p>
                            <p><em>{member.character}</em></p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos Section */}
            <div className="section">
                <h2>Videos</h2>
                <div className="video-list">
                    {videos.map(video => (
                        <div key={video.id} className="video-item">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.key}`}
                                title={video.name}
                                allowFullScreen
                            ></iframe>
                            <p>{video.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Movies Section */}
            <div className="section">
                <h2>Related Movies</h2>
                <div className="slider">
                    {relatedMovies.map(movie => (
                        <div key={movie.id} className="slider-item">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                <p>{movie.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
