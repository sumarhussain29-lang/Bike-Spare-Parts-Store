import React from 'react';
import { useApp } from '../../context/AppContext';

export const LocationModal: React.FC = () => {
  const { locationModalOpen, setLocationModalOpen, currentCity, setCurrentCity, showToast } = useApp();

  if (!locationModalOpen) return null;

  const CITIES = [
    { city: 'Lahore, Pakistan', hub: 'Lahore Central Hub (Cavalry & Badami Bagh)', time: '24h Express' },
    { city: 'Rawalpindi, Pakistan', hub: 'Murree Road Hub', time: '24h Express' },
    { city: 'Islamabad, Pakistan', hub: 'I-9 Industrial Hub', time: '24h Express' },
    { city: 'Karachi, Pakistan', hub: 'Tariq Road & Saddar Hub', time: '48h TCS Air Express' },
    { city: 'Faisalabad, Pakistan', hub: 'Clock Tower Hub', time: '24h Express' },
    { city: 'Multan, Pakistan', hub: 'Bosan Road Hub', time: '24h Express' },
    { city: 'Peshawar, Pakistan', hub: 'Karkhano Hub', time: '36h Express' },
    { city: 'Gujranwala, Pakistan', hub: 'G.T Road Hub', time: '24h Express' },
    { city: 'Sialkot, Pakistan', hub: 'Kashmir Road Hub', time: '24h Express' },
    { city: 'Quetta, Pakistan', hub: 'Chaman & Zarghoon Hub', time: '48h TCS Express' }
  ];

  const handleSelectCity = (c: typeof CITIES[0]) => {
    setCurrentCity(c.city);
    setLocationModalOpen(false);
    showToast(`Delivery location set to ${c.city} (${c.time})`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#201f1f] border border-[#2a2a2a] rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e11d48]">location_on</span>
            <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1]">Choose Delivery Destination</h3>
          </div>
          <button onClick={() => setLocationModalOpen(false)} className="text-[#c0c7d3] hover:text-[#e5e2e1]">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <p className="text-xs text-[#c0c7d3]">
          Select your city to view exact warehouse proximity, dispatch speeds, and cash on delivery coverage.
        </p>

        <div className="flex flex-col gap-2">
          {CITIES.map((c) => {
            const isCurrent = currentCity.toLowerCase() === c.city.toLowerCase();

            return (
              <button
                key={c.city}
                onClick={() => handleSelectCity(c)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-[#2a2a2a] border-[#e11d48] shadow-sm'
                    : 'bg-[#1c1b1b] border-[#2a2a2a] hover:bg-[#252525]'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#e5e2e1] truncate">{c.city}</span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#e11d48] shrink-0"></span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#c0c7d3] block truncate">{c.hub}</span>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-[#ffb95f]/20 text-[#ffb95f] text-[10px] font-bold shrink-0">
                  {c.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
