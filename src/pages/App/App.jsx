import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import IndexPage from '../IndexPage/IndexPage';
import DetailPage from '../DetailPage/DetailPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NavBar from '../../components/NavBar/NavBar';
import userService from '../../utils/userService';
import pokedex from '../../utils/poke-api';
import profileService from '../../utils/profileService';

const max = pokedex.getUpperLimit();
const display = 12;

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user && !profile) getProfile();
  }, [user]);

  useEffect(() => {}, [profile]);

  function handleLogout() {
    userService.logout();
    setUser(null);
    setProfile(null);
  };

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  };
  
  function getFullId(id) {
    let param = '';
    if (id < 10) param = '00' + id;
    else if (id < 100) param = '0' + id;
    else param = id.toString();
    return param;
  };
  
  async function getProfile() {
    setProfile(await profileService.show());
  };

  async function updateProfile(addOrRemove, id) {
    setProfile(await profileService.update(addOrRemove, id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar user={user} handleLogout={handleLogout}/>
      </header>
      <Switch>
        <Route exact path='/' render={() =>
          <HomePage user={user} profile={profile} max={max} getFullId={getFullId} updateProfile={updateProfile} />
        }/>
        <Route exact path='/pokemon' render={() =>
          <IndexPage user={user} profile={profile} max={max} display={display} getFullId={getFullId} updateProfile={updateProfile} />
        }/>
        <Route exact path='/pokemon/:id' render={props =>
          <DetailPage {...props} user={user} profile={profile} max={max} getFullId={getFullId} updateProfile={updateProfile} />
        }/>
        <Route exact path='/profile' render={() => 
          <ProfilePage user={user} profile={profile} display={display} max={max} getFullId={getFullId} updateProfile={updateProfile} />
        }/>
        <Route exact path='/signup' render={({ history }) => 
          <SignupPage history={history} handleSignupOrLogin={handleSignupOrLogin} />
        }/>
        <Route exact path='/login' render={({ history }) => 
          <LoginPage history={history} handleSignupOrLogin={handleSignupOrLogin} />
        }/>
      </Switch>
    </div>
  );
}