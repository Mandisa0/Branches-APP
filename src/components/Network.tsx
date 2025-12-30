import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { contentContext } from '../Context';

const Network: React.FC = () => {

    const content = useContext(contentContext);

    const retry = () => {
        content?.setContent('Branches')
    }

    return (

        <div className="container">

            <br></br>
            <br></br>

            <center>
                <small style={{ fontSize: "10px", color: "whitesmoke" }}>
                    Please Check Your Internet Connection
                </small>

                <br></br>
                <br></br>

                <button onClick={() => retry()} className='btn btn-success'>retry</button>
            </center>

            <br></br>
            <br></br>
        </div>

    );
};

export default Network;
