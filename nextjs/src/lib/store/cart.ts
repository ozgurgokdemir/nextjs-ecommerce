import type { Product } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = Product & { quantity: number };

type State = {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  isCartOpen: boolean;
};

type Action = {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const useCartStore = create<State & Action>()(
  persist(
    (set) => ({
      isCartOpen: false,
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      addToCart: (product, quantity) =>
        set((state) => {
          const index = state.cartItems.findIndex(
            (item) => item.id === product.id
          );
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

          return {
            cartItems: updatedCartItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          const product = state.cartItems.find((item) => item.id === id);
          if (!product) return state;

          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== id
          );

          const discountAmount = product.price * (product.discount / 100);
          const price = product.price - discountAmount;
          const updatedTotalPrice = state.totalPrice - price * product.quantity;

          const updatedTotalQuantity = state.totalQuantity - product.quantity;

          return {
            cartItems: updatedCartItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
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

          return {
            cartItems: updatedCartItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
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

          return {
            cartItems: updatedCartItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
        }),
      openCart: () => set(() => ({ isCartOpen: true })),
      closeCart: () => set(() => ({ isCartOpen: false })),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity,
      }),
    }
  )
);

export default useCartStore;
