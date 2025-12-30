import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faHandFist, faCoins } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../sound/soundService';

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false
});

const ToastLong = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false
});

const ToastClose = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: undefined,
  showCloseButton: true,
  timerProgressBar: false
});

export type PlayerStats = {
  health: number;
  energy: number;
  strength: number;
  gold: number;
};

export const defaultStats: PlayerStats = {
  health: 100,
  energy: 0,
  strength: 100,
  gold: 100,
};

function formatNumberWithSign(number: number) {
  if (number > 0) {
    return "+" + number;
  } else {
    return String(number); // Convert to string for consistent output
  }
}

export function getStat(key: keyof PlayerStats): number {
  const value = localStorage.getItem(key);
  return value !== null ? parseInt(value, 10) : defaultStats[key];
}

export function setStat(key: keyof PlayerStats, value: number): object {

  let successToastText = '';
  let failToastText = '';
  let exit = false;
  let stringValue = formatNumberWithSign(value - getStat(key));

  if (getStat('health') + value <= 0 && key == 'health') {
    failToastText = '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: tomato" class="fa-solid fa-heart"></i> You do not have enough health</small><br>';
    exit = true;
  } else if (exit == false && key == 'health') {
    successToastText += `<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: tomato" class="fa-solid fa-heart"></i> ` + stringValue + ` health</small><br>`;
  }

  if (getStat('energy') + value <= 0 && key == 'energy') {
    failToastText = '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: lightblue" class="fa-solid fa-bolt"></i> You do not have enough energy</small><br>';
    exit = true;
  }
  else if (exit == false && key == 'energy') {
    successToastText += '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: lightblue" class="fa-solid fa-bolt"></i> ' + stringValue + ' energy</small><br>';
  }

  if (getStat('strength') + value <= 0 && key == 'strength') {
    failToastText = '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: burlywood" class="fa-solid fa-hand-fist"></i> You do not have enough strength</small><br>';
    exit = true;
  }
  else if (exit == false && key == 'strength') {
    successToastText += '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: burlywood" class="fa-solid fa-hand-fist"></i> ' + stringValue + ' strength</small><br>';
  }

  if (getStat('gold') + value <= 0 && key == 'gold') {
    failToastText = '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: gold" class="fa-solid fa-coins"></i> You do not have enough gold</small><br>';
    exit = true;
  } else if (exit == false && key == 'gold') {
    successToastText += '<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: gold" class="fa-solid fa-coins"></i> ' + stringValue + ' gold</small><br>';
  }

  if (exit == false) {
    localStorage.setItem(key, value.toString());
  }

  return { exit: exit, successToastText: successToastText, failToastText: failToastText };

}

export function fireToast(toastText: string) {
  if (toastText != '') {
    Toast.fire({
      title: toastText
    });
    playAudio('branchOption')
  }
}

export function fireToastLong(toastText: string) {
  if (toastText != '') {
    ToastLong.fire({
      title: toastText
    });
    playAudio('branchOption')
  }
}

export function fireToastClose(toastText: string) {
  if (toastText != '') {
    ToastClose.fire({
      title: toastText
    });
    playAudio('branchOption')
  }
}

export function initializeStats(): void {
  (Object.keys(defaultStats) as Array<keyof PlayerStats>).forEach((key) => {
    if (localStorage.getItem(key) === null) {
      setStat(key, defaultStats[key]);
    }
  });
}

export function updateStatsInDOM(): void {
  (Object.keys(defaultStats) as Array<keyof PlayerStats>).forEach((key) => {
    const element = document.querySelector(`.${key}`) as HTMLElement | null;
    if (element) {
      element.textContent = getStat(key).toString();
    }
  });
}

export function completeBranch(branchTitle: string) {

  if (localStorage.getItem('completedBranches') === null) {
    localStorage.setItem('completedBranches', branchTitle);
  } else {
    var completedBranches = localStorage.getItem('completedBranches');
    localStorage.setItem('completedBranches', completedBranches + ',' + branchTitle);
  }

  fireToastLong('<small style="color: whitesmoke;margin:5px;font-size:10px"><i style="color: gold" class="fa fa-star"></i> Branch Completed: ' + branchTitle + "</small>")

}

export function getCompletedBranches(){

  return localStorage.getItem('completedBranches');
}

function capitalizeParagraph(text: string): string {
  if (!text) return '';

  // Split by sentence endings, keep the punctuation
  return text
    .split(/([.!?]\s*)/) // split by . ! ? and keep the separator
    .map(sentence => {
      // Trim any leading spaces
      const trimmed = sentence.trimStart();
      if (!trimmed) return sentence; // preserve empty parts
      // Capitalize first character
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join(''); // join back into a full paragraph
}

export function addHistory(historyText: string) {

  try {

    historyText = capitalizeParagraph(historyText)

    if (localStorage.getItem('history') === null) {
      localStorage.setItem('history', historyText);
    } else if (historyText != '' && historyText != null && historyText != 'undefined') {
      var localHistory = localStorage.getItem('history');
      var localHistoryArr = localHistory?.split('|||');

      if (!localHistoryArr?.includes(historyText)) {
        console.log(localHistory)
        localStorage.setItem('history', localHistory + '|||' + historyText )
      }

    }

  } catch (e) {
    console.log(e);
  }

}

export function getFormattedHistory() {

  var localHistoryArr = [];

  if (localStorage.getItem('history') !== null) {
    var localHistory = localStorage.getItem('history');
    localHistoryArr = localHistory?.split('|||');
  }

  return localHistoryArr;
}