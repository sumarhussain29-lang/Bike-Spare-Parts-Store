import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SPARE_PARTS_DATA, CATEGORIES_LIST, BIKE_BRANDS } from '../data/parts';
import { SparePart } from '../types';

export const CategoriesScreen: React.FC = () => {
  const {
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery,
    setFilterModalOpen,
    setSelectedProduct,
    showToast
  } = useApp();

  const [sortOption, setSortOption] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQty = (id: number) => quantities[id] || 1;

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const updated = Math.max(1, Math.min(50, current + delta));
      return { ...prev, [id]: updated };
    });
  };

  const filteredParts = useMemo(() => {
    return SPARE_PARTS_DATA.filter(item => {
      // Category filter
      const matchCat =
        selectedCategory === 'all' ||
        selectedCategory === 'All (25)' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Brand filter
      const matchBrand =
        selectedBrand === 'all' ||
        item.brand.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        selectedBrand.toLowerCase().includes(item.brand.toLowerCase());

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.compatibility.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q);

      return matchCat && matchBrand && matchSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortOption]);

  const activeFitmentText = useMemo(() => {
    if (selectedBrand === 'all') return 'Universal & All Models';
    const found = BIKE_BRANDS.find(b => b.id === selectedBrand);
    return found ? `${found.name} (${found.label})` : selectedBrand;
  }, [selectedBrand]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSortOption('popular');
    showToast("Filters reset to default");
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Live Sync Garage Banner */}
      <div className="px-4 pt-1 pb-2">
        <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#2a2a2a] text-[#e5e2e1] shadow-md border border-[#353534]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb95f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ee9800]"></span>
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#ffb95f] uppercase tracking-wider truncate">DEMO MODE ACTIVE</p>
              <p className="text-xs text-[#c0c7d3] truncate">Lahore &amp; Rawalpindi Central Hub Warehouse Sync</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full bg-[#201f1f] text-[10px] font-bold text-[#e5bdbe] border border-[#2a2a2a] shrink-0">
            25 SKUs Live
          </span>
        </div>
      </div>

      {/* Search & Active Fitment Bar */}
      <div className="px-4 space-y-2">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#c0c7d3] text-xl pointer-events-none">
            search
          </span>
          <input
            className="w-full h-12 pl-10 pr-10 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] text-[#e5e2e1] placeholder:text-[#6d747f] text-xs focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
            placeholder="Search OEM part, code, or model..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              aria-label="Clear Search"
              className="absolute right-3 text-[#c0c7d3] hover:text-[#e5e2e1]"
              onClick={() => setSearchQuery('')}
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Quick Fitment Garage Selector Card */}
        <div className="p-3 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#e11d48]/20 flex items-center justify-center text-[#ffb3b6] shrink-0">
              <span className="material-symbols-outlined text-lg">two_wheeler</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#c0c7d3] font-medium">Verified Fitment Filter</p>
              <p className="font-['Inter'] text-xs font-semibold text-[#e5e2e1] truncate">
                {activeFitmentText}
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534] active:scale-95 transition-all shrink-0 border border-[#353534]"
          >
            <span className="material-symbols-outlined text-sm text-[#ffb95f]">tune</span>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Scrollable Chips */}
      <div className="mt-3">
        <div className="px-4 flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-[#c0c7d3] tracking-wider uppercase">SYSTEM CATEGORIES</span>
          <span className="text-[11px] font-bold text-[#ffb3b6]">
            Showing {filteredParts.length} items
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => {
            const isCatActive =
              (selectedCategory === 'all' && cat === 'All (25)') ||
              selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All (25)' ? 'all' : cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all shadow-sm ${
                  isCatActive
                    ? 'bg-[#e11d48] text-[#fffaf9]'
                    : 'bg-[#2a2a2a] text-[#c0c7d3] hover:text-[#e5e2e1] border border-[#353534]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bike Brand Horizontal Scroller */}
      <div className="mt-1 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold shadow-sm transition-all ${
              selectedBrand === 'all'
                ? 'bg-[#ffb3b6] text-[#68001a]'
                : 'bg-[#1c1b1b] text-[#c0c7d3] hover:text-[#e5e2e1] border border-[#2a2a2a]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">done_all</span>
            All Brands
          </button>

          {BIKE_BRANDS.filter(b => b.id !== 'all').map((brand) => {
            const isBrandActive = selectedBrand === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isBrandActive
                    ? 'bg-[#ffb3b6] text-[#68001a] font-bold shadow-sm'
                    : 'bg-[#1c1b1b] text-[#c0c7d3] hover:text-[#e5e2e1] border border-[#2a2a2a]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">verified</span>
                {brand.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Bar & Quick Filter Toggles */}
      <div className="mt-3 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-[#1c1b1b] border border-[#2a2a2a] px-3 py-1.5 rounded-lg w-full max-w-[220px]">
          <span className="material-symbols-outlined text-sm text-[#c0c7d3]">swap_vert</span>
          <select
            className="w-full bg-transparent text-[#e5e2e1] text-xs font-medium focus:outline-none cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
          >
            <option className="bg-[#201f1f] text-[#e5e2e1]" value="popular">Popularity (High-Demand)</option>
            <option className="bg-[#201f1f] text-[#e5e2e1]" value="price-asc">Price: Low to High</option>
            <option className="bg-[#201f1f] text-[#e5e2e1]" value="price-desc">Price: High to Low</option>
            <option className="bg-[#201f1f] text-[#e5e2e1]" value="rating">Top Rated Garage Grade</option>
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Grid View"
            onClick={() => setViewMode('grid')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              viewMode === 'grid'
                ? 'bg-[#2a2a2a] text-[#e11d48] border border-[#e11d48]/40'
                : 'bg-[#1c1b1b] text-[#c0c7d3] border border-[#2a2a2a]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
          </button>
          <button
            aria-label="List View"
            onClick={() => setViewMode('list')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              viewMode === 'list'
                ? 'bg-[#2a2a2a] text-[#e11d48] border border-[#e11d48]/40'
                : 'bg-[#1c1b1b] text-[#c0c7d3] border border-[#2a2a2a]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">view_list</span>
          </button>
        </div>
      </div>

      {/* Pakistan Fast Guarantee Notice */}
      <div className="mt-2.5 px-4">
        <div className="p-2.5 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] flex items-center justify-between text-[#c0c7d3]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-sm">local_shipping</span>
            <span className="text-xs text-[#e5e2e1] font-medium">Cash on Delivery Available</span>
          </div>
          <span className="text-xs text-[#ffb95f] font-semibold">Punjab &amp; Sindh 24h Express</span>
        </div>
      </div>

      {/* Product Catalog Grid / List */}
      <div className="mt-3 px-4">
        {filteredParts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center text-[#c0c7d3] mb-3 border border-[#2a2a2a]">
              <span className="material-symbols-outlined text-3xl">build_circle</span>
            </div>
            <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1] mb-1">No Matching Spare Parts</h3>
            <p className="text-xs text-[#c0c7d3] max-w-xs mb-4">
              We couldn't find matches for this specific query or vehicle filter.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-lg bg-[#e11d48] text-[#fffaf9] text-xs font-bold active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 gap-2.5'
                : 'grid grid-cols-1 gap-2.5'
            }
          >
            {filteredParts.map((item) => {
              const qty = getQty(item.id);
              const isFav = wishlist.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`flex rounded-xl bg-[#2a2a2a] p-2.5 shadow-md border border-[#353534] transition-all hover:border-[#5c3f40] ${
                    viewMode === 'grid' ? 'flex-col justify-between' : 'flex-row gap-3 items-center'
                  }`}
                >
                  {/* Top Badges & Image */}
                  <div
                    onClick={() => setSelectedProduct(item)}
                    className={`relative rounded-lg bg-[#0e0e0e] overflow-hidden cursor-pointer shrink-0 ${
                      viewMode === 'grid' ? 'w-full aspect-square mb-2' : 'w-24 h-24'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#0e0e0e]/80 backdrop-blur-sm text-[#ffb95f] text-[9px] font-mono font-bold">
                      {item.sku}
                    </div>
                    <button
                      type="button"
                      aria-label="Add to garage wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#0e0e0e]/70 backdrop-blur-sm flex items-center justify-center transition-colors ${
                        isFav ? 'text-[#e11d48]' : 'text-[#e5e2e1] hover:text-[#ffb3b6]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-xs"
                        style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0e0e0e]/80 text-[9px] text-[#c0c7d3]">
                      In Stock: {item.stock}
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-[#201f1f] text-[9px] font-semibold text-[#ffb3b6] truncate max-w-[120px] border border-[#353534]">
                        {item.category}
                      </span>
                      <span className="flex items-center text-[10px] text-[#ffb95f] ml-auto shrink-0 font-bold">
                        <span className="material-symbols-outlined text-xs leading-none mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        {item.rating}
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(item)}
                      className="font-['Inter'] text-xs font-semibold text-[#e5e2e1] line-clamp-2 leading-tight mb-1 cursor-pointer hover:text-[#ffb3b6]"
                      title={item.title}
                    >
                      {item.title}
                    </h4>

                    {/* Fitment Compatibility Pill */}
                    <div className="flex items-center gap-1 p-1 rounded bg-[#0e0e0e] text-[10px] text-[#c0c7d3] truncate mb-2 border border-[#201f1f]">
                      <span className="material-symbols-outlined text-xs text-[#ee9800] leading-none shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="truncate">{item.compatibility}</span>
                    </div>

                    {/* Price in PKR */}
                    <div className="flex items-baseline justify-between mt-auto mb-2">
                      <div>
                        <span className="text-[10px] text-[#c0c7d3] uppercase font-bold">PKR</span>
                        <span className="font-['Outfit'] text-base font-bold text-[#e11d48] leading-none ml-1">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Stepper & Actions */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-[#201f1f] rounded-lg p-1 border border-[#353534]">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="w-6 h-6 rounded bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] hover:bg-[#393939] active:scale-90 transition-all"
                        >
                          <span className="material-symbols-outlined text-xs font-bold">remove</span>
                        </button>
                        <span className="text-xs text-[#e5e2e1] font-semibold px-2">{qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="w-6 h-6 rounded bg-[#2a2a2a] flex items-center justify-center text-[#e5e2e1] hover:bg-[#393939] active:scale-90 transition-all"
                        >
                          <span className="material-symbols-outlined text-xs font-bold">add</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => addToCart(item, qty)}
                          className="w-full h-8 rounded-lg bg-[#201f1f] text-[#e5e2e1] hover:bg-[#353534] border border-[#353534] text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-xs">add_shopping_cart</span>
                          <span>Cart</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => buyNow(item, qty)}
                          className="w-full h-8 rounded-lg bg-[#e11d48] text-[#fffaf9] text-[11px] font-bold flex items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm hover:brightness-110"
                        >
                          <span>Buy</span>
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
