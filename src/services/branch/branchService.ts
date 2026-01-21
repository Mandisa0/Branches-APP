import { apiUrl } from "../../config.js/config";
import { getCompletedBranches } from "../player/statsService";

type Branch = {
    image: string;
    title: string;
    description: string;
    file: string;
};

export async function getBranches() {

    try {

        let endpoint = '/get/branches';

        var completedBranches = getCompletedBranches()?.split(',')

        if (
            !completedBranches?.includes('How This World Works')
        ) {
            endpoint = '/get/tutorialBranch'
        }

        const response = await fetch(apiUrl + endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const branchesData = await response.json();
        var filteredBranches = filterCompletedBranches(branchesData.branches);
        console.log(filteredBranches)

        if (localStorage.getItem('firstLaunch') == null) {
            localStorage.setItem('firstLaunch', '1')
        }

        return { 'branches': getRandomBranches(filteredBranches, 3) }
    } catch (error) {
        console.error("POST:", error);

        return null;
    }

}

export async function getBranch(branchFile: string, branchId: string) {

    if (branchFile != 'undefined' && branchFile != null && branchFile != '' && branchFile != 'null') {

        const response = await fetch(apiUrl + `/initialise/branch?branchFile=${branchFile}&branchId=${branchId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const branchData = await response.json();

        return {
            branchImage: branchData.branchImage,
            branchText: branchData.branchText,
            branchOptions: branchData.branchResponses,
            nextBranchFile: branchData.nextBranchFile
        }
    } else {

        return null;
    }
}

export function setCurentBranch(branchTitle: string, branchFile: string, branchId: number) {

    localStorage.setItem('branchTitle', branchTitle);

    localStorage.setItem(branchTitle, JSON.stringify({
        branchTitle: branchTitle,
        branchFile: branchFile,
        branchId: branchId
    }));

}

export function getCurrentBranch(): string | null {
    const branchTitle = localStorage.getItem('branchTitle');

    if (!branchTitle) return null;

    const branchData = localStorage.getItem(branchTitle);

    return branchData;
}

export function formatNumberWithSign(number: number) {
    if (number > 0) {
        return "+" + number;
    } else {
        return String(number); // Convert to string for consistent output
    }
}

export async function getRandomBranchImage() {

    try {

        const response = await fetch(apiUrl + '/get/randomImages', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const randomImages = await response.json();
        var randomImage = String(randomImages.randomImages[Math.floor(Math.random() * randomImages.randomImages.length)]);

        return randomImage;
    } catch (error) {
        console.error("POST request failed:", error);

        return null;
    }

}

function getRandomBranches(branches: Branch[], count: number = 3): Branch[] {
    return [...branches]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
}

function filterCompletedBranches(branches: Branch[]): any {

    var filteredBranches = [];
    var completedBranches = getCompletedBranches()?.split(',');
    var localHistoryArr: any = [] ;
    if (localStorage.getItem('history') !== null) {
        var localHistory = localStorage.getItem('history');
        localHistoryArr = localHistory?.split('|||');
    }

    for (let i = 0; i < branches.length; i++) {

        if (
            !completedBranches?.includes(branches[i]['title']) &&
            (completedBranches?.includes(branches[i]['requirements'])
            || branches[i]['requirements'] == null
            || localHistoryArr?.includes(branches[i]['requirements'])
            )
        ) {
            filteredBranches.push(branches[i]);
        }

    }

    return filteredBranches;
}

export function setGameState(gameState: string) {

    return localStorage.setItem('gameState', gameState);
}

export function getGameState() {

    return localStorage.getItem('gameState');
}


export function setGameStateForce(gameStateForce: string) {

    return localStorage.setItem('gameStateForce', gameStateForce);
}

export function getGameStateForce() {

    return localStorage.getItem('gameStateForce');
}
