import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    toggleItemSelection,
    selectAllItems,
    clearCart,
    setScreen,
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
    setSelectedProduct,
    showToast
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');

  const allSelected = cart.length > 0 && cart.every(item => item.selected);
  const selectedItemsCount = cart.filter(item => item.selected).reduce((acc, i) => acc + i.quantity, 0);

  const amountNeededForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromo(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#201f1f] border border-[#2a2a2a] flex items-center justify-center text-[#c0c7d3] mb-4">
          <span className="material-symbols-outlined text-4xl">remove_shopping_cart</span>
        </div>
        <h2 className="font-['Outfit'] font-bold text-xl text-[#e5e2e1] mb-1">Your cart is currently empty</h2>
        <p className="text-xs text-[#c0c7d3] max-w-xs mb-6">
          Find high performance parts for CD70, CG125, YBR, GS150 and more from our live central hubs.
        </p>
        <button
          onClick={() => setScreen('categories')}
          className="px-6 py-3 rounded-xl bg-[#e11d48] text-[#fffaf9] font-bold text-xs shadow-lg active:scale-95 transition-all"
        >
          Explore Catalog (25 SKUs)
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Top Progress Bar: Free Shipping Tracker */}
      <section className="px-4 pt-2 pb-1">
        <div className="bg-[#201f1f] border border-[#2a2a2a] rounded-xl p-3 shadow-md">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[#ffb95f] text-lg shrink-0 animate-pulse">
                local_shipping
              </span>
              <span className="text-xs text-[#e5e2e1] truncate font-semibold">
                {amountNeededForFree > 0 ? (
                  <>
                    Add <span className="text-[#ffb95f] font-bold">Rs. {amountNeededForFree.toLocaleString()}</span> more for Free Delivery!
                  </>
                ) : (
                  <span className="text-[#25D366] font-bold">You unlocked Free Express Delivery!</span>
                )}
              </span>
            </div>
            <span className="text-xs font-bold text-[#ffb95f] shrink-0 ml-2">
              {freeShippingProgress}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#2a2a2a] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ee9800] to-[#ffb95f] transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between mt-1.5 text-[#c0c7d3] text-[11px]">
            <span>Standard: Rs. 200</span>
            <span className="text-[#ffddb8] font-medium">Free threshold: Rs. {freeShippingThreshold.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Cart Controls Header */}
      <section className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="relative flex items-center cursor-pointer select-none">
            <input
              checked={allSelected}
              onChange={(e) => selectAllItems(e.target.checked)}
              type="checkbox"
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded bg-[#2a2a2a] peer-checked:bg-[#e11d48] border border-[#353534] flex items-center justify-center transition-colors">
              <span className={`material-symbols-outlined text-sm text-[#fffaf9] leading-none ${allSelected ? 'opacity-100' : 'opacity-0'}`}>
                check
              </span>
            </div>
            <span className="ml-2 font-['Inter'] text-xs font-bold text-[#e5e2e1]">
              Select All ({cart.length} items)
            </span>
          </label>
        </div>

        <button
          onClick={() => {
            if (window.confirm("Remove all items from your cart?")) {
              clearCart();
            }
          }}
          className="flex items-center gap-1 text-[#e5bdbe] hover:text-[#ffb3b6] transition-colors py-1 px-2 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] active:scale-95 text-[11px] font-semibold"
        >
          <span className="material-symbols-outlined text-base">delete_sweep</span>
          <span>Clear Cart</span>
        </button>
      </section>

      {/* Cart Items List */}
      <section className="px-4 flex flex-col gap-2.5">
        {cart.map((item) => {
          const part = item.part;
          const itemTotal = part.price * item.quantity;

          return (
            <article
              key={part.id}
              className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-2.5 flex flex-col gap-1 shadow-sm relative overflow-hidden group"
            >
              <div className="flex gap-2.5">
                {/* Checkbox & Thumbnail */}
                <div className="flex items-center gap-2 shrink-0">
                  <label className="cursor-pointer">
                    <input
                      checked={item.selected}
                      onChange={() => toggleItemSelection(part.id)}
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 rounded bg-[#2a2a2a] peer-checked:bg-[#e11d48] border border-[#353534] flex items-center justify-center transition-colors">
                      <span className={`material-symbols-outlined text-xs text-[#fffaf9] leading-none ${item.selected ? 'opacity-100' : 'opacity-0'}`}>
                        check
                      </span>
                    </div>
                  </label>

                  <div
                    onClick={() => setSelectedProduct(part)}
                    className="relative w-20 h-20 rounded-lg bg-[#353534] overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      alt={part.imageAlt}
                      src={part.imageUrl}
                    />
                    {part.oemTag && (
                      <span className="absolute top-1 left-1 bg-[#0e0e0e]/85 backdrop-blur-sm text-[#ffddb8] text-[9px] font-bold px-1 py-0.5 rounded uppercase">
                        {part.oemTag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#353534] text-[#ffb95f] text-[10px] font-semibold mb-0.5">
                        <span className="material-symbols-outlined text-[10px]">two_wheeler</span>
                        <span className="truncate">{part.brand}</span>
                      </div>
                      <h3
                        onClick={() => setSelectedProduct(part)}
                        className="font-['Inter'] text-xs font-semibold text-[#e5e2e1] truncate cursor-pointer hover:text-[#ffb3b6]"
                        title={part.title}
                      >
                        {part.title}
                      </h3>
                      <p className="text-[11px] text-[#c0c7d3]">
                        Unit: Rs. {part.price.toLocaleString()}
                        <span className="text-[#ffddb8] ml-1">• {part.stock} in Lahore Stock</span>
                      </p>
                    </div>

                    <button
                      aria-label="Remove item"
                      onClick={() => removeFromCart(part.id)}
                      className="p-1 text-[#c0c7d3] hover:text-[#ffb4ab] active:scale-90 transition-transform"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">delete</span>
                    </button>
                  </div>

                  {/* Bottom Row: Stepper + Total */}
                  <div className="flex items-center justify-between pt-1 mt-1 border-t border-[#2a2a2a]">
                    <div className="flex items-center bg-[#2a2a2a] rounded-lg p-0.5 border border-[#353534]">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateCartQty(part.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffb3b6] active:bg-[#393939] rounded text-sm transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm leading-none">remove</span>
                      </button>
                      <span className="w-8 text-center text-xs text-[#e5e2e1] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateCartQty(part.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#e5e2e1] hover:text-[#ffb3b6] active:bg-[#393939] rounded text-sm transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm leading-none">add</span>
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-['Outfit'] text-sm font-bold text-[#e11d48]">
                        Rs. {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Live Warehouse Security Badge */}
      <section className="px-4 pt-2.5 pb-1">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0e0e0e] border border-[#2a2a2a] text-[#c0c7d3] shadow-sm">
          <span className="material-symbols-outlined text-[#ffb95f] text-base shrink-0">verified</span>
          <p className="text-[11px] text-[#e5bdbe] flex-1 leading-snug">
            All items verified against live Lahore central warehouse inventory. Ready for immediate dispatch.
          </p>
        </div>
      </section>

      {/* Voucher & Coupon Code Section */}
      <section className="px-4 pt-2">
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-3 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#e5e2e1] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#e11d48] text-base">local_activity</span>
              Apply Promo Code
            </span>
            <span className="text-[11px] text-[#c0c7d3]">
              {promoApplied ? '1 Active' : '0 Active'}
            </span>
          </div>

          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <input
                className="w-full h-11 bg-[#353534] border border-[#2a2a2a] text-[#e5e2e1] font-mono text-xs rounded-lg pl-3 pr-2 focus:outline-none uppercase placeholder:text-[#6d747f]"
                placeholder="Enter coupon (e.g. PAKBIKE)"
                type="text"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 h-11 rounded-lg bg-[#2a2a2a] hover:bg-[#393939] text-[#e5e2e1] text-xs font-bold border border-[#353534] active:scale-95 transition-all"
            >
              {promoApplied ? 'Update' : 'Apply'}
            </button>
          </form>

          {/* Active Voucher Pill */}
          {promoApplied && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#201f1f] border border-[#2a2a2a]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded bg-[#e11d48] text-[#fffaf9] text-[10px] font-mono font-bold tracking-wider">
                  {promoCode}
                </span>
                <span className="text-xs font-semibold text-[#ffb3b6] truncate">
                  Rs. {promoDiscount} discount unlocked!
                </span>
              </div>
              <button
                aria-label="Remove coupon"
                onClick={removePromo}
                className="text-[#c0c7d3] hover:text-[#ffb4ab] active:scale-90 p-1"
              >
                <span className="material-symbols-outlined text-sm leading-none">close</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bill Summary Breakdown Card */}
      <section className="px-4 pt-2">
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-3 shadow-sm flex flex-col gap-2.5">
          <h4 className="text-xs font-bold text-[#e5e2e1] pb-1 border-b border-[#2a2a2a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#c0c7d3]">receipt_long</span>
            Payment Summary
          </h4>

          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center text-[#e5bdbe]">
              <span>Subtotal ({selectedItemsCount} items)</span>
              <span className="text-[#e5e2e1] font-mono font-semibold">
                Rs. {cartSubtotal.toLocaleString()}
              </span>
            </div>

            {promoApplied && (
              <div className="flex justify-between items-center text-[#ffb3b6]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">sell</span>
                  Promo Discount ({promoCode})
                </span>
                <span className="font-mono font-bold">-Rs. {promoDiscount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-[#e5bdbe]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#c0c7d3]">flight_takeoff</span>
                Delivery Charges (TCS / Leopard)
              </span>
              <span className="text-[#e5e2e1] font-mono font-medium">
                {cartDelivery === 0 ? (
                  <span className="text-[#25D366] font-bold">FREE</span>
                ) : (
                  `Rs. ${cartDelivery}`
                )}
              </span>
            </div>

            <div className="flex justify-between items-center text-[#e5bdbe]">
              <span>GST / Sales Tax</span>
              <span className="text-[#ffb95f] text-[10px] uppercase font-bold">Inclusive (Rs. 0)</span>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-baseline bg-[#201f1f] p-2.5 rounded-lg border border-[#2a2a2a]">
            <div>
              <span className="text-xs text-[#e5e2e1] font-bold block">Final Payable</span>
              <span className="text-[10px] text-[#c0c7d3]">Cash on Delivery or Raast / Card</span>
            </div>
            <div className="text-right">
              <span className="font-['Outfit'] text-lg text-[#ffb3b6] font-bold leading-tight block">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Checkout Dock */}
      <div className="sticky bottom-0 left-0 right-0 z-30 px-4 pt-3 pb-3 bg-[#0e0e0e]/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.6)] border-t border-[#2a2a2a] mt-4">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="min-w-0">
            <span className="text-[10px] text-[#c0c7d3] uppercase tracking-wider block font-bold">
              Total Amount
            </span>
            <span className="font-['Outfit'] text-xl text-[#e5e2e1] font-extrabold leading-tight">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <button
            disabled={selectedItemsCount === 0}
            onClick={() => setScreen('checkout')}
            className={`flex-1 max-w-[220px] h-[50px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(225,29,72,0.35)] active:scale-95 transition-all ${
              selectedItemsCount === 0
                ? 'bg-[#2a2a2a] text-[#c0c7d3] cursor-not-allowed'
                : 'bg-[#e11d48] text-[#fffaf9] hover:brightness-110'
            }`}
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-lg leading-none">arrow_forward</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[#c0c7d3]">
          <span className="material-symbols-outlined text-xs text-[#ffddb8]">lock</span>
          <span className="text-[10px]">100% Secure Checkout &amp; Cash on Delivery Available</span>
        </div>
      </div>
    </div>
  );
};
