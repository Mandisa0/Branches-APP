import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faHandFist, faCoins } from '@fortawesome/free-solid-svg-icons';

const Stats: React.FC = () => {
    return (
    <div className="stats">
        <div className="container">
            <div className="row">
                <div className="col">
                    <small> <FontAwesomeIcon icon={faHeart} /> <b className="health">1000</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon icon={faBolt} />  <b className="energy">1000</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon icon={faHandFist} />  <b
                            className="strength">1000</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon icon={faCoins} />  <b className="gold">1000</b></small>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Stats;
