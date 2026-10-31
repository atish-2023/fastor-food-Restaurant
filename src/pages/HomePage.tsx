import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../components/common/StatusBar';
import { Toast } from '../components/common/Toast';
import { LocationHeader } from '../components/home/LocationHeader';
import { UserCard } from '../components/home/UserCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { BestSellerCard } from '../components/home/BestSellerCard';
import { PromoBanner } from '../components/home/PromoBanner';
import { OrderCard } from '../components/home/OrderCard';
import { DriverTrackingModal } from '../components/home/DriverTrackingModal';
import { toBestSellers, toOrders, OrderItem, BestSellerItem } from '../api/foodApi';
import { getRestaurants } from '../api/fastorApi';
import { useAuth } from '../hooks/useAuth';
import { useDisplayMode } from '../hooks/useDisplayMode';
import { FIGMA_BEST_SELLERS, FIGMA_ORDERS, FIGMA_NAME } from '../data/figmaSample';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const mode = useDisplayMode();
  const [bestSellers, setBestSellers] = useState<BestSellerItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [trackingOrder, setTrackingOrder] = useState<OrderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);
  const hideToast = useCallback(() => setToastMessage(null), []);

  // figma mode -> static Figma sample content (no API call); api mode -> live restaurants.
  useEffect(() => {
    if (mode === 'figma') {
      setBestSellers(FIGMA_BEST_SELLERS as unknown as BestSellerItem[]);
      setOrders(FIGMA_ORDERS as unknown as OrderItem[]);
      setStatus('ready');
      return;
    }
    let cancelled = false;
    getRestaurants()
      .then((restaurants) => {
        if (cancelled) return;
        setBestSellers(toBestSellers(restaurants));
        setOrders(toOrders(restaurants));
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [mode]);

  // One-off success toast right after OTP verification, never on a refresh
  useEffect(() => {
    if (sessionStorage.getItem('justVerified')) {
      sessionStorage.removeItem('justVerified');
      showToast('Mobile number verified successfully');
    }
  }, []);

  const handleCancelOrder = (orderToCancel: OrderItem) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderToCancel.id ? { ...o, status: 'cancelled' } : o))
    );
    showToast(`Order for ${orderToCancel.name} has been cancelled.`);
  };

  const handleTrackDriver = (order: OrderItem) => {
    setTrackingOrder(order);
  };

  const handleFoodClick = (item: BestSellerItem | OrderItem) => {
    // Pass this item's API data to the detail page via router state
    navigate(`/detail/${item.id}`, { state: item });
  };

  return (
    <div className="flex flex-col min-h-[844px] justify-between bg-white select-none pb-6">
      <div>
        {/* iOS Status Bar */}
        <StatusBar />

        {/* Home Screen Content with exact side paddings */}
        <div className="px-5 pt-2">
          {/* Current Locations */}
          <LocationHeader
            locationTitle="Current Locations"
            address="Model Town, New Delhi"
          />

          {/* User / Action Card */}
          <UserCard
            userName={mode === 'figma' ? FIGMA_NAME : user?.name?.trim() || 'Guest'}
            onCallClick={() => showToast('Calling Fastor concierge support...')}
            onWalletClick={() => showToast('Fastor Wallet balance: ₹350.00')}
          />

          {/* Best Seller Section */}
          <div className="mt-4">
            <SectionTitle>Best Seller</SectionTitle>

            {/* Horizontal Scroll of Cards */}
            {/* 4 equal cards, 12px gaps, no clipping */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
              {status === 'loading' && (
                <p className="text-xs text-[#828282] py-3">Loading restaurants...</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-500 py-3">Could not load restaurants.</p>
              )}
              {status === 'ready' && bestSellers.length === 0 && (
                <p className="text-xs text-[#828282] py-3">No restaurants found.</p>
              )}
              {bestSellers.map((item) => (
                <BestSellerCard
                  key={item.id}
                  item={item}
                  onClick={handleFoodClick}
                />
              ))}
            </div>
          </div>

          {/* 30% OFF Promo Banner */}
          <PromoBanner onBannerClick={() => navigate('/detail/pizza')} />

          {/* Popular Items (Orders list) */}
          <div className="mt-2">
            <SectionTitle>Popular Items</SectionTitle>

            <div className="space-y-1">
              {status === 'loading' && (
                <p className="text-xs text-[#828282] py-3">Loading...</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-500 py-3">Could not load restaurants.</p>
              )}
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancelOrder}
                  onTrack={handleTrackDriver}
                  onClickDetail={handleFoodClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Driver Tracking Live Modal */}
      <DriverTrackingModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={hideToast} />

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-black/80 rounded-full mx-auto mt-6"></div>
    </div>
  );
};
