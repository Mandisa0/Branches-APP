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
                    <small> <FontAwesomeIcon style={{ color: "tomato" }} icon={faHeart} /> <b className="health">100</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon style={{ color: "lightblue" }} icon={faBolt} />  <b className="energy">100</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon style={{ color: "burlywood" }} icon={faHandFist} />  <b className="strength">100</b></small>
                </div>
                <div className="col">
                    <small> <FontAwesomeIcon  style={{ color: "gold" }} icon={faCoins} />  <b className="gold">100</b></small>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Stats;
