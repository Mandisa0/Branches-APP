import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Content from './components/Content';
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
        {mainContent === "dashboard" && <h1>Yes</h1>}
        {mainContent === "settings" && <h1>No</h1>}
      </Content>
    </div>
  );
};

export default App;