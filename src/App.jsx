import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './modules/Dashboard.jsx';
import RideHailing from './modules/RideHailing.jsx';
import FoodDelivery from './modules/FoodDelivery.jsx';
import ApplianceMall from './modules/ApplianceMall.jsx';
import BillPayment from './modules/BillPayment.jsx';
import EmergencySOS from './modules/EmergencySOS.jsx';
import SmartHome from './modules/SmartHome.jsx';
import AIConsultant from './modules/AIConsultant.jsx';
import Stocks from './modules/Stocks.jsx';
import News from './modules/News.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Cart State
  const [cart, setCart] = useState([
    { id: 101, name: 'ข้าวมันไก่ต้มหนังนุ่ม', price: 65, quantity: 1 }
  ]);

  // Smart Home State
  const [smartHomeDevices, setSmartHomeDevices] = useState([
    { id: 1, name: 'ไฟดาวน์ไลท์หลัก', room: 'Living Room', type: 'light', on: true, wattage: 18 },
    { id: 2, name: 'เครื่องปรับอากาศ Inverter', room: 'Living Room', type: 'ac', on: true, wattage: 1200 },
    { id: 3, name: 'Smart TV 65 นิ้ว', room: 'Living Room', type: 'tv', on: false, wattage: 150 },
    { id: 4, name: 'ไฟหัวเตียงนอน', room: 'Bedroom', type: 'light', on: false, wattage: 12 },
    { id: 5, name: 'ประตูรั้วอัตโนมัติ', room: 'Garage', type: 'lock', on: true, wattage: 45 },
  ]);

  // Global Active Ride & SOS State
  const [activeRide, setActiveRide] = useState(false);
  const [sosAlertActive, setSosAlertActive] = useState(false);

  // Stock Watchlist State
  const [watchlist, setWatchlist] = useState(['PTT', 'CPALL', 'ADVANC']);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const toggleDevice = (id) => {
    setSmartHomeDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, on: !dev.on } : dev))
    );
  };

  const toggleWatchlist = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
          activeRide={activeRide}
          sosAlertActive={sosAlertActive}
        />

        <main className="max-w-7xl mx-auto px-4 lg:px-8">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'dashboard' && (
            <Dashboard 
              setActiveTab={setActiveTab} 
              smartHomeDevices={smartHomeDevices}
              toggleDevice={toggleDevice}
              triggerSos={() => { setSosAlertActive(true); setActiveTab('sos'); }}
              watchlist={watchlist}
            />
          )}

          {activeTab === 'ride' && (
            <RideHailing 
              activeRide={activeRide} 
              setActiveRide={setActiveRide} 
            />
          )}

          {activeTab === 'food' && (
            <FoodDelivery 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          )}

          {activeTab === 'mall' && (
            <ApplianceMall addToCart={addToCart} />
          )}

          {activeTab === 'bill' && (
            <BillPayment />
          )}

          {activeTab === 'sos' && (
            <EmergencySOS 
              sosAlertActive={sosAlertActive}
              triggerSos={() => setSosAlertActive(true)}
              cancelSos={() => setSosAlertActive(false)}
            />
          )}

          {activeTab === 'home' && (
            <SmartHome 
              devices={smartHomeDevices} 
              toggleDevice={toggleDevice} 
            />
          )}

          {activeTab === 'ai' && (
            <AIConsultant setActiveTab={setActiveTab} />
          )}

          {activeTab === 'stocks' && (
            <Stocks watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
          )}

          {activeTab === 'news' && (
            <News />
          )}
        </main>
      </div>

      {/* Modern Footer */}
      <footer className="mt-16 border-t border-white/10 glass-panel py-6 px-4 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 OmniLife Hub Super App - ระบบอำนวยความสะดวกครบวงจร 9-in-1</p>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>เงื่อนไขการใช้งาน</span>
            <span>•</span>
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">ระบบพร้อมใช้งาน 100%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
