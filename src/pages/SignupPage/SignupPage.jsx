import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

export default function SignupPage(props) {
  const [message, setMessage] = useState('');

  function updateMessage(msg) {
    setMessage(msg);
  };

  return (
    <div className='container-lg'>
      <h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>Sign Up</h1>
      <div className='d-flex flex-column align-items-center'>
        <SignupForm {...props} message={message} updateMessage={updateMessage} />
        <h4 className='pokedex text-center my-3'>{message}</h4>
      </div>
    </div>
  );
}