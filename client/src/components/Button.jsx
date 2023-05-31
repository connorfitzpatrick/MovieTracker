import React from 'react';
import '../app.css'

const Button = (props) => {
  return (
    <div>
      <button className="btn btn-primary switch-button" onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

export default Button;