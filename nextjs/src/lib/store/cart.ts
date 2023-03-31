import { create } from 'zustand';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  imageAlt: string;
  category: string;
  slug: string;
};

type Store = {
  cart: Product[] | null;
  syncStoredCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

const useCartStore = create<Store>((set) => ({
  cart: null,
  syncStoredCart: () =>
    set((state) => {
      const storedCart = localStorage.getItem('cart');
      if (!storedCart) return { ...state, cart: [] };
      return { ...state, cart: JSON.parse(storedCart) as Product[] };
    }),
  addToCart: (product) =>
    set((state) => {
      const newCart = [...(state.cart ?? []), product];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const newCart = (state.cart ?? []).filter((product) => product.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }),
}));

export default useCartStore;
