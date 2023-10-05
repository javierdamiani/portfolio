import React from 'react';
import './Technologies.css';
import jslogo from '../../images/icons8-javascript.svg';
import reactlogo from '../../images/icons8-react-native.svg';
import htmllogo from '../../images/icons8-html5.svg';
import csslogo from '../../images/icons8-css3.svg';
import nodejslogo from '../../images/icons8-nodejs.svg';
import mongodblogo from '../../images/mongodb-icon.svg';
import webpacklogo from '../../images/icons8-webpack.svg';

function Technologies() {
  return (
    <div className='technologies'>
      <h2 className='technologies__title'>Skills</h2>
      <div className='technologies__container'>
        <img src={htmllogo} alt='' className='technologies__logo' />
        <img src={csslogo} alt='' className='technologies__logo' />
        <img src={jslogo} alt='' className='technologies__logo' />
        <img src={reactlogo} alt='' className='technologies__logo' />
        <img src={nodejslogo} alt='' className='technologies__logo' />
        <img src={mongodblogo} alt='' className='technologies__logo' />
        <img src={webpacklogo} alt='' className='technologies__logo' />
      </div>
    </div>
  );
}

export default Technologies;
