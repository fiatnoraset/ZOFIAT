import React, { useState } from 'react';
import { 
  AlertTriangle, Shield, Phone, MapPin, Radio, CheckCircle2, 
  Siren, Flame, User, Bell, Clock, ArrowRight
} from 'lucide-react';

export default function EmergencySOS({ sosAlertActive, triggerSos, cancelSos }) {
  const [countdown, setCountdown] = useState(null);
  const [sosSent, setSosSent] = useState(false);

  const hotlines = [
    { number: '191', name: 'แจ้งเหตุด่วนเหตุร้าย (ตำรวจ)', desc: 'เหตุด่วน, ทะเลาะวิวาท, โจรกรรม', icon: Shield, color: 'text-blue-400', border: 'border-blue-500/40' },
    { number: '1669', name: 'เจ็บป่วยฉุกเฉิน (รถพยาบาล)', desc: 'อุบัติเหตุหนัก, หมดสติ, เจ็บหน้าอก', icon: Siren, color: 'text-rose-400', border: 'border-rose-500/40' },
    { number: '199', name: 'สถานีดับเพลิง (อัคคีภัย)', desc: 'เพลิงไหม้, ก๊าซหุงต้มรั่วซึม', icon: Flame, color: 'text-amber-400', border: 'border-amber-500/40' },
    { number: '02-999-8888', name: 'นิติบุคคลคอนโด / หมู่บ้าน', desc: 'รปภ. ประจำโครงการ 24 ชม.', icon: User, color: 'text-purple-400', border: 'border-purple-500/40' },
  ];

  const handleStartSosTrigger = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosSent(true);
          triggerSos();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancelSos = () => {
    setCountdown(null);
    setSosSent(false);
    cancelSos();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-rose-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> ศูนย์แจ้งเหตุฉุกเฉิน 24 ชั่วโมง
          </div>
          <h2 className="text-2xl font-bold text-white">OmniProtect SOS Emergency</h2>
          <p className="text-xs text-gray-300">ส่งสัญญาณพิกัดตำแหน่ง GPS พร้อมแจ้งเตือนเจ้าหน้าที่และผู้ติดต่อฉุกเฉินในทันที</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-rose-400 font-bold px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <Radio className="w-4 h-4 animate-ping" /> GPS Pin Live Tracking
        </div>
      </div>

      {/* Main Panic Button Section */}
      <div className="glass-panel p-8 text-center space-y-6 border-rose-500/40 bg-gradient-to-b from-rose-950/20 to-slate-900">
        
        {!sosSent && !countdown && (
          <div className="space-y-4">
            <button 
              onClick={handleStartSosTrigger}
              className="w-44 h-44 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 text-white font-extrabold text-2xl shadow-2xl hover:scale-105 transition-transform border-4 border-rose-400/40 flex flex-col items-center justify-center mx-auto pulse-sos"
            >
              <Siren className="w-12 h-12 mb-1 animate-bounce" />
              <span>กดส่ง SOS</span>
              <span className="text-[10px] font-normal opacity-80 mt-1">กดด่วนกรณีเกิดเหตุ</span>
            </button>
            <p className="text-xs text-gray-400">ระบบจะส่งตำแหน่งพิกัด GPS ไปยังศูนย์ 191 และผู้ติดต่อทันที</p>
          </div>
        )}

        {countdown !== null && (
          <div className="space-y-4 animate-fade-in">
            <div className="w-36 h-36 rounded-full bg-rose-600/30 border-4 border-rose-500 flex items-center justify-center mx-auto text-5xl font-extrabold text-white animate-pulse">
              {countdown}
            </div>
            <h4 className="font-bold text-base text-rose-300">กำลังส่งสัญญาณ SOS ฉุกเฉิน...</h4>
            <button 
              onClick={handleCancelSos}
              className="glass-btn px-6 py-2.5 text-xs text-gray-300 bg-white/10 hover:bg-white/20"
            >
              ยกเลิกการส่งสัญญาณ
            </button>
          </div>
        )}

        {sosSent && (
          <div className="space-y-4 p-6 rounded-2xl bg-rose-500/20 border border-rose-500/50 animate-fade-in max-w-lg mx-auto">
            <CheckCircle2 className="w-12 h-12 text-rose-400 mx-auto animate-bounce" />
            <h3 className="font-bold text-lg text-white">ส่งสัญญาณ SOS สำเร็จ!</h3>
            <p className="text-xs text-gray-200">
              พิกัดละติจูด 13.7563, ลองจิจูด 100.5018 ถูกกระจายไปยังศูนย์ 191 และ รปภ. หมู่บ้านแล้ว
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button className="glass-btn btn-danger px-6 py-2.5 text-xs font-bold">
                <Phone className="w-4 h-4" /> สายด่วน 191
              </button>
              <button onClick={handleCancelSos} className="glass-btn px-4 py-2.5 text-xs text-gray-300">
                ปิดการแจ้งเตือน
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Direct Hotlines Grid */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-rose-400" /> สายด่วนฉุกเฉินประจำประเทศไทย (One-Touch Dial)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotlines.map((h, i) => {
            const HIcon = h.icon;
            return (
              <div 
                key={i} 
                className={`glass-panel p-4 border ${h.border} flex flex-col justify-between hover:scale-[1.02] transition`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <HIcon className={`w-6 h-6 ${h.color}`} />
                    <span className="text-xl font-black text-white">{h.number}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white">{h.name}</h4>
                  <p className="text-[10px] text-gray-400">{h.desc}</p>
                </div>

                <a 
                  href={`tel:${h.number}`}
                  className="mt-4 glass-btn w-full justify-center py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white"
                >
                  <Phone className="w-3.5 h-3.5" /> โทรออกทันที
                </a>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
