import { createContext } from 'react';

export const contentContext = createContext<{
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const modalContext = createContext<{
  modalContent: string;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const branchContext = createContext<{
  branch: [string, string, number];
  setBranch: React.Dispatch<React.SetStateAction<[string, string, number]>>;
} | null>(null);