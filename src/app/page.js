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
  Utensils,
  CreditCard,
  MapPin,
  Plus,
  Minus,
  Wallet,
  Layers,
  Pizza,
  Check,
  X,
  AlertCircle,
  ShieldCheck,
  UserPlus,
  Menu,
  Smartphone,
  Coffee
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
  
  // --- PRODUCTION MENU STATE (UPDATED MATRIX DATASET) ---
  const [menuItems, setMenuItems] = useState([
    // Hot Drinks
    { id: 'hd1', name: 'የጀበና ቡና (Jebeana Coffee)', price: 50, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd2', name: 'ቡና (Coffee)', price: 60, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd3', name: 'ወተት (Milk)', price: 75, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd4', name: 'ማኪያቶ (Macchiato)', price: 95, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd5', name: 'ካፌ ላቴ (Café Latte)', price: 115, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd6', name: 'ለውዝ በቡና (Nut with Coffee)', price: 85, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd7', name: 'ካፑቺኖ (Cappuccino)', price: 125, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd8', name: 'ወተት በቡና (Milk with Coffee)', price: 95, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd9', name: 'ሆት ቸኮሌት (Hot Chocolate)', price: 140, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd10', name: 'ካራሜል ማኪያቶ (Caramel Macchiato)', price: 140, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    { id: 'hd11', name: 'ቸኮሌት ማኪያቶ (Chocolate Macchiato)', price: 140, category: 'Hot Drinks (ትኩስ መጠጦች)' },
    // Tea
    { id: 't1', name: 'ሻይ (Tea)', price: 50, category: 'Tea (ሻይ)' },
    { id: 't2', name: 'ሎሚ ሻይ (Lemon Tea)', price: 65, category: 'Tea (ሻይ)' },
    { id: 't3', name: 'ሻይ ቡና ስፕሪስ (Tea & Coffee Spiced/Spris)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't4', name: 'ቅንጅ (Kinj / Herbal blend)', price: 65, category: 'Tea (ሻይ)' },
    { id: 't5', name: 'ለውዝ (Nut Tea)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't6', name: 'ብርቱካን ሻይ (Orange Tea)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't7', name: 'ፍሌቨርድ ሻይ (Flavored Tea)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't8', name: 'ስፔሻል ሻይ (Special Tea)', price: 110, category: 'Tea (ሻይ)' },
    { id: 't9', name: 'ማንጎ ሻይ (Mango Tea)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't10', name: 'አናናስ ሻይ (Pineapple Tea)', price: 75, category: 'Tea (ሻይ)' },
    { id: 't11', name: 'ስፔሻል ቅንጅ (Special Kinj)', price: 85, category: 'Tea (ሻይ)' },
    { id: 't12', name: 'ማህበረሰባዊ ሻይ (Community/Social Tea)', price: 85, category: 'Tea (ሻይ)' },
    // Burgers with Variant Structures
    { id: 'b1', name: 'ሸጋ በርገር (Shega Burger)', prices: { single: 540, double: 695, triple: 895 }, category: 'Burgers (በርገር)', description: 'bread, beef sausage, beef, cheese, egg, vegetables and mayo' },
    { id: 'b2', name: 'ቺክን በርገር (Chicken Burger)', prices: { single: 565, double: 730, triple: 885 }, category: 'Burgers (በርገር)', description: 'bread, chicken, cheese, sausage, vegetables, mayo' },
    { id: 'b3', name: 'ቺዝ በርገር (Cheese Burger)', prices: { single: 495, double: 650, triple: 820 }, category: 'Burgers (በርገር)', description: 'bread, extra cheese, beef, vegetables, mayo' },
    { id: 'b4', name: 'ቢፍ በርገር (Beef Burger)', prices: { single: 445, double: 595, triple: 710 }, category: 'Burgers (በርገር)', description: 'bread, beef, vegetables, mayo' },
    { id: 'b5', name: 'ጁሲ በርገር (Juicy Burger)', prices: { single: 585, double: 740, triple: 935 }, category: 'Burgers (በርገር)', description: 'similar with shega style but extra juicy' },
    { id: 'b6', name: 'ቺፕስ (Chips)', price: 280, category: 'Burgers (በርገር)', description: 'fried potatoes served with ketchup' },
    // Sandwiches
    { id: 's1', name: 'ክለብ ሳንድዊች (Club Sandwich)', price: 480, category: 'Sandwiches (ሳንድዊች)', description: 'toasted bread with beef, egg, mayo, vegetables, fries' },
    { id: 's2', name: 'ቺክን ሳንድዊች (Chicken Sandwich)', price: 595, category: 'Sandwiches (ሳንድዊች)', description: 'Grilled chicken breast sandwiched added vegetables and sauces and fries' },
    { id: 's3', name: 'ስቴክ ሳንድዊች (Steak Sandwich)', price: 550, category: 'Sandwiches (ሳንድዊች)', description: 'Grilled beef sandwiched added vegetables and sauces and fries' },
    { id: 's4', name: 'ቱና ሳንድዊች (Tuna Sandwich)', price: 590, category: 'Sandwiches (ሳንድዊች)', description: 'Bread, tuna, sauces, vegetables served with fries' },
    { id: 's5', name: 'እንቁላል ሳንድዊች (Egg Sandwich)', price: 340, category: 'Sandwiches (ሳንድዊች)', description: 'omelet eggs sandwiched with an bread and sauces' },
    { id: 's6', name: 'የአትክልት ሳንድዊች (Vegetable Sandwich)', price: 385, category: 'Sandwiches (ሳንድዊች)', description: 'fresh and seasonal vegetables with bread served with fries' },
    // Wraps
    { id: 'w1', name: 'ሸጋ ራፕ (Shega Wrap)', price: 660, category: 'Wraps & Burritos (ራፕ)', description: 'chicken, beef, egg, cheese, vegetables, sauces wrapped with a pita and fries' },
    { id: 'w2', name: 'ቺክን ራፕ (Chicken Wrap)', price: 580, category: 'Wraps & Burritos (ራፕ)', description: 'chicken, vegetables and sauces wrapped with fresh pita and fries' },
    { id: 'w3', name: 'ቢፍ ራፕ (Beef Wrap)', price: 530, category: 'Wraps & Burritos (ራፕ)', description: 'beef, vegetables and sauces wrapped with pita and fries' },
    { id: 'w4', name: 'የአትክልት ራፕ (Vegetable Wrap)', price: 395, category: 'Wraps & Burritos (ራፕ)', description: 'fresh vegetables wrapped with pita and fries' },
    { id: 'w5', name: 'ሸጋ ቡሪቶ (Shega Burrito)', price: 780, category: 'Wraps & Burritos (ራፕ)', description: 'chicken, beef, vegetables, rice, egg cheese, wrapped and baked served with fries' },
    { id: 'w6', name: 'ቺክን ቡሪቶ (Chicken Burrito)', price: 690, category: 'Wraps & Burritos (ራፕ)', description: 'chicken, vegetables, rice cheese, egg, wrapped and baked served with fries' },
    { id: 'w7', name: 'ቢፍ ቡሪቶ (Beef Burrito)', price: 660, category: 'Wraps & Burritos (ራፕ)', description: 'beef, vegetables, rice cheese, egg wrapped and baked served with fries' },
    // Breakfast
    { id: 'bk1', name: 'Pancake', price: 345, category: 'Breakfast', description: 'Pancake made with milk and egg served with honey and syrup' },
    { id: 'bk2', name: 'French Toast', price: 280, category: 'Breakfast', description: 'Bread toasted with egg served with honey and syrup' },
    { id: 'bk3', name: 'Avocado Toast', price: 280, category: 'Breakfast', description: 'Smashed and seasoned avocado on toasted bread' },
    { id: 'bk4', name: 'Avocado Egg Toast', price: 330, category: 'Breakfast', description: 'Avocado toast topped with boiled egg' },
    { id: 'bk5', name: 'Yogurt Avocado Toast', price: 395, category: 'Breakfast', description: 'Yogurt smashed avocado on toasted bread with boiled egg' },
    { id: 'bk6', name: 'Shega Toast', price: 395, category: 'Breakfast', description: 'Yoghurt, smashed and seasoned avocado on a toasted bread topped with boiled egg' },
    // Oats
    { id: 'o1', name: 'Chocolate Oats', price: 350, category: 'Oats', description: 'Oats cooked with milk and chocolate chips' },
    { id: 'o2', name: 'Double Chocolate Oatmeal', price: 350, category: 'Oats', description: 'oats cooked with milk and chocolate served with chocolate chips' },
    { id: 'o3', name: 'PB Banana Oats', price: 310, category: 'Oats', description: 'Oats with peanut butter and banana' },
    { id: 'o4', name: 'PB Banana Oatmeal', price: 310, category: 'Oats', description: 'oats cooked with milk served with peanut butter and banana' },
    { id: 'o5', name: 'Strawberry Oats', price: 345, category: 'Oats', description: 'Oats with strawberry syrup and strawberries' },
    { id: 'o6', name: 'Strawberry Oatmeal', price: 345, category: 'Oats', description: 'oats cooked with milk and strawberry syrup served with strawberries' },
    { id: 'o7', name: 'Apple Cinnamon Oats', price: 355, category: 'Oats', description: 'Cinnamon apples with oats and milk' },
    { id: 'o8', name: 'Apple Cinnamon Oatmeal', price: 355, category: 'Oats', description: 'cinnamon seasoned apples on an oats cooked with milk and cinnamon' },
    { id: 'o9', name: 'Honey Oats', price: 245, category: 'Oats', description: 'Oats cooked with milk and honey' },
    { id: 'o10', name: 'Plain Oats', price: 245, category: 'Oats', description: 'oats cooked with milk and honey' },
    // Hotdog
    { id: 'h1', name: 'Regular Hotdog', price: 420, category: 'Hotdog', description: 'Hotdog sausage with mayo and fries' },
    { id: 'h2', name: 'Plain Hotdog', price: 420, category: 'Hotdog', description: 'hotdog sausage sandwiched and with mayo and fries' },
    { id: 'h3', name: 'Cheese Hotdog', price: 540, category: 'Hotdog', description: 'Hotdog sausage with cheese, mayo and fries' },
    { id: 'h4', name: 'Cheesy Hotdog', price: 540, category: 'Hotdog', description: 'hotdog sausage sandwiched and with cheese, mayo and fries' },
    { id: 'h5', name: 'Spicy Hotdog', price: 520, category: 'Hotdog', description: 'Hotdog sausage with hot sauce, mayo and fries' },
    { id: 'h6', name: 'Chilli Hotdog', price: 520, category: 'Hotdog', description: 'hotdog sausage sandwiched and with hot sauces mayo and fries' },
    // Kids Menu
    { id: 'k1', name: 'Kids Pancake', price: 225, category: 'Kids Menu' },
    { id: 'k2', name: 'Kids French Toast', price: 195, category: 'Kids Menu' },
    { id: 'k3', name: 'Fried Egg', price: 195, category: 'Kids Menu' },
    { id: 'k4', name: 'Fries with Egg', price: 215, category: 'Kids Menu' },
    { id: 'k5', name: 'Special Kids Combo', price: 285, category: 'Kids Menu' },
    // Meals & Burgers
    { id: 'mb1', name: 'Chicken Burger (Classic)', price: 355, category: 'Meals & Burgers' },
    { id: 'mb2', name: 'Cheese Burger (Classic)', price: 385, category: 'Meals & Burgers' },
    { id: 'mb3', name: 'Chicken Pizza', price: 395, category: 'Meals & Burgers' }, // Fallback to flat normal price
    { id: 'mb4', name: 'Special Fried Rice', price: 390, category: 'Meals & Burgers' },
    { id: 'mb5', name: 'Chicken Sandwich (Classic)', price: 320, category: 'Meals & Burgers' },
    // Ethiopian Breakfast
    { id: 'eb1', name: 'Chechebsa', price: 225, category: 'Ethiopian Breakfast' },
    { id: 'eb2', name: 'Special Chechebsa', price: 295, category: 'Ethiopian Breakfast' },
    { id: 'eb3', name: 'Fetira', price: 245, category: 'Ethiopian Breakfast' },
    { id: 'eb4', name: 'Special Fetira', price: 395, category: 'Ethiopian Breakfast' },
    // Eggs
    { id: 'eg1', name: 'Omelette', price: 265, category: 'Eggs' },
    { id: 'eg2', name: 'Cheese Omelette', price: 370, category: 'Eggs' },
    { id: 'eg3', name: 'Scrambled Egg', price: 280, category: 'Eggs' },
    { id: 'eg4', name: 'Egg with meat', price: 350, category: 'Eggs' },
    // Drinks
    { id: 'd1', name: 'Strawberry Smoothie', price: 200, category: 'Drinks' },
    { id: 'd2', name: 'Chocolate Smoothie', price: 180, category: 'Drinks' },
    { id: 'd3', name: 'Oreo Smoothie', price: 190, category: 'Drinks' },
    // Desserts
    { id: 'ds1', name: 'White Forest Cake', price: 180, category: 'Desserts' },
    { id: 'ds2', name: 'Black Forest Cake', price: 210, category: 'Desserts' },
    { id: 'ds3', name: 'Chocolate Cake', price: 250, category: 'Desserts' },
    { id: 'ds4', name: 'Caramel Cake', price: 230, category: 'Desserts' },
    { id: 'ds5', name: 'Red Velvet Cake', price: 220, category: 'Desserts' },
    { id: 'ds6', name: 'Angel Cake', price: 110, category: 'Desserts' },
    { id: 'ds7', name: 'Cheese Cake', price: 350, category: 'Desserts' },
    { id: 'ds8', name: 'Cupcake', price: 110, category: 'Desserts' },
    { id: 'ds9', name: 'Eclair', price: 110, category: 'Desserts' },
    { id: 'ds10', name: 'Donut', price: 140, category: 'Desserts' },
    { id: 'ds11', name: 'Mille Feuille', price: 130, category: 'Desserts' },
    { id: 'ds12', name: 'Croissant', price: 120, category: 'Desserts' },
    { id: 'ds13', name: 'Oreo Dessert Cup', price: 120, category: 'Desserts' },
    { id: 'ds14', name: 'Strawberry Dessert Cup', price: 100, category: 'Desserts' },
    { id: 'ds15', name: 'Chocolate Dessert Cup', price: 120, category: 'Desserts' }
  ]);

  const uniqueCategories = ['All', ...Array.from(new Set(menuItems.map(i => i.category)))];
  const [activeMenuFilter, setActiveMenuFilter] = useState('All');

  // --- CORE TRANSACTION DATA STATES ---
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: '201', table: '4', waiter: 'Abebe Chala', branch: 'Shegawan', customerTier: 'Regular', paymentType: 'Cash', cashAmount: 650, telebirrAmount: 0, discountApplied: 0, taxTotal: 85, total: 650, status: 'completed', hourLogged: 9, items: [{ cartItemId: 'c201_1', name: 'የጀበና ቡና (Jebeana Coffee)', qty: 2, price: 50, itemNote: '' }] }
  ]);

  // --- EXPENSE LEDGER STATES ---
  const [expenses, setExpenses] = useState([
    { id: 'e1', branch: 'Shegawan', requester: 'Manager Desk', description: 'Fresh Meat Market Run', category: 'Ingredients', amount: 4500, timestamp: '10:15 AM', status: 'Approved' }
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
        setActiveTab('pos'); 
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
    setMobileMenuOpen(false);
  };

  const addItemToCart = (item, customPrice = null, labelExtension = '') => {
    const finalPrice = customPrice !== null ? customPrice : item.price;
    const finalName = labelExtension ? `${item.name} (${labelExtension})` : item.name;
    
    const uniqueCartItemId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setCart([...cart, { ...item, name: finalName, price: finalPrice, cartItemId: uniqueCartItemId, qty: 1, itemNote: '' }]);
  };

  const updateCartQty = (cartItemId, incremental) => {
    setCart(cart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.qty + incremental;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
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

  const activeBranchOrders = orders.filter(o => o.paymentType !== 'Pending' && o.branch === currentBranch);
  const totalGrossSales = activeBranchOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCashSales = activeBranchOrders.reduce((sum, o) => sum + o.cashAmount, 0);
  const totalTelebirrSales = activeBranchOrders.reduce((sum, o) => sum + o.telebirrAmount, 0);

  const filteredMenuItems = activeMenuFilter === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeMenuFilter);

  const activeBillCalculations = getPaymentCalculations(selectedPaymentOrder);

  // --- ACCESS CONTROL LIST FILTER ---
  // CORRECTION: Waiters are granted explicit clearance to settle tickets directly on their devices
  const navItems = [
    { id: 'dashboard', label: 'Metrics Dashboard', icon: LayoutDashboard, roles: ['manager'] },
    { id: 'pos', label: 'Ticket Terminal', icon: ShoppingCart, roles: ['manager', 'waiter'] },
    { id: 'kitchen', label: 'Kitchen Lines', icon: ChefHat, roles: ['manager', 'chef'] },
    { id: 'billing', label: 'Cashier Deck', icon: CreditCard, roles: ['manager', 'waiter'] },
    { id: 'expenses', label: 'Expense Tracker', icon: Wallet, roles: ['manager', 'waiter'] }
  ].filter(item => item.roles.includes(userRole));

  if (!userRole) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[2rem] border border-orange-100 shadow-xl space-y-6">
          <div className="text-center">
            <p className="text-[10px] text-amber-600 font-black tracking-[4px] uppercase mb-1">Shega OS Platform</p>
            <h2 className="text-2xl font-black tracking-tight text-blue-900">SYSTEM GATEWAY</h2>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2 border border-red-100 font-bold">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          {!selectedProfile ? (
            <div className="space-y-3 pt-2">
              {[
                { id: 'manager', icon: ShieldCheck, label: 'Manager Node' },
                { id: 'waiter', icon: Smartphone, label: 'Waiter Terminal' },
                { id: 'chef', icon: ChefHat, label: 'Kitchen Display' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfile(p.id)}
                  className="w-full bg-[#FDFBF7] border border-slate-100 hover:border-amber-500 p-4 rounded-2xl flex items-center justify-between font-black uppercase text-xs tracking-wider transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <p.icon size={18} className="text-blue-900" />
                    <span className="text-blue-900">{p.label}</span>
                  </div>
                  <Lock size={14} className="text-slate-400" />
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex justify-between items-center bg-blue-900 px-4 py-2 rounded-xl text-white">
                <span className="text-xs font-black uppercase">Role: {selectedProfile}</span>
                <button type="button" onClick={() => { setSelectedProfile(null); setAuthError(''); }} className="text-[10px] text-blue-200 underline font-bold">Back</button>
              </div>

              {selectedProfile === 'waiter' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Station Node</label>
                    <select
                      value={loginWaiterBranch}
                      onChange={(e) => setLoginWaiterBranch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-blue-900"
                    >
                      <option value="Shegawan">Shegawan Terminal</option>
                      <option value="Teymshega">Teymshega Terminal</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-400">Operator Identity Name</label>
                    <input
                      type="text"
                      required
                      value={loginWaiterName}
                      onChange={(e) => setLoginWaiterName(e.target.value)}
                      placeholder="Input Waiter Profile Name"
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-400">Security Access Pin</label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-50 text-center border border-slate-200 rounded-xl p-3 text-xl tracking-[0.5em] font-black text-blue-900 focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full bg-amber-600 text-white p-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-amber-700 transition-all">
                Authenticate Handshake
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* MOBILE APPLICATION HEADER */}
      <div className="md:hidden w-full bg-blue-900 text-white px-4 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 text-blue-100">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <h1 className="text-sm font-black tracking-tight">Shega OS</h1>
            <p className="text-[9px] text-amber-400 font-bold uppercase">{currentBranch} Branch</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-1 text-red-300"><LogOut size={16} /></button>
      </div>

      {/* MOBILE NAV OVERLAY DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-blue-950/60 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 max-w-[80vw] h-full bg-blue-900 text-white p-4 flex flex-col space-y-6" onClick={e => e.stopPropagation()}>
            <div className="border-b border-blue-800 pb-4">
              <p className="text-[10px] text-amber-400 font-black uppercase">Operator Frame</p>
              <h3 className="text-sm font-black truncate">{userRole === 'waiter' ? activeWaiterIdentity : 'Manager Core'}</h3>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === item.id ? 'bg-amber-600 text-white shadow-md' : 'text-blue-100 hover:bg-blue-800'}`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* DESKTOP PERMANENT HUD BAR */}
      <aside className="hidden md:flex w-64 bg-blue-900 text-white flex-col shrink-0 sticky top-0 h-screen shadow-lg">
        <div className="p-6 border-b border-blue-950 flex flex-col space-y-1">
          <span className="text-[10px] text-amber-400 font-black tracking-[3px] uppercase">Engine Hub</span>
          <h1 className="text-xl font-black tracking-tight">Shega OS v3.2</h1>
          <div className="bg-blue-950/40 p-2 rounded-xl mt-3 text-center border border-blue-800">
            <p className="text-[9px] text-slate-400 font-bold uppercase">Node Station</p>
            <p className="text-xs font-black text-white">{currentBranch}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === item.id ? 'bg-amber-600 text-white shadow-md' : 'text-blue-100 hover:bg-blue-800/50'}`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-950 bg-blue-950/40">
          <p className="text-[9px] text-slate-400 font-bold uppercase">Operator Account</p>
          <p className="text-xs font-black text-white truncate mb-3">{userRole === 'waiter' ? activeWaiterIdentity : 'System Administrator'}</p>
          <button onClick={handleLogout} className="w-full bg-red-950/60 text-red-300 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-red-900 hover:text-white transition-all flex items-center justify-center gap-2">
            <LogOut size={12} /> Close Terminal
          </button>
        </div>
      </aside>

      {/* CORE FRAME LAYOUT CONTENT */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 overflow-y-auto">
        
        {/* --- SCREEN 1: MANAGER METRICS DASHBOARD --- */}
        {activeTab === 'dashboard' && userRole === 'manager' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-black text-blue-900 tracking-tight">REAL-TIME ECOSYSTEM METRICS</h2>
              <p className="text-xs text-slate-500 font-medium">Fiscal architecture monitoring overview for {currentBranch} base node</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gross Revenues</p>
                  <p className="text-2xl font-black text-blue-900">{totalGrossSales.toLocaleString()} ETB</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><TrendingUp size={24} /></div>
              </div>
              <div className="bg-white border p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Remitted Cash Drawer</p>
                  <p className="text-2xl font-black text-slate-800">{totalCashSales.toLocaleString()} ETB</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Wallet size={24} /></div>
              </div>
              <div className="bg-white border p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Telebirr Portal Logs</p>
                  <p className="text-2xl font-black text-blue-600">{totalTelebirrSales.toLocaleString()} ETB</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Smartphone size={24} /></div>
              </div>
            </div>
          </div>
        )}

        {/* --- SCREEN 2: PRODUCTION TICKET DISPATCH TERMINAL (POS) --- */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* DISPLAY CATEGORIES & DISH SELECTION TILES */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex flex-wrap gap-1.5 border-b pb-3 overflow-x-auto max-w-full">
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap font-black uppercase tracking-wider transition-all ${activeMenuFilter === cat ? 'bg-blue-900 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredMenuItems.map(dish => (
                  <div key={dish.id} className="bg-white border p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-amber-50 px-2 py-0.5 rounded font-black text-amber-800 uppercase">{dish.category}</span>
                      <h4 className="text-sm font-black text-blue-900">{dish.name}</h4>
                      {dish.description && <p className="text-[10px] text-slate-400 line-clamp-2 font-medium">{dish.description}</p>}
                    </div>

                    <div className="mt-4 pt-2 border-t border-dashed border-slate-100 flex flex-col gap-2">
                      {dish.prices ? (
                        /* VARIANT HANDLING SELECTORS (SINGLE/DOUBLE/TRIPLE) */
                        <div className="grid grid-cols-3 gap-1 w-full">
                          {Object.entries(dish.prices).map(([size, pr]) => pr && (
                            <button
                              key={size}
                              onClick={() => addItemToCart(dish, pr, size.toUpperCase())}
                              className="bg-slate-50 hover:bg-amber-600 hover:text-white transition-all text-center p-1.5 rounded-lg border flex flex-col justify-center items-center"
                            >
                              <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-white">{size}</span>
                              <span className="text-[10px] font-black">{pr} ETB</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        /* BASE PRICE SINGLE ACTION BUTTON */
                        <button
                          onClick={() => addItemToCart(dish)}
                          className="w-full bg-slate-50 hover:bg-blue-900 hover:text-white transition-all px-3 py-2 rounded-xl border flex justify-between items-center text-xs font-black text-slate-800"
                        >
                          <span>{dish.price} ETB</span>
                          <Plus size={14} className="text-blue-600" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BASKET SUMMARY TICKET CONTROLLER */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white border rounded-[2rem] p-5 shadow-xl space-y-4 sticky top-24">
              <div className="border-b pb-2 flex items-center gap-2">
                <ShoppingCart size={16} className="text-amber-600" />
                <h3 className="text-xs font-black uppercase text-blue-900 tracking-wider">Active Run Summary</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400">Target Table</label>
                  <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl text-xs font-bold text-blue-900">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(t => <option key={t} value={t.toString()}>Table {t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400">Client Protocol</label>
                  <select value={customerType} onChange={e => setCustomerType(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl text-xs font-bold text-blue-900">
                    <option value="Regular">Regular Tier</option>
                    <option value="VIP Tier">VIP Protocol</option>
                  </select>
                </div>
              </div>

              <div className="divide-y space-y-2 max-h-64 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.cartItemId} className="pt-2 first:pt-0 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h5 className="text-xs font-black text-slate-800">{item.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold">{item.price * item.qty} ETB</p>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 border p-1 rounded-lg">
                        <button onClick={() => updateCartQty(item.cartItemId, -1)} className="p-1 hover:bg-slate-200 rounded text-slate-600"><Minus size={10} /></button>
                        <span className="text-xs px-1 font-black text-blue-900">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.cartItemId, 1)} className="p-1 hover:bg-slate-200 rounded text-slate-600"><Plus size={10} /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="py-12 text-center text-slate-400 font-bold text-xs space-y-2">
                    <Coffee size={32} className="mx-auto text-slate-200" />
                    <p>Awaiting item inputs to formulate ticket run.</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between font-black text-blue-900 text-sm">
                    <span>Est. Total (With VAT)</span>
                    <span>{(cart.reduce((s, i) => s + (i.price * i.qty), 0) * 1.15).toLocaleString()} ETB</span>
                  </div>
                  <button onClick={submitOrder} className="w-full bg-blue-900 text-white font-black uppercase text-xs tracking-wider p-3.5 rounded-xl shadow-md">
                    Dispatch Order to Kitchen Line
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- SCREEN 3: KITCHEN PRODUCTION LINES --- */}
        {activeTab === 'kitchen' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-black text-blue-900 tracking-tight">KITCHEN MONITOR OVERVIEW</h2>
              <p className="text-xs text-slate-500 font-medium">Active preparation timelines queued across cooking infrastructure grids</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {orders.filter(o => o.status === 'pending').map(order => (
                <div key={order.id} className="bg-white border-2 border-amber-500 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="bg-amber-50 px-4 py-3 border-b flex justify-between items-center">
                      <div>
                        <span className="text-xs font-black text-amber-900">TABLE {order.table}</span>
                        <p className="text-[10px] text-slate-400 font-bold">Runner: {order.waiter}</p>
                      </div>
                      <span className="text-[10px] bg-amber-600 text-white font-black px-2 py-0.5 rounded-md uppercase animate-pulse">Pending</span>
                    </div>
                    <div className="p-4 space-y-2">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="text-xs border-b pb-1 last:border-none">
                          <p className="font-black text-slate-800"><span className="text-amber-600 mr-1">{it.qty}x</span> {it.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border-t">
                    <button
                      onClick={() => setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'prepared' } : o))}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider py-2.5 rounded-xl"
                    >
                      Mark Preparation Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SCREEN 4: CASHIER DESK (BILLING WITH CORRECTED WAITER CONTROLS) --- */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-black text-blue-900 tracking-tight">SETTLEMENT & PAYMENT BRIDGE</h2>
              <p className="text-xs text-slate-500 font-medium">Verify credentials, configure line-item discounts, and execute transaction closeouts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* OUTSTANDING ORDER TICKETS */}
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Unsettled active service runs</h3>
                {orders.filter(o => o.status === 'pending' || o.status === 'prepared').map(order => (
                  <button
                    key={order.id}
                    onClick={() => { setSelectedPaymentOrder(order); setDiscountPercent(0); setIsHybrid(false); }}
                    className={`w-full bg-white border text-left p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all ${selectedPaymentOrder?.id === order.id ? 'border-amber-600 ring-2 ring-amber-100' : 'hover:border-slate-300'}`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-blue-900">#TK-{order.id}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.2 rounded ${order.status === 'prepared' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Table {order.table} • Op: {order.waiter}</p>
                    </div>
                    <span className="text-sm font-black text-slate-800">{order.total.toLocaleString()} ETB</span>
                  </button>
                ))}
              </div>

              {/* DYNAMIC CALCULATION MODAL BLOCK */}
              <div className="lg:col-span-6">
                {selectedPaymentOrder ? (
                  <div className="bg-white border rounded-[2rem] shadow-xl p-5 sm:p-6 space-y-4">
                    <div className="border-b pb-2 flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase tracking-wider text-blue-900">Settle Ticket Pipeline #TK-{selectedPaymentOrder.id}</h4>
                      <button onClick={() => setSelectedPaymentOrder(null)} className="text-slate-400"><X size={16} /></button>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400">Discount Frame Modification</label>
                      <div className="grid grid-cols-4 gap-2 mt-1">
                        {[0, 5, 10, 20].map(pct => (
                          <button
                            key={pct}
                            onClick={() => setDiscountPercent(pct)}
                            className={`p-2 border rounded-xl text-xs font-bold transition-all ${discountPercent === pct ? 'bg-blue-900 text-white' : 'bg-slate-50'}`}
                          >
                            {pct}% Off
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* REDESIGNED BILLING TYPE CONTROL WITH FULL CORRECTIONS */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400">Remittance Strategy Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => { setIsHybrid(false); setPaymentMethod('Cash'); }} className={`p-3 border rounded-xl text-xs font-black uppercase transition-all ${(!isHybrid && paymentMethod === 'Cash') ? 'bg-amber-600 text-white' : 'bg-slate-50'}`}>
                          Liquid Cash
                        </button>
                        <button type="button" onClick={() => { setIsHybrid(false); setPaymentMethod('Telebirr'); }} className={`p-3 border rounded-xl text-xs font-black uppercase transition-all ${(!isHybrid && paymentMethod === 'Telebirr') ? 'bg-blue-600 text-white' : 'bg-slate-50'}`}>
                          Telebirr Wallet
                        </button>
                      </div>
                      <button type="button" onClick={() => setIsHybrid(!isHybrid)} className={`w-full p-2.5 border border-dashed rounded-xl text-xs font-bold text-center transition-all ${isHybrid ? 'bg-purple-900 text-white border-purple-900' : 'text-purple-900 bg-purple-50'}`}>
                        {isHybrid ? "✓ Hybrid Remittance Multi-Channel Active" : "⇅ Turn on Hybrid Cash & Telebirr Split Line"}
                      </button>
                    </div>

                    {isHybrid && (
                      <div className="grid grid-cols-2 gap-3 bg-purple-50 p-3 rounded-2xl border border-purple-100 animate-fadeIn">
                        <div>
                          <label className="text-[9px] font-black uppercase text-purple-900">Remitted Cash Port</label>
                          <input type="number" placeholder="ETB Amount" value={hybridCash} onChange={e => setHybridCash(e.target.value)} className="w-full bg-white border p-2 rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                          <label className="text-[9px] font-black uppercase text-purple-900">Telebirr Confirmed Remit</label>
                          <input type="number" placeholder="ETB Amount" value={hybridTelebirr} onChange={e => setHybridTelebirr(e.target.value)} className="w-full bg-white border p-2 rounded-xl text-xs font-bold" />
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-50 border p-4 rounded-2xl space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Items Subtotal</span>
                        <span>{activeBillCalculations.subtotal.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-red-600">
                        <span>Discount Applied</span>
                        <span>-{activeBillCalculations.discount.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>VAT (15%)</span>
                        <span>{activeBillCalculations.vat.toLocaleString()} ETB</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-blue-900 border-t border-dashed pt-2">
                        <span>Net Final Due</span>
                        <span>{activeBillCalculations.total.toLocaleString()} ETB</span>
                      </div>
                    </div>

                    <button onClick={processPayment} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs tracking-wider p-4 rounded-xl shadow-md transition-all">
                      Confirm Receipt & Clear Ticket Node
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-dashed rounded-[2rem] p-12 text-center text-slate-400 font-bold text-xs">
                    Choose an outstanding active ticket registry list item to load calculations.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- SCREEN 5: COST & EXPENSE LEDGER RUNNER --- */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-black text-blue-900 tracking-tight">EXPENSE OVERHEAD REGISTRY</h2>
              <p className="text-xs text-slate-500 font-medium">Log market run cash outlays, resource buyouts, and emergency infrastructure allocations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!expenseDesc || !expenseAmount) return;
                setExpenses([{
                  id: 'e_' + Date.now(), branch: currentBranch, requester: userRole === 'waiter' ? activeWaiterIdentity : 'Manager Core',
                  description: expenseDesc, category: expenseCategory, amount: parseFloat(expenseAmount), timestamp: 'Just Now', status: userRole === 'manager' ? 'Approved' : 'Pending Approval'
                }, ...expenses]);
                setExpenseDesc(''); setExpenseAmount('');
              }} className="lg:col-span-4 bg-white border p-5 rounded-2xl shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase text-blue-900">Add Operating Cost Line</h3>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Expense Classification</label>
                  <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl text-xs font-bold text-slate-700">
                    <option value="Ingredients">Ingredients Procurement</option>
                    <option value="Utilities">Utilities & Generator Fuel</option>
                    <option value="Maintenance">Infrastructure Operations</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Context Label</label>
                  <input type="text" required placeholder="e.g. Extra onions sack" value={expenseDesc} onChange={e => setExpenseDesc(e.target.value)} className="w-full bg-white border p-2 rounded-xl text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Total Sum (ETB)</label>
                  <input type="number" required placeholder="ETB Outflow" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} className="w-full bg-white border p-2 rounded-xl text-xs font-bold" />
                </div>
                <button type="submit" className="w-full bg-amber-600 text-white text-xs font-black uppercase py-2.5 rounded-xl">
                  Commit Outflow Log
                </button>
              </form>

              <div className="lg:col-span-8 bg-white border rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-bold uppercase border-b text-[10px] text-slate-500">
                    <tr>
                      <th className="p-3">Cost Context</th>
                      <th className="p-3">Class</th>
                      <th className="p-3">Net Sum</th>
                      <th className="p-3 text-right">Status State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-700">
                    {expenses.map(exp => (
                      <tr key={exp.id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{exp.description}</p>
                          <p className="text-[9px] text-slate-400 font-bold">By: {exp.requester} • Node: {exp.branch}</p>
                        </td>
                        <td className="p-3 text-slate-500">{exp.category}</td>
                        <td className="p-3 font-black text-slate-900">{exp.amount.toLocaleString()} ETB</td>
                        <td className="p-3 text-right">
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded uppercase">{exp.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}