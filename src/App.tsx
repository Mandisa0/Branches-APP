import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Content from './components/Content';
import Branches from './components/Branches';
import Branch from './components/Branch';
import Modal from './components/Modal';
import Store from './components/Store';
import History from './components/History';
import { contentContext, modalContext, branchContext } from './Context';
import { initializeAdMob } from './services/admob/admob';
import { updateStatsInDOM } from './services/player/statsService';
import './css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const App: React.FC = () => {

  const [content, setContent] = useState("Branches");
  const [modalContent, setModalContent] = useState("Settings");
  const [branch, setBranch] = useState<[string, string, number]>(["someFile", "f", 1]);

  useEffect(() => {
    initializeAdMob();
    updateStatsInDOM();
  }, []);

  return (
    <div>


      <contentContext.Provider value={{ content, setContent }}>
        <modalContext.Provider value={{ modalContent, setModalContent }}>
          <branchContext.Provider value={{ branch, setBranch }}>

            <Header title='Branches'></Header>
            <Stats></Stats>

            <Content>
              {content === "Branches" && <Branches></Branches>}
              {content === "Branch" && <Branch></Branch>}
            </Content>

            <Modal>
              {modalContent === "Store" && <Store></Store>}
              {modalContent === "History" && <History></History>}
            </Modal>

          </branchContext.Provider>
        </modalContext.Provider>
      </contentContext.Provider>
    </div>
  );
};

export default App;