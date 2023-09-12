import React from 'react';
import logo from '../images/__logo.svg';

function Header() {
  return (
    <>
      <header className='header'>
        <img src={logo} className='header__logo' alt='logo' />
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
