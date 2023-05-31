import React, { useState, useContext } from 'react'
import MovieFinder from "../apis/MovieFinder"
import { MoviesContext } from '../context/MoviesContext';

const UpdateMovie = (props) => {
    const {addMovies} = useContext(MoviesContext);
    const [text, setText] = useState(props.text);

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await MovieFinder.post("my_movies", {
    //             movie_name: movieName,
    //             director: director,
    //             release_year: year,
    //             ranking: 5.0,
    //             watched: false,
    //             in_top: false,
    //         }) 
    //         addMovies(response.data.data.movie);
            
    //         console.log(response)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }



    // https://stackoverflow.com/questions/63505919/how-to-convert-a-td-td-into-input-onclick-in-react
    if (props.editingId == props.id) {
        return (
            <div>
                <input 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                >
                </input>
            </div>
        );
    }
    else {
        return (
            <div>
                {props.text}
            </div>
        )
    }
};

export default UpdateMovie;