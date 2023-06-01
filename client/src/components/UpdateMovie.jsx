import React, { useEffect, useState, useContext } from 'react'
import MovieFinder from "../apis/MovieFinder"
import { MoviesContext } from '../context/MoviesContext';

const UpdateMovie = (props) => {
    const {addMovies} = useContext(MoviesContext);
    const [input, setInput] = useState(props.inputText);

    const handleChange = (e) => {
        setInput(e.target.value);
        props.setInputMovieName(e.target.value);
        console.log(props.inputText);
    }

    useEffect(() => {
        setInput(props.inputText);
    }, [props.inputText]);

    // https://stackoverflow.com/questions/63505919/how-to-convert-a-td-td-into-input-onclick-in-react
    if (props.editingId == props.id) {
        return (
            <div>
                <input
                    type="text"
                    value={props.inputMovieName}
                    onChange={(e) => {
                        props.setInputMovieName(e.target.value);
                        props.setInputText(e.target.value);
                    }}        
                />
            </div>
        );
    }
    else {
        return (
            <div>
                {props.inputText}
            </div>
        )
    }
};

export default UpdateMovie;