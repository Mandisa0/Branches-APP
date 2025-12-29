import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../services/modal/modalService';
import { setStat, getStat, PlayerStats, fireToast, updateStatsInDOM, fireToastClose } from '../services/player/statsService';
import { showRewardAd } from '../services/admob/admob';
import { hideModal } from '../services/modal/modalService';

const buyItem = (item: string, value: number, cost: number) => {

  var toastText = "";

  if (getStat('gold') - cost < 0) {
    toastText = '<small style="color: whitesmoke;margin:5px;font-size:10px">You don not have enough gold</small>';
  } else {

    var statData = setStat(item as keyof PlayerStats, value + getStat(item as keyof PlayerStats));
    toastText += statData.successToastText;

    var statData = setStat('gold', getStat('gold') - cost);
    toastText += statData.successToastText;

  }

  fireToast(toastText);
  updateStatsInDOM();

}

const buyItemReward = (item: string, value: number) => {

  var toastText = "";

  var statData = setStat(item as keyof PlayerStats, value + getStat(item as keyof PlayerStats));
  toastText += statData.successToastText;


  fireToastClose('<small style="color: whitesmoke;margin:5px;font-size:10px">Reward Granted</small><br>'+toastText);
  updateStatsInDOM();

}

const getRewardItem = (item: string, value: number) => {

  showRewardAd( (reward) => {
      hideModal()
      buyItemReward(item, value);
  });

}


const Store: React.FC = () => {
  return (
    <div className="container items">

      <div style={{ padding: "5px", paddingLeft: "10px", border: "1px solid whitesmoke", zoom: "85%", borderRadius: "5px" }} className="row">
        <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                <i style={{ color: "tomato" }} className="fa fa-heart"></i>
              </td>
              <td>
                <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
                  <tbody>
                    <tr>
                      <td>
                        <small><strong>Potion Of Health</strong></small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small>+30 health</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ width: "100px" }}>
                <center>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => buyItem('health', 30, 50)} style={{ color: "gold" }}><i className="fa fa-coins"></i> <b>50</b></small>
                  </button>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => getRewardItem('health', 30, 50)} style={{ color: "gold" }}><i className="fa fa-video-camera"></i></small>
                  </button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br></br>

      <div style={{ padding: "5px", paddingLeft: "10px", border: "1px solid whitesmoke", zoom: "85%", borderRadius: "5px" }} className="row">
        <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                <i style={{ color: "lightblue" }} className="fa fa-bolt"></i>
              </td>
              <td>
                <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
                  <tbody>
                    <tr>
                      <td>
                        <small><strong>Potion Of Energy</strong></small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small>+30 energy</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ width: "100px" }}>
                <center>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => buyItem('energy', 30, 50)} style={{ color: "gold" }}><i className="fa fa-coins"></i> <b>50</b></small>
                  </button>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => getRewardItem('energy', 30, 50)} style={{ color: "gold" }}><i className="fa fa-video-camera"></i></small>
                  </button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br></br>

      <div style={{ padding: "5px", paddingLeft: "10px", border: "1px solid whitesmoke", zoom: "85%", borderRadius: "5px" }} className="row">
        <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>
                <i style={{ color: "burlywood" }} className="fa fa-hand-fist"></i>
              </td>
              <td>
                <table style={{ width: "100%", color: "whitesmoke", border: "0px solid white" }}>
                  <tbody>
                    <tr>
                      <td>
                        <small><strong>Potion Of Strength</strong></small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small>+30 strength</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ width: "100px" }}>
                <center>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => buyItem('strength', 30, 50)} style={{ color: "gold" }}><i className="fa fa-coins"></i> <b>50</b></small>
                  </button>
                  <button style={{ backgroundColor: "grey", float: "right", width: "80px" }} className="btn btn-warning" >
                    <small onClick={() => getRewardItem('strength', 30, 50)} style={{ color: "gold" }}><i className="fa fa-video-camera"></i></small>
                  </button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Store;
