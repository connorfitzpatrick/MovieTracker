import React from 'react';
import Header from '../components/Header';
import AddMovie from '../components/AddMovie';
import Top250List from '../components/Top250List';
import Button from '../components/Button';
import { useState } from 'react';
import PersonalList from '../components/PersonalList';

const Home = () => {
    // State of button will determine whether the 'Top 250 List' or the 'Personal List' is displayed.    
    const [buttonState, setButtonState] = useState(false);
    const [buttonText, setButtonText] = useState("Show My Movie List");
    const handleClick = () => {
        setButtonText((buttonState == true) ? "Show My Movie List" : "Show the Top 250 Movies");
        setButtonState(!buttonState);
    }

    return (
        <div>
            <Header buttonsState={buttonState}/>
            <Button onClick={handleClick} text={buttonText}/>
            {buttonState ? <PersonalList handleClick={handleClick} buttonsState={buttonState}/> : <Top250List buttonsState={buttonState}/>}
        </div>
    );
};

export default Home;
