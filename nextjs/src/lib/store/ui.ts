import { create } from 'zustand';

type Store = {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
};

const useUIStore = create<Store>((set) => ({
  isSearchModalOpen: false,
  openSearchModal: () =>
    set((state) => {
      return { ...state, isSearchModalOpen: true };
    }),
  closeSearchModal: () =>
    set((state) => {
      return { ...state, isSearchModalOpen: false };
    }),
}));

export default useUIStore;
