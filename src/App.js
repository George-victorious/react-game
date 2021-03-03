import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScoreContainer from './Components/Score/ScoreContainer';
import GameContainer from './Components/Game/GameContainer';
import Footer from './Components/Footer/Footer';
import SettingsContainer from './Components/Settings/SettingsContainer';
import LoginContainer from './Components/Login/LoginContainer';
import MenuContainer from './Components/Menu/MenuContainer';

const App = () => {

  return (
    <BrowserRouter>
        <div className='App'>
          <Route exact path='/' render={() => <MenuContainer />} />
          <Route path='/game' render={() => <GameContainer />} />
          <Route path='/score' render={() => <ScoreContainer />} />
          <Route path='/settings' render={() => <SettingsContainer />} />
          <Route path='/login' render={() => <LoginContainer />} />
          <Route path='/' render={() => <Footer />} />
        </div>
    </BrowserRouter>
  )
}

export default App;