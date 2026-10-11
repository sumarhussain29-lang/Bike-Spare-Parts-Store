import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_LOGO, USER_AVATAR } from '../data/parts';

export const Header: React.FC<{ showBack?: boolean }> = ({ showBack }) => {
  const { currentCity, setLocationModalOpen, setScreen, screen } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-[#2a2a2a]/60">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          {/* Left: Back button or Logo + Location */}
          <div className="flex items-center gap-2 min-w-0">
            {showBack || screen === 'checkout' ? (
              <button
                aria-label="Go Back"
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#201f1f] text-[#e5e2e1] active:scale-95 transition-transform shrink-0"
                onClick={() => setScreen(screen === 'checkout' ? 'cart' : 'home')}
              >
                <span className="material-symbols-outlined text-xl leading-none">arrow_back_ios_new</span>
              </button>
            ) : null}

            <button
              onClick={() => setScreen('home')}
              className="flex items-center shrink-0 focus:outline-none"
            >
              <img
                alt="BikeParts Hub Pakistan Logo"
                className="h-8 w-auto object-contain shrink-0"
                src={APP_LOGO}
              />
            </button>

            {screen === 'checkout' ? (
              <h1 className="font-['Outfit'] font-bold text-lg text-[#e5e2e1] truncate ml-1">
                Checkout
              </h1>
            ) : (
              <button
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#201f1f] text-[#e5bdbe] text-[11px] font-semibold truncate shadow-[0_1px_8px_rgba(0,0,0,0.3)] hover:bg-[#2a2a2a] active:scale-95 transition-all max-w-[170px]"
              >
                <span className="material-symbols-outlined text-sm text-[#e11d48] leading-none shrink-0">location_on</span>
                <span className="truncate">Deliver to: {currentCity.split(',')[0]}</span>
                <span className="material-symbols-outlined text-xs leading-none shrink-0">arrow_drop_down</span>
              </button>
            )}
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative w-11 h-11 flex items-center justify-center rounded-lg bg-[#201f1f] text-[#e5e2e1] hover:bg-[#2a2a2a] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#e11d48] text-[#fffaf9] text-[10px] leading-none font-bold">
                3
              </span>
            </button>

            <button
              aria-label="Profile"
              onClick={() => setScreen('profile')}
              className="flex items-center justify-center p-0.5 rounded-full bg-[#201f1f] hover:ring-2 hover:ring-[#e11d48] transition-all"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={USER_AVATAR}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown Sheet */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end" onClick={() => setNotificationsOpen(false)}>
          <div
            className="w-full max-w-sm bg-[#1c1b1b] h-full shadow-2xl p-4 flex flex-col pt-20 border-l border-[#2a2a2a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e11d48]">notifications_active</span>
                <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1]">Warehouse Dispatch Alerts</h3>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="text-[#c0c7d3] hover:text-[#e5e2e1]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-4 overflow-y-auto">
              <div className="p-3 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#e11d48] px-1.5 py-0.5 rounded bg-[#e11d48]/20">TCS Express</span>
                  <span className="text-[10px] text-[#c0c7d3]">15 mins ago</span>
                </div>
                <p className="text-xs text-[#e5e2e1] font-semibold mt-1">Order #BPH-PK-88429 dispatched from Lahore Central Hub</p>
                <p className="text-[11px] text-[#c0c7d3]">Assigned to TCS Rider. Expected delivery tomorrow by 5:00 PM.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#ffb95f] px-1.5 py-0.5 rounded bg-[#ffb95f]/20">Promo Alert</span>
                  <span className="text-[10px] text-[#c0c7d3]">1 hour ago</span>
                </div>
                <p className="text-xs text-[#e5e2e1] font-semibold mt-1">Azadi Biker Voucher Active!</p>
                <p className="text-[11px] text-[#c0c7d3]">Use code <strong className="text-[#ffb95f]">PAKBIKE</strong> for Rs. 300 discount on genuine spares.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#25D366] px-1.5 py-0.5 rounded bg-[#25D366]/20">Stock Restock</span>
                  <span className="text-[10px] text-[#c0c7d3]">3 hours ago</span>
                </div>
                <p className="text-xs text-[#e5e2e1] font-semibold mt-1">D.I.D Japan Chain Sets Restocked</p>
                <p className="text-[11px] text-[#c0c7d3]">19 fresh OEM units checked into Rawalpindi & Lahore hubs.</p>
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="mt-auto w-full py-2.5 rounded-lg bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534]"
            >
              Close Notifications
            </button>
          </div>
        </div>
      )}
    </>
  );
};
