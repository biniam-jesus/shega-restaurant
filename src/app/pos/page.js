"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../../store/useStore'; // Adjust path to your store location
import { 
  ShoppingCart, 
  Layers, 
  User, 
  LogOut, 
  Utensils, 
  CheckCircle, 
  Split, 
  UserCheck, 
  FileText, 
  Tag 
} from 'lucide-react';

export default function AdvancedWaiterPOS() {
  const router = useRouter();
  
  // --- GLOBAL STATE HOOKS ---
  const userRole = useStore((state) => state.userRole);
  const logout = useStore((state) => state.logout);
  const menuItems = useStore((state) => state.menuItems) || [];
  const cart = useStore((state) => state.cart) || [];
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const submitOrder = useStore((state) => state.submitOrder);

  // --- LOCAL ADVANCED FEATURE STATES ---
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [customerType, setCustomerType] = useState('Regular'); 
  const [customerNotes, setCustomerNotes] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); 
  const [splitCount, setSplitCount] = useState(1); 
  const [paymentMethod, setPaymentMethod] = useState('Cash'); 

  // --- SECURITY PATTERN: GUARD CLAUSE ---
  useEffect(() => {
    if (!userRole || (userRole !== 'waiter' && userRole !== 'manager')) {
      router.push('/'); 
    }
  }, [userRole, router]);

  if (!userRole || (userRole !== 'waiter' && userRole !== 'manager')) {
    return (
      <div className="min-h-screen bg-[#0D0D0C] text-zinc-500 flex items-center justify-center font-bold text-xs">
        Authenticating Node clearance...
      </div>
    );
  }

  // --- MATHEMATICAL REVENUE & TAX LOGIC ---
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const vatAmount = (cartSubtotal - discountAmount) * 0.15; // 15% Standard Ethiopian VAT
  const finalTotal = (cartSubtotal - discountAmount) + vatAmount;
  const splitAmount = finalTotal / splitCount;

  // --- HANDLERS ---
  const handleOrderSubmission = () => {
    if (cart.length === 0) return;
    
    // Injecting advanced UI metadata into your global submission pipeline
    submitOrder({
      table: selectedTable,
      customerTier: customerType,
      chefNotes: customerNotes,
      paymentType: paymentMethod,
      discountApplied: discountPercent,
      taxTotal: vatAmount,
      finalTotal: finalTotal
    });

    setCustomerNotes('');
    setSplitCount(1);
    alert(`Order routed successfully to KDS for ${selectedTable}!`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0C] text-white font-sans selection:bg-[#F97316]/30 pb-24">
      
      {/* --- PREMIUM STATUS HEADER --- */}
      <header className="p-5 border-b border-zinc-800 bg-[#0D0D0C]/80 backdrop-blur-lg flex justify-between items-center sticky top-0 z-40">
        <div>
          <p className="text-[10px] text-[#F97316] font-black tracking-[4px] uppercase mb-0.5">Shega OS</p>
          <h1 className="text-xl font-black tracking-tight">WAITER TERMINAL ENGINE</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
            <UserCheck size={12} className="text-[#F97316]" />
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">
              {selectedTable} ({customerType})
            </span>
          </div>
          <button 
            onClick={() => { logout(); router.push('/'); }}
            className="p-2 border border-zinc-800 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-all"
            title="Lock Node Workspace"
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* --- GRID OPERATION MATRIX --- */}
      <main className="p-5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SECTOR: MAPS, FILTERS, MENU ITEMS */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* FLOOR PLAN ENGINE */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-[2rem] space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <Layers size={12} className="text-[#F97316]" /> Table Floor Plan Management
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {['Table 1', 'Table 2', 'Table 3', 'VIP Lounge', 'Bar Zone'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTable(tab)}
                  className={`p-3 text-[11px] font-black rounded-xl uppercase tracking-wider transition-all border ${
                    selectedTable === tab 
                      ? 'bg-[#F97316] text-black border-[#F97316]' 
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOMER PROFILE & DISCOUNTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <User size={12} className="text-[#F97316]" /> Customer Account Profiling
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['Regular', 'VIP Tier', 'Loyalty'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setCustomerType(tier)}
                    className={`p-2 text-[10px] font-black rounded-lg uppercase transition-all ${
                      customerType === tier ? 'bg-zinc-800 text-[#F97316] border border-[#F97316]/30' : 'bg-zinc-900/50 text-zinc-500 border border-zinc-900'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <Tag size={12} className="text-amber-400" /> Campaign Deductions
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 10, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDiscountPercent(pct)}
                    className={`p-2 text-[10px] font-black rounded-lg uppercase transition-all ${
                      discountPercent === pct ? 'bg-zinc-800 text-amber-400 border border-amber-400/30' : 'bg-zinc-900/50 text-zinc-500 border border-zinc-900'
                    }`}
                  >
                    {pct === 0 ? 'No Disc' : `${pct}% Off`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC MENU CATALOG */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <Utensils size={12} className="text-[#F97316]" /> Menu Inventory Catalogs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center text-left hover:border-zinc-700 active:scale-[0.99] transition-all group"
                >
                  <div>
                    <p className="text-xs font-black group-hover:text-[#F97316] transition-colors">{item.name}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">ETB {item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTOR: TICKET TRAY & FISCAL CALCULATIONS */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-6 sticky top-28 space-y-6 flex flex-col justify-between min-h-[540px]">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">Active Ticket Tray</h3>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">{selectedTable} Allocation Ledger</p>
                </div>
                {cart.length > 0 && (
                  <button onClick={clearCart} className="text-[9px] text-zinc-500 hover:text-red-400 uppercase font-black tracking-wider">Flush Tray</button>
                )}
              </div>

              {/* TICKET ITEMS SCRATCH LIST */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-zinc-600 text-center py-10">Ticket tray empty. Process guest selections.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-zinc-900/40 border border-zinc-900 p-2.5 rounded-xl text-xs">
                      <span className="font-bold text-zinc-200">{item.name} <span className="text-[#F97316] font-black">x{item.qty}</span></span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-400">ETB {item.price * item.qty}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-400 font-black">✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* CHEF DIRECTIVES */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                  <FileText size={10} /> Preparation Directives (Chef Notes)
                </label>
                <input 
                  type="text" 
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g., Alicha style, separate Ayib cheese tray..."
                  className="w-full bg-zinc-900 text-xs border border-zinc-800 rounded-xl p-3 placeholder-zinc-600 focus:outline-none focus:border-[#F97316] text-zinc-200"
                />
              </div>

              {/* SPLIT BILL ADJUSTER */}
              <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Split size={10} /> Split Bill Division</span>
                <div className="flex items-center gap-2">
                  <button disabled={splitCount <= 1} onClick={() => setSplitCount(splitCount - 1)} className="w-6 h-6 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-xs font-black disabled:opacity-25">-</button>
                  <span className="text-xs font-black px-1 text-amber-500">{splitCount} Way</span>
                  <button onClick={() => setSplitCount(splitCount + 1)} className="w-6 h-6 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-xs font-black">+</button>
                </div>
              </div>
            </div>

            {/* FINANCIAL CALCULATOR FOOTER */}
            <div className="border-t border-zinc-900 pt-4 space-y-4">
              <div className="space-y-1.5 text-[11px] font-bold text-zinc-500">
                <div className="flex justify-between">
                  <span>Gross Subtotal:</span>
                  <span className="text-zinc-300">ETB {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-red-400/80">
                    <span>Campaign Discount ({discountPercent}%):</span>
                    <span>- ETB {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Invoiced VAT (15%):</span>
                  <span className="text-zinc-300">ETB {vatAmount.toLocaleString()}</span>
                </div>
                {splitCount > 1 && (
                  <div className="flex justify-between text-amber-500/80 border-t border-dashed border-zinc-900 pt-1.5">
                    <span>Each Split Share:</span>
                    <span>ETB {splitAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-1">
                  <span>Total Due:</span>
                  <span className="text-[#F97316]">ETB {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* MULTI-CHANNEL TRANSACTIONS */}
              <div className="grid grid-cols-4 gap-1">
                {['Cash', 'Telebirr', 'CBE Birr', 'Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 text-[9px] font-black rounded-lg uppercase text-center border transition-all ${
                      paymentMethod === method ? 'border-[#F97316] text-[#F97316] bg-[#F97316]/5' : 'border-zinc-900 bg-zinc-900/40 text-zinc-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleOrderSubmission}
                disabled={cart.length === 0}
                className="w-full bg-[#F97316] hover:bg-orange-600 disabled:opacity-20 text-black font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={14} /> Dispatch to Production (KDS Feed)
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}