import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

export default function LoginPage(props) {
  const [state, setState] = useState({ email: '', pw: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.login(state);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      setError('Invalid Credentials!');
    }
  };

  function isFormInvalid() {
    return !(state.email && state.pw);
  };

  return (
    <div className="container-lg">
      <h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>Log In</h1>
      <div className='d-flex flex-column align-items-center'>
        <div className='w-75'>
          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" value={state.pw} name="pw" onChange={handleChange} />
            </div>
            <div className="form-group text-center mt-lg-5">
              <button className="btn btn-default pokedex" disabled={isFormInvalid()}>Log In</button>
              &nbsp;&nbsp;&nbsp;
              <Link to='/' className='pokedex hide-link-blue'>Cancel</Link>
            </div>
          </form>
        </div>
        <h4 className='pokedex text-center my-3'>{error}</h4>
      </div>
    </div>
  );
}