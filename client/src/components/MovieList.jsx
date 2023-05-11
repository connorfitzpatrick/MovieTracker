import React, {useEffect, useContext} from 'react';
import MovieFinder from '../apis/MovieFinder';
import { MoviesContext } from '../context/MoviesContext';

const MovieList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
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
                        <th scope="col">IMDB</th>
                        <th scope="col">Critic</th>
                        <th scope="col">Audience</th>
                        <th scope="col">Watched?</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies && movies.map((m) => {
                        return (
                            <tr key={m.id}>
                                <td>{m.movie_name}</td>
                                <td>{m.director}</td>
                                <td>{m.imdb_rating}</td>
                                <td>{m.tomatoes_critics}</td>
                                <td>{m.tomatoes_audience}</td>
                                <td>
                                    <button className="btn btn-warning">Watched</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList
