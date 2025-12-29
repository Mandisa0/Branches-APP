import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars, faShoppingBasket, faBook } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../services/modal/modalService';
import { modalContext} from '../Context';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {

  const modalContent = useContext(modalContext);

  const updateModalContext = (context: string) => {
    showModal(context);
    modalContent?.setModalContent(context);
    console.log(modalContent)
  }

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col" style={{ textAlign: 'left' }}>
            <small onClick={() => updateModalContext("History")} style={{ color: 'whitesmoke' }}>
              <FontAwesomeIcon icon={faBook} />&nbsp;{title}
            </small>
          </div>

          <div
            id="options"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            className="col"
            style={{ textAlign: 'right' }}
          >
            <small onClick={() => updateModalContext("Store")} style={{ color: 'whitesmoke' }} data-bs-toggle="modal" data-bs-target="#modal">
              &nbsp;<FontAwesomeIcon icon={faShoppingBasket} />
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
