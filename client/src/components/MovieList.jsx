import React, {useEffect, useContext} from 'react';
import MovieFinder from '../apis/MovieFinder';
import { MoviesContext } from '../context/MoviesContext';

// eslint-disable-next-line no-unused-vars
const MovieList = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {movies, setMovies} = useContext(MoviesContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MovieFinder.get("/");
                // eslint-disable-next-line no-unused-vars
                setMovies(response.data.data.movies);
            } catch (err) {}
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
                    <tr>
                        <td>Shawshank</td>
                        <td>Frank Darabont</td>
                        <td>9.5</td>
                        <td>98%</td>
                        <td>99%</td>
                        <td>
                            <button className="btn btn-warning">Watched</button>
                        </td>
                        <td>
                            <button className="btn btn-warning">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MovieList
