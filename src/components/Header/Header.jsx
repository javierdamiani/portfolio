import React from 'react';
import './Header.css';

function Header() {
  function scrollToAbout() {
    window.scrollTo({
      top: 30,
      behavior: 'smooth',
    });
  }

  function scrollToProjects() {
    window.scrollTo({
      top: 600,
      behavior: 'smooth',
    });
  }

  function scrollToContact() {
    window.scrollTo({
      top: 3000,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <header className='header'>
        <div className='header__buttons'>
          <button className='header__button' onClick={scrollToAbout}>
            About me
          </button>
          <button className='header__button' onClick={scrollToProjects}>
            Projects
          </button>
          <button className='header__button' onClick={scrollToContact}>
            Contact
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
