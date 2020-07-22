import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

export default function SignupForm(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  function handleChange(e) {
    props.updateMessage('');
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.signup(state);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      props.updateMessage(err.message);
    }
  };

  function isFormInvalid() {
    return !(state.name && state.email && state.password && state.password === state.passwordConf);
  };

  return (
    <div className='w-75'>
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name" value={state.name} name="name" onChange={handleChange} />          
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" value={state.password} name="password" onChange={handleChange} />          
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Confirm Password" value={state.passwordConf} name="passwordConf" onChange={handleChange} />
        </div>
        <div className="form-group text-center mt-lg-5">
          <button className="btn btn-default pokedex" disabled={isFormInvalid()}>Sign Up</button>
          &nbsp;&nbsp;
          <Link to='/' className='pokedex hide-link-blue'>Cancel</Link>
        </div>
      </form>
    </div>
  );
}