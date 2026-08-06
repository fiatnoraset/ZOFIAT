import React, { useState } from 'react';
import { 
  Home, Lightbulb, Thermometer, Tv, Lock, Power, 
  SunMedium, Zap, Shield, Sliders, CheckCircle, RefreshCw
} from 'lucide-react';

export default function SmartHome({ devices, toggleDevice }) {
  const [activeRoom, setActiveRoom] = useState('living');
  const [temp, setTemp] = useState(24);
  const [lightBrightness, setLightBrightness] = useState(80);

  const rooms = [
    { id: 'living', name: 'ห้องรับแขก (Living Room)' },
    { id: 'bedroom', name: 'ห้องนอน (Bedroom)' },
    { id: 'kitchen', name: 'ห้องครัว (Kitchen)' },
    { id: 'garage', name: 'โรงรถ & ประตูรั้ว' },
  ];

  const filteredDevices = devices.filter(d => {
    if (activeRoom === 'living') return d.room.includes('Living');
    if (activeRoom === 'bedroom') return d.room.includes('Bedroom');
    if (activeRoom === 'kitchen') return d.room.includes('Kitchen');
    return d.room.includes('Garage') || d.room.includes('Entrance');
  });

  const activeCount = devices.filter(d => d.on).length;
  const estimatedPower = devices.reduce((sum, d) => sum + (d.on ? d.wattage : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-pink-950/60 to-slate-900 border-pink-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
            <Home className="w-3.5 h-3.5" /> แผงควบคุมบ้านอัจฉริยะ (IoT)
          </div>
          <h2 className="text-2xl font-bold text-white">OmniHome Smart Control Hub</h2>
          <p className="text-xs text-gray-300">สั่งเปิด-ปิดไฟ ปรับอุณหภูมิแอร์ ล็อคประตู และติดตามการใช้พลังงานย้อนหลัง</p>
        </div>

        {/* Live Power Meter Badge */}
        <div className="flex items-center gap-3 glass-panel p-3 rounded-2xl border-pink-500/30">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">กำลังไฟฟ้าที่ใช้ขณะนี้</p>
            <p className="text-base font-extrabold text-white">{estimatedPower} <span className="text-xs text-pink-400">วัตต์ (W)</span></p>
          </div>
        </div>
      </div>

      {/* Room Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRoom(r.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
              activeRoom === r.id 
                ? 'bg-pink-600 text-white font-bold shadow-lg shadow-pink-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((dev) => (
          <div 
            key={dev.id}
            className={`glass-panel p-5 space-y-4 border transition ${
              dev.on ? 'border-pink-500/50 bg-pink-950/10' : 'border-white/5 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{dev.name}</h4>
                <p className="text-xs text-gray-400">{dev.room}</p>
              </div>

              {/* Power Toggle Switch Button */}
              <button
                onClick={() => toggleDevice(dev.id)}
                className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center shadow-lg ${
                  dev.on ? 'bg-pink-500 justify-end' : 'bg-gray-700 justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px]">
                  <Power className={`w-3 h-3 ${dev.on ? 'text-pink-600' : 'text-gray-600'}`} />
                </span>
              </button>
            </div>

            {/* Sub-Controls for Light */}
            {dev.type === 'light' && dev.on && (
              <div className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                <div className="flex justify-between text-[11px] text-gray-300">
                  <span className="flex items-center gap-1"><SunMedium className="w-3.5 h-3.5 text-amber-400" /> ปรับความสว่าง</span>
                  <span className="font-bold text-pink-300">{lightBrightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={lightBrightness}
                  onChange={(e) => setLightBrightness(e.target.value)}
                  className="w-full accent-pink-500 bg-gray-700 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            )}

            {/* Sub-Controls for Air Conditioner */}
            {dev.type === 'ac' && dev.on && (
              <div className="space-y-3 pt-2 border-t border-white/10 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-cyan-400" /> อุณหภูมิห้อง
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setTemp(Math.max(18, temp - 1))}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-sm font-extrabold text-white">{temp}°C</span>
                    <button 
                      onClick={() => setTemp(Math.min(30, temp + 1))}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-white/5">
              <span>กำลังไฟ: {dev.wattage}W</span>
              <span className={dev.on ? 'text-emerald-400 font-semibold' : 'text-gray-500'}>
                {dev.on ? '● ทำงานปกติ' : '○ ปิดการใช้งาน'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
