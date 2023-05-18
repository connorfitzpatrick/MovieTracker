import React, {useEffect, useContext} from 'react';
import MovieFinder from '../apis/MovieFinder';
import { MoviesContext } from '../context/MoviesContext';
import Checkbox from './Checkbox';

const Top250List = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    useEffect(() => {
        // call to backend
        const fetchData = async () => {
            try {
                // references context api. axios instance
                // adds to RestaurantFinder url ("http://localhost:3006/api/v1/restaurants")
                const response = await MovieFinder.get("movies");
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
                        <th className="trHead" scope="col">IMDB Rating</th>
                        <th className="trHead" scope="col">Watched?</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {movies && movies.map((m) => {
                        return (
                            // each child in the list must have an ID
                            <tr className="trBody" key={m.id}>
                                <td className="td">{m.movie_name}</td>
                                <td className="td">{m.director}</td>
                                <td className="td">{m.release_year}</td>
                                <td className="td">{m.ranking}</td>
                                <td className="td">
                                    <Checkbox whole={m} user={m.id} isWatched={m.watched} buttonsState={props.buttonsState}></Checkbox>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Top250List
