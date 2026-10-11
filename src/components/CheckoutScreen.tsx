import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerAddress,
    setCustomerAddress,
    riderNote,
    setRiderNote,
    cartSubtotal,
    cartDelivery,
    promoDiscount,
    promoCode,
    promoApplied,
    cartTotal,
    createOrder,
    setScreen,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'wallet' | 'bank' | 'card'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slipUploaded, setSlipUploaded] = useState(false);

  // Address edit local state
  const [tempName, setTempName] = useState(customerName);
  const [tempPhone, setTempPhone] = useState(customerPhone);
  const [tempAddress, setTempAddress] = useState(customerAddress);
  const [tempRiderNote, setTempRiderNote] = useState(riderNote);

  const selectedCart = cart.filter(c => c.selected);
  const totalItemQuantity = selectedCart.reduce((sum, i) => sum + i.quantity, 0);

  const getCtaText = () => {
    const formattedTotal = `Rs. ${cartTotal.toLocaleString()}`;
    if (paymentMethod === 'cod') return `Place Order (${formattedTotal} COD)`;
    if (paymentMethod === 'wallet') return `Verify & Place Order (${formattedTotal})`;
    if (paymentMethod === 'bank') return `Submit Transfer & Order (${formattedTotal})`;
    return `Proceed to Card Gateway (${formattedTotal})`;
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder(paymentMethod);
      setConfirmedOrder(order);
      setIsSubmitting(false);
      showToast("Order placed successfully!");
    }, 600);
  };

  const saveAddress = () => {
    setCustomerName(tempName);
    setCustomerPhone(tempPhone);
    setCustomerAddress(tempAddress);
    setRiderNote(tempRiderNote);
    setEditAddressOpen(false);
    showToast("Delivery address updated");
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Step Progress Indicator */}
      <section className="px-4 pt-3 pb-3 bg-[#0e0e0e] border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between relative max-w-sm mx-auto">
          <div className="absolute left-6 right-6 top-3.5 -translate-y-1/2 h-0.5 bg-[#353534] -z-0">
            <div className="h-full bg-[#e11d48] w-1/2 transition-all duration-300"></div>
          </div>

          {/* Step 1: Cart */}
          <button
            onClick={() => setScreen('cart')}
            className="flex flex-col items-center gap-1 z-10 focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-[#e11d48] text-[#fffaf9] flex items-center justify-center text-xs shadow-sm">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
            <span className="text-[10px] text-[#e5bdbe] font-medium">Cart</span>
          </button>

          {/* Step 2: Shipping & Payment (Active) */}
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-7 h-7 rounded-full bg-[#e11d48] text-[#fffaf9] flex items-center justify-center text-xs font-bold shadow-md animate-pulse">
              2
            </div>
            <span className="text-[10px] text-[#ffb3b6] font-bold">Checkout</span>
          </div>

          {/* Step 3: Confirmation */}
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-7 h-7 rounded-full bg-[#2a2a2a] text-[#c0c7d3] flex items-center justify-center text-xs font-medium">
              3
            </div>
            <span className="text-[10px] text-[#c0c7d3]">Confirmed</span>
          </div>
        </div>
      </section>

      {/* Express Dispatch Alert */}
      <div className="mx-4 mt-3 p-2.5 rounded-lg bg-[#2a2a2a] border border-[#353534] flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[#ffb95f] text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
          local_shipping
        </span>
        <p className="text-xs text-[#e5e2e1]">
          Order within <span className="font-bold text-[#ffb95f]">42 mins</span> for same-day dispatch via TCS Express Courier.
        </p>
      </div>

      {/* Delivery Address Section */}
      <section className="mx-4 mt-3">
        <div className="p-3.5 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col gap-2.5 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffb3b6] text-xl">location_on</span>
              <h2 className="font-['Outfit'] font-bold text-sm text-[#e5e2e1]">Delivery Address</h2>
            </div>
            <button
              onClick={() => {
                setTempName(customerName);
                setTempPhone(customerPhone);
                setTempAddress(customerAddress);
                setTempRiderNote(riderNote);
                setEditAddressOpen(true);
              }}
              className="text-xs font-semibold text-[#ffb3b6] flex items-center gap-0.5 active:opacity-70 transition-opacity hover:underline"
            >
              <span>Change</span>
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>

          {/* Customer & Location Details */}
          <div className="bg-[#1c1b1b] p-3 rounded-lg flex flex-col gap-1.5 border border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e5e2e1]">{customerName}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#ffb95f] text-[10px] font-semibold border border-[#353534]">
                <span className="material-symbols-outlined text-xs">verified</span> OTP Verified
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#e5bdbe] text-xs">
              <span className="material-symbols-outlined text-sm">phone_iphone</span>
              <span>{customerPhone}</span>
            </div>
            <div className="flex items-start gap-2 text-[#e5e2e1] text-xs pt-0.5">
              <span className="material-symbols-outlined text-sm text-[#c0c7d3] shrink-0 mt-0.5">home</span>
              <span>{customerAddress}</span>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-[#1c1b1b] px-3 py-2 rounded-lg flex items-center justify-between border border-[#2a2a2a]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#c0c7d3] text-sm shrink-0">two_wheeler</span>
              <span className="text-[11px] text-[#e5bdbe] truncate">Rider Note: {riderNote}</span>
            </div>
            <button
              onClick={() => setEditAddressOpen(true)}
              className="text-[11px] text-[#ffb3b6] font-semibold shrink-0 ml-2 hover:underline"
            >
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="mx-4 mt-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb3b6] text-xl">payments</span>
            <h2 className="font-['Outfit'] font-bold text-sm text-[#e5e2e1]">Select Payment Method</h2>
          </div>
          <span className="text-[10px] text-[#c0c7d3]">Safe &amp; Encrypted</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Option 1: COD */}
          <label
            onClick={() => setPaymentMethod('cod')}
            className={`cursor-pointer block p-3.5 rounded-xl border transition-all relative overflow-hidden ${
              paymentMethod === 'cod'
                ? 'bg-[#2a2a2a] border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.25)]'
                : 'bg-[#201f1f] border-[#2a2a2a] hover:bg-[#252525]'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="payment_method"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mt-1 accent-[#e11d48] h-4 w-4 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#e5e2e1]">Cash on Delivery (COD)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffb95f] text-[#2a1700] text-[10px] font-bold">
                    Most Popular
                  </span>
                </div>
                <p className="text-[11px] text-[#e5bdbe] mt-1">
                  Pay in cash directly to TCS or Leopard courier representative when the parcel arrives at your doorstep.
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-[#c0c7d3]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#ffb95f]">verified_user</span>
                    Genuine Inspection
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#ffb95f]">local_atm</span>
                    Exact Cash Appreciated
                  </span>
                </div>
              </div>
            </div>
          </label>

          {/* Option 2: Mobile Wallets */}
          <label
            onClick={() => setPaymentMethod('wallet')}
            className={`cursor-pointer block p-3.5 rounded-xl border transition-all relative ${
              paymentMethod === 'wallet'
                ? 'bg-[#2a2a2a] border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.25)]'
                : 'bg-[#201f1f] border-[#2a2a2a] hover:bg-[#252525]'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="payment_method"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={() => setPaymentMethod('wallet')}
                className="mt-1 accent-[#e11d48] h-4 w-4 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#e5e2e1]">Easypaisa / JazzCash</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#353534] text-[#e5e2e1] text-[10px] font-bold">Instant</span>
                </div>
                <p className="text-[11px] text-[#e5bdbe] mt-1">
                  Direct mobile wallet transfer to our merchant account (0300-BIKEHUB).
                </p>

                {paymentMethod === 'wallet' && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c0c7d3]">Till/Account ID:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[#e5e2e1] font-bold">0300-2453482</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard?.writeText('03002453482');
                            showToast("Wallet ID copied to clipboard!");
                          }}
                          className="text-[#ffb3b6] text-xs material-symbols-outlined active:scale-90"
                        >
                          content_copy
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c0c7d3]">Title:</span>
                      <span className="text-[#e5e2e1] font-medium">BikeParts Hub Pvt Ltd</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Transaction ID (TID)"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-9 px-3 rounded-lg bg-[#131313] border border-[#2a2a2a] text-[#e5e2e1] placeholder:text-[#6d747f] text-xs outline-none focus:border-[#e11d48]"
                    />
                  </div>
                )}
              </div>
            </div>
          </label>

          {/* Option 3: Direct Bank Transfer */}
          <label
            onClick={() => setPaymentMethod('bank')}
            className={`cursor-pointer block p-3.5 rounded-xl border transition-all relative ${
              paymentMethod === 'bank'
                ? 'bg-[#2a2a2a] border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.25)]'
                : 'bg-[#201f1f] border-[#2a2a2a] hover:bg-[#252525]'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="payment_method"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
                className="mt-1 accent-[#e11d48] h-4 w-4 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#e5e2e1]">Bank Transfer (IBFT)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#353534] text-[#c0c7d3] text-[10px] font-bold">Meezan / HBL</span>
                </div>
                <p className="text-[11px] text-[#e5bdbe] mt-1">
                  Zero processing charges. Fast manual verification via receipt upload.
                </p>

                {paymentMethod === 'bank' && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c0c7d3]">Bank:</span>
                      <span className="text-[#e5e2e1] font-medium">Meezan Bank Ltd</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c0c7d3]">IBAN:</span>
                      <span className="font-mono text-[#e5e2e1] font-bold">PK42MEZN001294801</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlipUploaded(true);
                        showToast("Bank deposit receipt attached!");
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#2a2a2a] border border-[#353534] text-[#e5e2e1] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#353534] active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {slipUploaded ? 'task_alt' : 'upload_file'}
                      </span>
                      <span>{slipUploaded ? 'Receipt Attached (Verified)' : 'Upload Payment Slip'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </label>

          {/* Option 4: Debit / Credit Card */}
          <label
            onClick={() => setPaymentMethod('card')}
            className={`cursor-pointer block p-3.5 rounded-xl border transition-all relative ${
              paymentMethod === 'card'
                ? 'bg-[#2a2a2a] border-[#e11d48] shadow-[0_0_12px_rgba(225,29,72,0.25)]'
                : 'bg-[#201f1f] border-[#2a2a2a] hover:bg-[#252525]'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="payment_method"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="mt-1 accent-[#e11d48] h-4 w-4 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#e5e2e1]">Debit / Credit Card</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#353534] text-[#c0c7d3] text-[10px] font-bold">PayPak / Visa</span>
                </div>
                <p className="text-[11px] text-[#e5bdbe] mt-1">
                  Secured via 3D-Secure 256-bit bank encrypted gateway.
                </p>
              </div>
            </div>
          </label>
        </div>
      </section>

      {/* Order Items & Pricing Summary Accordion */}
      <section className="mx-4 mt-3.5">
        <div className="p-3.5 rounded-xl bg-[#201f1f] border border-[#2a2a2a] shadow-md">
          {/* Accordion Header */}
          <button
            onClick={() => setSummaryExpanded(!summaryExpanded)}
            className="w-full flex items-center justify-between active:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffb3b6] text-xl">shopping_bag</span>
              <h2 className="font-['Outfit'] font-bold text-sm text-[#e5e2e1]">Order Summary</h2>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[10px] font-bold text-[#c0c7d3] border border-[#353534]">
                {totalItemQuantity} Items
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#e5bdbe] transition-transform duration-200 ${
                summaryExpanded ? 'rotate-0' : '-rotate-90'
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Itemised List */}
          {summaryExpanded && (
            <div className="flex flex-col gap-2 mt-3">
              {selectedCart.map((item) => (
                <div
                  key={item.part.id}
                  className="flex items-center gap-2.5 bg-[#1c1b1b] border border-[#2a2a2a] p-2 rounded-lg"
                >
                  <img
                    src={item.part.imageUrl}
                    alt={item.part.imageAlt}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-[#0e0e0e]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-[#2a2a2a] text-[#ffb95f] text-[10px] font-mono font-bold">
                        {item.part.brand}
                      </span>
                    </div>
                    <h3 className="font-['Inter'] text-xs text-[#e5e2e1] font-semibold truncate mt-0.5">
                      {item.part.title}
                    </h3>
                    <span className="text-[11px] text-[#c0c7d3]">
                      Qty: {item.quantity} • Rs. {item.part.price.toLocaleString()} each
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Outfit'] text-xs text-[#e5e2e1] font-bold">
                      Rs. {(item.part.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              {/* Promo Code Pill */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-10 px-3 rounded-lg bg-[#1c1b1b] border border-[#2a2a2a] flex items-center justify-between">
                  <span className="text-xs text-[#e5e2e1] font-mono font-bold">
                    CODE: {promoCode}
                  </span>
                  <span className="text-xs text-[#ffb3b6] font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Applied
                  </span>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="flex flex-col gap-1.5 pt-2 bg-[#0e0e0e]/50 p-2.5 rounded-lg border border-[#2a2a2a]">
                <div className="flex items-center justify-between text-xs text-[#e5bdbe]">
                  <span>Items Subtotal</span>
                  <span className="font-mono">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-[#ffb3b6]">
                    <span>Special Garage Discount</span>
                    <span className="font-mono font-bold">- Rs. {promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-[#e5bdbe]">
                  <div className="flex items-center gap-1">
                    <span>Standard Courier ({customerAddress.split(',')[1]?.trim() || 'Lahore'})</span>
                    <span className="material-symbols-outlined text-xs text-[#c0c7d3]" title="Flat rate courier via TCS/Leopard">
                      help
                    </span>
                  </div>
                  <span className="font-mono">
                    {cartDelivery === 0 ? 'FREE' : `Rs. ${cartDelivery}`}
                  </span>
                </div>
                <div className="h-px bg-[#2a2a2a] my-1"></div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-['Outfit'] text-xs text-[#e5e2e1] font-bold block">
                      Payable Amount
                    </span>
                    <span className="text-[10px] text-[#c0c7d3]">Includes all provincial sales taxes</span>
                  </div>
                  <span className="font-['Outfit'] text-lg text-[#ffb3b6] font-extrabold">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Guaranteed Fitment & Return Banner */}
      <section className="mx-4 mt-3.5">
        <div className="p-3 rounded-xl bg-[#2a2a2a] border border-[#353534] flex items-start gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#201f1f] border border-[#353534] flex items-center justify-center shrink-0 text-[#ffb95f]">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-['Outfit'] font-bold text-xs text-[#e5e2e1]">
              100% Guaranteed Fitment or Return
            </h4>
            <p className="text-[11px] text-[#e5bdbe] mt-0.5">
              7-Day hassle-free return and part replacement guarantee if items do not properly seat into your motorcycle model.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Place Order Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0e0e0e]/95 backdrop-blur-xl mt-6 shadow-2xl z-30 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#c0c7d3] uppercase tracking-wider font-bold">
              Total Due
            </span>
            <span className="font-['Outfit'] text-xl text-[#e5e2e1] font-extrabold">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#e5bdbe] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-sm text-[#ffb95f]">shield</span>
            <span>{paymentMethod === 'cod' ? 'COD Authorized' : 'Encrypted Payment'}</span>
          </div>
        </div>

        {/* Main Order Placement CTA */}
        <button
          disabled={isSubmitting || selectedCart.length === 0}
          onClick={handlePlaceOrder}
          className="w-full py-3.5 px-4 rounded-lg bg-[#e11d48] text-[#fffaf9] font-['Outfit'] text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-lg hover:brightness-110 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-xl">lock</span>
          <span>{isSubmitting ? 'Placing Order...' : getCtaText()}</span>
        </button>
      </div>

      {/* Edit Address Modal */}
      {editAddressOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
              <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1]">Change Delivery Address</h3>
              <button onClick={() => setEditAddressOpen(false)} className="text-[#c0c7d3] hover:text-[#e5e2e1]">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-[#c0c7d3] uppercase block mb-1">Receiver Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#131313] border border-[#2a2a2a] text-[#e5e2e1] text-xs outline-none focus:border-[#e11d48]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#c0c7d3] uppercase block mb-1">Mobile (SMS Tracking)</label>
                <input
                  type="text"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#131313] border border-[#2a2a2a] text-[#e5e2e1] text-xs outline-none focus:border-[#e11d48]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#c0c7d3] uppercase block mb-1">Full Street Address</label>
                <textarea
                  rows={2}
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#131313] border border-[#2a2a2a] text-[#e5e2e1] text-xs outline-none focus:border-[#e11d48]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#c0c7d3] uppercase block mb-1">Rider Note</label>
                <input
                  type="text"
                  value={tempRiderNote}
                  onChange={(e) => setTempRiderNote(e.target.value)}
                  placeholder="e.g. Call before arrival"
                  className="w-full h-10 px-3 rounded-lg bg-[#131313] border border-[#2a2a2a] text-[#e5e2e1] text-xs outline-none focus:border-[#e11d48]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setEditAddressOpen(false)}
                className="py-2.5 rounded-lg bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534]"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="py-2.5 rounded-lg bg-[#e11d48] text-[#fffaf9] text-xs font-bold hover:brightness-110"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Order Confirmation Modal / Overlay matching Image 5 */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-[#2a2a2a] border-t border-[#353534] rounded-t-3xl p-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Top Success Emblem */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-full bg-[#e11d48] text-[#fffaf9] flex items-center justify-center shadow-lg mb-2 animate-bounce">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <span className="text-xs text-[#ffb95f] font-bold uppercase tracking-widest">
                Shukriya! Order Received
              </span>
              <h3 className="font-['Outfit'] font-bold text-xl text-[#e5e2e1] mt-1">
                Order #{confirmedOrder.id}
              </h3>
              <p className="text-xs text-[#e5bdbe] mt-1">
                A confirmation SMS has been dispatched to <span className="text-[#e5e2e1] font-semibold">{confirmedOrder.phone}</span>.
              </p>
            </div>

            {/* Order Tracking Metadata Card */}
            <div className="bg-[#201f1f] p-3.5 rounded-xl flex flex-col gap-2.5 border border-[#353534]">
              <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
                <span className="text-xs text-[#c0c7d3]">Estimated Delivery:</span>
                <span className="text-xs font-bold text-[#e5e2e1]">2 - 3 Business Days</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
                <span className="text-xs text-[#c0c7d3]">Courier Partner:</span>
                <span className="text-xs font-semibold text-[#e5e2e1]">TCS Logistics Express</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
                <span className="text-xs text-[#c0c7d3]">Payment Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffb95f] text-[#2a1700] text-[10px] font-bold">
                  {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#c0c7d3]">Ship To:</span>
                <span className="text-xs text-[#e5e2e1] text-right truncate max-w-[200px]">
                  {confirmedOrder.shippingAddress}
                </span>
              </div>
            </div>

            {/* Action Buttons inside Modal */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setScreen('orders');
                }}
                className="w-full py-3.5 rounded-lg bg-[#e11d48] text-[#fffaf9] font-['Outfit'] font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-transform hover:brightness-110 shadow-md"
              >
                <span className="material-symbols-outlined text-xl">route</span>
                <span>Track Order Status</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  setScreen('home');
                }}
                className="w-full py-3 rounded-lg bg-[#201f1f] border border-[#353534] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
