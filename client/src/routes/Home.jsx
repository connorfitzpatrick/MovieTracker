import React from 'react';
import Header from '../components/Header';
import Top250List from '../components/Top250List';
import Button from '../components/Button';
import { useState } from 'react';
import PersonalList from '../components/PersonalList';

const Home = () => {
    // State of button will determine whether the 'Top 250 List' or the 'Personal List' is displayed.    
    const [buttonState, setButtonState] = useState(false);
    const [buttonText, setButtonText] = useState("Show My Movie Watchlist");
    const handleClick = () => {
        setButtonText((buttonState == true) ? "Show My Movie Watchlist" : "Show the Top 250 Movies");
        setButtonState(!buttonState);
    }

    return (
        <div>
            <Button onClick={handleClick} text={buttonText}/>
            <Header buttonsState={buttonState}/>
            {buttonState ? <PersonalList handleClick={handleClick} buttonsState={buttonState}/> : <Top250List buttonsState={buttonState}/>}
        </div>
    );
};

export default Home;
