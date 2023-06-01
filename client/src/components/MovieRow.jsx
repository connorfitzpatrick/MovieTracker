import React, { useContext, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import UpdateMovie from './UpdateMovie';
import Checkbox from './Checkbox';

const MovieRow = (props) => {
  const { movies, setMovies } = useContext(MoviesContext);
  const [inputMovieText, setInputMovieText] = useState(props.m.movie_name || '');
  const [inputDirectorText, setDirectorText] = useState(props.m.director || '');
  
  const handleDelete = async (id) => {
    try {
      const response = await MovieFinder.delete(`my_movies/${id}`);
      setMovies(movies.filter((movie) => movie.id !== id));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className="trBody" key={props.m.id}>
      <td className="td">
        {props.editingId === props.m.id ? (
          <input
            type="text"
            value={inputMovieText}
            onChange={(e) => {
                setInputMovieText(e.target.value);
                props.setInputMovieName(e.target.value);
                console.log(props.inputMovieName);
              }}
          />
        ) : (
          inputMovieText
        )}
      </td>
      <td className="td">
        <UpdateMovie
          id={props.m.id}
          editingId={props.editingId}
          inputText={props.m.director}
          setInputText={setInputMovieText}
        />
      </td>
      <td className="td">
        <UpdateMovie
          id={props.m.id}
          editingId={props.editingId}
          inputText={props.m.release_year}
          setInputText={props.setInputMovieText}
        />
      </td>
      <td className="td">
        <Checkbox
          whole={props.m}
          user={props.m.id}
          isWatched={props.m.watched}
          buttonsState={props.buttonsState}
        />
      </td>
      <td>
        <button
          onClick={() => props.handleUpdateButton(props.m.id)}
          className={`btn ${props.editingId === props.m.id ? 'btn-confirm' : 'btn-warning'}`}
        >
          {props.editingId === props.m.id ? 'Confirm' : 'Update'}
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(props.m.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;