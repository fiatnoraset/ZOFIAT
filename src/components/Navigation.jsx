import React from 'react';
import { 
  LayoutDashboard, Car, UtensilsCrossed, ShoppingBag, CreditCard, 
  AlertTriangle, Home, Bot, TrendingUp, Newspaper 
} from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard, color: 'text-indigo-400', border: 'border-indigo-500' },
    { id: 'ride', label: 'เรียกรถ (GrabCar)', icon: Car, color: 'text-cyan-400', border: 'border-cyan-500' },
    { id: 'food', label: 'สั่งอาหาร (GrabFood)', icon: UtensilsCrossed, color: 'text-orange-400', border: 'border-orange-500' },
    { id: 'mall', label: 'สั่งสินค้าออนไลน์ (Shopee)', icon: ShoppingBag, color: 'text-purple-400', border: 'border-purple-500' },
    { id: 'bill', label: 'จ่ายบิลค่าไฟ/น้ำ', icon: CreditCard, color: 'text-emerald-400', border: 'border-emerald-500' },
    { id: 'sos', label: 'เหตุด่วน SOS', icon: AlertTriangle, color: 'text-rose-500', border: 'border-rose-500', badge: 'HOT' },
    { id: 'home', label: 'ควบคุมบ้าน', icon: Home, color: 'text-pink-400', border: 'border-pink-500' },
    { id: 'ai', label: 'ผู้ช่วย AI', icon: Bot, color: 'text-violet-400', border: 'border-violet-500', badge: 'AI' },
    { id: 'stocks', label: 'ตลาดหุ้น', icon: TrendingUp, color: 'text-teal-400', border: 'border-teal-500' },
    { id: 'news', label: 'ข่าวสารบ้านเมือง', icon: Newspaper, color: 'text-blue-400', border: 'border-blue-500' },
  ];

  return (
    <nav className="w-full glass-panel p-2 mb-6 overflow-x-auto">
      <div className="flex items-center gap-1.5 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                isActive
                  ? `bg-white/10 text-white shadow-lg border ${item.border} backdrop-blur-md`
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${item.color} ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  item.badge === 'HOT' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
