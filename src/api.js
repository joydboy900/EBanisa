const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Configuration Data
export async function fetchConfiguration() {
    const response = await fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`);
    return response.json();
}

// Genre Lists
export async function fetchMovieGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchTVGenres() {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
    return response.json();
}

// Movie Data
export async function fetchPopularMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchTopRatedMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchUpcomingMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchNowPlayingMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchMovieDetail(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchMovieCredits(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchMovieVideos(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchSimilarMovies(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    return response.json();
}

// TV Show Data
export async function fetchPopularTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchTopRatedTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchAiringTodayTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchOnTheAirTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchTVShowDetail(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchTVShowCredits(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchTVShowVideos(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchSimilarTVShows(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
    return response.json();
}

// Search Functionality
export async function searchMovies(query, page = 1) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
}

export async function searchTVShows(query, page = 1) {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
}

export async function multiSearch(query, page = 1) {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
}

// Trending and Discover
export async function fetchTrendingContent(mediaType = 'all', timeWindow = 'day') {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`);
    return response.json();
}

export async function discoverMovies(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&${queryString}`);
    return response.json();
}

export async function discoverTVShows(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&${queryString}`);
    return response.json();
}

// Optional / Extended Data
export async function fetchMovieImages(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchTVShowImages(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchMovieExternalIDs(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/external_ids?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchTVShowExternalIDs(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/external_ids?api_key=${API_KEY}`);
    return response.json();
}

export async function fetchMovieReviews(id, page = 1) {
    const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

export async function fetchTVShowReviews(id, page = 1) {
    const response = await fetch(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}&page=${page}`);
    return response.json();
}
