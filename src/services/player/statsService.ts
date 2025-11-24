export type PlayerStats = {
  health: number;
  energy: number;
  strength: number;
  gold: number;
};

export const defaultStats: PlayerStats = {
  health: 100,
  energy: 100,
  strength: 100,
  gold: 100,
};

export function getStat(key: keyof PlayerStats): number {
  const value = localStorage.getItem(key);
  return value !== null ? parseInt(value, 10) : defaultStats[key];
}

export function setStat(key: keyof PlayerStats, value: number): void {
  localStorage.setItem(key, value.toString());
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
