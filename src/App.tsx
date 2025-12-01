import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Content from './components/Content';
import { initializeAdMob } from './services/admob/admob';
import { updateStatsInDOM } from './services/player/statsService';
import './css/index.css';

export const App: React.FC = () => {

  const [content, setContent] = useState("dashboard");

  useEffect(() => {
    initializeAdMob();
    updateStatsInDOM();
  }, []);

  return (
    <div>
      <Header title='Branches'></Header>
      <Stats></Stats>
      <Content>
        {content === "dashboard" && <h1>Yes</h1>}
        {content === "settings" && <h1>No</h1>}
      </Content>
    </div>
  );
};

export default App;