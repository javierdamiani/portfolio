import React from 'react';
import './Header.css';

function Header() {
  const screenWidth = window.innerWidth;
  const CV_URL =
    'https://drive.google.com/file/d/14m-A3_rNaaf6f8BhweCsV497_3Be50GH/view?usp=sharing';

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
          <a
            href={CV_URL}
            className='header__button header__button-cv'
            target='_blank'
            rel='noopener noreferrer'
          >
            Download my CV
            <span className='button-text'>
              It's free
              <div className='arrow-down'></div>
            </span>
          </a>
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
