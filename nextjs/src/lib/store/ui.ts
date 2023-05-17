import { create } from 'zustand';

type Page = 'login' | 'register';

type AuthUI = {
  isAuthModalOpen: boolean;
  page: Page;
  openAuthModal: (page?: Page) => void;
  closeAuthModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
};

type SearchUI = {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
};

type Store = AuthUI & SearchUI;

const useUIStore = create<Store>((set) => ({
  isAuthModalOpen: false,
  page: 'login',
  isSearchModalOpen: false,
  openAuthModal: (page = 'login') =>
    set((state) => {
      return { ...state, isAuthModalOpen: true, page };
    }),
  closeAuthModal: () =>
    set((state) => {
      return { ...state, isAuthModalOpen: false };
    }),
  openLogin: () =>
    set((state) => {
      return { ...state, page: 'login' };
    }),
  openRegister: () =>
    set((state) => {
      return { ...state, page: 'register' };
    }),
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
