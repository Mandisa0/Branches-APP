import React, { useContext } from 'react';
import { contentContext, branchContext } from '../Context';
import { useState } from "react";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Branches: React.FC = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const content = useContext(contentContext);
    const branch = useContext(branchContext);

    const loadBranch = (branchFileName: string, branchId: number) =>{
        content?.setContent("Branch");
        branch?.setBranch([branchFileName, branchId])
    }

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

                setBranches(data.branches);
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
            {branches.map((branch, index) =>
                <div key={index} className="branch-container">
                    <div className="image">
                        <img src={branch['image']} className="branchImage" />
                    </div>
                    <table className="branch-table">
                        <tbody>
                            <tr onClick={() => loadBranch(branch['file'], 1)}>
                                <td style={{ width: "70%", textAlign: "left" }}>
                                    <strong>{branch['title']}</strong>
                                </td>
                                <td style={{ width: "70%", textAlign: "right" }}>
                                    <strong><FontAwesomeIcon icon={faPlay} /></strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Branches;