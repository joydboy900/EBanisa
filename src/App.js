import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import TVShowList from './components/TVShowList';
import TVShowDetail from './components/TVShowDetail';
import MoviesPage from './components/MoviesPage';
import GenresPage from './components/GenresPage';
import TrendingPage from './components/TrendingPage';
import TVShowsPage from './components/TVShowsPage';
import GenrePage from './components/GenrePage';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/tv" element={<TVShowsPage />} />
                    <Route path="/tv/:id" element={<TVShowDetail />} />
                    <Route path="/genres" element={<GenrePage />} />
                    <Route path="/trending" element={<TrendingPage />} />
                    <Route path="/search" element={<SearchBar />} />
                </Routes>
                <footer className="footer">
                    <p>"As long as I live, there are infinite chances!"</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;

