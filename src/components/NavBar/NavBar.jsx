import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  let nav = props.user ?
    <>
      <Link to='' onClick={props.handleLogout} className='NavBar-link'>LOG OUT</Link>
    </>
    :
    <>
      <Link to='/login' className='NavBar-link'>Log In</Link>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='/signup' className='NavBar-link'>Sign Up</Link>
    </>;

  return (
    <div className='NavBar'>
      <Link to='/'>Home</Link>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='/pokemon'>All Pokemon</Link>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      {nav}
    </div>
  );
};