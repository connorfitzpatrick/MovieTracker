// This context api store a list of movies instead of them being stored in a local state so that all
// of our components can access that data. Every component has access to the context API so the data
// does not need to be passed down as props.

// Can I store toggle switch in context API?

import React, { useState, createContext } from "react";

export const MoviesContext = createContext();
// export const ButtonContext = createContext();

export const MoviesContextProvider = (props) => {
    // movies: list of movies from backend server
    // setMovies: function to update list
    const [movies, setMovies] = useState([]);
    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {props.children}
        </MoviesContext.Provider>
    );
};