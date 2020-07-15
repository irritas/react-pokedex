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

  const handleChange = (e) => {
    props.updateMessage('');
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      props.updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(state.name && state.email && state.password && state.password === state.passwordConf);
  };

  return (
    <div>
      <header className="header-footer">Sign Up</header>
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <div className="form-group">
          <div className="col-sm-12">
            <input type="text" className="form-control" placeholder="Name" value={state.name} name="name" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="email" className="form-control" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" placeholder="Password" value={state.password} name="password" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" placeholder="Confirm Password" value={state.passwordConf} name="passwordConf" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}