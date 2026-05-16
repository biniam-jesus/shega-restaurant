"use client";
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ChefHat, 
  TrendingUp, 
  CheckCircle,
  Lock,
  LogOut,
  UserCheck,
  User,
  FileText,
  Tag,
  Split,
  Utensils,
  CreditCard,
  MapPin,
  ClipboardList,
  Plus,
  Minus,
  Wallet,
  FolderPlus,
  Layers,
  MessageSquare,
  Pizza,
  Clock,
  Check,
  X,
  AlertCircle,
  BarChart3,
  ShieldCheck,
  UserPlus,
  Menu
} from 'lucide-react';

export default function Home() {
  // --- AUTHENTICATION, ROLE & IDENTITY STATE ---
  const [userRole, setUserRole] = useState(null); // 'manager', 'waiter', 'chef'
  const [currentBranch, setCurrentBranch] = useState('Shegawan'); 
  const [pin, setPin] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [authError, setAuthError] = useState('');
  
  const [loginWaiterName, setLoginWaiterName] = useState('');
  const [loginWaiterBranch, setLoginWaiterBranch] = useState('Shegawan');
  const [activeWaiterIdentity, setActiveWaiterIdentity] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- STAFF SECURITY REGISTRY ---
  const [staffRegistry, setStaffRegistry] = useState([
    { id: 'st1', name: 'Abebe Chala', pin: '2221', branch: 'Shegawan', role: 'waiter' },
    { id: 'st2', name: 'Chaltu Kekeba', pin: '2222', branch: 'Shegawan', role: 'waiter' },
    { id: 'st3', name: 'Dawit Alamu', pin: '4444', branch: 'Teymshega', role: 'waiter' }
  ]);

  const [regName, setRegName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regBranch, setRegBranch] = useState('Shegawan');

  // --- APPLICATION NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // --- MENU CREATOR STATE ---
  const [menuItems, setMenuItems] = useState([
    { id: 'm1', name: 'Special Kitfo', price: 450, megaCategory: 'Food', subCategory: 'Traditional Raw' },
    { id: 'm2', name: 'Doro Wat', price: 400, megaCategory: 'Food', subCategory: 'Traditional Stew' },
    { id: 'm3', name: 'Habesha Beer', price: 110, megaCategory: 'Drinks', subCategory: 'Alcoholic' },
    { id: 'm4', name: 'Soft Drink', price: 60, megaCategory: 'Drinks', subCategory: 'Sodas' },
  ]);

  const [activeMenuFilter, setActiveMenuFilter] = useState('All');
  const [newMegaCategory, setNewMegaCategory] = useState('Food');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');

  // --- CORE TRANSACTION DATA STATES ---
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: '101', table: '1', waiter: 'Abebe Chala', branch: 'Shegawan', customerTier: 'Regular', paymentType: 'Cash', cashAmount: 1035, telebirrAmount: 0, discountApplied: 0, taxTotal: 135, total: 1035, status: 'completed', hourLogged: 10, items: [{ cartItemId: '101_1', name: 'Special Kitfo', qty: 1, price: 450, megaCategory: 'Food', itemNote: '' }, { cartItemId: '101_2', name: 'Special Kitfo', qty: 1, price: 450, megaCategory: 'Food', itemNote: '' }] },
    { id: '102', table: '3', waiter: 'Chaltu Kekeba', branch: 'Shegawan', customerTier: 'VIP Tier', paymentType: 'Telebirr', cashAmount: 0, telebirrAmount: 713, discountApplied: 0, taxTotal: 93, total: 713, status: 'completed', hourLogged: 14, items: [{ cartItemId: '102_1', name: 'Doro Wat', qty: 1, price: 400, megaCategory: 'Food', itemNote: 'Extra egg' }, { cartItemId: '102_2', name: 'Habesha Beer', qty: 2, price: 110, megaCategory: 'Drinks', itemNote: 'Ice cold' }] }
  ]);

  // --- EXPENSE LEDGER STATES ---
  const [expenses, setExpenses] = useState([
    { id: 'e1', branch: 'Shegawan', requester: 'Manager Desk', description: 'Fresh Meat Market (Kitfo Cut)', category: 'Ingredients', amount: 4500, timestamp: '10:15 AM', status: 'Approved' },
    { id: 'e2', branch: 'Shegawan', requester: 'Manager Desk', description: 'Generator Diesel backup', category: 'Utilities', amount: 1200, timestamp: '01:30 PM', status: 'Approved' },
    { id: 'e3', branch: 'Shegawan', requester: 'Abebe Chala', description: 'Emergency Lime/Limon market buy', category: 'Ingredients', amount: 350, timestamp: '02:15 PM', status: 'Pending Approval' }
  ]);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Ingredients');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [selectedTable, setSelectedTable] = useState('1'); 
  const [customerType, setCustomerType] = useState('Regular'); 

  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0); 
  const [paymentMethod, setPaymentMethod] = useState('Cash'); 
  const [isHybrid, setIsHybrid] = useState(false);
  const [hybridCash, setHybridCash] = useState(0);
  const [hybridTelebirr, setHybridTelebirr] = useState(0);

  const rootCredentials = { manager: '1111', chef: '3333' };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    if (selectedProfile === 'manager' || selectedProfile === 'chef') {
      if (rootCredentials[selectedProfile] === pin) {
        setUserRole(selectedProfile);
        setPin('');
        if (selectedProfile === 'chef') setActiveTab('kitchen');
        else setActiveTab('dashboard');
      } else {
        setAuthError('Invalid Master Administrative PIN Key.');
        setPin('');
      }
    } 
    else if (selectedProfile === 'waiter') {
      const matchedAccount = staffRegistry.find(
        user => user.name.trim().toLowerCase() === loginWaiterName.trim().toLowerCase() &&
                user.pin === pin &&
                user.branch === loginWaiterBranch
      );

      if (matchedAccount) {
        setUserRole('waiter');
        setActiveWaiterIdentity(matchedAccount.name);
        setCurrentBranch(matchedAccount.branch);
        setPin('');
        setLoginWaiterName('');
        setActiveTab('pos'); // Open directly into ordering screen for speed on mobile
      } else {
        setAuthError('Security Match Failed.');
        setPin('');
      }
    }
  };

  const handleLogout = () => {
    setUserRole(null);          
    setSelectedProfile(null);   
    setActiveWaiterIdentity('');
    setPin('');                 
    setAuthError('');           
  };

  const handleAddNewStaff = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regPin.trim()) return;
    const newStaff = { id: 'st_' + Date.now(), name: regName.trim(), pin: regPin.trim(), branch: regBranch, role: 'waiter' };
    setStaffRegistry([...staffRegistry, newStaff]);
    setRegName(''); setRegPin('');
    alert(`Success: Registered ${newStaff.name}`);
  };

  const handleCreateMenuItem = (e) => {
    e.preventDefault();
    if (!newSubCategory.trim() || !newDishName.trim() || !newDishPrice) return;
    const newItem = { id: 'm_' + Date.now(), name: newDishName, price: parseFloat(newDishPrice), megaCategory: newMegaCategory, subCategory: newSubCategory.trim() };
    setMenuItems([...menuItems, newItem]);
    setNewDishName(''); setNewDishPrice(''); setNewSubCategory('');
    alert(`Published: ${newItem.name}`);
  };

  const addItemToCart = (item) => {
    const uniqueCartItemId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setCart([...cart, { ...item, cartItemId: uniqueCartItemId, qty: 1, itemNote: '' }]);
  };

  const removeCartItemRow = (cartItemId) => {
    setCart(cart.filter(i => i.cartItemId !== cartItemId));
  };

  const handleUpdateItemNote = (cartItemId, noteText) => {
    setCart(cart.map(i => i.cartItemId === cartItemId ? { ...i, itemNote: noteText } : i));
  };

  const getMenuTotalQtyInCart = (menuId) => {
    return cart.filter(i => i.id === menuId).reduce((sum, i) => sum + i.qty, 0);
  };

  const submitOrder = () => {
    if (cart.length === 0 || !selectedTable.trim()) return;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.15;
    const newOrder = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      items: [...cart], table: selectedTable,
      waiter: userRole === 'waiter' ? activeWaiterIdentity : 'Manager Desk',
      branch: currentBranch, customerTier: customerType, paymentType: 'Pending',
      cashAmount: 0, telebirrAmount: 0, discountApplied: 0, taxTotal: tax, total: subtotal + tax,
      status: 'pending', hourLogged: new Date().getHours()
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    alert(`Order dispatched directly to kitchen lines for Table ${selectedTable}!`);
  };

  const getPaymentCalculations = (order) => {
    if (!order) return { subtotal: 0, discount: 0, vat: 0, total: 0 };
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = (subtotal * discountPercent) / 100;
    const vat = (subtotal - discount) * 0.15;
    return { subtotal, discount, vat, total: (subtotal - discount) + vat };
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount) return;
    const newExpense = {
      id: 'e_' + Date.now(), branch: currentBranch,
      requester: userRole === 'waiter' ? activeWaiterIdentity : 'Manager Desk',
      description: expenseDesc, category: expenseCategory, amount: parseFloat(expenseAmount),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: userRole === 'manager' ? 'Approved' : 'Pending Approval'
    };
    setExpenses([newExpense, ...expenses]);
    setExpenseDesc(''); setExpenseAmount('');
    alert('Expense logged successfully.');
  };

  const handleUpdateExpenseStatus = (expenseId, targetStatus) => {
    setExpenses(expenses.map(e => e.id === expenseId ? { ...e, status: targetStatus } : e));
  };

  const processPayment = () => {
    if (!selectedPaymentOrder) return;
    const calcs = getPaymentCalculations(selectedPaymentOrder);
    let calculatedMethod = paymentMethod;
    let finalCash = paymentMethod === 'Cash' ? calcs.total : 0;
    let finalTelebirr = paymentMethod === 'Telebirr' ? calcs.total : 0;

    if (isHybrid) {
      calculatedMethod = "Hybrid";
      finalCash = parseFloat(hybridCash) || 0;
      finalTelebirr = parseFloat(hybridTelebirr) || 0;
    }

    setOrders(orders.map(o => o.id === selectedPaymentOrder.id ? {
      ...o, paymentType: calculatedMethod, cashAmount: finalCash, telebirrAmount: finalTelebirr,
      discountApplied: discountPercent, taxTotal: calcs.vat, total: calcs.total, status: 'completed'
    } : o));

    alert(`Ticket closed successfully!`);
    setSelectedPaymentOrder(null);
    setIsHybrid(false);
  };

  // --- ANALYTICS TRANSLATORS ---
  const activeBranchOrders = orders.filter(o => o.paymentType !== 'Pending' && o.branch === currentBranch);
  const totalGrossSales = activeBranchOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCashSales = activeBranchOrders.reduce((sum, o) => sum + o.cashAmount, 0);
  const totalTelebirrSales = activeBranchOrders.reduce((sum, o) => sum + o.telebirrAmount, 0);

  const filteredMenuItems = activeMenuFilter === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.megaCategory === activeMenuFilter);

  const activeBillCalculations = getPaymentCalculations(selectedPaymentOrder);

  // --- LOGIN MATRIX VIEW ---
  if (!userRole) {
    return (
      <div className="min-h-screen bg-[#F7F4EB] text-slate-800 flex flex-col justify-center items-center p-4 font-sans">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-[2rem] border border-blue-100 shadow-xl space-y-6">
          <div className="text-center">
            <p className="text-[10px] text-[#D97706] font-black tracking-[4px] uppercase mb-1">Shega OS Terminal</p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-900">SECURITY GATEWAY</h2>
          </div>

          {!selectedProfile ? (
            <div className="space-y-3 pt-2">
              {['manager', 'waiter', 'chef'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedProfile(role)}
                  className="w-full bg-[#F7F4EB]/60 border border-blue-100 hover:border-blue-600 p-4 rounded-xl flex items-center justify-between font-black uppercase text-xs tracking-wider transition-all"
                >
                  <span className="text-blue-900">{role} Node Terminal</span>
                  <Lock size={14} className="text-blue-400" />
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex justify-between items-center bg-blue-900 px-4 py-2 rounded-xl text-white">
                <span className="text-xs font-black uppercase">Node: {selectedProfile}</span>
                <button type="button" onClick={() => { setSelectedProfile(null); setAuthError(''); }} className="text-[10px] text-blue-200 underline font-bold">Back</button>
              </div>

              {selectedProfile === 'waiter' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500">Work Branch Station</label>
                    <select
                      value={loginWaiterBranch}
                      onChange={(e) => setLoginWaiterBranch(e.target.value)}
                      className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-blue-900"
                    >
                      <option value="Shegawan">Shegawan Node</option>
                      <option value="Teymshega">Teymshega Node</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500">Assigned Operator Name</label>
                    <input
                      type="text"
                      required
                      value={loginWaiterName}
                      onChange={(e) => setLoginWaiterName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-slate-800"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500">Access Key (PIN)</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-[#F7F4EB] text-center border border-blue-100 rounded-xl p-3 text-xl tracking-[0.5em] text-blue-900 focus:outline-none"
                />
              </div>

              {authError && <p className="text-red-500 text-center text-[11px] font-bold">{authError}</p>}

              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs p-3.5 rounded-xl uppercase tracking-wider hover:bg-blue-700 transition-all">
                Verify Profile Credentials
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-slate-800 font-sans pb-24 md:pb-6">
      
      {/* --- RESPONSIVE MASTER HEAD --- */}
      <header className="sticky top-0 z-50 p-4 border-b border-blue-100 bg-white/90 backdrop-blur-lg flex justify-between items-center shadow-sm">
        <div>
          <div className="flex items-center gap-1 text-[9px] text-blue-600 font-black tracking-widest uppercase">
            <span>Shega OS</span>
            <span className="text-blue-200">•</span>
            <span className="text-slate-500 flex items-center gap-0.5"><MapPin size={9} /> {currentBranch}</span>
          </div>
          <h1 className="text-base md:text-lg font-black tracking-tight uppercase text-blue-900 truncate max-w-[180px] sm:max-w-none">
            {userRole === 'waiter' ? activeWaiterIdentity : `${userRole} Control Matrix`}
          </h1>
        </div>
        
        {/* DESKTOP EXCLUSIVE NAVIGATION HEADER BAR */}
        <div className="hidden lg:flex bg-[#F7F4EB] border border-blue-100 p-1 rounded-xl items-center gap-1">
          <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Dashboard</button>
          {userRole === 'manager' && (
            <>
              <button onClick={() => setActiveTab('staffProvisioning')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'staffProvisioning' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Staff Matrix</button>
              <button onClick={() => setActiveTab('menuManager')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'menuManager' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Add Menu</button>
            </>
          )}
          <button onClick={() => setActiveTab('pos')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Ordering</button>
          <button onClick={() => setActiveTab('billing')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'billing' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Payments ({orders.filter(o => o.paymentType === 'Pending' && o.branch === currentBranch).length})</button>
          <button onClick={() => setActiveTab('expenses')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'expenses' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>Expenses</button>
          {(userRole === 'manager' || userRole === 'chef') && (
            <button onClick={() => setActiveTab('kitchen')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'kitchen' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>KDS</button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="p-2 border border-blue-100 rounded-full bg-[#F7F4EB] text-blue-950 hover:text-red-500 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* --- MAIN CORE RENDER NODE CONTAINER --- */}
      <main className="p-4 max-w-7xl mx-auto space-y-4">
        
        {/* --- 1. DASHBOARD & INTERACTIVE LIVE ANALYTICS --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
              <div>
                <span className="text-[9px] font-black text-[#D97706] tracking-widest block uppercase">Live Feed Stream</span>
                <div className="flex gap-1.5 mt-1">
                  {userRole === 'manager' ? (
                    ['Shegawan', 'Teymshega'].map((br) => (
                      <button key={br} onClick={() => setCurrentBranch(br)} className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase ${currentBranch === br ? 'bg-blue-600 text-white' : 'bg-[#F7F4EB]'}`}>{br}</button>
                    ))
                  ) : (
                    <span className="text-[10px] font-black bg-[#F7F4EB] px-2.5 py-1 border border-blue-100 rounded text-blue-900 uppercase">{currentBranch}</span>
                  )}
                </div>
              </div>
              <div className="bg-[#F7F4EB] border border-blue-100 p-3 rounded-xl w-full sm:w-auto text-left sm:text-right">
                <span className="text-[9px] font-black uppercase text-slate-500 block">Gross Revenue Rollout</span>
                <span className="text-xl font-black text-blue-600">ETB {totalGrossSales.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-blue-100 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 border-b border-blue-50 pb-1.5"><Wallet size={13} className="text-blue-600" /><h3 className="text-xs font-black uppercase text-blue-900">Cash Channel</h3></div>
                <div className="bg-[#F7F4EB]/60 p-2.5 rounded-xl border border-blue-50 flex justify-between items-center"><span className="text-xs text-slate-600 font-medium">Physical Drawer</span><span className="text-xs font-black text-emerald-600">ETB {totalCashSales}</span></div>
              </div>
              <div className="bg-white border border-blue-100 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 border-b border-blue-50 pb-1.5"><Smartphone size={13} className="text-blue-600" /><h3 className="text-xs font-black uppercase text-blue-900">Digital Gateway</h3></div>
                <div className="bg-[#F7F4EB]/60 p-2.5 rounded-xl border border-blue-50 flex justify-between items-center"><span className="text-xs text-slate-600 font-medium">Telebirr Node</span><span className="text-xs font-black text-blue-600">ETB {totalTelebirrSales}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. MOBILE QUICK ORDER TAKING (POS) MATRIX --- */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            <div className="lg:col-span-7 space-y-4">
              {/* TOUCH ACCESSIBLE CONFIG STATIONS */}
              <div className="bg-white border border-blue-100 p-3.5 rounded-xl flex items-center justify-between shadow-sm text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[8px] uppercase text-slate-400 block">Table Map</span>
                    <input type="number" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="w-12 bg-[#F7F4EB] text-center text-xs font-black p-1 border border-blue-100 rounded text-blue-900" />
                  </div>
                  <div>
                    <span className="text-[8px] uppercase text-slate-400 block">Customer Tier</span>
                    <select value={customerType} onChange={(e) => setCustomerType(e.target.value)} className="bg-white text-[10px] font-black uppercase focus:outline-none">
                      <option value="Regular">Regular</option>
                      <option value="VIP Tier">VIP Room</option>
                    </select>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] uppercase text-slate-400 block">Tray Items</span>
                  <span className="font-black text-blue-600">{cart.length} Row Items</span>
                </div>
              </div>

              {/* HORIZONTAL SWIPE MENU FILTER (MOBILE OPTIMIZED) */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x mask-image-horizontal">
                {['All', 'Food', 'Drinks', 'Hookah'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveMenuFilter(filter)}
                    className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg border tracking-wider transition-all whitespace-nowrap snap-start ${activeMenuFilter === filter ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-blue-100'}`}
                  >
                    {filter} Catalog
                  </button>
                ))}
              </div>

              {/* CARD MENU SELECTION GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredMenuItems.map((item) => {
                  const totalTapped = getMenuTotalQtyInCart(item.id);
                  return (
                    <div key={item.id} className="bg-white border border-blue-100 p-3.5 rounded-xl flex justify-between items-center shadow-sm">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-xs font-black text-blue-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-[#D97706] font-bold uppercase mt-0.5">ETB {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {totalTapped > 0 && <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2 py-1 rounded border border-blue-100">{totalTapped}</span>}
                        <button type="button" onClick={() => addItemToCart(item)} className="bg-[#F7F4EB] text-blue-900 hover:bg-blue-600 hover:text-white border border-blue-100 font-black text-xs px-3 py-2 rounded-xl transition-all active:scale-95">+ Add</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ORDER DRAWER TRAY PANEL */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-blue-100 rounded-[1.5rem] p-4 sm:p-5 space-y-4 flex flex-col justify-between min-h-[350px] shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                    <h3 className="text-xs font-black uppercase text-blue-900">Current Tray Ledger</h3>
                    {cart.length > 0 && <button type="button" onClick={() => setCart([])} className="text-[9px] text-slate-400 font-bold uppercase hover:text-red-500">Flush</button>}
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-0.5">
                    {cart.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-12 font-medium tracking-wide">PUNCH POS KEYPAD ABOVE TO LOAD TRAY</p>
                    ) : (
                      cart.map((item, index) => (
                        <div key={item.cartItemId} className="bg-[#F7F4EB]/50 p-2.5 rounded-xl border border-blue-50 space-y-2">
                          <div className="flex justify-between items-center text-xs font-black">
                            <span className="text-blue-900 truncate max-w-[180px]">#{index + 1} {item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-slate-600 font-mono">ETB {item.price}</span>
                              <button type="button" onClick={() => removeCartItemRow(item.cartItemId)} className="text-slate-300 hover:text-red-500"><X size={12} /></button>
                            </div>
                          </div>
                          <div className="relative flex items-center">
                            <MessageSquare size={10} className="absolute left-2.5 text-[#D97706]" />
                            <input type="text" value={item.itemNote} onChange={(e) => handleUpdateItemNote(item.cartItemId, e.target.value)} placeholder="Kitchen memo/instructions..." className="w-full bg-white border border-blue-100 text-[10px] pl-7 pr-2 py-1.5 rounded-lg text-slate-800 focus:outline-none" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button type="button" onClick={submitOrder} disabled={cart.length === 0} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-20 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md shadow-blue-600/10 active:scale-[0.99]">
                  Send Order Ticket to Kitchen Display
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. MOBILE OPTIMIZED INVOICES & PAYMENTS HUB --- */}
        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Active Unpaid Tickets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {orders.filter(o => o.paymentType === 'Pending' && o.branch === currentBranch).map((order) => (
                  <button key={order.id} onClick={() => setSelectedPaymentOrder(order)} className={`w-full text-left p-3.5 rounded-xl border flex justify-between items-center bg-white ${selectedPaymentOrder?.id === order.id ? 'border-blue-600 shadow-sm' : 'border-blue-50'}`}>
                    <div><p className="text-xs font-black text-blue-900">Table Station #{order.table}</p><p className="text-[9px] text-slate-400 mt-0.5">Ticket ID: {order.id}</p></div>
                    <p className="text-xs font-black text-[#D97706] font-mono">ETB {order.total}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {selectedPaymentOrder ? (
                <div className="bg-white border border-blue-100 rounded-[1.5rem] p-4 sm:p-5 space-y-4 shadow-sm">
                  <div className="border-b border-blue-50 pb-1.5 flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-black uppercase text-blue-900">Tender Configuration</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Table {selectedPaymentOrder.table} • ID: {selectedPaymentOrder.id}</p>
                    </div>
                    <button type="button" onClick={() => setSelectedPaymentOrder(null)} className="text-slate-400 text-xs font-bold">Close</button>
                  </div>

                  <div className="flex justify-between text-xs font-black text-blue-900"><span>Grand Invoiced Total:</span><span className="text-blue-600 font-mono">ETB {activeBillCalculations.total.toFixed(2)}</span></div>

                  <div className="bg-[#F7F4EB]/50 p-3.5 rounded-xl border border-blue-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-[#D97706]">Enable Dual-Split (Hybrid)</label>
                      <input type="checkbox" checked={isHybrid} onChange={(e) => { setIsHybrid(e.target.checked); if (e.target.checked) { setHybridCash((activeBillCalculations.total/2).toFixed(0)); setHybridTelebirr((activeBillCalculations.total/2).toFixed(0)); } }} className="w-4 h-4 accent-blue-600" />
                    </div>

                    {isHybrid ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div><span className="text-[8px] uppercase text-slate-400 font-bold block mb-1">Cash Component</span><input type="number" value={hybridCash} onChange={(e) => { setHybridCash(e.target.value); const rem = activeBillCalculations.total - parseFloat(e.target.value || 0); setHybridTelebirr(rem >= 0 ? rem.toFixed(0) : 0); }} className="w-full bg-white border border-blue-100 p-2 text-xs font-black rounded-lg text-emerald-600" /></div>
                        <div><span className="text-[8px] uppercase text-slate-400 font-bold block mb-1">Telebirr Component</span><input type="number" value={hybridTelebirr} onChange={(e) => { setHybridTelebirr(e.target.value); const rem = activeBillCalculations.total - parseFloat(e.target.value || 0); setHybridCash(rem >= 0 ? rem.toFixed(0) : 0); }} className="w-full bg-white border border-blue-100 p-2 text-xs font-black rounded-lg text-blue-600" /></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {['Cash', 'Telebirr'].map(m => (
                          <button key={m} onClick={() => setPaymentMethod(m)} className={`py-2 text-[10px] font-black rounded-lg uppercase border text-center ${paymentMethod === m ? 'border-blue-600 text-blue-600 bg-blue-50/20' : 'border-blue-50 text-slate-400 bg-white'}`}>{m} Solely</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={processPayment} className="w-full bg-blue-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95">Finalize Tender Invoice</button>
                </div>
              ) : (
                <div className="border border-dashed border-blue-200 rounded-[1.5rem] p-8 text-center text-slate-400 text-xs font-bold bg-white/40">Select an unpaid receipt profile from the side track.</div>
              )}
            </div>
          </div>
        )}

        {/* --- 4. EXPENSES MANAGER --- */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <form onSubmit={handleAddExpense} className="lg:col-span-5 bg-white border border-blue-100 p-4 rounded-xl space-y-3 h-fit shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">File Outflow Ledger</h3>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Expense Description</span>
                <input type="text" required value={expenseDesc} onChange={(e) => setExpenseDesc(e.target.value)} placeholder="e.g., Market Charcoal, Limes" className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Amount (ETB)</span>
                <input type="number" required value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="e.g., 400" className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs font-black text-blue-600" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs py-2.5 rounded-lg uppercase tracking-wider shadow-sm active:scale-95">File Ledger Entry</button>
            </form>

            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Live Expenses Flow</h3>
              <div className="space-y-2">
                {expenses.filter(e => e.branch === currentBranch).map((exp) => (
                  <div key={exp.id} className="bg-white border border-blue-50 p-3.5 rounded-xl flex justify-between items-center text-xs shadow-sm">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-black text-blue-900">{exp.description}</p>
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${exp.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{exp.status}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold mt-0.5">Author Node: {exp.requester}</p>
                    </div>
                    <span className="font-black text-red-600 whitespace-nowrap">- ETB {exp.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 5. KITCHEN DISPLAY MATRIX (KDS) --- */}
        {activeTab === 'kitchen' && (userRole === 'manager' || userRole === 'chef') && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-blue-100 pb-1.5">KDS Live Grid Workflow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {orders.filter(o => o.status !== 'completed' && o.branch === currentBranch).map(order => (
                <div key={order.id} className="bg-white border border-blue-100 rounded-xl p-4 flex flex-col justify-between space-y-4 shadow-sm">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 border-b border-blue-50 pb-1">
                      <span>TICKET #{order.id}</span>
                      <span className="bg-[#F7F4EB] text-blue-900 px-2 py-0.5 rounded font-mono">TABLE {order.table}</span>
                    </div>
                    <div className="pt-2.5 space-y-1.5">
                      {order.items.map((i, idx) => (
                        <p key={idx} className="text-xs font-black text-blue-900 leading-tight">🧩 {i.name} {i.itemNote && <span className="text-[10px] text-[#D97706] block font-normal pl-4">Note: {i.itemNote}</span>}</p>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={() => completeOrder(order.id)} className="w-full bg-[#F7F4EB] text-emerald-700 border border-blue-50 text-[10px] font-black py-2 rounded-lg transition-all active:bg-emerald-600 active:text-white">BUMP PRODUCTION COMPLETE</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 6. ADMINISTRATIVE CONFIG VIEWS --- */}
        {activeTab === 'staffProvisioning' && userRole === 'manager' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <form onSubmit={handleAddNewStaff} className="lg:col-span-5 bg-white border border-blue-100 p-4 rounded-xl space-y-3 shadow-sm">
              <h3 className="text-xs font-black uppercase text-blue-900">Provision Worker Access</h3>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Full Name</span>
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Worker Name" className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Pin Code Password</span>
                <input type="text" maxLength={4} required value={regPin} onChange={(e) => setRegPin(e.target.value)} placeholder="4 Digits" className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs font-mono tracking-widest text-center text-blue-600" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs py-2.5 rounded-lg uppercase tracking-wider transition-all">Authorize Node Pass</button>
            </form>
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-500">Active Registry</h3>
              {staffRegistry.map(s => (
                <div key={s.id} className="bg-white p-3 rounded-lg border border-blue-50 flex justify-between items-center text-xs shadow-sm"><p className="font-black text-blue-900">{s.name} ({s.branch})</p><span className="font-mono text-blue-600 font-bold tracking-widest">{s.pin}</span></div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menuManager' && userRole === 'manager' && (
          <div className="max-w-md mx-auto bg-white border border-blue-100 p-5 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-wider text-blue-900">Publish Dishes to POS Nodes</h2>
            <form onSubmit={handleCreateMenuItem} className="space-y-3">
              <input type="text" required placeholder="Item / Dish Name" value={newDishName} onChange={(e) => setNewDishName(e.target.value)} className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs text-slate-800" />
              <input type="number" required placeholder="Price (ETB)" value={newDishPrice} onChange={(e) => setNewDishPrice(e.target.value)} className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs text-blue-600 font-black" />
              <input type="text" required placeholder="Sub-Category Tag (e.g. Traditional)" value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} className="w-full bg-white border border-blue-100 rounded-lg p-2.5 text-xs text-slate-800" />
              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs py-2.5 rounded-lg uppercase tracking-wider">Publish to Active Menu</button>
            </form>
          </div>
        )}

      </main>

      {/* --- 📱 FIXED PERSISTENT BOTTOM NAVIGATION TAB BAR (MOBILE/TABLET ONLY) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-blue-100 px-2 py-1.5 z-50 flex justify-around items-center shadow-lg">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <LayoutDashboard size={18} />
          <span className="text-[8px] font-black uppercase mt-0.5">Stats</span>
        </button>
        <button onClick={() => setActiveTab('pos')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'pos' ? 'text-blue-600' : 'text-slate-400'}`}>
          <ShoppingCart size={18} />
          <span className="text-[8px] font-black uppercase mt-0.5">Order</span>
        </button>
        <button onClick={() => setActiveTab('billing')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'billing' ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className="relative">
            <CreditCard size={18} />
            {orders.filter(o => o.paymentType === 'Pending' && o.branch === currentBranch).length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D97706] text-white text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {orders.filter(o => o.paymentType === 'Pending' && o.branch === currentBranch).length}
              </span>
            )}
          </div>
          <span className="text-[8px] font-black uppercase mt-0.5">Pay</span>
        </button>
        <button onClick={() => setActiveTab('expenses')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'expenses' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Wallet size={18} />
          <span className="text-[8px] font-black uppercase mt-0.5">Spend</span>
        </button>
        {userRole === 'manager' && (
          <button onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setActiveTab('staffProvisioning'); }} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'staffProvisioning' || activeTab === 'menuManager' ? 'text-blue-600' : 'text-slate-400'}`}>
            <UserCheck size={18} />
            <span className="text-[8px] font-black uppercase mt-0.5">Admin</span>
          </button>
        )}
        {(userRole === 'chef') && (
          <button onClick={() => setActiveTab('kitchen')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'kitchen' ? 'text-blue-600' : 'text-slate-400'}`}>
            <ChefHat size={18} />
            <span className="text-[8px] font-black uppercase mt-0.5">KDS</span>
          </button>
        )}
      </div>

      {/* ADMIN SUB-MENU FLOATER TOGGLES (MOBILE ONLY) */}
      {mobileMenuOpen && activeTab === 'staffProvisioning' && userRole === 'manager' && (
        <div className="lg:hidden fixed bottom-14 left-4 right-4 bg-blue-900 text-white p-2 rounded-xl flex gap-2 justify-center shadow-md border border-blue-800 z-50">
          <button onClick={() => setActiveTab('staffProvisioning')} className="text-[9px] font-black uppercase bg-blue-800 px-3 py-1.5 rounded">Staff Passwords</button>
          <button onClick={() => setActiveTab('menuManager')} className="text-[9px] font-black uppercase bg-blue-800 px-3 py-1.5 rounded">Add Menu Items</button>
        </div>
      )}

    </div>
  );
}