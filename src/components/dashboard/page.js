"use client";
import React from 'react';
import TopHeader from '@/components/shared/TopHeader';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0C] text-white">
      <TopHeader pageTitle="Manager Dashboard" />
      <main className="p-6">
        <p className="text-zinc-400 text-sm">Welcome to the executive reporting module.</p>
        {/* Your financial cards & tables go here */}
      </main>
    </div>
  );
}