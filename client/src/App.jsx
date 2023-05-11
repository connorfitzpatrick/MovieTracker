import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesContextProvider } from './context/MoviesContext';
import Home from './routes/Home';
import MovieDetailPage from './routes/MovieDetailPage';
import UpdatePage from './routes/UpdateMovie';

const App = () => {
    return (
        <MoviesContextProvider>
            <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/movies/:id/update" element={<UpdatePage/>}/>
                    <Route exact path="/movies/:id" element={<MovieDetailPage/>}/>
                </Routes>
            </Router>
        </div>
        </MoviesContextProvider>
    );
};

export default App;