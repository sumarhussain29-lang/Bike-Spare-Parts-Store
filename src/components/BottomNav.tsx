import React from 'react';
import { useApp } from '../context/AppContext';
import { AppScreen } from '../types';

export const BottomNav: React.FC = () => {
  const { screen, setScreen, cart } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { key: AppScreen; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'categories', label: 'Categories', icon: 'category' },
    { key: 'cart', label: 'Cart', icon: 'shopping_cart' },
    { key: 'orders', label: 'Orders', icon: 'inventory_2' },
    { key: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <>
      {/* WhatsApp Support Floating Action Button */}
      <a
        aria-label="WhatsApp Support"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] text-xs font-semibold hover:scale-105 active:scale-95 transition-transform duration-150"
        href="https://wa.me/923001234567?text=Assalam-o-Alaikum%20BikeParts%20Hub!%20I%20need%20assistance%20with%20motorcycle%20spare%20parts%20fitment."
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined text-lg leading-none">chat</span>
        <span>Support</span>
      </a>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#1c1b1b]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t border-[#2a2a2a]">
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.map((item) => {
            const isActive = screen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setScreen(item.key)}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors duration-150 relative ${
                  isActive ? 'text-[#e11d48]' : 'text-[#c0c7d3] hover:text-[#e5e2e1]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>

                {item.key === 'cart' && totalCartCount > 0 && (
                  <span className="absolute top-1 right-2.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#e11d48] text-[#fffaf9] text-[10px] leading-none font-bold">
                    {totalCartCount}
                  </span>
                )}

                <span className={`text-[10px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
