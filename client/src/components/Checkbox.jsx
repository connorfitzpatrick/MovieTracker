import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieFinder from "../apis/MovieFinder"
import { MoviesContext } from "../context/MoviesContext";

import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";
import '../app.css'


const Checkbox = (props) => {
    const id=props.user;
    const movie = props.whole;
    let history = useNavigate();
    const { movies } = useContext(MoviesContext);
    const [watched, setWatched] = useState("");
    const [isChecked, setIsChecked] = useState(props.isWatched);
    const checkboxAnimationRef = useSpringRef();
    const checkboxAnimationStyle = useSpring({
      backgroundColor: isChecked ? "#0062ff" : "#fff",
      borderColor: isChecked ? "#0062ff" : "#ddd",
      config: config.gentle,
      ref: checkboxAnimationRef
    });
  
    const [checkmarkLength, setCheckmarkLength] = useState(null);
  
    const checkmarkAnimationRef = useSpringRef();
    const checkmarkAnimationStyle = useSpring({
      x: isChecked ? 0 : checkmarkLength,
      config: config.gentle,
      ref: checkmarkAnimationRef
    });
  
    useChain(
      isChecked
        ? [checkboxAnimationRef, checkmarkAnimationRef]
        : [checkmarkAnimationRef, checkboxAnimationRef],
      [0, 0.1]
    );

    useEffect(() => {
        const fetchData = async () => {
          const response = await MovieFinder.get(`/${id}`);
          setWatched(response.data.data.movie.watched);
        };
    
        fetchData(); 
      }, []);

    const handleChange = async (e) => {
        console.log("HANDLESUBMI");
        // e.preventDefault();
        console.log(movie.movie_name);
        const updatedWatch = await MovieFinder.put(`/${id}`, {
            movie_name: movie.movie_name,
            director: movie.director,
            release_year: movie.release_year,
            ranking: movie.ranking,
            watched: !watched,
            in_top: movie.in_top
        });
        history("/");
    };
  
    return (
      <label>
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
            // (e) => setWatched(e.target.value);
            console.log("change");
            handleChange();
          }}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
          // This element is purely decorative so
          // we hide it for screen readers
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg>
      </label>
    );
  }
  
  export default Checkbox;