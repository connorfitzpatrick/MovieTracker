import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesContextProvider } from './context/MoviesContext';
import Home from './routes/Home';
import MovieDetailPage from './routes/MovieDetailPage';

const App = () => {
    return (
        <MoviesContextProvider>
            <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/movies/:id" element={<MovieDetailPage/>}/>
                </Routes>
            </Router>
        </div>
        </MoviesContextProvider>
    );
};

export default App;