import React, { useState, useContext } from 'react'
import MovieFinder from "../apis/MovieFinder"
import { MoviesContext } from '../context/MoviesContext';

const AddMovie = () => {
    const {addMovies} = useContext(MoviesContext);
    const [movieName, setMovieName] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await MovieFinder.post("my_movies", {
                movie_name: movieName,
                director: director,
                release_year: year,
                ranking: 5.0,
                watched: false,
                in_top: false,
            })
            addMovies(response.data.data.movie);
            
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }

    return (
<div className="d-flex justify-content-center">
    <div className="mb-4">
        <form action="">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1 pr-2">
                    <input 
                        value={movieName} 
                        onChange={(e) => setMovieName(e.target.value)} 
                        type="text" 
                        className="form-control movie-input" 
                        placeholder="Movie Name"
                    />
                </div>
                <div className="flex-grow-2 pr-2">
                    <input 
                        value={director} 
                        onChange={(e) => setDirector(e.target.value)}
                        className="form-control director-input" 
                        type="text" 
                        placeholder="Director"
                    />
                </div>
                <div className="flex-grow-2 pr-2">
                    <input 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control release-input" 
                        type="text" 
                        placeholder="Year"
                    />
                </div>
                <div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
</div>

   );
};

export default AddMovie;