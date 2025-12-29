const branchOption = new Audio('../../audio/branchOption.wav');
const openModal = new Audio('../../audio/openModal.wav');
const closeModal = new Audio('../../audio/closeModal.wav');

export function playAudio(audio: string) {

    if (audio == 'branchOption') {
        branchOption.play();
    }
    if (audio == 'openModal') {
        openModal.play();
    }
    if (audio == 'closeModal') {
        closeModal.play();
    }

}