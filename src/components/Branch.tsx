import React, { useContext } from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { contentContext, branchContext } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faHandFist, faCoins, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getBranch, setCurentBranch, formatNumberWithSign, getGameStateForce } from '../services/branch/branchService';
import { getStat, PlayerStats, setStat, fireToast, updateStatsInDOM, completeBranch } from '../services/player/statsService';
import { setGameState, setGameStateForce } from '../services/branch/branchService';
import { getCurrentBranch } from '../services/branch/branchService';
import { apiUrl } from '../config.js/config';
import { addHistory } from '../services/player/statsService';
import { isOnline } from '../services/network/networkService';


const Branch: React.FC = () => {
    const content = useContext(contentContext);
    const branch = useContext(branchContext);

    const [branchTitle, setBranchTitle] = useState([]);
    const [branchText, setBranchText] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [branchImage, setBranchImage] = useState([]);
    const [nextBranch, setNextBranch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadBranch = (branchTitle: string, branchFileName: string, optionText: string, branchId: number, effects: object) => {

        isOnline().then(response => {
            if (response == false) {
                content?.setContent('Network');
                return;
            }
        })

        if(isLoading == true){
            return;
        }

        let statExit = false;
        let successStatToastText = '';
        let failStatToastText = '';
        let statData = Object;

        let checkedStats = {'health': 0, 'energy': 0, 'strength': 0, 'gold': 0};

        Object.keys(effects).forEach(key => {
            const value = effects[key as keyof typeof effects];

            if (value['health'] != undefined) {
                statData = setStat('health', value['health'] + getStat('health'));
                checkedStats.health = value['health'];
            }
            if (value['energy'] != undefined) {
                statData = setStat('energy', value['energy'] + getStat('energy'));
                checkedStats.energy = value['energy'];
            }
            if (value['strength'] != undefined) {
                statData = setStat('strength', value['strength'] + getStat('strength'));
                checkedStats.strength = value['strength'];
            }
            if (value['gold'] != undefined) {
                statData = setStat('gold', value['gold'] + getStat('gold'));
                checkedStats.gold = value['gold'];
            }


            successStatToastText += statData.successToastText;
            failStatToastText += statData.failToastText;

            if (statData.exit == true) {
                statExit = true
                return
            }

        });


        if (statExit == false) {
            addHistory("You " + optionText)
            content?.setContent("Branch");
            branch?.setBranch([branchTitle, branchFileName, Number(branchId)])
            setCurentBranch(branchTitle, branchFileName, Number(branchId))
            fireToast(successStatToastText)
        } else {

            setStat('health', getStat('health') -  checkedStats.health);
            setStat('energy', getStat('energy') - checkedStats.energy);
            setStat('strength', getStat('strength') - checkedStats.strength);
            setStat('gold', getStat('gold') - checkedStats.gold);

            fireToast(failStatToastText)
        }


        updateStatsInDOM();
    }

    useEffect(() => {

        const initializeBranch = async () => {
            try {
                const branchData = await getBranch(String(branch?.branch[1]), String(branch?.branch[2]));

                if (branchData != null) {
                    addHistory(String(branchData?.branchText))
                    setGameState('Branch');
                    setBranchImage(branchData?.branchImage);
                    setBranchText(branchData?.branchText);
                    setBranchOptions(branchData?.branchOptions);
                    setNextBranch(branchData?.nextBranchFile);
                    setIsLoading(false);
                } else {
                    completeBranch(JSON.parse(getCurrentBranch()).branchTitle);
                    localStorage.removeItem(JSON.parse(getCurrentBranch()).branchTitle);
                    content?.setContent("Branches");
                    setGameState('Branches');
                }

            } catch (e) {
                console.log('Branch Error');
            }

        };

        setIsLoading(true);
        if (nextBranch == undefined) {
            setGameState('Branches');
            content?.setContent("Branches");
        } else {
            initializeBranch();
        }

    }, [branch])

    return (
        <div>
            <div className="image">
                <img alt='' src={apiUrl + '/get/image?imageFile=' + branchImage} className="branchImage" />
            </div>

            <div className="text">
                <p className="card-text placeholder-glow">
                    {branchText}
                </p>
            </div>
            <div className="branchOptions">
                {isLoading || (branchOptions?.length > 0 && branch) ? (
                    branchOptions.map((option, index) => (
                        <div
                            key={index}
                            className="option"
                            onClick={() =>
                                loadBranch(
                                    branch.branch[0],
                                    option.branchFile,
                                    option.response,
                                    option.branchId,
                                    option.branchEffects
                                )
                            }
                        >
                            <div className="card-text placeholder-glow">
                                {option.response}
                            </div>

                            {option.branchEffects.map((effect, index) => {
                                const key = Object.keys(effect)[0];
                                const value = effect[key];

                                if (value === 0) return null;

                                let icon = null;
                                if (key === "health") icon = <FontAwesomeIcon style={{ color: "tomato" }} icon={faHeart} />;
                                else if (key === "energy") icon = <FontAwesomeIcon style={{ color: "lightblue" }} icon={faBolt} />;
                                else if (key === "strength") icon = <FontAwesomeIcon style={{ color: "burlywood" }} icon={faHandFist} />;
                                else if (key === "gold") icon = <FontAwesomeIcon style={{ color: "gold" }} icon={faCoins} />;

                                return (
                                    <div key={index} style={{ display: "inline-block", marginRight: 5 }}>
                                        <small>
                                            {icon}
                                            {formatNumberWithSign(value)}
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (

                    <div
                        key='1'
                        className="option"
                        onClick={() =>
                            loadBranch(
                                branch.branch[0],
                                nextBranch,
                                'Continue',
                                1,
                                []
                            )
                        }
                    >

                        <div style={{ display: "inline-block", marginRight: 5 }}>
                            Continue
                            <div style={{ display: "inline-block", marginLeft: 5 }}>
                                <FontAwesomeIcon style={{ color: "aqua" }} icon={faArrowRight} />
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
}

export default Branch;