import React from 'react';
import { 
  Car, UtensilsCrossed, ShoppingBag, CreditCard, AlertTriangle, Home, 
  Bot, TrendingUp, Newspaper, ArrowRight, Zap, Shield, Sparkles, 
  Thermometer, Power, CheckCircle, Clock
} from 'lucide-react';

export default function Dashboard({ setActiveTab, smartHomeDevices, toggleDevice, triggerSos, watchlist }) {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass-panel p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> ยินดีต้อนรับสู่ One Stop Service
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              ศูนย์รวมความสะดวกสบาย<span className="text-gradient-purple"> ประจำวันของคุณ</span>
            </h2>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              จัดการทุกเรื่องในชีวิตประจำวันอย่างง่ายดาย ตั้งแต่เรียกรถ สั่งอาหาร สั่งสินค้าออนไลน์ จ่ายบิล ควบคุมบ้าน ติดตามหุ้น ข่าวสาร และปรึกษา AI
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('ai')}
            className="glass-btn btn-primary px-5 py-3 text-sm rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <Bot className="w-5 h-5 text-indigo-200" />
            <span>ปรึกษาผู้ช่วย AI</span>
          </button>
        </div>
      </div>

      {/* Breaking News & Stock Ticker Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Breaking News Bar */}
        <div 
          onClick={() => setActiveTab('news')}
          className="glass-panel p-3.5 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition group"
        >
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5" /> ข่าวด่วน
          </span>
          <p className="text-xs text-gray-200 truncate flex-1 group-hover:text-blue-300 transition">
            ด่วน! ธปท. ประกาศทิศทางดอกเบี้ยนโยบายใหม่ ส่งผลบวกต่อดัชนีตลาดหุ้นไทย
          </p>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Stock Ticker Bar */}
        <div 
          onClick={() => setActiveTab('stocks')}
          className="glass-panel p-3.5 flex items-center gap-3 cursor-pointer hover:border-emerald-500/50 transition group"
        >
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> SET Index
          </span>
          <div className="flex items-center gap-3 text-xs flex-1">
            <span className="font-bold text-white">1,385.42</span>
            <span className="text-emerald-400 font-medium">+12.30 (+0.90%)</span>
            <span className="text-gray-400 text-[10px]">PTT 34.50 (+1.5%)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 9 Main Convenience Hub Cards Grid */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-400" /> บริการอำนวยความสะดวกหลัก (9-in-1)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          
          {/* 1. Ride */}
          <div 
            onClick={() => {
              window.open('https://www.grab.com/th/transport/', '_blank');
              setActiveTab('ride');
            }}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-cyan-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-cyan-300">เรียกรถรับ-ส่ง</h4>
            <p className="text-xs text-gray-400 mt-1">Grab Transport ไปรับ-ส่งทุกที่</p>
          </div>

          {/* 2. Food */}
          <div 
            onClick={() => {
              window.open('https://www.grab.com/th/food/', '_blank');
              setActiveTab('food');
            }}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-orange-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-orange-300">สั่งซื้ออาหาร</h4>
            <p className="text-xs text-gray-400 mt-1">GrabFood สั่งอาหารส่งตรงถึงบ้านคุณ</p>
          </div>

          {/* 3. Mall */}
          <div 
            onClick={() => {
              window.open('https://shopee.co.th/', '_blank');
              setActiveTab('mall');
            }}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-purple-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-purple-300">สั่งสินค้าออนไลน์</h4>
            <p className="text-xs text-gray-400 mt-1">Shopee เลือกซื้อสินค้าออนไลน์ครบครัน</p>
          </div>

          {/* 4. Bill Pay */}
          <div 
            onClick={() => setActiveTab('bill')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-emerald-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-emerald-300">จ่ายบิลค่าน้ำ-ค่าไฟ</h4>
            <p className="text-xs text-gray-400 mt-1">เช็กยอด ชำระผ่าน QR สแกนง่าย ไม่มีค่าธรรมเนียม</p>
          </div>

          {/* 5. Emergency SOS */}
          <div 
            onClick={() => setActiveTab('sos')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border border-rose-500/40 bg-rose-950/20 hover:border-rose-500 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="font-bold text-sm text-rose-300">แจ้งเหตุด่วนเหตุร้าย</h4>
            <p className="text-xs text-gray-400 mt-1">ปุ่ม SOS ฉุกเฉิน โทร 191/1669 แชร์พิกัดทันที</p>
          </div>

          {/* 6. Smart Home */}
          <div 
            onClick={() => setActiveTab('home')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-pink-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-pink-300">สั่งเปิด-ปิดไฟ & บ้าน</h4>
            <p className="text-xs text-gray-400 mt-1">ควบคุมไฟ แอร์ และอุปกรณ์ IoT ภายในบ้าน</p>
          </div>

          {/* 7. AI Consultant */}
          <div 
            onClick={() => setActiveTab('ai')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-indigo-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-indigo-300">ผู้ช่วย AI ให้คำปรึกษา</h4>
            <p className="text-xs text-gray-400 mt-1">ปรึกษาปัญหาบ้าน อาหาร สุขภาพ การเงิน 24 ชม.</p>
          </div>

          {/* 8. Stocks */}
          <div 
            onClick={() => setActiveTab('stocks')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-teal-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-teal-300">ตลาดหุ้น & การลงทุน</h4>
            <p className="text-xs text-gray-400 mt-1">ติดตามราคาหุ้น SET กราฟเทคนิค Watchlist</p>
          </div>

          {/* 9. News */}
          <div 
            onClick={() => setActiveTab('news')}
            className="glass-panel p-5 cursor-pointer hover:scale-[1.02] border hover:border-blue-500/50 transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Newspaper className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-blue-300">ข่าวสารบ้านเมือง</h4>
            <p className="text-xs text-gray-400 mt-1">อัปเดตข่าวเศรษฐกิจ สังคม การเมือง ล่าสุด</p>
          </div>

        </div>
      </div>

      {/* Quick Interactive Status & Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Smart Home Control Widget */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-pink-400" /> ทางด่วน Smart Home
            </h4>
            <button onClick={() => setActiveTab('home')} className="text-xs text-pink-400 hover:underline">
              ดูทั้งหมด
            </button>
          </div>

          <div className="space-y-3">
            {smartHomeDevices.slice(0, 3).map((dev) => (
              <div key={dev.id} className="glass-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{dev.name}</p>
                  <p className="text-[10px] text-gray-400">{dev.room}</p>
                </div>
                <button
                  onClick={() => toggleDevice(dev.id)}
                  className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    dev.on ? 'bg-pink-500 justify-end' : 'bg-gray-700 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Reminders Widget */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" /> บิลรอชำระเดือนนี้
            </h4>
            <button onClick={() => setActiveTab('bill')} className="text-xs text-emerald-400 hover:underline">
              ชำระบิล
            </button>
          </div>

          <div className="space-y-3">
            <div className="glass-card p-3 flex items-center justify-between border-l-4 border-l-amber-500">
              <div>
                <p className="text-xs font-semibold text-white">ค่าน้ำประปา (MWA)</p>
                <p className="text-[10px] text-gray-400">กำหนด: 5 ส.ค. 2026</p>
              </div>
              <span className="font-bold text-xs text-amber-400">340.00 ฿</span>
            </div>

            <div className="glass-card p-3 flex items-center justify-between border-l-4 border-l-emerald-500">
              <div>
                <p className="text-xs font-semibold text-white">ค่าไฟฟ้า (MEA)</p>
                <p className="text-[10px] text-gray-400">กำหนด: 12 ส.ค. 2026</p>
              </div>
              <span className="font-bold text-xs text-emerald-400">1,820.00 ฿</span>
            </div>
          </div>
        </div>

        {/* Quick Emergency SOS Action */}
        <div className="glass-panel p-5 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> ระบบความปลอดภัย SOS
              </h4>
              <span className="badge badge-red">Active 24/7</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              กดเพื่อติดต่อตำรวจ (191), การแพทย์ฉุกเฉิน (1669), หรือดับเพลิง (199) ทันที
            </p>
          </div>

          <button 
            onClick={triggerSos}
            className="w-full mt-4 glass-btn btn-danger py-3 font-bold text-xs rounded-xl flex items-center justify-center gap-2 pulse-sos"
          >
            <Shield className="w-4 h-4" /> ส่งสัญญาณแจ้งเหตุฉุกเฉินด่วน
          </button>
        </div>

      </div>

    </div>
  );
}
