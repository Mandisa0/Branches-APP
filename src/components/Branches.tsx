import React, { useContext } from 'react';
import { contentContext, branchContext } from '../Context';
import { useState } from "react";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getBranches, setCurentBranch, getRandomBranchImage } from '../services/branch/branchService';
import { setGameState, setGameStateForce, getGameStateForce } from '../services/branch/branchService';
import { getCurrentBranch } from '../services/branch/branchService';

const Branches: React.FC = () => {
    const content = useContext(contentContext);
    const branch = useContext(branchContext);

    const [randomImage, setRandomImage] = useState(null);
    const [branchesData, setBranchesData] = useState([]);

    const loadBranch = (branchTitle: string, branchFileName: string, branchId: number) => {
        content?.setContent("Branch");
        branch?.setBranch([branchTitle, branchFileName, branchId])
        setCurentBranch(branchTitle, branchFileName, branchId)
    }

    useEffect(() => {
        const initializeBranches = async () => {
            const data = await getBranches();
            setBranchesData(data.branches);

            const currentImage = await getRandomBranchImage();
            setRandomImage(currentImage);

            setGameState('Branches')
        };

        var savedBranch = JSON.parse(getCurrentBranch())  

        if(savedBranch != 'undefined' && savedBranch != null){
            loadBranch(savedBranch.branchTitle, savedBranch.branchFile, savedBranch.branchId);
        }else{
            initializeBranches();
        }

    }, [])

    return (
        <div>

            <div className="image">
                <img src={randomImage} className="branchImage" />
            </div>

            <div className="branchOptions">
                {branchesData.map((branch, index) =>


                    <div
                        key={index}
                        className="option"
                        onClick={() =>
                            loadBranch(branch['title'], branch['file'], 1)
                        }
                    >
                        <div style={{ display: "inline-block", marginRight: 5 }}>
                            {branch['description']}
                            <div key={index} style={{ display: "inline-block", marginLeft: 5 }}>
                                    <FontAwesomeIcon style={{ color: "aqua" }} icon={faArrowRight} />
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Branches;