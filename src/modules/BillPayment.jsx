import React, { useState } from 'react';
import { 
  CreditCard, Zap, Droplet, Wifi, QrCode, CheckCircle, 
  Search, ArrowRight, Download, BarChart2, Calendar, ShieldCheck, Globe
} from 'lucide-react';

export default function BillPayment() {
  const [selectedBillType, setSelectedBillType] = useState('electricity');
  const [portal, setPortal] = useState('mea'); // 'mea', 'pea', 'mwa', 'app'
  const [accountNumber, setAccountNumber] = useState('020008891234');
  const [billData, setBillData] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const portalUrls = {
    mea: { name: 'การไฟฟ้านครหลวง (MEA e-Service)', url: 'https://eservice.mea.or.th/' },
    pea: { name: 'การไฟฟ้าส่วนภูมิภาค (PEA e-Service)', url: 'https://eservice.pea.co.th/' },
    mwa: { name: 'การประปานครหลวง (MWA e-Service)', url: 'https://eservice.mwa.co.th/' },
  };

  const billTypes = [
    { id: 'electricity', name: 'ค่าไฟฟ้า (MEA/PEA)', icon: Zap, color: 'text-amber-400', border: 'border-amber-500' },
    { id: 'water', name: 'ค่าน้ำประปา (MWA/PWA)', icon: Droplet, color: 'text-cyan-400', border: 'border-cyan-500' },
    { id: 'internet', name: 'ค่าอินเทอร์เน็ตบ้าน', icon: Wifi, color: 'text-emerald-400', border: 'border-emerald-500' },
  ];

  const handleLookupBill = () => {
    if (selectedBillType === 'electricity') {
      setBillData({
        title: 'การไฟฟ้านครหลวง (MEA)',
        accName: 'คุณนรเศรษฐ์',
        period: 'กรกฎาคม 2026',
        units: '412 หน่วย (kWh)',
        baseAmount: 1700.00,
        vat: 120.00,
        total: 1820.00,
        dueDate: '12 สิงหาคม 2026',
        history: [
          { month: 'ก.พ.', units: 320, amount: 1420 },
          { month: 'มี.ค.', units: 380, amount: 1680 },
          { month: 'เม.ย.', units: 450, amount: 1980 },
          { month: 'พ.ค.', units: 430, amount: 1890 },
          { month: 'มิ.ย.', units: 390, amount: 1720 },
          { month: 'ก.ค.', units: 412, amount: 1820 }
        ]
      });
    } else if (selectedBillType === 'water') {
      setBillData({
        title: 'การประปานครหลวง (MWA)',
        accName: 'คุณนรเศรษฐ์',
        period: 'กรกฎาคม 2026',
        units: '22 ลูกบาศก์เมตร',
        baseAmount: 317.75,
        vat: 22.25,
        total: 340.00,
        dueDate: '5 สิงหาคม 2026',
        history: [
          { month: 'ก.พ.', units: 18, amount: 280 },
          { month: 'มี.ค.', units: 20, amount: 310 },
          { month: 'เม.ย.', units: 25, amount: 380 },
          { month: 'พ.ค.', units: 24, amount: 360 },
          { month: 'มิ.ย.', units: 21, amount: 320 },
          { month: 'ก.ค.', units: 22, amount: 340 }
        ]
      });
    } else {
      setBillData({
        title: 'AIS Fibre 1000/500 Mbps',
        accName: 'คุณนรเศรษฐ์',
        period: 'กรกฎาคม 2026',
        units: 'ความเร็วสูงสุด 1 Gbps',
        baseAmount: 599.00,
        vat: 41.93,
        total: 640.93,
        dueDate: '15 สิงหาคม 2026',
        history: [
          { month: 'ก.พ.', units: 100, amount: 641 },
          { month: 'มี.ค.', units: 100, amount: 641 },
          { month: 'เม.ย.', units: 100, amount: 641 },
          { month: 'พ.ค.', units: 100, amount: 641 },
          { month: 'มิ.ย.', units: 100, amount: 641 },
          { month: 'ก.ค.', units: 100, amount: 641 }
        ]
      });
    }
  };

  const handleSimulatePayment = () => {
    setPaymentDone(true);
    setTimeout(() => {
      setShowQrModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <CreditCard className="w-3.5 h-3.5" /> ฝังพอร์ทัลจ่ายค่าไฟ & ค่าน้ำในแอป
          </div>
          <h2 className="text-2xl font-bold text-white">ศูนย์ชำระบิลค่าไฟฟ้า & ค่าน้ำประปา (MEA / PEA / MWA)</h2>
          <p className="text-xs text-gray-300">ชำระค่าไฟตรงกับการไฟฟ้า หรือสแกน QR PromptPay ฟรีค่าธรรมเนียม</p>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {[
            { id: 'mea', label: 'การไฟฟ้า MEA' },
            { id: 'pea', label: 'การไฟฟ้า PEA' },
            { id: 'mwa', label: 'การประปา MWA' },
            { id: 'app', label: 'QR PromptPay ในแอป' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setPortal(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                portal === item.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {portal !== 'app' ? (
        <div className="space-y-4">
          <div className="glass-panel p-3 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 bg-slate-950/80 px-3 py-2 rounded-xl border border-white/10 text-gray-300 font-mono text-[11px] truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-gray-400">{portalUrls[portal]?.url}</span>
            </div>
            <a 
              href={portalUrls[portal]?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <span>เปิดพอร์ทัลเต็มจอ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="glass-panel p-4 rounded-3xl overflow-hidden border-emerald-500/30">
            <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-slate-950 relative border border-white/10">
              <iframe 
                src={portalUrls[portal]?.url} 
                className="w-full h-full border-0"
                title={portalUrls[portal]?.name}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Bill Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {billTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedBillType === type.id;
          return (
            <div
              key={type.id}
              onClick={() => { setSelectedBillType(type.id); setBillData(null); setPaymentDone(false); }}
              className={`glass-panel p-5 cursor-pointer flex items-center gap-4 transition border ${
                isSelected ? `${type.border} bg-white/10` : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className={`p-3 rounded-2xl bg-white/10 ${type.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">{type.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">กดเพื่อค้นหาบิล</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lookup Form */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-400" /> ค้นหายอดชำระด้วยบัญชีผู้ใช้
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="กรอกหมายเลขผู้ใช้บริการ 12 หลัก..." 
            className="glass-input text-xs flex-1"
          />
          <button 
            onClick={handleLookupBill}
            className="glass-btn btn-primary px-6 py-3 text-xs font-bold bg-emerald-600 border-none justify-center"
          >
            ค้นหาบิลชำระ
          </button>
        </div>
      </div>

      {/* Bill Results & Usage Statistics */}
      {billData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Bill Breakdown Card */}
          <div className="lg:col-span-6 glass-panel p-6 space-y-4 border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white">{billData.title}</h3>
                <p className="text-xs text-gray-400">ผู้ใช้: {billData.accName}</p>
              </div>
              <span className="badge badge-green text-xs">ประจำเดือน {billData.period}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>ปริมาณการใช้งาน:</span>
                <span className="font-semibold text-white">{billData.units}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>ค่าบริการฐาน:</span>
                <span>{billData.baseAmount.toFixed(2)} ฿</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>ภาษีมูลค่าเพิ่ม VAT 7%:</span>
                <span>{billData.vat.toFixed(2)} ฿</span>
              </div>
              <div className="flex justify-between text-gray-300 pt-2 border-t border-white/10 font-bold">
                <span>กำหนดชำระภายใน:</span>
                <span className="text-amber-400">{billData.dueDate}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">ยอดเงินสุทธิที่ต้องชำระ</p>
                <p className="text-2xl font-extrabold text-emerald-400">{billData.total.toFixed(2)} ฿</p>
              </div>

              {!paymentDone ? (
                <button 
                  onClick={() => setShowQrModal(true)}
                  className="glass-btn btn-primary px-5 py-3 text-xs font-bold bg-emerald-500 border-none shadow-lg shadow-emerald-500/20"
                >
                  <QrCode className="w-4 h-4" /> สแกน QR จ่าย
                </button>
              ) : (
                <span className="badge badge-green p-2 text-xs flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> ชำระแล้ว
                </span>
              )}
            </div>
          </div>

          {/* 6-Month Usage Chart Visualizer */}
          <div className="lg:col-span-6 glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" /> สถิติการใช้งานย้อนหลัง 6 เดือน
            </h3>

            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 border-b border-white/10">
              {billData.history.map((h, i) => {
                const maxVal = Math.max(...billData.history.map(item => item.amount));
                const heightPercent = (h.amount / maxVal) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[9px] text-gray-400 group-hover:text-emerald-300 transition">{h.amount}฿</span>
                    <div 
                      style={{ height: `${heightPercent}%` }} 
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-125 transition-all duration-300"
                    ></div>
                    <span className="text-[10px] text-gray-400">{h.month}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ข้อมูลบันทึกและซิงก์โดยตรงจากการไฟฟ้า/ประปา
            </p>
          </div>

        </div>
      )}

      {/* QR Code Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-sm p-6 text-center space-y-4 relative border-emerald-500/40">
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="font-bold text-base text-white">PromptPay QR Code</h3>
            <p className="text-xs text-gray-300">สแกนด้วยแอปธนาคารใดก็ได้เพื่อชำระเงิน</p>

            {/* QR Mock graphic */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between items-center">
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 bg-black"></div>
                  <div className="w-8 h-8 bg-black"></div>
                </div>
                <QrCode className="w-20 h-20 text-black" />
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 bg-black"></div>
                  <div className="w-20 h-4 bg-black"></div>
                </div>
              </div>
            </div>

            <p className="text-lg font-extrabold text-emerald-400">{billData.total.toFixed(2)} ฿</p>

            <button 
              onClick={handleSimulatePayment}
              className="w-full glass-btn btn-primary py-3 rounded-xl text-xs font-bold bg-emerald-500 border-none justify-center"
            >
              จำลองการสแกนสำเร็จ
            </button>
          </div>
        </div>
      )}
      </>
      )}

    </div>
  );
}
