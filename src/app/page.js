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
  UserPlus
} from 'lucide-react';

export default function Home() {
  // --- AUTHENTICATION, ROLE & IDENTITY STATE ---
  const [userRole, setUserRole] = useState(null); // 'manager', 'waiter', 'chef'
  const [currentBranch, setCurrentBranch] = useState('Shegawan'); // Standardized customized branch configuration
  const [pin, setPin] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [authError, setAuthError] = useState('');
  
  // Login input fields for Waiters validating against the provisioned state
  const [loginWaiterName, setLoginWaiterName] = useState('');
  const [loginWaiterBranch, setLoginWaiterBranch] = useState('Shegawan');
  const [activeWaiterIdentity, setActiveWaiterIdentity] = useState('');

  // --- STAFF SECURITY REGISTRY (CONTROLLED EXCLUSIVELY BY MANAGER) ---
  const [staffRegistry, setStaffRegistry] = useState([
    { id: 'st1', name: 'Abebe Chala', pin: '2221', branch: 'Shegawan', role: 'waiter' },
    { id: 'st2', name: 'Chaltu Kekeba', pin: '2222', branch: 'Shegawan', role: 'waiter' },
    { id: 'st3', name: 'Dawit Alamu', pin: '4444', branch: 'Teymshega', role: 'waiter' }
  ]);

  // Manager Forms for registering new workers
  const [regName, setRegName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regBranch, setRegBranch] = useState('Shegawan');

  // --- APPLICATION NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // --- DYNAMIC INVENTORY & MENU CREATOR STATE ---
  const [menuItems, setMenuItems] = useState([
    { id: 'm1', name: 'Special Kitfo', price: 450, megaCategory: 'Food', subCategory: 'Traditional Raw' },
    { id: 'm2', name: 'Doro Wat', price: 400, megaCategory: 'Food', subCategory: 'Traditional Stew' },
    { id: 'm3', name: 'Habesha Beer', price: 110, megaCategory: 'Drinks', subCategory: 'Alcoholic' },
    { id: 'm4', name: 'Soft Drink', price: 60, megaCategory: 'Drinks', subCategory: 'Sodas' },
  ]);

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

  // --- EXPENSE MANAGEMENT LEDGER STATES (WITH APPROVAL MATRIX) ---
  const [expenses, setExpenses] = useState([
    { id: 'e1', branch: 'Shegawan', requester: 'Manager Desk', description: 'Fresh Meat Market (Kitfo Cut)', category: 'Ingredients', amount: 4500, timestamp: '10:15 AM', status: 'Approved' },
    { id: 'e2', branch: 'Shegawan', requester: 'Manager Desk', description: 'Generator Diesel Fuel backup', category: 'Utilities', amount: 1200, timestamp: '01:30 PM', status: 'Approved' },
    { id: 'e3', branch: 'Shegawan', requester: 'Abebe Chala', description: 'Emergency Lime/Limon buy from market', category: 'Ingredients', amount: 350, timestamp: '02:15 PM', status: 'Pending Approval' }
  ]);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Ingredients');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [selectedTable, setSelectedTable] = useState('1'); 
  const [customerType, setCustomerType] = useState('Regular'); 

  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0); 
  const [splitCount, setSplitCount] = useState(1); 
  const [paymentMethod, setPaymentMethod] = useState('Cash'); 
  const [isHybrid, setIsHybrid] = useState(false);
  const [hybridCash, setHybridCash] = useState(0);
  const [hybridTelebirr, setHybridTelebirr] = useState(0);

  // Root System Master PIN Keys
  const rootCredentials = { manager: '1111', chef: '3333' };

  // --- HARDENED MULTI-STEP LOGIN AUTHENTICATION ROUTINES ---
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
        setAuthError('Invalid Master Administrative PIN Key. Access Denied.');
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
        setActiveTab('dashboard');
      } else {
        setAuthError('Security Match Failed: Check Name, PIN or Branch Assignment details.');
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

    const exists = staffRegistry.some(s => s.name.toLowerCase() === regName.trim().toLowerCase() && s.branch === regBranch);
    if (exists) {
      alert("Error: A staff operator with this name is already active on this branch node.");
      return;
    }

    const newStaff = {
      id: 'st_' + Date.now(),
      name: regName.trim(),
      pin: regPin.trim(),
      branch: regBranch,
      role: 'waiter'
    };

    setStaffRegistry([...staffRegistry, newStaff]);
    setRegName('');
    setRegPin('');
    alert(`Success: ${newStaff.name} is now registered to work at branch [ ${newStaff.branch} ]. PIN: ${newStaff.pin}`);
  };

  const handleRemoveStaff = (id) => {
    setStaffRegistry(staffRegistry.filter(s => s.id !== id));
  };

  const handleCreateMenuItem = (e) => {
    e.preventDefault();
    if (!newSubCategory.trim() || !newDishName.trim() || !newDishPrice) return;

    const newItem = {
      id: 'm_' + Date.now(),
      name: newDishName,
      price: parseFloat(newDishPrice),
      megaCategory: newMegaCategory,
      subCategory: newSubCategory.trim()
    };

    setMenuItems([...menuItems, newItem]);
    setNewDishName('');
    setNewDishPrice('');
    setNewSubCategory('');
    alert(`Success: "${newItem.name}" deployed.`);
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

  const clearCart = () => setCart([]);

  const submitOrder = () => {
    if (cart.length === 0 || !selectedTable.trim()) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.15;
    const currentHour = new Date().getHours();

    const newOrder = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      items: [...cart], 
      table: selectedTable,
      waiter: userRole === 'waiter' ? activeWaiterIdentity : 'Manager Desk',
      branch: currentBranch,
      customerTier: customerType,
      paymentType: 'Pending',
      cashAmount: 0,
      telebirrAmount: 0,
      discountApplied: 0,
      taxTotal: tax,
      total: subtotal + tax,
      status: 'pending',
      hourLogged: currentHour
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
    const total = (subtotal - discount) + vat;
    return { subtotal, discount, vat, total };
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount) return;

    const initialStatus = userRole === 'manager' ? 'Approved' : 'Pending Approval';

    const newExpense = {
      id: 'e_' + Date.now(),
      branch: currentBranch,
      requester: userRole === 'waiter' ? activeWaiterIdentity : 'Manager Desk',
      description: expenseDesc,
      category: expenseCategory,
      amount: parseFloat(expenseAmount),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: initialStatus
    };

    setExpenses([newExpense, ...expenses]);
    setExpenseDesc('');
    setExpenseAmount('');
    alert(userRole === 'waiter' 
      ? 'Outflow logged! Sent directly to the manager terminal for review & signature approval.'
      : 'Expense recorded cleanly inside financial ledger.'
    );
  };

  const handleUpdateExpenseStatus = (expenseId, targetStatus) => {
    setExpenses(expenses.map(e => e.id === expenseId ? { ...e, status: targetStatus } : e));
  };

  const processPayment = () => {
    if (!selectedPaymentOrder) return;
    const calcs = getPaymentCalculations(selectedPaymentOrder);

    let calculatedMethod = paymentMethod;
    let finalCash = 0;
    let finalTelebirr = 0;

    if (isHybrid) {
      calculatedMethod = "Hybrid";
      finalCash = parseFloat(hybridCash) || 0;
      finalTelebirr = parseFloat(hybridTelebirr) || 0;

      const deviation = Math.abs((finalCash + finalTelebirr) - calcs.total);
      if (deviation > 0.05) {
        alert(`Split Combo Unbalanced. Match exact total invoice sum.`);
        return;
      }
    } else {
      if (paymentMethod === 'Cash') finalCash = calcs.total;
      if (paymentMethod === 'Telebirr') finalTelebirr = calcs.total;
    }

    setOrders(orders.map(o => o.id === selectedPaymentOrder.id ? {
      ...o,
      paymentType: calculatedMethod,
      cashAmount: finalCash,
      telebirrAmount: finalTelebirr,
      discountApplied: discountPercent,
      taxTotal: calcs.vat,
      total: calcs.total,
      status: 'completed'
    } : o));

    alert(`Payment closed successfully! Invoice cleared.`);
    setSelectedPaymentOrder(null);
    setIsHybrid(false);
  };

  const completeOrder = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'completed' } : o));
  };

  // --- GRANULAR SALES DATA ANALYTICS TRANSLATORS ---
  const activeBranchOrders = orders.filter(o => o.paymentType !== 'Pending' && o.branch === currentBranch);
  const totalGrossSales = activeBranchOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCashSales = activeBranchOrders.reduce((sum, o) => sum + o.cashAmount, 0);
  const totalTelebirrSales = activeBranchOrders.reduce((sum, o) => sum + o.telebirrAmount, 0);

  const salesByFoodType = activeBranchOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      const cat = item.megaCategory || 'Food';
      const itemCost = item.price * item.qty * 1.15; 
      acc[cat] = (acc[cat] || 0) + itemCost;
    });
    return acc;
  }, {});

  const salesByTimeSlot = activeBranchOrders.reduce((acc, order) => {
    const hr = order.hourLogged || 12;
    let slotLabel = "Late Night Shift";
    if (hr >= 6 && hr < 12) slotLabel = "Morning (06:00-12:00)";
    else if (hr >= 12 && hr < 16) slotLabel = "Afternoon Lunch (12:00-16:00)";
    else if (hr >= 16 && hr < 22) slotLabel = "Evening Dinner (16:00-22:00)";
    acc[slotLabel] = (acc[slotLabel] || 0) + order.total;
    return acc;
  }, {});

  const totalApprovedExpenses = expenses
    .filter(e => e.branch === currentBranch && e.status === 'Approved')
    .reduce((sum, e) => sum + e.amount, 0);

  const activeBillCalculations = getPaymentCalculations(selectedPaymentOrder);

  const enableHybridSetup = (checked) => {
    setIsHybrid(checked);
    if (checked && selectedPaymentOrder) {
      const targetTotal = getPaymentCalculations(selectedPaymentOrder).total;
      setHybridCash((targetTotal / 2).toFixed(2));
      setHybridTelebirr((targetTotal / 2).toFixed(2));
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-[#F7F4EB] text-slate-800 flex flex-col justify-center items-center p-6 font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] border border-blue-100/80 shadow-xl shadow-blue-900/5 space-y-6">
          <div className="text-center">
            <p className="text-[10px] text-[#D97706] font-black tracking-[4px] uppercase mb-1">Shega OS Terminal</p>
            <h2 className="text-2xl font-black tracking-tight text-blue-900">GATEWAY SECURITY GATE</h2>
          </div>

          {!selectedProfile ? (
            <div className="space-y-3 pt-4">
              {['manager', 'waiter', 'chef'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedProfile(role)}
                  className="w-full bg-[#F7F4EB]/60 border border-blue-100 hover:border-blue-600 p-4 rounded-2xl flex items-center justify-between font-black uppercase text-xs tracking-wider group transition-all"
                >
                  <span className="group-hover:text-blue-600 text-blue-900">{role} Node Terminal</span>
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
                    <label className="text-[10px] uppercase font-black tracking-wider text-slate-500">Select Work Station Branch</label>
                    <select
                      value={loginWaiterBranch}
                      onChange={(e) => setLoginWaiterBranch(e.target.value)}
                      className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-blue-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Shegawan">Shegawan Node</option>
                      <option value="Teymshega">Teymshega Node</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-wider text-slate-500">Registered Worker Name</label>
                    <input
                      type="text"
                      required
                      value={loginWaiterName}
                      onChange={(e) => setLoginWaiterName(e.target.value)}
                      placeholder="Enter full name assigned by manager"
                      className="w-full bg-white border border-blue-100 rounded-xl p-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-500">Security Access Code (PIN)</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-[#F7F4EB] text-center border border-blue-100 rounded-xl p-4 text-xl tracking-[1em] text-blue-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {authError && <p className="text-red-500 text-center text-[11px] font-bold">{authError}</p>}

              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs p-4 rounded-xl tracking-wider uppercase hover:bg-blue-700 shadow-md shadow-blue-600/20">
                Verify Registry Profile
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-slate-800 font-sans selection:bg-blue-200">
      
      {/* --- LITERATURE THEMED RESTAURANT HEADER --- */}
      <header className="sticky top-0 z-50 p-5 border-b border-blue-100 bg-white/90 backdrop-blur-lg flex justify-between items-center shadow-sm">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-black tracking-[4px] uppercase mb-0.5">
            <span>Shega OS</span>
            <span className="text-blue-200">•</span>
            <span className="text-slate-500 flex items-center gap-0.5"><MapPin size={10} /> {currentBranch}</span>
          </div>
          <h1 className="text-xl font-black tracking-tight uppercase text-blue-900">
            {userRole === 'waiter' ? `${activeWaiterIdentity} (Staff Node)` : `${userRole} Control Matrix`}
          </h1>
        </div>
        
        {/* NAVIGATION CONTROL GRID */}
        <div className="hidden md:flex bg-[#F7F4EB] border border-blue-100 p-1 rounded-xl items-center gap-1">
          <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Dashboard & Sales</button>
          
          {userRole === 'manager' && (
            <>
              <button onClick={() => setActiveTab('staffProvisioning')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'staffProvisioning' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Staff Passwords & Registry</button>
              <button onClick={() => setActiveTab('menuManager')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'menuManager' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Add Menu Matrix</button>
            </>
          )}

          {(userRole === 'manager' || userRole === 'waiter') && (
            <>
              <button onClick={() => setActiveTab('pos')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Order Taking</button>
              <button onClick={() => setActiveTab('expenses')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'expenses' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>
                {userRole === 'waiter' ? 'Spend Money (Request)' : 'Expense & Approvals'}
              </button>
              <button onClick={() => setActiveTab('billing')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'billing' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Payment Hub</button>
            </>
          )}
          {(userRole === 'manager' || userRole === 'chef') && (
            <button onClick={() => setActiveTab('kitchen')} className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-lg transition-colors ${activeTab === 'kitchen' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>Kitchen Display</button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="p-2 border border-blue-100 rounded-full bg-[#F7F4EB] text-blue-950 hover:text-red-500 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <main className="p-5 pb-32 max-w-7xl mx-auto">
        
        {/* --- 1. DUAL SALES ANALYTICS ENGINE (SHARED VIEW) --- */}
        {activeTab === 'dashboard' && (userRole === 'manager' || userRole === 'waiter') && (
          <div className="space-y-6">
            
            <div className="bg-white border border-blue-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div>
                <span className="text-[9px] font-black text-[#D97706] tracking-widest block uppercase mb-1">Live Analytics Terminal</span>
                <div className="flex gap-1.5">
                  {userRole === 'manager' ? (
                    ['Shegawan', 'Teymshega'].map((br) => (
                      <button key={br} onClick={() => setCurrentBranch(br)} className={`px-3 py-1.5 text-[10px] font-black rounded-lg uppercase transition-all ${currentBranch === br ? 'bg-blue-600 text-white shadow-sm' : 'bg-[#F7F4EB] text-slate-600'}`}>{br}</button>
                    ))
                  ) : (
                    <span className="text-xs font-black bg-[#F7F4EB] px-3 py-1.5 border border-blue-100 rounded-lg text-blue-900 uppercase">{currentBranch}</span>
                  )}
                </div>
              </div>
              <div className="bg-[#F7F4EB] border border-blue-100 p-3 rounded-xl text-right">
                <span className="text-[9px] font-black uppercase text-slate-500 block">Gross Sales Revenue</span>
                <span className="text-2xl font-black text-blue-600">ETB {totalGrossSales.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* TRACK BY FOOD TYPE */}
              <div className="bg-white border border-blue-100 p-5 rounded-[2rem] space-y-3 shadow-sm">
                <div className="flex items-center gap-2 border-b border-blue-50 pb-2">
                  <Pizza size={14} className="text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">Sales by Food Type</h3>
                </div>
                <div className="space-y-2">
                  {Object.keys(salesByFoodType).length === 0 ? (
                    <p className="text-[10px] text-slate-400 font-bold uppercase py-4">No active catalog sales data</p>
                  ) : (
                    Object.entries(salesByFoodType).map(([type, totalAmt]) => (
                      <div key={type} className="flex justify-between items-center text-xs bg-[#F7F4EB]/60 p-2.5 rounded-xl border border-blue-50">
                        <span className="font-bold text-slate-600">🍱 {type} Catalog</span>
                        <span className="font-black text-blue-900">ETB {totalAmt.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* TRACK BY TIME METRICS */}
              <div className="bg-white border border-blue-100 p-5 rounded-[2rem] space-y-3 shadow-sm">
                <div className="flex items-center gap-2 border-b border-blue-50 pb-2">
                  <Clock size={14} className="text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">Sales by Time Slot</h3>
                </div>
                <div className="space-y-2">
                  {Object.keys(salesByTimeSlot).length === 0 ? (
                    <p className="text-[10px] text-slate-400 font-bold uppercase py-4">No hourly distribution recorded</p>
                  ) : (
                    Object.entries(salesByTimeSlot).map(([slot, totalAmt]) => (
                      <div key={slot} className="flex justify-between items-center text-xs bg-[#F7F4EB]/60 p-2.5 rounded-xl border border-blue-50">
                        <span className="font-bold text-slate-600">{slot}</span>
                        <span className="font-black text-blue-900">ETB {totalAmt.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* TRACK BY PAYMENT CHANNELS */}
              <div className="bg-white border border-blue-100 p-5 rounded-[2rem] space-y-3 shadow-sm">
                <div className="flex items-center gap-2 border-b border-blue-50 pb-2">
                  <Wallet size={14} className="text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">Sales Channel Breakdown</h3>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs bg-[#F7F4EB]/60 p-3 rounded-xl border border-blue-50">
                    <span className="font-bold text-slate-600">💵 Physical Cash</span>
                    <span className="font-black text-emerald-600">ETB {totalCashSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs bg-[#F7F4EB]/60 p-3 rounded-xl border border-blue-50">
                    <span className="font-bold text-slate-600">📱 Telebirr API Gateway</span>
                    <span className="font-black text-blue-600">ETB {totalTelebirrSales.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- 2. MANAGER REGISTER MATRIX (STAFF PROVISIONING GATE) --- */}
        {activeTab === 'staffProvisioning' && userRole === 'manager' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* PROVISION NEW STAFF CONTROL FORM */}
            <form onSubmit={handleAddNewStaff} className="lg:col-span-5 bg-white border border-blue-100 p-6 rounded-[2.5rem] space-y-4 h-fit shadow-sm">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5"><UserPlus size={14} className="text-blue-600" /> Registry Provisioning</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Create staff credentials & passwords</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Assign Station Branch Node</span>
                <select value={regBranch} onChange={(e) => setRegBranch(e.target.value)} className="w-full bg-[#F7F4EB]/60 border border-blue-100 rounded-xl p-3 text-xs font-bold text-blue-900 focus:outline-none">
                  <option value="Shegawan">Shegawan</option>
                  <option value="Teymshega">Teymshega</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Full Employee Name</span>
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="e.g., Chaltu Kekeba" className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600" />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Assign 4-Digit Login Password (PIN)</span>
                <input type="text" maxLength={4} required value={regPin} onChange={(e) => setRegPin(e.target.value)} placeholder="e.g., 2525" className="w-full bg-[#F7F4EB] border border-blue-100 rounded-xl p-3 text-xs font-black text-blue-600 text-center tracking-[0.5em] focus:outline-none" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all hover:bg-blue-700 shadow-md shadow-blue-600/10">
                Authorize Profile & Lock to Node
              </button>
            </form>

            {/* LIVE ACTIVE OPERATOR DIRECTORY DATABASE */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> Active System Registry Directory</h3>
              <div className="space-y-2">
                {staffRegistry.map((staff) => (
                  <div key={staff.id} className="bg-white border border-blue-50 p-4 rounded-xl flex justify-between items-center text-xs shadow-sm">
                    <div>
                      <p className="font-black text-blue-900">{staff.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black bg-[#F7F4EB] px-2 py-0.5 rounded border border-blue-100 text-slate-600 uppercase flex items-center gap-1"><MapPin size={8} /> {staff.branch}</span>
                        <span className="text-[8px] font-black bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-blue-600 uppercase">Role: Waiter</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[8px] text-slate-400 font-bold block uppercase">PASSWORD PIN</span>
                        <span className="font-mono text-blue-600 font-bold tracking-widest">{staff.pin}</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveStaff(staff.id)} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- 3. MANAGER MENU ARCHITECTURE CONFIG MATRIX --- */}
        {activeTab === 'menuManager' && userRole === 'manager' && (
          <div className="max-w-xl mx-auto bg-white border border-blue-100 p-6 rounded-[2.5rem] space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2 text-blue-900"><Pizza className="text-blue-600" /> MENU STRUCTURE CONFIG MATRIX</h2>
            </div>

            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1"><FolderPlus size={10} /> 1. Mega Category</span>
                  <select value={newMegaCategory} onChange={(e) => setNewMegaCategory(e.target.value)} className="w-full bg-[#F7F4EB]/60 border border-blue-100 rounded-xl p-3 text-xs font-bold text-blue-900 focus:outline-none">
                    <option value="Food">🍱 Food Menu</option>
                    <option value="Drinks">🍹 Drinks Menu</option>
                    <option value="Hookah">💨 Hookah Menu</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1"><Layers size={10} /> 2. Sub-Category Tag</span>
                  <input type="text" required placeholder="e.g., Raw Meat, Beers" value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500">3. Dish / Item Name</span>
                  <input type="text" required placeholder="e.g., Shega Special Gored Gored" value={newDishName} onChange={(e) => setNewDishName(e.target.value)} className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500">4. Price (ETB)</span>
                  <input type="number" required placeholder="550" value={newDishPrice} onChange={(e) => setNewDishPrice(e.target.value)} className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-black text-blue-600 focus:outline-none focus:border-blue-600" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all hover:bg-blue-700 shadow-md shadow-blue-600/10">
                Deploy & Publish Dish to Active POS Nodes
              </button>
            </form>
          </div>
        )}

        {/* --- 4. DYNAMIC POS ORDER TAKING --- */}
        {activeTab === 'pos' && (userRole === 'manager' || userRole === 'waiter') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-blue-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Routing Destination</span>
                  <span className="text-xs font-black text-blue-900">{currentBranch}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Table Location</span>
                  <input type="number" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} className="w-16 bg-[#F7F4EB] text-center text-xs font-black p-1 border border-blue-100 rounded text-blue-900 focus:outline-none focus:border-blue-600" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Fast-Key Catalog</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {menuItems.map((item) => {
                    const totalTapped = getMenuTotalQtyInCart(item.id);
                    return (
                      <div key={item.id} className="bg-white border border-blue-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                        <div>
                          <p className="text-xs font-black text-blue-900">{item.name}</p>
                          <p className="text-[9px] text-[#D97706] font-bold uppercase mt-0.5">ETB {item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {totalTapped > 0 && <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2 py-1 rounded border border-blue-100">{totalTapped}</span>}
                          <button type="button" onClick={() => addItemToCart(item)} className="bg-[#F7F4EB] text-blue-900 hover:bg-blue-600 hover:text-white border border-blue-100 font-black text-xs px-3 py-2 rounded-xl transition-all">+ Add</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ORDER TRAY */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-blue-100 rounded-[2.5rem] p-6 space-y-6 flex flex-col justify-between min-h-[460px] shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-blue-50 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">Order Tray Ledger</h3>
                    {cart.length > 0 && <button type="button" onClick={clearCart} className="text-[9px] text-slate-400 font-bold uppercase hover:text-red-500">Flush</button>}
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {cart.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-16">PUNCH SELECTIONS VIA FAST-KEYS.</p>
                    ) : (
                      cart.map((item, index) => (
                        <div key={item.cartItemId} className="bg-[#F7F4EB]/40 p-3 rounded-xl border border-blue-50 space-y-2">
                          <div className="flex justify-between text-xs font-black">
                            <span className="text-blue-900">#{index + 1} {item.name}</span>
                            <span className="text-slate-600">ETB {item.price}</span>
                          </div>
                          <div className="relative flex items-center">
                            <MessageSquare size={10} className="absolute left-2.5 text-[#D97706]" />
                            <input type="text" value={item.itemNote} onChange={(e) => handleUpdateItemNote(item.cartItemId, e.target.value)} placeholder={`Instruction for plate #${index + 1}...`} className="w-full bg-white border border-blue-100 text-[10px] pl-7 pr-2 py-1.5 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button type="button" onClick={submitOrder} disabled={cart.length === 0} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-20 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md shadow-blue-600/10">
                  Dispatch Ticket to KDS Display
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. EXPENSE MATRIX --- */}
        {activeTab === 'expenses' && (userRole === 'manager' || userRole === 'waiter') && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form onSubmit={handleAddExpense} className="lg:col-span-5 bg-white border border-blue-100 p-5 rounded-[2rem] space-y-4 h-fit shadow-sm">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">File Petty Cash Outflow</h3>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Expense Description</span>
                <input type="text" required value={expenseDesc} onChange={(e) => setExpenseDesc(e.target.value)} placeholder="e.g., Charcoal or Limes" className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 block uppercase">Amount to Spend (ETB)</span>
                <input type="number" required value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="e.g., 400" className="w-full bg-white border border-blue-100 rounded-xl p-3 text-xs font-black text-blue-600 focus:outline-none focus:border-blue-600" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3 rounded-xl uppercase transition-colors shadow-md shadow-blue-600/10">Submit Outflow</button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Outlet Expense Flow Feed</h3>
              <div className="space-y-2.5">
                {expenses.filter(e => e.branch === currentBranch).map((exp) => (
                  <div key={exp.id} className="bg-white border border-blue-50 p-4 rounded-xl flex justify-between items-center text-xs shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-black text-blue-900">{exp.description}</p>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${exp.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : exp.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800 animate-pulse'}`}>{exp.status}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold mt-0.5">Logged by: <span className="text-slate-600">{exp.requester}</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-red-600">- ETB {exp.amount}</span>
                      {userRole === 'manager' && exp.status === 'Pending Approval' && (
                        <div className="flex gap-1.5">
                          <button type="button" onClick={() => handleUpdateExpenseStatus(exp.id, 'Approved')} className="p-1 bg-emerald-600 text-white rounded"><Check size={14} /></button>
                          <button type="button" onClick={() => handleUpdateExpenseStatus(exp.id, 'Rejected')} className="p-1 bg-red-600 text-white rounded"><X size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 6. BILLING & PAYMENT HUB --- */}
        {activeTab === 'billing' && (userRole === 'manager' || userRole === 'waiter') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Unpaid Invoices</h3>
              <div className="space-y-2">
                {orders.filter(o => o.paymentType === 'Pending' && o.branch === currentBranch).map((order) => (
                  <button key={order.id} onClick={() => { setSelectedPaymentOrder(order); setIsHybrid(false); }} className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center bg-white ${selectedPaymentOrder?.id === order.id ? 'border-blue-600 shadow-md shadow-blue-600/5' : 'border-blue-50 shadow-sm'}`}>
                    <div><p className="text-xs font-black text-blue-900">Table: {order.table}</p></div>
                    <p className="text-xs font-black text-[#D97706]">ETB {order.total}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {selectedPaymentOrder ? (
                <div className="bg-white border border-blue-100 rounded-[2.5rem] p-6 space-y-4 shadow-sm">
                  <div className="border-b border-blue-50 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">Settle Balance</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-black">Table {selectedPaymentOrder.table}</p>
                  </div>

                  <div className="flex justify-between text-sm font-black text-blue-900"><span>Total Due Sum:</span><span className="text-blue-600">ETB {activeBillCalculations.total.toFixed(2)}</span></div>

                  <div className="bg-[#F7F4EB]/50 p-4 rounded-xl border border-blue-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-[#D97706]">Split Payment (Hybrid Cash + Telebirr)</label>
                      <input type="checkbox" checked={isHybrid} onChange={(e) => enableHybridSetup(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    </div>

                    {isHybrid ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div><input type="number" value={hybridCash} onChange={(e) => { setHybridCash(e.target.value); const rem = activeBillCalculations.total - parseFloat(e.target.value || 0); setHybridTelebirr(rem >= 0 ? rem.toFixed(2) : 0); }} className="w-full bg-white border border-blue-100 p-2 text-xs font-black rounded-lg text-emerald-600 focus:outline-none" /></div>
                        <div><input type="number" value={hybridTelebirr} onChange={(e) => { setHybridTelebirr(e.target.value); const rem = activeBillCalculations.total - parseFloat(e.target.value || 0); setHybridCash(rem >= 0 ? rem.toFixed(2) : 0); }} className="w-full bg-white border border-blue-100 p-2 text-xs font-black rounded-lg text-blue-600 focus:outline-none" /></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {['Cash', 'Telebirr'].map(m => (
                          <button key={m} onClick={() => setPaymentMethod(m)} className={`py-2 text-[10px] font-black rounded-lg uppercase border text-center transition-all ${paymentMethod === m ? 'border-blue-600 text-blue-600 bg-blue-50/20' : 'border-blue-50 text-slate-400'}`}>{m} Only</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={processPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3 rounded-xl uppercase transition-colors shadow-md shadow-blue-600/10">Finalize Tender & Close Ticket</button>
                </div>
              ) : (
                <div className="border border-dashed border-blue-200 rounded-[2.5rem] p-12 text-center text-slate-400 text-xs font-bold bg-white/40">Select unpaid ticket to trigger processing.</div>
              )}
            </div>
          </div>
        )}

        {/* --- 7. KITCHEN DISPLAY NODE --- */}
        {activeTab === 'kitchen' && (userRole === 'manager' || userRole === 'chef') && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-blue-900 border-b border-blue-100 pb-2">KDS Active Production Grid ({currentBranch})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {orders.filter(o => o.status !== 'completed' && o.branch === currentBranch).map(order => (
                <div key={order.id} className="bg-white border border-blue-100 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-sm">
                  <div>
                    <p className="text-xs font-black text-slate-400">TICKET #{order.id} (Table {order.table})</p>
                    <div className="pt-3 space-y-1">
                      {order.items.map((i, idx) => (
                        <p key={idx} className="text-xs font-black text-blue-900">🧩 {i.name} {i.itemNote && <span className="text-[10px] text-[#D97706] font-normal">({i.itemNote})</span>}</p>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={() => completeOrder(order.id)} className="w-full bg-[#F7F4EB] text-emerald-700 hover:bg-emerald-600 hover:text-white border border-blue-50 text-[11px] font-black py-2 rounded-xl transition-all">BUMP READY</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}