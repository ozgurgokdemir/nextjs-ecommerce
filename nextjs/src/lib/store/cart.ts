import type { Product } from '@/lib/types';
import { create } from 'zustand';

type CartItem = Product & { quantity: number };

type Store = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  isCartOpen: boolean;
  fetchCart: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const useCartStore = create<Store>((set) => ({
  isCartOpen: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  fetchCart: () =>
    set((state) => {
      const storedCart = localStorage.getItem('cart');
      if (!storedCart) return state;

      const { cartItems } = JSON.parse(storedCart) as Pick<Store, 'cartItems'>;
      if (cartItems.length === 0) return state;

      const totalPrice = cartItems.reduce(
        (totalPrice, { price, discount, quantity }) => {
          const discountAmount = price * (discount / 100);
          return totalPrice + (price - discountAmount) * quantity;
        },
        0
      );

      const totalQuantity = cartItems.reduce(
        (totalQuantity, item) => totalQuantity + item.quantity,
        0
      );

      return { ...state, cartItems, totalPrice, totalQuantity };
    }),
  addToCart: (product, quantity) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === product.id);
      const existingProduct = state.cartItems[index];

      let updatedCartItems: CartItem[];

      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + quantity;
        const updatedProduct = {
          ...existingProduct,
          quantity: updatedQuantity,
        };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[index] = updatedProduct;
      } else {
        const newProduct = { ...product, quantity };
        updatedCartItems = [...state.cartItems, newProduct];
      }

      const discountAmount = product.price * (product.discount / 100);
      const price = product.price - discountAmount;
      const updatedTotalPrice = state.totalPrice + price * quantity;

      const updatedTotalQuantity = state.totalQuantity + quantity;

      const cart = {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity,
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...state, ...cart };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const product = state.cartItems.find((item) => item.id === id);
      if (!product) return state;

      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);

      const discountAmount = product.price * (product.discount / 100);
      const price = product.price - discountAmount;
      const updatedTotalPrice = state.totalPrice - price * product.quantity;

      const updatedTotalQuantity = state.totalQuantity - product.quantity;

      const cart = {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity,
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...state, ...cart };
    }),
  incrementQuantity: (id) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === id);
      const product = state.cartItems[index];
      if (!product) return state;

      const updatedQuantity = product.quantity + 1;
      const updatedProduct = { ...product, quantity: updatedQuantity };
      const updatedCartItems = [...state.cartItems];
      updatedCartItems[index] = updatedProduct;

      const discountAmount = product.price * (product.discount / 100);
      const price = product.price - discountAmount;
      const updatedTotalPrice = state.totalPrice + price;

      const updatedTotalQuantity = state.totalQuantity + 1;

      const cart = {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity,
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...state, ...cart };
    }),
  decrementQuantity: (id) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === id);
      const product = state.cartItems[index];
      if (!product || product.quantity - 1 < 1) return state;

      const updatedQuantity = product.quantity - 1;
      const updatedProduct = { ...product, quantity: updatedQuantity };
      const updatedCartItems = [...state.cartItems];
      updatedCartItems[index] = updatedProduct;

      const discountAmount = product.price * (product.discount / 100);
      const price = product.price - discountAmount;
      const updatedTotalPrice = state.totalPrice - price;

      const updatedTotalQuantity = state.totalQuantity - 1;

      const cart = {
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: updatedTotalQuantity,
      };

      localStorage.setItem('cart', JSON.stringify(cart));

      return { ...state, ...cart };
    }),
  openCart: () => set((state) => ({ ...state, isCartOpen: true })),
  closeCart: () => set((state) => ({ ...state, isCartOpen: false })),
}));

export default useCartStore;
