import { create } from 'zustand';

export const useStore = create((set) => ({
  userRole: 'waiter', // 'waiter', 'manager', 'chef'
  menuItems: [
    { id: 'm1', name: 'Special Kitfo', price: 450, category: 'Food' },
    { id: 'm2', name: 'Doro Wat', price: 400, category: 'Food' },
    { id: 'm3', name: 'Habesha Beer', price: 110, category: 'Drinks' }
  ],
  cart: [],
  orders: [],

  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id);
    if (existing) {
      return { cart: state.cart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),

  clearCart: () => set({ cart: [] }),

  submitOrder: (metadata) => set((state) => {
    const freshOrder = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      items: state.cart,
      status: 'pending',
      ...metadata
    };
    return {
      orders: [freshOrder, ...state.orders],
      cart: []
    };
  }),

  logout: () => set({ userRole: null, cart: [] })
}));