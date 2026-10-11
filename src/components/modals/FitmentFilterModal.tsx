import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIKE_BRANDS } from '../../data/parts';

export const FitmentFilterModal: React.FC = () => {
  const { filterModalOpen, setFilterModalOpen, setSelectedBrand, showToast, selectedBrand } = useApp();

  const [activeBrand, setActiveBrand] = useState(selectedBrand);
  const [selectedDisplacement, setSelectedDisplacement] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2024');

  if (!filterModalOpen) return null;

  const displacements = ['All', '70cc', '100cc', '125cc', '150cc'];
  const years = ['2026', '2025', '2024', '2023', '2022', '2020-Earlier'];

  const handleApply = () => {
    setSelectedBrand(activeBrand);
    setFilterModalOpen(false);
    showToast(`Verified fitment applied for ${activeBrand === 'all' ? 'All Models' : activeBrand}`);
  };

  const handleReset = () => {
    setActiveBrand('all');
    setSelectedBrand('all');
    setFilterModalOpen(false);
    showToast("Fitment filter reset to Universal");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#201f1f] border border-[#2a2a2a] rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e11d48]">tune</span>
            <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1]">Verified Fitment Filter</h3>
          </div>
          <button onClick={() => setFilterModalOpen(false)} className="text-[#c0c7d3] hover:text-[#e5e2e1]">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Motorcycle Make */}
        <div>
          <label className="text-[11px] font-bold text-[#c0c7d3] uppercase tracking-wider block mb-2">
            1. Select Motorcycle Brand
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BIKE_BRANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBrand(b.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeBrand === b.id
                    ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-sm'
                    : 'bg-[#1c1b1b] border-[#2a2a2a] text-[#e5e2e1] hover:bg-[#2a2a2a]'
                }`}
              >
                <div className="text-xs font-bold">{b.name}</div>
                <div className="text-[10px] opacity-80">{b.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Displacement */}
        <div>
          <label className="text-[11px] font-bold text-[#c0c7d3] uppercase tracking-wider block mb-2">
            2. Engine Displacement
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {displacements.map((cc) => (
              <button
                key={cc}
                type="button"
                onClick={() => setSelectedDisplacement(cc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 border transition-all ${
                  selectedDisplacement === cc
                    ? 'bg-[#ffb95f] border-[#ffb95f] text-black font-bold'
                    : 'bg-[#1c1b1b] border-[#2a2a2a] text-[#c0c7d3] hover:text-[#e5e2e1]'
                }`}
              >
                {cc}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="text-[11px] font-bold text-[#c0c7d3] uppercase tracking-wider block mb-2">
            3. Manufacturing Year
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 border transition-all ${
                  selectedYear === yr
                    ? 'bg-[#ffb3b6] border-[#ffb3b6] text-[#68001a] font-bold'
                    : 'bg-[#1c1b1b] border-[#2a2a2a] text-[#c0c7d3] hover:text-[#e5e2e1]'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#2a2a2a]">
          <button
            type="button"
            onClick={handleReset}
            className="py-3 rounded-xl bg-[#2a2a2a] border border-[#353534] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534]"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="py-3 rounded-xl bg-[#e11d48] text-[#fffaf9] text-xs font-bold hover:brightness-110 shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
