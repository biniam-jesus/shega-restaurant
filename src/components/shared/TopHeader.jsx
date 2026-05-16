"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore'; // Adjust to '../../store/useStore' if paths aren't aliased
import { LogOut, UserCheck } from 'lucide-react';

export default function TopHeader({ pageTitle }) {
  const router = useRouter();
  const userRole = useStore((state) => state.userRole);
  const logout = useStore((state) => state.logout);

  const handleLogoutClick = () => {
    logout();          // 1. Clear global auth role state
    router.push('/');  // 2. Redirect back to gateway terminal immediately
  };

  return (
    <header className="p-5 border-b border-zinc-800 bg-[#0D0D0C]/80 backdrop-blur-lg flex justify-between items-center w-full">
      <div>
        <p className="text-[10px] text-[#F97316] font-black tracking-[4px] uppercase mb-0.5">Shega OS</p>
        <h1 className="text-xl font-black tracking-tight uppercase">{pageTitle}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Active Node Badge */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
          <UserCheck size={12} className="text-[#F97316]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">
            {userRole || 'Unauthorized'}
          </span>
        </div>
        
        {/* Logout Trigger Button */}
        <button 
          onClick={handleLogoutClick}
          className="p-2 border border-zinc-800 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-all duration-200"
          title="Exit Terminal Node"
        >
          <LogOut size={14} />
        </button>
      </div>
    </header>
  );
}