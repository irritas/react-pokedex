import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

export default function SignupPage(props) {
  const [state, setState] = useState({ ...props, message: '' });

  const updateMessage = (msg) => {
    setState({ message: msg });
  };

  return (
    <div className='SignupPage'>
      <SignupForm {...state} updateMessage={updateMessage} />
      <p>{state.message}</p>
    </div>
  );
}