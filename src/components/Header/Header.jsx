import React from 'react';
import './Header.css';

function Header() {
  const screenWidth = window.innerWidth;

  function scrollToAbout() {
    window.scrollTo({
      top: 30,
      behavior: 'smooth',
    });
  }

  function scrollToProjects() {
    let top = 600;

    if (screenWidth >= 728 && screenWidth <= 980) {
      top = 1000;
    } else if (screenWidth <= 480) {
      top = 900;
    }

    window.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  }

  function scrollToContact() {
    window.scrollTo({
      top: 5000,
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
