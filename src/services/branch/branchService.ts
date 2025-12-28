import { apiUrl } from "../../config.js/config";

type Branch = {
    image: string;
    title: string;
    description: string;
    file: string;
};

export async function getBranches() {

    try {
        const response = await fetch(apiUrl + "/get/branches", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const branchesData = await response.json();

        return { 'branches': getRandomBranches(branchesData.branches, 1) }
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
