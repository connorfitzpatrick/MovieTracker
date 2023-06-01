import React, {useEffect, useContext, useState} from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import Checkbox from './Checkbox';
import AddMovie from '../components/AddMovie';
import UpdateMovie from '../components/UpdateMovie';
import MovieRow from '../components/MovieRow';


const PersonalList = (props) => {
    const {movies, setMovies} = useContext(MoviesContext);
    const [inputMovieName, setInputMovieName] = useState("");
    const [inputDirector, setInputDirector] = useState("");
    const [inputYear, setInputYear] = useState("");
    const [updateBtnText, setUpdateBtnText] = useState("Update");
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

    const handleUpdateButton = (id) => {
        console.log(id);
        if (editingId != -1) {
            console.log(inputMovieName);
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
            setUpdateBtnText("Update")
        }
        else {
            setEditingId(id);
            setUpdateBtnText("Confirm")
        }
    }

    return (
        <div>
            <AddMovie />
            <div className="table-container">
                <table className="table centered-table">
                <thead className="thead">
                    <tr className="trhead">
                    {/* ... table headers ... */}
                    </tr>
                </thead>
                <tbody className="tbody">
                    {movies && movies.map((m) => (
                    <MovieRow
                        key={m.id}
                        m={m}
                        editingId={editingId}
                        handleUpdateButton={handleUpdateButton}
                        buttonsState={props.buttonsState}
                        // state variable and callback to update its value
                        inputMovieName={inputMovieName}
                        setInputMovieName={setInputMovieName}
                        inputDirector={inputDirector}
                        setInputDirector={setInputDirector}
                        // inputYear={inputYear}
                        // setInputYear={setInputYear}

                    />
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default PersonalList