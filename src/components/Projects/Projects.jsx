import React from 'react';
import './Projects.css';
import Card from '../Card/Card';

function Projects(props) {
  return (
    <div className='projects'>
      <h2 className='projects__title'>Projects</h2>
      <div className='projects__container'>
        {props.card.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
