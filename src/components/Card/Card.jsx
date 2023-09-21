import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className='card'>
      <img src={props.card.img} alt='' className='card__img' />
      <h2 className='card__title'>{props.card.name}</h2>
      <p className='card__description'>{props.card.description}</p>
      <a
        href={props.card.link}
        className='card__link'
        target='_blank'
        rel='noreferrer'
      >
        <button className='card__link-btn'>View Project</button>
      </a>
    </div>
  );
}

export default Card;