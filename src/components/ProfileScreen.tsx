import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { USER_AVATAR } from '../data/parts';

export const ProfileScreen: React.FC = () => {
  const {
    customerName,
    customerPhone,
    customerAddress,
    currentCity,
    setLocationModalOpen,
    setSelectedBrand,
    setScreen,
    showToast
  } = useApp();

  const [garageBikes, setGarageBikes] = useState([
    {
      id: 1,
      make: 'Honda',
      model: 'CG125 Special Edition (Self Start)',
      year: '2023',
      brandKey: 'Honda CD70/CG125',
      primary: true
    },
    {
      id: 2,
      make: 'Yamaha',
      model: 'YBR 125G (Disc Brake)',
      year: '2022',
      brandKey: 'Yamaha YBR',
      primary: false
    }
  ]);

  const handleSetPrimaryBike = (bike: typeof garageBikes[0]) => {
    setGarageBikes(prev =>
      prev.map(b => ({ ...b, primary: b.id === bike.id }))
    );
    setSelectedBrand(bike.brandKey);
    showToast(`Active fitment switched to ${bike.model}`);
  };

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-2">
      {/* Profile Header */}
      <div className="bg-[#201f1f] border border-[#2a2a2a] rounded-2xl p-4 shadow-lg flex items-center gap-3.5 mb-4">
        <img
          src={USER_AVATAR}
          alt="User Profile"
          className="w-14 h-14 rounded-full object-cover border-2 border-[#e11d48] shadow-md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-['Outfit'] font-bold text-base text-[#e5e2e1] truncate">
              {customerName}
            </h2>
            <span className="px-1.5 py-0.2 rounded bg-[#ffb95f]/20 text-[#ffb95f] text-[10px] font-bold border border-[#ffb95f]/30">
              Verified Rider
            </span>
          </div>
          <p className="text-xs text-[#c0c7d3] mt-0.5">{customerPhone}</p>
          <p className="text-[11px] text-[#ffb3b6] truncate flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-xs">location_on</span>
            {currentCity}
          </p>
        </div>
      </div>

      {/* My Bike Garage */}
      <div className="bg-[#201f1f] border border-[#2a2a2a] rounded-xl p-3.5 shadow-md mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#e11d48] text-xl">garage</span>
            <h3 className="font-['Outfit'] font-bold text-sm text-[#e5e2e1]">My Bike Garage</h3>
          </div>
          <button
            onClick={() => showToast("Add Bike: Enter bike registration or model")}
            className="text-xs text-[#ffb3b6] font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span className="material-symbols-outlined text-xs">add</span>
            <span>Add Bike</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {garageBikes.map((bike) => (
            <div
              key={bike.id}
              onClick={() => handleSetPrimaryBike(bike)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                bike.primary
                  ? 'bg-[#2a2a2a] border-[#e11d48] shadow-sm'
                  : 'bg-[#1c1b1b] border-[#2a2a2a] hover:bg-[#252525]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-['Outfit'] text-xs shrink-0 ${
                    bike.primary ? 'bg-[#e11d48] text-white' : 'bg-[#353534] text-[#c0c7d3]'
                  }`}
                >
                  {bike.make.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#e5e2e1] truncate">{bike.model}</p>
                    {bike.primary && (
                      <span className="px-1.5 py-0.2 rounded bg-[#ffb95f] text-black text-[9px] font-bold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#c0c7d3]">Model Year: {bike.year} • 100% Fitment Filtered</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBrand(bike.brandKey);
                  setScreen('categories');
                }}
                className="px-2 py-1 rounded bg-[#201f1f] border border-[#353534] text-[10px] text-[#ffb3b6] font-semibold shrink-0 hover:bg-[#353534]"
              >
                Shop Parts
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings & Navigation */}
      <div className="bg-[#201f1f] border border-[#2a2a2a] rounded-xl p-3 shadow-md mb-4 flex flex-col gap-2">
        <h3 className="text-xs font-bold text-[#c0c7d3] uppercase tracking-wider mb-1 px-1">
          Account &amp; Logistics
        </h3>

        <button
          onClick={() => setLocationModalOpen(true)}
          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-xl">location_city</span>
            <div>
              <p className="text-xs font-semibold text-[#e5e2e1]">City &amp; Delivery Hub</p>
              <p className="text-[11px] text-[#c0c7d3]">{currentCity}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#c0c7d3]">chevron_right</span>
        </button>

        <button
          onClick={() => setScreen('orders')}
          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left border-t border-[#2a2a2a]"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#e11d48] text-xl">receipt_long</span>
            <div>
              <p className="text-xs font-semibold text-[#e5e2e1]">Order History &amp; Tracking</p>
              <p className="text-[11px] text-[#c0c7d3]">TCS Courier dispatches &amp; invoices</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#c0c7d3]">chevron_right</span>
        </button>

        <a
          href="https://wa.me/923001234567?text=Assalam-o-Alaikum%20Ustaad!%20Need%20advice%20for%20my%20bike."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left border-t border-[#2a2a2a]"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#25D366] text-xl">support_agent</span>
            <div>
              <p className="text-xs font-semibold text-[#e5e2e1]">Ustaad Mechanic Advice</p>
              <p className="text-[11px] text-[#c0c7d3]">Direct WhatsApp mechanic video/audio helpline</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#25D366]">open_in_new</span>
        </a>
      </div>

      {/* Warehouse Diagnostic Sync */}
      <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-3.5 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-base">cloud_sync</span>
            <span className="text-xs font-bold text-[#e5e2e1]">Central Hub Sync Status</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold">
            Connected (25 SKUs)
          </span>
        </div>
        <p className="text-[11px] text-[#c0c7d3]">
          Synchronized with Lahore (Badami Bagh &amp; Cavalry Hub) &amp; Rawalpindi (Murree Road Central) spare parts warehouses.
        </p>
        <button
          onClick={() => showToast("Warehouse prices and stock synchronized successfully!")}
          className="w-full py-2 rounded-lg bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold border border-[#353534] hover:bg-[#353534] active:scale-95 transition-all mt-1"
        >
          Force Stock Re-sync
        </button>
      </div>
    </div>
  );
};
