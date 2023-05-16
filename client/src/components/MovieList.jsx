import React, {useEffect, useContext} from 'react';
import MovieFinder from '../apis/MovieFinder';
import { MoviesContext } from '../context/MoviesContext';
import Checkbox from './Checkbox';

const MovieList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Grab list of movies from the api and store them
                const response = await MovieFinder.get("/");
                setMovies(response.data.data.movies);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Movie</th>
                        <th scope="col">Director</th>
                        <th scope="col">Year</th>
                        <th scope="col">IMDB Rating</th>
                        <th scope="col">Watched?</th>
                    </tr>
                </thead>
                <tbody>
                    {/* create a row for every movie by mapping each one to a row in the table */}
                    {movies && movies.map((m) => {
                        return (
                            <tr key={m.id}>
                                <td>{m.movie_name}</td>
                                <td>{m.director}</td>
                                <td>{m.release_year}</td>
                                <td>{m.ranking}</td>
                                <td>
                                    <Checkbox whole={m} user={m.id} isWatched={m.watched}></Checkbox>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList
