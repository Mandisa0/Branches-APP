import React, { FC, useEffect } from 'react';
import Header from './components/Header';
import { initializeAdMob } from './services/admob/admob';
import './css/index.css';

export const App: React.FC = () => {

  useEffect(() => {
    initializeAdMob();
  }, []);

  return (
    <div>
      <Header title='Branches'></Header>
      
    </div>
  );
};

export default App;