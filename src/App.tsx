import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FitmentFilterModal } from './components/modals/FitmentFilterModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { LocationModal } from './components/modals/LocationModal';
import { ScannerModal } from './components/modals/ScannerModal';

const AppContent: React.FC = () => {
  const { screen, toast } = useApp();

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen flex flex-col font-['Inter'] selection:bg-[#e11d48] selection:text-[#fffaf9]">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#131313]">
        {screen === 'home' && <HomeScreen />}
        {screen === 'categories' && <CategoriesScreen />}
        {screen === 'cart' && <CartScreen />}
        {screen === 'checkout' && <CheckoutScreen />}
        {screen === 'orders' && <OrdersScreen />}
        {screen === 'profile' && <ProfileScreen />}
      </main>

      {/* Persistent Bottom Navigation on standard screens */}
      {screen !== 'checkout' && <BottomNav />}

      {/* Floating Action Toast matching user design */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#353534] text-[#e5e2e1] shadow-2xl border border-[#393939]/40 animate-in fade-in zoom-in duration-150">
          <span className="material-symbols-outlined text-[#ffb95f] text-lg">check_circle</span>
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Global Interactive Modals */}
      <FitmentFilterModal />
      <ProductDetailModal />
      <LocationModal />
      <ScannerModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
