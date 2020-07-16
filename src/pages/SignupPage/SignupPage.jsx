import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

export default function SignupPage(props) {
  const [message, setMessage] = useState('');

  function updateMessage(msg) {
    setMessage(msg);
  };

  return (
    <div className='SignupPage'>
      <SignupForm {...props} message={message} updateMessage={updateMessage} />
      <p>{message}</p>
    </div>
  );
}