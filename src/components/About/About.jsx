import React from 'react';
import './About.css';

import Social from '../Social/Social';

function About() {
  return (
    <div className='about'>
      <div className='about__image'></div>
      <div className='about__info'>
        <h2 className='about__info-title'> Javier Luis Damiani Arellano</h2>
        <p className='about__info-description'>
          I'm a skilled Fullstack Web Developer with proficiency in JavaScript,
          React, HTML, CSS, OOP, Node.js, MongoDB, Webpack, and Git. My solid
          foundation in Business Administration, along with a master's degree
          from San Martín de Porres University, uniquely positions me to
          seamlessly blend technical expertise with a deep understanding of
          business dynamics.
        </p>
        <Social />
      </div>
    </div>
  );
}

export default About;
