import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Content from './components/Content';
import Branches from './components/Branches';
import Branch from './components/Branch';
import { contentContext, modalContext, branchContext } from './Context';
import { initializeAdMob } from './services/admob/admob';
import { updateStatsInDOM } from './services/player/statsService';
import './css/index.css';

export const App: React.FC = () => {

  const [content, setContent] = useState("Branches");
  const [modalContent, setModalContent] = useState("");
  const [branch, setBranch] = useState<[string, number]>(["someFile", 1]);

  useEffect(() => {
    initializeAdMob();
    updateStatsInDOM();
  }, []);

  return (
    <div>
      <Header title='Branches'></Header>
      <Stats></Stats>

      <contentContext.Provider value={{ content, setContent }}>
        <modalContext.Provider value={{ modalContent, setModalContent }}>
          <branchContext.Provider value={{ branch, setBranch }}>

            <Content>
              {content === "Branches" && <Branches></Branches>}
              {content === "Branch" && <Branch></Branch>}
            </Content>

          </branchContext.Provider>
        </modalContext.Provider>
      </contentContext.Provider>
    </div>
  );
};

export default App;