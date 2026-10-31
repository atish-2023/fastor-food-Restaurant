import React from 'react';
import { X, Navigation, Phone, CheckCircle2 } from 'lucide-react';
import { OrderItem } from '../../api/foodApi';
import { Button } from '../common/Button';

interface DriverTrackingModalProps {
  order: OrderItem | null;
  onClose: () => void;
}

export const DriverTrackingModal: React.FC<DriverTrackingModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[390px] bg-white rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <span className="text-[11px] font-semibold text-[#FF5A00] uppercase tracking-wider">
              Live Delivery
            </span>
            <h3 className="text-base font-bold text-[#1E1B18] mt-0.5">Tracking {order.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Route Visual */}
        <div className="my-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-[#828282] mb-3">
            <span className="flex items-center gap-1 font-semibold text-[#FF5A00]">
              <Navigation className="w-3.5 h-3.5 animate-pulse" /> On the way
            </span>
            <span className="font-bold text-[#1E1B18] bg-white px-2 py-0.5 rounded-full shadow-xs">
              ETA: 8 mins
            </span>
          </div>

          {/* Delivery steps */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FF5A00] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#1E1B18]">Order Prepared</p>
                <p className="text-[11px] text-[#828282]">Kitchen completed preparation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-[#FF5A00] bg-orange-100 shrink-0 mt-0.5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B18]">Driver En Route</p>
                <p className="text-[11px] text-[#828282]">Rider Rajesh is 1.4 km away from Model Town</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver contact row */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-200 text-[#FF5A00] font-bold flex items-center justify-center">
              R
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E1B18]">Rajesh Kumar</p>
              <p className="text-[11px] text-[#828282]">★ 4.9 (420 deliveries)</p>
            </div>
          </div>
          <button
            onClick={() => window.open('tel:919999999999', '_self')}
            className="w-9 h-9 rounded-full bg-[#FF5A00] text-white flex items-center justify-center hover:bg-[#E65100]"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        <Button variant="primary" onClick={onClose}>
          Close Tracking
        </Button>
      </div>
    </div>
  );
};
