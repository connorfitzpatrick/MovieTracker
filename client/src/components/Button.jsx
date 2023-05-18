import React from 'react';
import '../app.css'

const Button = (props) => {
  return (
    <div>
      <button className="AddButton" onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default Button;