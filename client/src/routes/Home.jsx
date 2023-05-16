import React from 'react';
import Header from '../components/Header';
import AddMovie from '../components/AddMovie';
import MovieList from '../components/MovieList';
import ToggleSwitch from '../components/ToggleSwitch';

const Home = () => {
    return (
        <div>
            <Header />
            {/* <AddMovie /> */}
            <ToggleSwitch />
            <MovieList />
        </div>
    );
};

export default Home;
