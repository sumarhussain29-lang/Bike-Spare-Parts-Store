import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SPARE_PARTS_DATA, BIKE_BRANDS } from '../data/parts';
import { SparePart } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    setScreen,
    addToCart,
    wishlist,
    toggleWishlist,
    selectedBrand,
    setSelectedBrand,
    setSelectedCategory,
    setSearchQuery,
    setScannerModalOpen,
    setSelectedProduct,
    showToast,
    applyPromo
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const fastMovingParts = SPARE_PARTS_DATA.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setScreen('categories');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setScreen('categories');
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setScreen('categories');
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search & Fast Diagnostic Tools */}
      <div className="px-4 pt-2 pb-2">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-[#2a2a2a] rounded-xl p-1 shadow-md">
          <span className="material-symbols-outlined text-[#c0c7d3] ml-3 mr-2 text-xl select-none">search</span>
          <input
            className="w-full bg-transparent text-[#e5e2e1] placeholder:text-[#6d747f] text-xs focus:outline-none pr-2 py-2.5 truncate"
            placeholder="Search 25,000+ parts (e.g. CD70 Brake, CG125 Oil)..."
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <div className="flex items-center gap-1 pr-1.5 shrink-0">
            <button
              type="button"
              aria-label="Voice Search"
              onClick={() => {
                showToast("Voice search activated: 'Say bike part or model'");
              }}
              className="w-8 h-8 rounded-lg bg-[#201f1f] hover:bg-[#393939] flex items-center justify-center text-[#c0c7d3] transition-colors"
              title="Voice Search"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
            </button>
            <button
              type="button"
              aria-label="Scan Part QR/Bar"
              onClick={() => setScannerModalOpen(true)}
              className="w-8 h-8 rounded-lg bg-[#e11d48] text-[#fffaf9] flex items-center justify-center shadow-sm hover:opacity-90 active:scale-95 transition-all"
              title="Part Scanner"
            >
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </button>
          </div>
        </form>
      </div>

      {/* Realtime Flash Ticker / Delivery Assurance */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#1c1b1b] text-[#c0c7d3] text-[11px] overflow-hidden border border-[#2a2a2a]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#ee9800] animate-pulse shrink-0"></span>
            <span className="text-[#ffb95f] font-bold tracking-wider">CASH ON DELIVERY</span>
            <span className="text-[#6d747f] truncate">Available all across Pakistan</span>
          </div>
          <div className="flex items-center gap-1 text-[#ffb3b6] shrink-0 font-bold ml-2">
            <span className="material-symbols-outlined text-xs">local_shipping</span>
            <span>Free &gt; Rs. 2,000</span>
          </div>
        </div>
      </div>

      {/* Promotional High-Octane Hero Banner Carousel */}
      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] shadow-xl">
          {/* Ambient crimson racing glow */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#e11d48]/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -top-12 w-36 h-36 rounded-full bg-[#ffb95f]/15 blur-2xl pointer-events-none"></div>

          <div className="relative p-5 flex flex-col justify-between min-h-[175px]">
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e11d48] text-[#fffaf9] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Mega Azadi Sale
              </span>
              <button
                onClick={() => {
                  applyPromo('PAKBIKE');
                  navigator.clipboard?.writeText('PAKBIKE');
                  showToast("Voucher code PAKBIKE copied!");
                }}
                className="px-2 py-0.5 rounded bg-[#2a2a2a]/90 text-[#ffb95f] text-[11px] font-mono tracking-wide hover:bg-[#353534] active:scale-95 transition-all"
              >
                CODE: <span className="text-[#e5e2e1] font-bold">PAKBIKE</span>
              </button>
            </div>

            <div className="my-2.5">
              <h2 className="font-['Outfit'] text-[24px] text-[#e5e2e1] leading-tight font-extrabold tracking-tight">
                Up to <span className="text-[#e11d48]">40% OFF</span> Spares
              </h2>
              <p className="text-xs text-[#c0c7d3] mt-1 line-clamp-2">
                Genuine Honda, Yamaha &amp; Suzuki parts. Free delivery in Lahore, Karachi &amp; Rawalpindi!
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setScreen('categories');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e11d48] text-[#fffaf9] text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Shop Deals</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <div className="flex gap-1.5 items-center">
                <span
                  onClick={() => setActiveBannerIndex(0)}
                  className={`cursor-pointer transition-all ${
                    activeBannerIndex === 0 ? 'w-5 h-1.5 rounded-full bg-[#e11d48]' : 'w-1.5 h-1.5 rounded-full bg-[#393939]'
                  }`}
                ></span>
                <span
                  onClick={() => setActiveBannerIndex(1)}
                  className={`cursor-pointer transition-all ${
                    activeBannerIndex === 1 ? 'w-5 h-1.5 rounded-full bg-[#e11d48]' : 'w-1.5 h-1.5 rounded-full bg-[#393939]'
                  }`}
                ></span>
                <span
                  onClick={() => setActiveBannerIndex(2)}
                  className={`cursor-pointer transition-all ${
                    activeBannerIndex === 2 ? 'w-5 h-1.5 rounded-full bg-[#e11d48]' : 'w-1.5 h-1.5 rounded-full bg-[#393939]'
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motorcycle Brand Quick Filter */}
      <div className="mb-6">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#e11d48] text-base">two_wheeler</span>
            <h3 className="font-['Outfit'] text-sm text-[#e5e2e1] font-bold">Select Your Bike</h3>
          </div>
          <button
            onClick={() => setSelectedBrand('all')}
            className="text-[11px] text-[#ffb3b6] font-semibold hover:underline"
          >
            Clear Filter
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto px-4 py-2 no-scrollbar">
          {BIKE_BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand.id || (brand.id === 'Honda CD70/CG125' && selectedBrand === 'all');
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand.id)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl transition-transform active:scale-95 border ${
                  selectedBrand === brand.id
                    ? 'bg-[#e11d48] text-[#fffaf9] border-[#e11d48] shadow-md'
                    : 'bg-[#201f1f] text-[#e5e2e1] border-[#2a2a2a] hover:bg-[#2a2a2a]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-['Outfit'] text-xs ${
                    selectedBrand === brand.id ? 'bg-[#0e0e0e]/40 text-white' : 'bg-[#393939] text-[#ffb95f]'
                  }`}
                >
                  {brand.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold leading-none">{brand.name}</div>
                  <div
                    className={`text-[9px] leading-tight ${
                      selectedBrand === brand.id ? 'opacity-85' : 'text-[#c0c7d3]'
                    }`}
                  >
                    {brand.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Quick Categories Grid (3x2) */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-['Outfit'] text-sm text-[#e5e2e1] font-bold">Categories</h3>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setScreen('categories');
            }}
            className="text-[11px] text-[#ffb3b6] font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span>View 18+</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Engine Parts */}
          <button
            onClick={() => handleCategoryClick('Engine Parts')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#e11d48] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">settings_input_component</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Engine Parts</span>
          </button>

          {/* Brakes & Clutch */}
          <button
            onClick={() => handleCategoryClick('Brakes & Clutch')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#ffb95f] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">sports_motorsports</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Brakes &amp; Clutch</span>
          </button>

          {/* Electrical */}
          <button
            onClick={() => handleCategoryClick('Electrical Parts')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#ffb3b6] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">electric_bolt</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Electrical</span>
          </button>

          {/* Lights */}
          <button
            onClick={() => handleCategoryClick('Lights & Indicators')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#ffb95f] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">highlight</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Lights &amp; Horn</span>
          </button>

          {/* Tyres & Wheels */}
          <button
            onClick={() => handleCategoryClick('Tyres & Wheels')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#c0c7d3] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">tire_repair</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Tyres &amp; Wheels</span>
          </button>

          {/* Lubricants */}
          <button
            onClick={() => handleCategoryClick('Filters & Lubricants')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all text-center group active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] flex items-center justify-center text-[#e11d48] mb-1.5 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">oil_barrel</span>
            </div>
            <span className="text-[11px] text-[#e5e2e1] font-semibold line-clamp-1">Lubricants</span>
          </button>
        </div>
      </div>

      {/* Featured & Best-Selling Spare Parts Grid (2 Columns, 6 items) */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#e11d48] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <h3 className="font-['Outfit'] text-base text-[#e5e2e1] font-bold">Fast-Moving Spares</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#201f1f] text-[#c0c7d3] text-[11px] border border-[#2a2a2a]">
            6 items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {fastMovingParts.map((item) => {
            const isFav = wishlist.includes(item.id);
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-[#201f1f] rounded-xl p-2.5 shadow-md border border-[#2a2a2a] relative group hover:border-[#353534] transition-all"
              >
                <div>
                  {/* Top tags & Image */}
                  <div
                    onClick={() => setSelectedProduct(item)}
                    className="relative w-full aspect-square rounded-lg bg-[#0e0e0e] overflow-hidden mb-2 cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.imageAlt}
                      src={item.imageUrl}
                    />
                    {item.discountPercent && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#e11d48] text-[#fffaf9] text-[9px] font-bold uppercase">
                        -{item.discountPercent}%
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-[#2a2a2a]/80 backdrop-blur flex items-center justify-center transition-colors ${
                        isFav ? 'text-[#e11d48]' : 'text-[#c0c7d3] hover:text-[#ffb3b6]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Compatibility Pill */}
                  <div className="flex items-center gap-1 text-[#ffb95f] text-[10px] font-medium mb-1 truncate">
                    <span className="material-symbols-outlined text-xs shrink-0">verified</span>
                    <span className="truncate">{item.compatibility}</span>
                  </div>

                  {/* Product Title */}
                  <h4
                    onClick={() => setSelectedProduct(item)}
                    className="text-xs text-[#e5e2e1] font-semibold line-clamp-2 leading-tight cursor-pointer hover:text-[#ffb3b6] transition-colors"
                  >
                    {item.title}
                  </h4>

                  {/* Rating & Stock */}
                  <div className="flex items-center gap-1 mt-1 text-[#c0c7d3] text-[11px]">
                    <span className="material-symbols-outlined text-xs text-[#ffb95f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-[#e5e2e1] font-bold">{item.rating}</span>
                    <span>({item.reviewsCount})</span>
                  </div>

                  <div className="text-[10px] text-[#ffb3b6] mt-0.5">
                    In Stock ({item.stock} left)
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="mt-2 pt-2 border-t border-[#2a2a2a] flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-['Outfit'] text-sm text-[#e5e2e1] font-bold">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-[#c0c7d3] line-through">
                        Rs. {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="w-full py-2 rounded-lg bg-[#e11d48] text-[#fffaf9] text-xs font-bold flex items-center justify-center gap-1 active:scale-95 shadow-sm transition-transform hover:brightness-110"
                  >
                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Mechanics Assurance Section */}
      <div className="px-4 mb-6">
        <div className="p-4 rounded-xl bg-[#2a2a2a] shadow-lg border border-[#353534]">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#e11d48] text-2xl">verified_user</span>
            <h3 className="font-['Outfit'] text-sm text-[#e5e2e1] font-bold">Why Pakistani Bikers Trust Us</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#201f1f] border border-[#2a2a2a]">
              <span className="material-symbols-outlined text-[#ffb95f] text-xl mt-0.5 shrink-0">workspace_premium</span>
              <div>
                <div className="text-xs text-[#e5e2e1] font-bold leading-tight">100% Genuine</div>
                <div className="text-[11px] text-[#c0c7d3] leading-tight mt-0.5">Direct OEM certified</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#201f1f] border border-[#2a2a2a]">
              <span className="material-symbols-outlined text-[#ffb3b6] text-xl mt-0.5 shrink-0">payments</span>
              <div>
                <div className="text-xs text-[#e5e2e1] font-bold leading-tight">Cash On Delivery</div>
                <div className="text-[11px] text-[#c0c7d3] leading-tight mt-0.5">Nationwide rider pay</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#201f1f] border border-[#2a2a2a]">
              <span className="material-symbols-outlined text-[#dce3f0] text-xl mt-0.5 shrink-0">sync</span>
              <div>
                <div className="text-xs text-[#e5e2e1] font-bold leading-tight">7-Day Easy Return</div>
                <div className="text-[11px] text-[#c0c7d3] leading-tight mt-0.5">No questions fitment</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#201f1f] border border-[#2a2a2a]">
              <span className="material-symbols-outlined text-[#ffb95f] text-xl mt-0.5 shrink-0">support_agent</span>
              <div>
                <div className="text-xs text-[#e5e2e1] font-bold leading-tight">Ustaad Advice</div>
                <div className="text-[11px] text-[#c0c7d3] leading-tight mt-0.5">WhatsApp mechanic aid</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Diagnostic Demo Notice Pill */}
      <div className="px-4">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1c1b1b] text-[#c0c7d3] shadow-sm border border-[#2a2a2a]">
          <span className="material-symbols-outlined text-[#e11d48] text-base shrink-0">tune</span>
          <p className="text-[11px] leading-tight text-[#6d747f]">
            <strong className="text-[#e5e2e1]">Demo Mode:</strong> All 25 inventory prices in PKR are synchronized with Lahore &amp; Rawalpindi supplier catalog.
          </p>
        </div>
      </div>
    </div>
  );
};
