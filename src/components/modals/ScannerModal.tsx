import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SPARE_PARTS_DATA } from '../../data/parts';

export const ScannerModal: React.FC = () => {
  const { scannerModalOpen, setScannerModalOpen, setSelectedProduct, showToast } = useApp();
  const [scanning, setScanning] = useState(false);

  if (!scannerModalOpen) return null;

  const simulateScan = (sku: string) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const found = SPARE_PARTS_DATA.find(p => p.sku === sku);
      if (found) {
        setScannerModalOpen(false);
        setSelectedProduct(found);
        showToast(`Matched part: ${found.title.split('(')[0]}`);
      } else {
        showToast("No barcode match in warehouse database");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col gap-4 text-center">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e11d48]">photo_camera</span>
            <h3 className="font-['Outfit'] font-bold text-sm text-[#e5e2e1]">Part Barcode / QR Scanner</h3>
          </div>
          <button onClick={() => setScannerModalOpen(false)} className="text-[#c0c7d3] hover:text-[#e5e2e1]">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-full aspect-square rounded-xl bg-[#0e0e0e] border-2 border-dashed border-[#e11d48]/60 flex items-center justify-center overflow-hidden">
          {/* Laser beam */}
          <div className="absolute left-4 right-4 h-0.5 bg-[#e11d48] shadow-[0_0_10px_#e11d48] animate-bounce"></div>

          {/* Corner marks */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#ffb95f]"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#ffb95f]"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#ffb95f]"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#ffb95f]"></div>

          <div className="flex flex-col items-center gap-2 z-10 px-4">
            <span className="material-symbols-outlined text-4xl text-[#c0c7d3]">qr_code_scanner</span>
            <p className="text-xs text-[#c0c7d3]">
              {scanning ? 'Decoding OEM Barcode...' : 'Point camera at spare part packaging or OEM code'}
            </p>
          </div>
        </div>

        {/* Quick Simulated Scans */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#c0c7d3] mb-2">
            Simulate Scanning a Genuine Part:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button
              onClick={() => simulateScan('PK-LUB-001')}
              className="px-2.5 py-1 rounded bg-[#201f1f] border border-[#2a2a2a] text-[11px] text-[#ffb95f] hover:bg-[#2a2a2a]"
            >
              Havoline 4T Oil
            </button>
            <button
              onClick={() => simulateScan('PK-CHN-004')}
              className="px-2.5 py-1 rounded bg-[#201f1f] border border-[#2a2a2a] text-[11px] text-[#ffb95f] hover:bg-[#2a2a2a]"
            >
              Chain Set
            </button>
            <button
              onClick={() => simulateScan('PK-ELC-008')}
              className="px-2.5 py-1 rounded bg-[#201f1f] border border-[#2a2a2a] text-[11px] text-[#ffb95f] hover:bg-[#2a2a2a]"
            >
              NGK Spark Plug
            </button>
          </div>
        </div>

        <button
          onClick={() => setScannerModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold hover:bg-[#353534]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
