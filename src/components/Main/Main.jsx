import React from 'react';
import './Main.css';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Projects from '../Projects/Projects';
import Contact from '../Contact/Contact';

function Main(props) {
  return (
    <div className='main'>
      <About />
      <Technologies />
      <Projects card={props.card} />
      <Contact />
    </div>
  );
}

export default Main;
