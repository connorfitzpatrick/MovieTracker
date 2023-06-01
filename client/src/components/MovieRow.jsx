import React, { useContext, useState } from 'react';
import { MoviesContext } from '../context/MoviesContext';
import MovieFinder from '../apis/MovieFinder';
import UpdateMovie from './UpdateMovie';
import Checkbox from './Checkbox';

const MovieRow = (props) => {
  const { movies, setMovies } = useContext(MoviesContext);
  const [inputMovieText, setInputMovieText] = useState(props.m.movie_name || '');
  const [inputDirectorText, setInputDirectorText] = useState(props.m.director || '');
  const [inputYearText, setInputYearText] = useState(props.m.release_year || '');
  
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
              }}
          />
        ) : (
          inputMovieText
        )}
      </td>

      
      <td className="td">
        {props.editingId === props.m.id ? (
          <input
            type="text"
            value={inputDirectorText}
            onChange={(e) => {
                setInputDirectorText(e.target.value);
                props.setInputDirector(e.target.value);
            }}
        />
        ) : (
          inputDirectorText
        )}
      </td>

{/*        */}
<td className="td">
        {props.editingId === props.m.id ? (
          <input
            type="text"
            value={inputYearText}
            onChange={(e) => {
                setInputYearText(e.target.value);
                props.setInputYear(e.target.value);
            }}
        />
        ) : (
          inputYearText
        )}
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