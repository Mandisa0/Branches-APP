import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Branch: React.FC = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const handlePost = async () => {
            setLoading(true);

            try {
                const response = await fetch("https://phantomstudio.co.za/branches/get/branches", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await response.json();

                setItems(data.branches);
                console.log(data)
            } catch (error) {
                console.error("POST request failed:", error);
            } finally {
                setLoading(false);
            }
        };

        handlePost();

    })

    return (
        <div>
            <div className="image">
                <img className="branchImage" />
            </div>

            <div className="text">
                <p className="card-text placeholder-glow">
                    <span className="placeholder w-100 placeholder-sm"></span>
                    <span className="placeholder w-80 placeholder-sm"></span>
                    <span className="placeholder w-60 placeholder-sm"></span>
                </p>
            </div>
            <div className="branchOptions">
            {items.map((item, index) =>
                    <div className="option">
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-10 placeholder-sm"></span>
                        </p>
                    </div>
            )}
            </div>

        </div>
    );
}

export default Branch;