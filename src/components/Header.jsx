import React, { useState, useEffect } from 'react';
import { 
  Zap, Bell, ShoppingBag, MapPin, CloudSun, User, 
  Search, ShieldCheck, CheckCircle2, X
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, cartCount, activeRide, sosAlertActive }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'บิลค่าน้ำประปาครบกำหนดชำระ', detail: 'ยอดชำระ 340.00 บาท (กำหนด 5 ส.ค.)', time: '10 นาทีที่แล้ว', type: 'bill', unread: true },
    { id: 2, title: 'พนักงานส่งอาหารกำลังจัดส่ง', detail: 'ร้านข้าวมันไก่เฮียเม้ง กำลังเดินทาง', time: '25 นาทีที่แล้ว', type: 'food', unread: true },
    { id: 3, title: 'อัปเดตหุ้น PTT +1.50%', detail: 'ราคาปัจจุบัน 34.50 บาท/หุ้น', time: '1 ชม. ที่แล้ว', type: 'stock', unread: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab && setActiveTab('dashboard')}
          >
            <img 
              src="logo.jpg" 
              alt="One Stop Service Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-emerald-400/40 shadow-lg group-hover:scale-105 transition-transform" 
            />
            <div>
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                One Stop Service <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Super App 9-in-1</span>
              </h1>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> กรุงเทพมหานคร, ไทย
              </p>
            </div>
          </div>
        </div>

        {/* Status Indicators & Widgets */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>31°C แจ่มใส</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">ความปลอดภัยสูง</span>
          </div>

          {sosAlertActive && (
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 animate-pulse"
            >
              <span>🚨 SOS กำลังทำงาน</span>
            </div>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
              title="การแจ้งเตือน"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel p-4 shadow-2xl z-50 animate-fade-in border border-white/20">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-400" /> การแจ้งเตือนล่าสุด
                  </h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead} 
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      อ่านทั้งหมด
                    </button>
                  )}
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`p-3 rounded-xl border text-xs transition ${
                        n.unread ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5 opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between font-medium text-white mb-1">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-gray-300">{n.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white shadow-md border border-white/20">
              <User className="w-5 h-5" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white">คุณนรเศรษฐ์</p>
              <p className="text-[10px] text-emerald-400">VIP Member</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
