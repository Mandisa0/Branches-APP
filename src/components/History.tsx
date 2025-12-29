import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { getFormattedHistory } from '../services/player/statsService';

const History: React.FC = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getFormattedHistory())
    }, [])

    return (

        <div className="container">
            {history.slice().reverse().map((historyText, index) => (

                <div key={index}>
                    <small style={{ fontSize: "10px" }}>
                        <FontAwesomeIcon style={{ color: "whitesmoke", fontSize: "5px" }} icon={faCircle} />&nbsp;
                        {historyText}
                    </small>
                    <div style={{margin: "10px"}}></div>
                </div>

            ))}
            <br></br>
            <br></br>
        </div>

    );
};

export default History;
