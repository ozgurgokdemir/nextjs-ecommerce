import { create } from 'zustand';

type Page = 'login' | 'register';

type Store = {
  isAuthModalOpen: boolean;
  page: Page;
  openAuthModal: (page?: Page) => void;
  closeAuthModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
};

const useUIStore = create<Store>((set) => ({
  isAuthModalOpen: false,
  page: 'login',
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
}));

export default useUIStore;
