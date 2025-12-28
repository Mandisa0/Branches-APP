import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../services/modal/modalService';
import { setStat, getStat, PlayerStats, fireToast, updateStatsInDOM } from '../services/player/statsService';

const Menu: React.FC = () => {
  return (
    
    <div className="container">
    <div className="row">
        <div className="col">
            <button className="btn btn-secondary menu-item">
                <small style={{color: "whitesmoke"}}><i className="fa fa-book"></i><br></br><small>story</small></small>
            </button>
        </div>
        <div className="col">
            <button className="btn btn-secondary menu-item">
                <small style={{color: "whitesmoke"}}><i className="fa fa-volume-high"></i><br></br><small>sound</small></small>
            </button>
        </div>
        <div className="col">
            <button className="btn btn-secondary menu-item">
                <small style={{color: "whitesmoke"}}><i className="fa fa-sign-out"></i><br></br><small>exit</small></small>
            </button>
        </div>
    </div>
</div>

  );
};

export default Menu;
