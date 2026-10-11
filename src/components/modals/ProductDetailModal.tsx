import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isFav = wishlist.includes(selectedProduct.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#201f1f] border border-[#2a2a2a] rounded-t-3xl sm:rounded-2xl p-5 flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#e11d48]/20 text-[#ffb3b6] border border-[#e11d48]/30">
              {selectedProduct.sku}
            </span>
            <span className="text-xs text-[#c0c7d3]">{selectedProduct.category}</span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-8 h-8 rounded-full bg-[#2a2a2a] text-[#c0c7d3] hover:text-[#e5e2e1] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Product Visual & Badges */}
        <div className="relative w-full aspect-video rounded-xl bg-[#0e0e0e] overflow-hidden border border-[#2a2a2a]">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-1.5">
            {selectedProduct.oemTag && (
              <span className="px-2 py-0.5 rounded bg-[#0e0e0e]/80 backdrop-blur text-[#ffddb8] text-[10px] font-bold uppercase">
                {selectedProduct.oemTag}
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-[#0e0e0e]/80 backdrop-blur text-[#25D366] text-[10px] font-bold">
              In Stock: {selectedProduct.stock}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(selectedProduct.id)}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-[#0e0e0e]/80 backdrop-blur flex items-center justify-center transition-colors ${
              isFav ? 'text-[#e11d48]' : 'text-white hover:text-[#ffb3b6]'
            }`}
          >
            <span
              className="material-symbols-outlined text-lg"
              style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Title & Pricing */}
        <div>
          <h2 className="font-['Outfit'] font-bold text-lg text-[#e5e2e1] leading-snug">
            {selectedProduct.title}
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#c0c7d3] uppercase font-bold">PKR</span>
              <span className="font-['Outfit'] text-2xl font-extrabold text-[#e11d48]">
                Rs. {selectedProduct.price.toLocaleString()}
              </span>
            </div>
            {selectedProduct.originalPrice && (
              <span className="text-xs text-[#c0c7d3] line-through">
                Rs. {selectedProduct.originalPrice.toLocaleString()}
              </span>
            )}
            {selectedProduct.discountPercent && (
              <span className="px-2 py-0.5 rounded bg-[#e11d48] text-[#fffaf9] text-[10px] font-bold uppercase">
                SAVE {selectedProduct.discountPercent}%
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2 text-xs text-[#c0c7d3]">
            <span className="flex items-center text-[#ffb95f] font-bold">
              <span className="material-symbols-outlined text-sm mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {selectedProduct.rating} / 5.0
            </span>
            <span>•</span>
            <span>{selectedProduct.reviewsCount} Verified Garage Reviews</span>
          </div>
        </div>

        {/* Fitment Compatibility Bar */}
        <div className="p-3 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#ee9800] text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#ffb95f]">Guaranteed Fitment</p>
            <p className="text-xs font-semibold text-[#e5e2e1]">{selectedProduct.compatibility}</p>
          </div>
        </div>

        {/* Description */}
        {selectedProduct.description && (
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#c0c7d3] mb-1">Description</h4>
            <p className="text-xs text-[#e5bdbe] leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
        )}

        {/* Technical Specifications */}
        {selectedProduct.specs && (
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#c0c7d3] mb-2">Technical Specifications</h4>
            <div className="bg-[#1c1b1b] rounded-xl border border-[#2a2a2a] overflow-hidden">
              {Object.entries(selectedProduct.specs).map(([k, v], idx) => (
                <div
                  key={k}
                  className={`flex items-center justify-between p-2.5 text-xs ${
                    idx !== 0 ? 'border-t border-[#2a2a2a]' : ''
                  }`}
                >
                  <span className="text-[#c0c7d3]">{k}</span>
                  <span className="font-semibold text-[#e5e2e1]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Stepper & Buy Buttons */}
        <div className="mt-2 pt-3 border-t border-[#2a2a2a] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#e5e2e1]">Select Quantity:</span>
            <div className="flex items-center bg-[#2a2a2a] rounded-lg p-0.5 border border-[#353534]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffb3b6] active:bg-[#393939] rounded"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="w-10 text-center text-xs font-bold text-[#e5e2e1]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(50, quantity + 1))}
                className="w-8 h-8 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffb3b6] active:bg-[#393939] rounded"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                addToCart(selectedProduct, quantity);
                setSelectedProduct(null);
              }}
              className="py-3 rounded-xl bg-[#2a2a2a] border border-[#353534] text-[#e5e2e1] text-xs font-bold hover:bg-[#353534] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => {
                buyNow(selectedProduct, quantity);
                setSelectedProduct(null);
              }}
              className="py-3 rounded-xl bg-[#e11d48] text-[#fffaf9] text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Instant Buy</span>
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
