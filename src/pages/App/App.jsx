import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import DetailPage from '../DetailPage/DetailPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import userService from '../../utils/userService';
import pokedex from '../../utils/poke-api'

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  const max = pokedex.upperLimit();

  function handleLogout() {
    userService.logout();
    setUser(null);
  };

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar user={user} handleLogout={handleLogout}/>
      </header>
      <Switch>
        <Route exact path='/' render={() =>
            <HomePage max={max} />
        }/>
        <Route exact path='/pokemon' render={() =>
            <IndexPage max={max} />
        }/>
        <Route exact path='/pokemon/:id' render={props =>
            <DetailPage {...props} max={max} />
        }/>
        <Route exact path='/signup' render={({ history }) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>
      </Switch>
    </div>
  );
}