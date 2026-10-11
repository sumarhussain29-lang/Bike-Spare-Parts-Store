import React, { createContext, useContext, useState, useEffect } from 'react';
import { SparePart, CartItem, Order, OrderItem, AppScreen } from '../types';
import { SPARE_PARTS_DATA } from '../data/parts';

interface AppContextType {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  cart: CartItem[];
  addToCart: (part: SparePart, quantity?: number) => void;
  buyNow: (part: SparePart, quantity?: number) => void;
  removeFromCart: (partId: number) => void;
  updateCartQty: (partId: number, qty: number) => void;
  toggleItemSelection: (partId: number) => void;
  selectAllItems: (selected: boolean) => void;
  clearCart: () => void;
  
  wishlist: number[];
  toggleWishlist: (partId: number) => void;
  
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  currentCity: string;
  setCurrentCity: (city: string) => void;
  
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerAddress: string;
  setCustomerAddress: (addr: string) => void;
  riderNote: string;
  setRiderNote: (note: string) => void;
  
  promoCode: string;
  promoDiscount: number;
  promoApplied: boolean;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  
  cartSubtotal: number;
  cartDelivery: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  
  orders: Order[];
  createOrder: (paymentMethod: 'cod' | 'wallet' | 'bank' | 'card') => Order;
  
  toast: string | null;
  showToast: (msg: string) => void;
  
  selectedProduct: SparePart | null;
  setSelectedProduct: (p: SparePart | null) => void;
  
  filterModalOpen: boolean;
  setFilterModalOpen: (open: boolean) => void;
  locationModalOpen: boolean;
  setLocationModalOpen: (open: boolean) => void;
  scannerModalOpen: boolean;
  setScannerModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<AppScreen>('home');
  
  // Initial cart with the 3 items shown in screenshot Image 5 and Image 7
  const [cart, setCart] = useState<CartItem[]>([
    {
      part: SPARE_PARTS_DATA[0], // Havoline 4T Engine oil (650)
      quantity: 2,
      selected: true
    },
    {
      part: SPARE_PARTS_DATA[2], // Chain set (1800)
      quantity: 1,
      selected: true
    },
    {
      part: SPARE_PARTS_DATA[4], // Spark plug (300)
      quantity: 2,
      selected: true
    }
  ]);

  const [wishlist, setWishlist] = useState<number[]>([1, 4]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [currentCity, setCurrentCity] = useState<string>('Lahore, Pakistan');
  const [customerName, setCustomerName] = useState<string>('Muhammad Usman Tariq');
  const [customerPhone, setCustomerPhone] = useState<string>('0300-1234567');
  const [customerAddress, setCustomerAddress] = useState<string>('House # 42-B, Street 14, Cavalry Ground, Lahore, Punjab');
  const [riderNote, setRiderNote] = useState<string>('Call before arrival (2 PM - 6 PM)');
  
  const [promoCode, setPromoCode] = useState<string>('PAKBIKE');
  const [promoDiscount, setPromoDiscount] = useState<number>(300);
  const [promoApplied, setPromoApplied] = useState<boolean>(true);

  const [toast, setToast] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SparePart | null>(null);

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'BPH-PK-88429',
      date: 'Today, 02:15 PM',
      items: [
        {
          partId: 1,
          title: 'Motorcycle Engine Oil (Havoline 4T 20W-50)',
          sku: 'PK-LUB-001',
          compatibility: 'Fits: CD70 / CG125',
          imageUrl: SPARE_PARTS_DATA[0].imageUrl,
          price: 650,
          quantity: 2
        },
        {
          partId: 3,
          title: 'Motorcycle Chain Set (Heavy Duty DID)',
          sku: 'PK-CHN-004',
          compatibility: 'Fits: CG125 / GS150',
          imageUrl: SPARE_PARTS_DATA[2].imageUrl,
          price: 1800,
          quantity: 1
        },
        {
          partId: 5,
          title: 'Spark Plug (NGK C7HSA Genuine Japan)',
          sku: 'PK-ELC-008',
          compatibility: 'Fits: 70cc Universal',
          imageUrl: SPARE_PARTS_DATA[4].imageUrl,
          price: 300,
          quantity: 2
        }
      ],
      subtotal: 3700,
      discount: 300,
      shipping: 200,
      total: 3600,
      paymentMethod: 'cod',
      status: 'Dispatched via TCS',
      estimatedDelivery: 'Tomorrow by 5:00 PM',
      trackingNumber: 'TCS-928491823-LHE',
      shippingAddress: 'House # 42-B, Street 14, Cavalry Ground, Lahore, Punjab',
      phone: '0300-1234567',
      customerName: 'Muhammad Usman Tariq'
    }
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (part: SparePart, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.part.id === part.id);
      if (existing) {
        return prev.map(item =>
          item.part.id === part.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { part, quantity, selected: true }];
      }
    });
    showToast(`Added ${quantity}x ${part.title.split('(')[0].trim()} to cart`);
  };

  const buyNow = (part: SparePart, quantity = 1) => {
    addToCart(part, quantity);
    setScreen('checkout');
  };

  const removeFromCart = (partId: number) => {
    const item = cart.find(c => c.part.id === partId);
    setCart(prev => prev.filter(c => c.part.id !== partId));
    if (item) {
      showToast(`Removed ${item.part.title.split('(')[0].trim()} from cart`);
    }
  };

  const updateCartQty = (partId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(partId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.part.id === partId ? { ...item, quantity: Math.min(qty, 50) } : item
      )
    );
  };

  const toggleItemSelection = (partId: number) => {
    setCart(prev =>
      prev.map(item =>
        item.part.id === partId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAllItems = (selected: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected })));
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared");
  };

  const toggleWishlist = (partId: number) => {
    setWishlist(prev => {
      const exists = prev.includes(partId);
      if (exists) {
        showToast("Removed from Bike Garage");
        return prev.filter(id => id !== partId);
      } else {
        showToast("Saved to Bike Garage Wishlist");
        return [...prev, partId];
      }
    });
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PAKBIKE' || clean === 'MECHANIC10') {
      setPromoCode(clean);
      setPromoDiscount(300);
      setPromoApplied(true);
      showToast(`Rs. 300 discount unlocked with ${clean}!`);
      return true;
    } else if (clean === 'AZADI40') {
      setPromoCode(clean);
      setPromoDiscount(500);
      setPromoApplied(true);
      showToast(`Azadi special discount of Rs. 500 applied!`);
      return true;
    } else {
      showToast("Invalid promo code. Try PAKBIKE or MECHANIC10");
      return false;
    }
  };

  const removePromo = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    showToast("Promo code removed");
  };

  // Calculations based on selected items
  const selectedCart = cart.filter(item => item.selected);
  const cartSubtotal = selectedCart.reduce((sum, item) => sum + item.part.price * item.quantity, 0);
  const freeShippingThreshold = 4000;
  const cartDelivery = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 200;
  const currentDiscount = promoApplied ? Math.min(promoDiscount, cartSubtotal) : 0;
  const cartTotal = Math.max(0, cartSubtotal - currentDiscount + (cartSubtotal > 0 ? cartDelivery : 0));
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const createOrder = (paymentMethod: 'cod' | 'wallet' | 'bank' | 'card'): Order => {
    const orderItems: OrderItem[] = selectedCart.map(item => ({
      partId: item.part.id,
      title: item.part.title,
      sku: item.part.sku,
      compatibility: item.part.compatibility,
      imageUrl: item.part.imageUrl,
      price: item.part.price,
      quantity: item.quantity
    }));

    const newOrder: Order = {
      id: `BPH-PK-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Just now',
      items: orderItems,
      subtotal: cartSubtotal,
      discount: currentDiscount,
      shipping: cartDelivery,
      total: cartTotal,
      paymentMethod,
      status: 'Processing',
      estimatedDelivery: '2 - 3 Business Days via TCS Express',
      trackingNumber: `TCS-${Math.floor(100000000 + Math.random() * 900000000)}-LHE`,
      shippingAddress: customerAddress,
      phone: customerPhone,
      customerName
    };

    setOrders(prev => [newOrder, ...prev]);
    // remove purchased items from cart
    setCart(prev => prev.filter(item => !item.selected));
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQty,
        toggleItemSelection,
        selectAllItems,
        clearCart,
        wishlist,
        toggleWishlist,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        searchQuery,
        setSearchQuery,
        currentCity,
        setCurrentCity,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        customerAddress,
        setCustomerAddress,
        riderNote,
        setRiderNote,
        promoCode,
        promoDiscount,
        promoApplied,
        applyPromo,
        removePromo,
        cartSubtotal,
        cartDelivery,
        cartTotal,
        freeShippingThreshold,
        freeShippingProgress,
        orders,
        createOrder,
        toast,
        showToast,
        selectedProduct,
        setSelectedProduct,
        filterModalOpen,
        setFilterModalOpen,
        locationModalOpen,
        setLocationModalOpen,
        scannerModalOpen,
        setScannerModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
