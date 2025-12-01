import React, { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faHandFist, faCoins } from '@fortawesome/free-solid-svg-icons';

interface contentProps {
  children: ReactNode;
}

const Content: React.FC<contentProps> = ({children}) => {
    return (
    <div className="content">
        {children}
    </div>
    );
};

export default Content;
