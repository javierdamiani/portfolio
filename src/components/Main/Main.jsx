import React from 'react';
import './Main.css';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Projects from '../Projects/Projects';
import Contact from '../Contact/Contact';

function Main(props) {
  return (
    <>
      <About />
      <Technologies />
      <Projects card={props.card} />
      <Contact />
    </>
  );
}

export default Main;
