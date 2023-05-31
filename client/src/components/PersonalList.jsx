import React, {useEffect, useContext, useState} from 'react';
import { MoviesContext, ButtonContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import Checkbox from './Checkbox';
import AddMovie from '../components/AddMovie';
import UpdateMovie from '../components/UpdateMovie';


const PersonalList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    const [editingId, setEditingId] = useState(-1);
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

    const handleEdit = (id) => {
        console.log(id);
        if (editingId != -1) {
            const handleUpdate = async (id) => {
                //https://stackoverflow.com/questions/70596281/how-can-i-get-a-value-from-a-child-component-to-parent-screen-in-react-native
                // try {
                //     const response = await MovieFinder.update(`my_movies/${id}`);
                //     console.log('response.data')
                // } catch (err) {
                //     console.log(err);
                // }
            console.log("Trying to update");
            }
            console.log({editingId});
            setEditingId(-1);
        }
        else {
            setEditingId(id);
            console.log({editingId});
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await MovieFinder.delete(`my_movies/${id}`);
            setMovies(movies.filter(movie => {
                return movie.id !== id;
            }))
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <AddMovie/>
            <div className="table-container">
                <table className="table centered-table">
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
                                    <td className="td"><UpdateMovie id={m.id} editingId={editingId} text={m.movie_name}/></td>
                                    <td className="td">{m.director}</td>
                                    <td className="td">{m.release_year}</td>
                                    <td className="td">
                                        <Checkbox whole={m} user={m.id} isWatched={m.watched} buttonsState={props.buttonsState}></Checkbox>
                                    </td>
                                    <td>
                                        <button
                                        onClick={(e) => handleEdit(m.id)}
                                        className="btn btn-warning"
                                        >
                                        Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                        onClick={() => handleDelete(m.id)}
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
        </div>
    )
}

export default PersonalList