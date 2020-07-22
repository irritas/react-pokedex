import React from 'react';
import './NavBar.css';
import logo from '../../images/pokedex-icon.png';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  let nav = props.user ?
    <ul className="navbar-nav ml-auto">
      <li className='nav-item'>
        <Link to='/profile' className='nav-link'>Profile</Link>
      </li>
      <li className='nav-item'>
        <Link to='/' onClick={props.handleLogout} className='nav-link'>Log Out</Link>
      </li>
    </ul>
    :
    <ul className="navbar-nav ml-auto">
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>Log In</Link>
      </li>
      <li className='nav-item'>
        <Link to='/signup' className='nav-link'>Sign Up</Link>
      </li>
    </ul>;

  return (
    <nav className='navbar navbar-expand-md sticky-top navbar-dark bg-dark pokedex trim'>
      <Link to='/' className='navbar-brand'>
        <div className="d-inline-block align-top logo-container">
          <img src={logo} alt='Logo' />
        </div>
        &nbsp;React Pokédex
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarToggle'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/pokemon' className='nav-link'>All Pokemon</Link>
          </li>
        </ul>
        {nav}
      </div>
    </nav>
  );
};