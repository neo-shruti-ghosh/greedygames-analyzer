import React from 'react';
import './Card.css';

function Card({ title }) {
  return (
    <div className='Card'>
      <div className='card-title'>{title}</div>
    </div>
  );
}

export default Card;
