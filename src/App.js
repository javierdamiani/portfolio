import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useState } from 'react';
import cardData from './vendor/Data';

function App() {
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    setProjects(cardData.map((item) => item));
  }, []);
  return (
    <div className='page'>
      <Header />
      <Main card={projects} />
    </div>
  );
}

export default App;
