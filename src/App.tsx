import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Content from './components/Content';
import Branches from './components/Branches';
import { initializeAdMob } from './services/admob/admob';
import { updateStatsInDOM } from './services/player/statsService';
import './css/index.css';

export const App: React.FC = () => {

  const [mainContent, setMainContent] = useState("dashboard");

  useEffect(() => {
    initializeAdMob();
    updateStatsInDOM();
  }, []);

  return (
    <div>
      <Header title='Branches'></Header>
      <Stats></Stats>
      <Content>
        <Branches></Branches>
      </Content>
    </div>
  );
};

export default App;