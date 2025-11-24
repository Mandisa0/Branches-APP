import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col" style={{ textAlign: 'left' }}>
            <small style={{ color: 'whitesmoke' }}>
              <FontAwesomeIcon icon={faLeaf} />&nbsp;{title}
            </small>
          </div>

          <div
            id="options"
            data-bs-toggle="modal"
            data-bs-target="#modal"
            className="col"
            style={{ textAlign: 'right' }}
          >
            <small style={{ color: 'whitesmoke' }} data-bs-toggle="modal" data-bs-target="#modal">
              &nbsp;<FontAwesomeIcon icon={faBars} />
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
