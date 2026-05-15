 "use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ChefHat, 
  Package, 
  TrendingUp, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#0D0D0C] text-white font-sans selection:bg-[#F97316]/30">
      
      {/* --- ELITE TOP NAV --- */}
      <header className="sticky top-0 z-50 p-5 border-b border-zinc-800 bg-[#0D0D0C]/80 backdrop-blur-lg flex justify-between items-center">
        <div>
          <p className="text-[10px] text-[#F97316] font-black tracking-[4px] uppercase mb-0.5">Shega OS</p>
          <h1 className="text-xl font-black tracking-tight">RESTAURANT MANAGER</h1>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-400">LIVE SYNC</span>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="p-5 pb-32 space-y-6 max-w-2xl mx-auto">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-800/50">
            <div className="bg-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
              <TrendingUp size={16} className="text-[#F97316]" />
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">Today's Revenue</p>
            <p className="text-2xl font-black mt-1 text-white">ETB 0.00</p>
          </div>
          <div className="bg-zinc-900/50 p-5 rounded-[2rem] border border-zinc-800/50">
            <div className="bg-blue-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
              <ShoppingCart size={16} className="text-blue-500" />
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">Active Orders</p>
            <p className="text-2xl font-black mt-1 text-white">0</p>
          </div>
        </div>

        {/* AI PREDICTION BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A19] to-[#0D0D0C] p-6 rounded-[2.5rem] border border-zinc-800 group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#F97316] rounded-lg">
                <LayoutDashboard size={14} className="text-black" />
              </div>
              <h3 className="text-white text-xs font-black uppercase tracking-widest">Shega AI Forecast</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Connect your database to unlock <span className="text-white font-bold">real-time inventory tracking</span> and AI-driven sales predictions.
            </p>
            <div className="flex items-center gap-2 text-[#F97316] text-[10px] font-black uppercase">
              <AlertCircle size={12} />
              <span>System waiting for API handshake</span>
            </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F97316]/10 blur-[80px] rounded-full" />
        </div>

        {/* RECENT ORDERS TABLE (Placeholder) */}
        <div className="bg-[#111110] rounded-[2rem] border border-zinc-800 p-2">
           <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-zinc-500">Live Kitchen Feed</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-800 rounded-md text-zinc-400">KDS</span>
           </div>
           <div className="py-12 flex flex-col items-center justify-center opacity-20">
              <ChefHat size={40} />
              <p className="text-xs font-bold mt-2">No active tickets</p>
           </div>
        </div>

        {/* ACTION BUTTON */}
        <button className="w-full group relative bg-[#F97316] hover:bg-orange-600 active:scale-[0.98] transition-all p-5 rounded-[2rem] flex items-center justify-between overflow-hidden shadow-2xl shadow-orange-500/20">
          <span className="text-black font-black text-lg tracking-tight z-10">OPEN NEW ORDER</span>
          <div className="bg-black/10 p-2 rounded-full z-10">
            <Plus className="text-black" size={24} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>

      </main>

      {/* --- PREMIUM BOTTOM DOCK --- */}
      <footer className="fixed bottom-0 inset-x-0 pb-8 pt-4 px-6 bg-[#0D0D0C]/80 backdrop-blur-xl border-t border-zinc-800/50 z-50">
        <nav className="flex justify-between items-center max-w-md mx-auto">
          <NavIcon 
            icon={<LayoutDashboard size={20}/>} 
            label="Home" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavIcon 
            icon={<ChefHat size={20}/>} 
            label="Kitchen" 
            active={activeTab === 'kitchen'} 
            onClick={() => setActiveTab('kitchen')} 
          />
          <NavIcon 
            icon={<Package size={20}/>} 
            label="Stock" 
            active={activeTab === 'stock'} 
            onClick={() => setActiveTab('stock')} 
          />
        </nav>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-[#F97316] scale-110' : 'text-zinc-600 hover:text-zinc-400'}`}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
      {active && <div className="w-1 h-1 bg-[#F97316] rounded-full mt-0.5 shadow-[0_0_8px_#F97316]" />}
    </button>
  );
}