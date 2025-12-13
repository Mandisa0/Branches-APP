import React, { useContext } from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { contentContext, branchContext } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Branch: React.FC = () => {
    const [branchText, setBranchText] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [branchImage, setBranchImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const branch = useContext(branchContext);

    useEffect(() => {

        const handlePost = async () => {
            setLoading(true);

            try {

                const response = await fetch(`https://phantomstudio.co.za/branches/initialise/branch?branchFile=${branch?.branch[0]}&branchId=branchFile=${branch?.branch[1]}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await response.json();

                setBranchImage(data.branchImage);
                setBranchText(data.branchText);
                setBranchOptions(data.branchResponses);
                console.log(data)
            } catch (error) {
                console.error("POST request failed:", error);
            } finally {
                setLoading(false);
            }
        };

        handlePost();

    }, [])

    return (
        <div>
            <div className="image">
                <img src={'https://phantomstudio.co.za/branches/get/image?imageFile=' + branchImage} className="branchImage" />
            </div>

            <div className="text">
                <p className="card-text placeholder-glow">
                    {branchText}
                </p>
            </div>
            <div className="branchOptions">
                {branchOptions.map((option, index) => (
                    <div key={index} className="option">
                        <p className="card-text placeholder-glow">{option.response}</p>
                        {option.branchEffects.map((effect, effectIndex) => (
                            
                            effect === "health" ? (
                                <p key={effectIndex}>s</p>
                            ) : effect === "energy" ? (
                                <p key={effectIndex}>s</p>
                            ) : effect === "strength" ? (
                                <p key={effectIndex}>s</p>
                            ) : effect === "gold" ? (
                                <p key={effectIndex}>s</p>
                            ) : effect[0]

                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Branch;