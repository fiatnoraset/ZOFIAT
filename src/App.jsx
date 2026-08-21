import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Dashboard from './modules/Dashboard.jsx';

export default function App() {
  // Smart Home State
  const [smartHomeDevices, setSmartHomeDevices] = useState([
    { id: 1, name: 'ไฟดาวน์ไลท์ห้องรับแขก', room: 'Living Room', type: 'light', on: true, wattage: 18 },
    { id: 2, name: 'เครื่องปรับอากาศ Inverter', room: 'Bedroom', type: 'ac', on: true, wattage: 1200 },
    { id: 3, name: 'Smart TV 65 นิ้ว', room: 'Living Room', type: 'tv', on: false, wattage: 150 },
    { id: 4, name: 'ไฟหัวเตียงนอน', room: 'Bedroom', type: 'light', on: false, wattage: 12 },
    { id: 5, name: 'ประตูรั้วอัตโนมัติ', room: 'Garage', type: 'lock', on: true, wattage: 45 },
  ]);

  // Global SOS State
  const [sosAlertActive, setSosAlertActive] = useState(false);

  // Stock Watchlist State
  const [watchlist, setWatchlist] = useState(['PTT', 'CPALL', 'ADVANC']);

  const toggleDevice = (id) => {
    setSmartHomeDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, on: !dev.on } : dev))
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header 
          cartCount={0}
          activeRide={false}
          sosAlertActive={sosAlertActive}
        />

        <main className="max-w-7xl mx-auto px-4 lg:px-8">
          <Dashboard 
            smartHomeDevices={smartHomeDevices}
            toggleDevice={toggleDevice}
            triggerSos={() => setSosAlertActive(true)}
            watchlist={watchlist}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 glass-panel py-6 px-4 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 One Stop Service — Super App 9-in-1 (Progressive Web App)</p>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span className="text-emerald-400 font-semibold">● PWA Active (เปิดใช้งานได้ทุกอุปกรณ์)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
