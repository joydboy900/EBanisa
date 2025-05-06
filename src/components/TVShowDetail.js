import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTVShowDetail, fetchTVShowCredits, fetchSimilarTVShows, fetchTVShowVideos, fetchTVShowImages } from '../api';

function TVShowDetail() {
    const { id } = useParams();
    const [tvShow, setTVShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [relatedShows, setRelatedShows] = useState([]);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        fetchTVShowDetail(id).then(data => setTVShow(data));
        fetchTVShowCredits(id).then(data => setCast(data.cast || []));
        fetchSimilarTVShows(id).then(data => setRelatedShows(data.results || []));
        fetchTVShowVideos(id).then(data => setVideos(data.results || []));
        fetchTVShowImages(id).then(data => setImages(data.backdrops || []));
    }, [id]);

    if (!tvShow) return <div>Loading...</div>;

    return (
        <div className="tv-show-detail">
            {/* Backdrop Section */}
            <div
                className="backdrop"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
                }}
            >
                <div className="backdrop-overlay">
                    <h1>{tvShow.name}</h1>
                </div>
            </div>

            {/* Main Details Section */}
            <div className="details-container">
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w780${tvShow.poster_path}`} alt={tvShow.name} />
                </div>
                <div className="details">
                    <h2>{tvShow.name}</h2>
                    <p><strong>First Air Date:</strong> {tvShow.first_air_date}</p>
                    <p><strong>Number of Seasons:</strong> {tvShow.number_of_seasons}</p>
                    <p><strong>Number of Episodes:</strong> {tvShow.number_of_episodes}</p>
                    <p><strong>Genres:</strong> {tvShow.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Networks:</strong> {tvShow.networks.map(network => network.name).join(', ')}</p>
                    <p><strong>Creators:</strong> {tvShow.created_by.map(creator => creator.name).join(', ')}</p>
                    <p><strong>Rating:</strong> {tvShow.vote_average} / 10</p>
                    <p>{tvShow.overview}</p>
                </div>
            </div>

            {/* TV Show Images Section */}
            <div className="section">
                <h2>Images</h2>
                <div className="slider">
                    {(showAllImages ? images : images.slice(0, 3)).map((image, index) => (
                        <div key={index} className="slider-item">
                            <img src={`https://image.tmdb.org/t/p/w780${image.file_path}`} alt={`TV Show Image ${index + 1}`} />
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
                            <img src={`https://image.tmdb.org/t/p/w300${member.profile_path}`} alt={member.name} />
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

            {/* Related TV Shows Section */}
            <div className="section">
                <h2>Related TV Shows</h2>
                <div className="slider">
                    {relatedShows.map(show => (
                        <div key={show.id} className="slider-item">
                            <Link to={`/tv/${show.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.name} />
                                <p>{show.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TVShowDetail;
