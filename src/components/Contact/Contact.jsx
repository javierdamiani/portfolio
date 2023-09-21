import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_yjst1yd',
        'template_acwd5pc',
        form.current,
        'R2Ozv3-i2regffNC2'
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log('message sent');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form className='contact' ref={form} onSubmit={sendEmail}>
      <h2 className='contact__title'>Contact Me</h2>
      <label className='contact__label'>Name</label>
      <input className='contact__input' type='text' name='user_name' />
      <label className='contact__label'>Email</label>
      <input className='contact__input' type='email' name='user_email' />
      <label className='contact__label'>Message</label>
      <textarea className='contact__textarea' name='message' />
      <button className='contact__button' type='submit' value='Send'>
        Send
      </button>
    </form>
  );
};

export default Contact;
