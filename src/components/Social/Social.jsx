import React from 'react';
import './Social.css';
import githublogo from '../../images/icons8-github.svg';
import linkedinlogo from '../../images/icons8-linkedin.svg';
import pdfLogo from '../../images/pdf-svgrepo-com.svg';

function Social() {
  const githubLink = 'https://github.com/javierdamiani';
  const linkedinLink = 'https://www.linkedin.com/in/javierluisdamianiarellano/';
  const CV_URL =
    'https://drive.google.com/file/d/14m-A3_rNaaf6f8BhweCsV497_3Be50GH/view?usp=drive_link';
  return (
    <div className='social'>
      <h3 className='socia__title'>
        You can find me on the following social media platforms:
      </h3>
      <div className='social__container'>
        <a
          href={githubLink}
          className='social__container-link'
          target='_blank'
          rel='noopeneer noreferrer'
        >
          <img
            alt='Github logo'
            src={githublogo}
            href='https://github.com/javierdamiani'
            className='social__container-link-icon'
          />
        </a>
        <a
          href={linkedinLink}
          className='social__container-link'
          target='_blank'
          rel='noopeneer noreferrer'
        >
          <img
            alt='Logo de LinkedIn'
            src={linkedinlogo}
            href='https://www.linkedin.com/in/javierluisdamianiarellano/'
            className='social__container-link-icon'
          />
        </a>
        <a
          href={CV_URL}
          className='social__container-link'
          target='_blank'
          rel='noopeneer noreferrer'
        >
          <img
            alt='Logo de un archivo PDF'
            src={pdfLogo}
            className='social__container-link-icon'
          />
        </a>
      </div>
    </div>
  );
}

export default Social;
