// src/store/menu.store.ts
import { create } from 'zustand';

interface MenuStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
