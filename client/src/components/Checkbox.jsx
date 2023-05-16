{/*
    The checkbox's on this page use react's spring library for animations. The checkbox will represent 
    whether each movie has been watched or not. Clicking the checkbox will send a PUT method to the API,
    changing the movies watch status in the database.
*/}

import React, { useState, useEffect } from "react";
import { MoviesContext } from '../context/MoviesContext';
import MovieFinder from "../apis/MovieFinder"

import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";
import '../app.css'


const Checkbox = (props) => {
    // Grab the movie's information from its row in the list
    const movie = props.whole;
    const id=movie.id;

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

    // retrieve data from the list and have the checkbox's reflect the movies watch value in the database 
    useEffect(() => {
        const fetchData = async () => {
          const response = await MovieFinder.get(`/${id}`);
          setWatched(response.data.data.movie.watched);
        };
    
        fetchData(); 
      }, []);

    const handleChange = async (e) => {
        // send PUT to the api to change whether the movie was watched or not
        const updatedWatch = await MovieFinder.put(`/${id}`, {
            movie_name: movie.movie_name,
            director: movie.director,
            release_year: movie.release_year,
            ranking: movie.ranking,
            watched: !watched,
            in_top: movie.in_top
        });
    };
  
    return (
      <label>
        {/* send a PUT to the API when the checkbox is clicked */}
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
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