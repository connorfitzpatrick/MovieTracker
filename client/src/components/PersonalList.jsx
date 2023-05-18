import React, {useEffect, useContext} from 'react';
import { MoviesContext, ButtonContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import Checkbox from './Checkbox';

const PersonalList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MovieFinder.get("my_movies");
                setMovies(response.data.data.movies);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="table-container">
            <table className="table">
                <thead className="thead">
                    <tr className="trhead">
                        <th className="trHead" scope="col">Movie</th>
                        <th className="trHead" scope="col">Director</th>
                        <th className="trHead" scope="col">Year</th>
                        <th className="trHead" scope="col">Watched?</th>
                        <th className="trHead" scope="col">Edit</th>
                        <th className="trHead" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {movies && movies.map((m) => {
                        return (
                            <tr className="trBody" key={m.id}>
                                <td className="td">{m.movie_name}</td>
                                <td className="td">{m.director}</td>
                                <td className="td">{m.release_year}</td>
                                <td className="td">
                                    <Checkbox whole={m} user={m.id} isWatched={m.watched} buttonsState={props.buttonsState}></Checkbox>
                                </td>
                                <td>
                                    <button
                                    // onClick={(e) => handleUpdate(e, restaurant.id)}
                                    className="btn btn-warning"
                                    >
                                    Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                    // onClick={(e) => handleDelete(e, restaurant.id)}
                                    className="btn btn-danger"
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PersonalList