import React, { useState, useEffect } from 'react';
import { 
  Car, MapPin, Navigation, Clock, ShieldCheck, UserCheck, 
  Phone, Star, CheckCircle, ArrowRight, RefreshCw, Bike, Shield
} from 'lucide-react';

export default function RideHailing({ activeRide, setActiveRide }) {
  const [pickup, setPickup] = useState('คอนโด แอสปาย พระราม 9');
  const [destination, setDestination] = useState('เซ็นทรัลเวิลด์ ราชประสงค์');
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, searching, assigned, completed
  const [driver, setDriver] = useState(null);

  const vehicles = [
    { id: 'bike', name: 'Express Bike', icon: Bike, desc: 'รวดเร็ว คล่องตัว เหมาะช่วงรถติด', price: 45, eta: '3 นาที' },
    { id: 'car', name: 'Standard Car', icon: Car, desc: 'แอร์เย็น นั่งสบาย 4 ที่นั่ง', price: 125, eta: '5 นาที' },
    { id: 'suv', name: 'Premium SUV', icon: Shield, desc: 'กว้างขวาง หรูหรา 6 ที่นั่ง', price: 240, eta: '7 นาที' },
  ];

  const presets = ['ที่ทำงาน (อาคารเพลินจิต)', 'สยามพารากอน', 'สนามบินสุวรรณภูมิ', 'โรงพยาบาลบำรุงราษฎร์'];

  const handleBookRide = () => {
    setBookingStatus('searching');
    setTimeout(() => {
      setBookingStatus('assigned');
      setDriver({
        name: 'คุณวิชัย สุขเกษม',
        rating: '4.95',
        plate: '1กข 8892 BKK',
        carModel: 'Toyota Camry สีดำ',
        phone: '081-998-XXXX',
        eta: '4 นาที'
      });
      setActiveRide(true);
    }, 2500);
  };

  const handleCancelRide = () => {
    setBookingStatus('idle');
    setDriver(null);
    setActiveRide(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Module Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <Car className="w-3.5 h-3.5" /> บริการเรียกรถรับ-ส่ง
          </div>
          <h2 className="text-2xl font-bold text-white">เรียกรถเดินทาง (Grab Transport)</h2>
          <p className="text-xs text-gray-300">บริการรถรับ-ส่ง ปลอดภัย ติดตามเส้นทางแบบเรียลไทม์ 24 ชม.</p>
        </div>
        <a 
          href="https://www.grab.com/th/transport/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span>เปิดใช้งาน Grab Transport</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form & Vehicle Selection */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Pickup & Destination Panel */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" /> ระบุจุดรับ-จุดส่ง
            </h3>

            <div className="space-y-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20"></div>
                <input 
                  type="text" 
                  value={pickup} 
                  onChange={(e) => setPickup(e.target.value)}
                  className="glass-input text-xs" 
                  placeholder="สถานที่รับ..."
                />
              </div>

              <div className="w-0.5 h-6 bg-cyan-500/30 ml-1.5 -my-2"></div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20"></div>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="glass-input text-xs" 
                  placeholder="จุดหมายปลายทาง..."
                />
              </div>
            </div>

            {/* Presets */}
            <div>
              <p className="text-[11px] text-gray-400 mb-1.5">สถานที่ยอดนิยม:</p>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setDestination(p)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  >
                    + {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Tier Picker */}
          <div className="glass-panel p-5 space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">เลือกประเภทรถเดินทาง</h3>

            {vehicles.map((v) => {
              const VIcon = v.icon;
              const isSelected = selectedVehicle === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`glass-card p-3.5 flex items-center justify-between cursor-pointer border transition ${
                    isSelected ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-300'}`}>
                      <VIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{v.name}</p>
                      <p className="text-[10px] text-gray-400">{v.desc}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-extrabold text-cyan-400">{v.price} ฿</p>
                    <p className="text-[10px] text-gray-400">มารับใน {v.eta}</p>
                  </div>
                </div>
              );
            })}

            {/* Booking Button */}
            {bookingStatus === 'idle' && (
              <button 
                onClick={handleBookRide}
                className="w-full glass-btn btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 border-none shadow-lg shadow-cyan-500/20 hover:scale-[1.01]"
              >
                <Car className="w-4 h-4" /> ยืนยันเรียกรถทันที
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Simulated Live Map & Driver Card */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Simulated SVG Interactive Map */}
          <div className="glass-panel p-4 h-80 sm:h-96 relative overflow-hidden flex flex-col justify-between bg-slate-950/80 border-cyan-500/20">
            
            {/* Background SVG Grid Map representation */}
            <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              {/* Road paths */}
              <path d="M 50 200 Q 200 80 400 250 T 700 150" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="8 4" className="animate-pulse" />
              <circle cx="50" cy="200" r="8" fill="#06b6d4" />
              <circle cx="700" cy="150" r="8" fill="#ef4444" />
            </svg>

            {/* Map Top Status Bar */}
            <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs">
              <span className="text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" /> แผนที่จำลอง GPS สด
              </span>
              <span className="badge badge-blue">ระยะทาง 5.8 กม. (~14 นาที)</span>
            </div>

            {/* Status Overlay when searching or assigned */}
            {bookingStatus === 'searching' && (
              <div className="relative z-10 m-auto glass-panel p-6 text-center max-w-xs animate-pulse border-cyan-500">
                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
                <h4 className="font-bold text-sm text-white">กำลังค้นหาคนขับใกล้คุณ...</h4>
                <p className="text-xs text-gray-400 mt-1">กระจายสัญญาณเรียกรถไปยังรัศมี 2.5 กม.</p>
              </div>
            )}

            {bookingStatus === 'assigned' && (
              <div className="relative z-10 m-auto glass-panel p-4 text-center max-w-sm border-emerald-500/50 bg-emerald-950/30">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-emerald-300">พบนายช่างคนขับแล้ว!</h4>
                <p className="text-xs text-gray-300">กำลังมุ่งหน้ามารับคุณที่จุดนัดหมาย</p>
              </div>
            )}

            {/* Map Pin Labels */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-400">
              <span className="px-2.5 py-1 rounded bg-black/70 border border-cyan-500/40 text-cyan-300">จุดรับ: {pickup}</span>
              <span className="px-2.5 py-1 rounded bg-black/70 border border-rose-500/40 text-rose-300">จุดส่ง: {destination}</span>
            </div>

          </div>

          {/* Assigned Driver Details Card */}
          {driver && (
            <div className="glass-panel p-5 border-emerald-500/40 bg-emerald-950/10 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center font-bold text-cyan-300 text-lg">
                    วิชัย
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{driver.name}</h4>
                    <p className="text-xs text-gray-400">{driver.carModel} • <span className="text-cyan-400 font-semibold">{driver.plate}</span></p>
                    <p className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {driver.rating} (คะแนนรีวิว)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="badge badge-green text-xs">มารับใน {driver.eta}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 glass-btn bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 justify-center py-2.5 text-xs">
                  <Phone className="w-4 h-4" /> โทรหาคนขับ
                </button>
                <button 
                  onClick={handleCancelRide}
                  className="glass-btn bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 py-2.5 text-xs"
                >
                  ยกเลิกการเดินทาง
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
