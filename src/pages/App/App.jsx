import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import userService from '../../utils/userService';

export default function App() {
  const [user, setUser] = useState(userService.getUser());

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar user={user} handleLogout={handleLogout}/>
      </header>
      <Switch>
        <Route exact path='/' render={() =>
            <HomePage />
        }/>
        <Route exact path='/pokemon' render={() =>
            <IndexPage />
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