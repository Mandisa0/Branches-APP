import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Branches: React.FC = () => {
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

                // assuming data is an array
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
            {items.map((item, index) =>
                <div className="results">
                    <div className="branch-container">
                        <div className="image">
                            <img src={item['image']} className="branchImage" />
                        </div>
                        <table className="branch-table">
                            <tr>
                                <td style={{ width: "70%", textAlign: "left" }}>
                                    <strong>{item['title']}</strong>
                                </td>
                                <td style={{ width: "70%", textAlign: "right" }}>
                                    <strong><FontAwesomeIcon icon={faPlay} /></strong>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Branches;