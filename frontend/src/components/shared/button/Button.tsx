import React from 'react';
import './button.scss';
import { Link } from 'react-router-dom';

type ButtonProps = {
  name: string;
  color: string;
};

const Button: React.FC<ButtonProps> = props => {
  return (
    <Link to="/login" className={props.color}>
      {props.name}
    </Link>
  );
};

export default Button;
