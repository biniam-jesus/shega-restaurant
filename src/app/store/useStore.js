import { create } from 'zustand';
import { supabase } from '../lib/supabase'; // Using your first setup link

export const useStore = create((set, get) => ({
  cart: [],
  inventory: [],

  // FUNCTION: Add item to order
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, { ...product, cartId: Date.now() }]
  })),

  // FUNCTION: Process Order (The "Brain")
  // 1. Saves Order 2. Deducts Stock 3. Updates Kitchen
  submitOrder: async (tableId, waiter) => {
    const { cart } = get();
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Save the order to Supabase
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert([{ table_id: tableId, waiter_name: waiter, items: cart, total_price: total, status: 'Pending' }])
      .select();

    if (orderErr) return { success: false, error: orderErr };

    // FUNCTIONALITY: Auto-Deduct Stock (Requirement #5)
    for (const item of cart) {
      const { error: stockErr } = await supabase.rpc('deduct_stock', {
        item_id: item.id,
        amount: 1 // or item.qty
      });
    }

    set({ cart: [] }); // Clear cart after success
    return { success: true };
  },

  // FUNCTION: Real-time Kitchen Listener
  subscribeToOrders: () => {
    return supabase
      .channel('kitchen-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
        // Logic to alert kitchen goes here
        console.log("New Order for Kitchen!", payload.new);
      })
      .subscribe();
  }
}));