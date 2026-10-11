import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const OrdersScreen: React.FC = () => {
  const { orders, setScreen, showToast, addToCart } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const reorderItems = (order: Order) => {
    order.items.forEach(item => {
      // Find part or synthetic fallback
      const syntheticPart = {
        id: item.partId,
        title: item.title,
        category: 'Spare Parts',
        brand: 'Universal',
        price: item.price,
        stock: 20,
        compatibility: item.compatibility,
        rating: 4.8,
        reviewsCount: 100,
        popularity: 90,
        sku: item.sku,
        imageUrl: item.imageUrl,
        imageAlt: item.title
      };
      addToCart(syntheticPart, item.quantity);
    });
    setScreen('cart');
    showToast(`Items from #${order.id} re-added to cart!`);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#201f1f] border border-[#2a2a2a] flex items-center justify-center text-[#c0c7d3] mb-3">
          <span className="material-symbols-outlined text-3xl">inventory_2</span>
        </div>
        <h3 className="font-['Outfit'] font-bold text-base text-[#e5e2e1] mb-1">No Orders Yet</h3>
        <p className="text-xs text-[#c0c7d3] max-w-xs mb-4">
          When you place orders for motorcycle parts, live tracking and TCS dispatch notes will appear here.
        </p>
        <button
          onClick={() => setScreen('categories')}
          className="px-4 py-2.5 rounded-lg bg-[#e11d48] text-[#fffaf9] text-xs font-bold active:scale-95"
        >
          Browse Spare Parts
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-8 px-4 pt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#e11d48] text-xl">local_shipping</span>
          <h2 className="font-['Outfit'] font-bold text-base text-[#e5e2e1]">My Motorcycle Orders</h2>
        </div>
        <span className="text-[11px] font-bold text-[#ffb95f] px-2 py-0.5 rounded-full bg-[#2a2a2a] border border-[#353534]">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const isSelected = selectedOrder?.id === order.id;

          return (
            <div
              key={order.id}
              className="bg-[#201f1f] border border-[#2a2a2a] rounded-xl p-3.5 shadow-md flex flex-col gap-3"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#e5e2e1]">#{order.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffb95f]/20 text-[#ffb95f] text-[10px] font-bold border border-[#ffb95f]/30">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#c0c7d3] block mt-0.5">{order.date}</span>
                </div>

                <div className="text-right">
                  <span className="font-['Outfit'] text-sm font-bold text-[#e11d48]">
                    Rs. {order.total.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#c0c7d3] block uppercase">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                  </span>
                </div>
              </div>

              {/* TCS Live Tracking Progress */}
              <div className="bg-[#1c1b1b] p-3 rounded-lg border border-[#2a2a2a] flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#c0c7d3]">Tracking Number:</span>
                  <span className="font-mono font-bold text-[#ffb3b6]">{order.trackingNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#c0c7d3]">Courier Partner:</span>
                  <span className="font-semibold text-[#e5e2e1]">TCS Express Logistics</span>
                </div>

                {/* Progress Stepper */}
                <div className="pt-2">
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-[#e11d48] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span className="text-[9px] text-[#e5e2e1] font-semibold">Packed</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-[#e11d48] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span className="text-[9px] text-[#e5e2e1] font-semibold">Dispatched</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-[#ffb95f] text-black flex items-center justify-center text-[10px] font-bold animate-pulse">
                        •
                      </div>
                      <span className="text-[9px] text-[#ffb95f] font-bold">In Transit</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-[#2a2a2a] text-[#6d747f] flex items-center justify-center text-[10px]">
                        4
                      </div>
                      <span className="text-[9px] text-[#6d747f]">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List Preview */}
              <div className="flex flex-col gap-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-10 h-10 rounded-md object-cover bg-[#0e0e0e] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#e5e2e1] font-semibold truncate">{item.title}</p>
                      <p className="text-[10px] text-[#c0c7d3]">
                        Qty: {item.quantity} • Rs. {item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#e5e2e1]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions: Reorder & Invoice */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#2a2a2a]">
                <button
                  onClick={() => {
                    showToast(`Simulated Tax Invoice for #${order.id} downloaded!`);
                  }}
                  className="py-2 rounded-lg bg-[#2a2a2a] border border-[#353534] text-[#e5e2e1] text-[11px] font-semibold flex items-center justify-center gap-1 hover:bg-[#353534] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">receipt</span>
                  <span>Invoice</span>
                </button>

                <button
                  onClick={() => reorderItems(order)}
                  className="py-2 rounded-lg bg-[#e11d48] text-[#fffaf9] text-[11px] font-bold flex items-center justify-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                  <span>Reorder</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
