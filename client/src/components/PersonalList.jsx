import React, {useEffect, useContext, useState} from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import AddMovie from '../components/AddMovie';
import MovieRow from '../components/MovieRow';

const PersonalList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    const [inputMovieName, setInputMovieName] = useState("");
    const [inputDirector, setInputDirector] = useState("");
    const [inputYear, setInputYear] = useState("");
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

    const handleUpdateButton = (id, m) => {
        if (editingId != -1) {
            const handleUpdate = async (id) => {
                //https://stackoverflow.com/questions/70596281/how-can-i-get-a-value-from-a-child-component-to-parent-screen-in-react-native
                try {
                    const response = await MovieFinder.put(`my_movies/${id}`, {
                        movie_name: inputMovieName,
                        director: inputDirector,
                        release_year: inputYear,
                        ranking: m.ranking,
                        watched: m.watched,
                        in_top: m.in_top
                      });
                    console.log(response.data.data);
                } catch (err) {
                    console.log(err);
                }
            }
            handleUpdate(id);
            setEditingId(-1);
        }
        else {
            setEditingId(id);
        }
    }

    return (
        <div>
            <AddMovie />
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
                    {movies && movies.map((m) => (
                    <MovieRow
                        key={m.id}
                        m={m}
                        editingId={editingId}
                        handleUpdateButton={(id) => handleUpdateButton(id, m)}
                        buttonsState={props.buttonsState}
                        // state variables and callbacks to update their value
                        inputMovieName={inputMovieName}
                        setInputMovieName={setInputMovieName}
                        inputDirector={inputDirector}
                        setInputDirector={setInputDirector}
                        inputYear={inputYear}
                        setInputYear={setInputYear}

                    />
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default PersonalList