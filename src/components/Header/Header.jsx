import React from 'react';
import './Header.css';

function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__buttons'>
          <button className='header__button'>About me</button>
          <button className='header__button'>Projects</button>
          <button className='header__button'>Contact</button>
        </div>
      </header>
    </>
  );
}

export default Header;
