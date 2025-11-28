import React, { FC, useEffect } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import { initializeAdMob } from './services/admob/admob';
import { updateStatsInDOM, getStat } from './services/player/statsService';
import './css/index.css';

export const App: React.FC = () => {

  useEffect(() => {
    initializeAdMob();
    getStat('health');
    updateStatsInDOM();
  }, []);

  return (
    <div>
      <Header title='Branches'></Header>
      <Stats></Stats>
    </div>
  );
};

export default App;