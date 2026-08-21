import React, { useState } from 'react';
import { 
  Car, UtensilsCrossed, ShoppingBag, CreditCard, AlertTriangle, Home, 
  Bot, TrendingUp, Newspaper, ArrowRight, Zap, Shield, Sparkles, 
  QrCode, CheckCircle, Phone, X, Send
} from 'lucide-react';

export default function Dashboard({ smartHomeDevices, toggleDevice, triggerSos, watchlist }) {
  const [showBillModal, setShowBillModal] = useState(false);
  const [billPaid, setBillPaid] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: 'สวัสดีครับ คุณนรเศรษฐ์! ผมคือผู้ช่วย AI ประจำ One Stop Service มีอะไรให้ผมช่วยเหลือวันนี้ครับ?' }
  ]);
  const [sosActive, setSosActive] = useState(false);

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setAiInput('');

    setTimeout(() => {
      let reply = 'ผมได้รับคำถามของคุณนรเศรษฐ์แล้วครับ ยินดีให้บริการและช่วยเหลือทุกเรื่องในชีวิตประจำวันครับ!';
      if (userText.includes('ค่าไฟ') || userText.includes('บิล')) {
        reply = 'บิลค่าไฟฟ้าประจำเดือนนี้ของคุณนรเศรษฐ์ คือ 1,820.00 ฿ (การไฟฟ้านครหลวง MEA) คุณสามารถกดสแกน QR PromptPay ชำระได้ทันทีบนหน้าหลักครับ';
      } else if (userText.includes('รถ') || userText.includes('grab')) {
        reply = 'คุณสามารถกดเมนู "เรียกรถ (GrabCar)" บนหน้าหลักเพื่อเปิดใช้งาน Grab Transport ได้ทันทีครับ';
      } else if (userText.includes('อาหาร')) {
        reply = 'คุณสามารถกดเมนู "สั่งอาหาร (GrabFood)" บนหน้าหลักเพื่อค้นหาร้านอร่อยส่งตรงถึงบ้านได้เลยครับ';
      } else if (userText.includes('ช้อป') || userText.includes('ซื้อ')) {
        reply = 'คุณสามารถกดเมนู "สั่งสินค้าออนไลน์ (Shopee)" เพื่อเลือกซื้อสินค้าโปรโมชันและผ่อน 0% บน Shopee ได้ทันทีครับ';
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const menuCards = [
    { 
      id: 'ride', 
      title: 'เรียกรถรับ-ส่ง (GrabCar)', 
      desc: 'เปิดบริการ Grab Transport ทันที', 
      icon: Car, 
      color: 'text-cyan-400', 
      border: 'hover:border-cyan-500', 
      bg: 'bg-cyan-500/10',
      onClick: () => window.open('https://www.grab.com/th/transport/', '_blank') 
    },
    { 
      id: 'food', 
      title: 'สั่งซื้ออาหาร (GrabFood)', 
      desc: 'สั่งอาหารร้านดังส่งถึงบ้านบน GrabFood', 
      icon: UtensilsCrossed, 
      color: 'text-orange-400', 
      border: 'hover:border-orange-500', 
      bg: 'bg-orange-500/10',
      onClick: () => window.open('https://www.grab.com/th/food/', '_blank') 
    },
    { 
      id: 'mall', 
      title: 'สั่งสินค้าออนไลน์ (Shopee)', 
      desc: 'ช้อปปิ้งสินค้าออนไลน์ครบครันบน Shopee', 
      icon: ShoppingBag, 
      color: 'text-purple-400', 
      border: 'hover:border-purple-500', 
      bg: 'bg-purple-500/10',
      onClick: () => window.open('https://shopee.co.th/', '_blank') 
    },
    { 
      id: 'bill', 
      title: 'จ่ายค่าไฟ/น้ำ (MEA & PEA)', 
      desc: 'ชำระบิลค่าไฟ 1,820฿ ผ่าน QR PromptPay', 
      icon: CreditCard, 
      color: 'text-emerald-400', 
      border: 'hover:border-emerald-500', 
      bg: 'bg-emerald-500/10',
      onClick: () => setShowBillModal(true) 
    },
    { 
      id: 'sos', 
      title: 'แจ้งเหตุด่วน SOS', 
      desc: 'ส่งสัญญาณฉุกเฉิน & โทร 191 / 1669', 
      icon: AlertTriangle, 
      color: 'text-rose-500', 
      border: 'border-rose-500/40 bg-rose-950/20 hover:border-rose-500', 
      bg: 'bg-rose-500/10',
      onClick: () => setSosActive(true) 
    },
    { 
      id: 'home', 
      title: 'สั่งเปิด-ปิดบ้าน IoT', 
      desc: 'ควบคุมสวิตช์ไฟ แอร์ อุปกรณ์ในบ้าน', 
      icon: Home, 
      color: 'text-pink-400', 
      border: 'hover:border-pink-500', 
      bg: 'bg-pink-500/10',
      onClick: () => {
        const el = document.getElementById('smarthome-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } 
    },
    { 
      id: 'ai', 
      title: 'ผู้ช่วย AI ปรึกษา', 
      desc: 'ถาม-ตอบข้อสงสัยตลอด 24 ชม.', 
      icon: Bot, 
      color: 'text-violet-400', 
      border: 'hover:border-violet-500', 
      bg: 'bg-violet-500/10',
      onClick: () => setShowAiModal(true) 
    },
    { 
      id: 'stocks', 
      title: 'ตลาดหุ้น SET', 
      desc: 'ดูราคาหุ้น กราฟ และสรุปตลาด SET', 
      icon: TrendingUp, 
      color: 'text-teal-400', 
      border: 'hover:border-teal-500', 
      bg: 'bg-teal-500/10',
      onClick: () => {
        const el = document.getElementById('stocks-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } 
    },
    { 
      id: 'news', 
      title: 'ข่าวสารบ้านเมือง', 
      desc: 'อัปเดตข่าวเศรษฐกิจ การเมือง สังคม', 
      icon: Newspaper, 
      color: 'text-blue-400', 
      border: 'hover:border-blue-500', 
      bg: 'bg-blue-500/10',
      onClick: () => {
        const el = document.getElementById('news-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } 
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-teal-950/60 to-slate-900 border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> ยินดีต้อนรับ คุณนรเศรษฐ์ (พร้อมใช้งานทุกอุปกรณ์)
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
            ศูนย์รวมความสะดวกสบาย<span className="text-gradient-purple"> ประจำวันของคุณ (9-in-1)</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-xl">
            จัดการทุกบริการได้ครบจบในหน้าเดียว ทั้งเรียกรถ สั่งอาหาร สั่งสินค้าออนไลน์ จ่ายบิลค่าไฟ แจ้งเหตุฉุกเฉิน ควบคุมบ้าน และปรึกษา AI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAiModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-transform shrink-0"
          >
            <Bot className="w-4 h-4" /> ปรึกษาผู้ช่วย AI
          </button>
        </div>
      </div>

      {/* Breaking News & Stock Ticker Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => {
            const el = document.getElementById('news-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="glass-panel p-3.5 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition group"
        >
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5" /> ข่าวด่วน
          </span>
          <p className="text-xs text-gray-200 truncate flex-1 group-hover:text-blue-300 transition">
            แบงก์ชาติปรับประมาณการเศรษฐกิจไทยปี 2026 เติบโตแกร่งขึ้น
          </p>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>

        <div 
          onClick={() => {
            const el = document.getElementById('stocks-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="glass-panel p-3.5 flex items-center gap-3 cursor-pointer hover:border-emerald-500/50 transition group"
        >
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> SET Index
          </span>
          <div className="flex items-center gap-3 text-xs flex-1">
            <span className="font-bold text-white">1,385.42</span>
            <span className="text-emerald-400 font-medium">+12.30 (+0.90%)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 9 Main Convenience Hub Cards Grid */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" /> บริการหลักในหน้าหลัก (9-in-1 Convenience Hub)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {menuCards.map(card => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                onClick={card.onClick}
                className={`glass-panel p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition border ${card.border}`}
              >
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center mb-3 ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-white">{card.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Widget 1: Smart Home Controller */}
        <div id="smarthome-section" className="glass-panel p-5 rounded-2xl space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center justify-between">
            <span className="flex items-center gap-2"><Home className="w-4 h-4 text-pink-400" /> ควบคุมบ้าน Smart Home</span>
            <span className="text-[10px] text-pink-400 font-medium">5 อุปกรณ์</span>
          </h4>
          <div className="space-y-2">
            {smartHomeDevices.map(dev => (
              <div key={dev.id} className="glass-card p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-white font-medium">{dev.name}</p>
                  <p className="text-[10px] text-gray-400">{dev.room}</p>
                </div>
                <button 
                  onClick={() => toggleDevice(dev.id)}
                  className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors ${dev.on ? 'bg-pink-500 justify-end' : 'bg-gray-700 justify-start'}`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Bill Payment & Electricity */}
        <div className="glass-panel p-5 rounded-2xl space-y-3 border-emerald-500/30 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-white flex items-center justify-between">
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-emerald-400" /> บิลรอชำระเดือนนี้</span>
              <span className="badge badge-green text-[10px]">MEA / MWA</span>
            </h4>
            
            <div className="space-y-2 mt-3 text-xs">
              <div className="glass-card p-3 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">ค่าน้ำประปา (MWA)</p>
                  <p className="text-[10px] text-gray-400">ครบกำหนด 5 ส.ค.</p>
                </div>
                <span className="font-bold text-amber-400">340.00 ฿</span>
              </div>

              <div className="glass-card p-3 rounded-xl flex justify-between items-center border border-emerald-500/30">
                <div>
                  <p className="font-bold text-white">ค่าไฟฟ้า (MEA e-Service)</p>
                  <p className="text-[10px] text-emerald-400">ผู้ใช้: คุณนรเศรษฐ์ (412 kWh)</p>
                </div>
                <span className="font-bold text-emerald-400 text-sm">1,820.00 ฿</span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button 
              onClick={() => setShowBillModal(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" /> สแกน QR จ่ายค่าไฟทันที
            </button>
            <div className="flex gap-2">
              <a 
                href="https://eservice.mea.or.th/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-center text-[10px] text-gray-300 font-medium"
              >
                การไฟฟ้า MEA ↗
              </a>
              <a 
                href="https://eservice.pea.co.th/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-center text-[10px] text-gray-300 font-medium"
              >
                การไฟฟ้า PEA ↗
              </a>
            </div>
          </div>
        </div>

        {/* Widget 3: Emergency SOS */}
        <div className="glass-panel p-5 rounded-2xl border-rose-500/40 bg-rose-950/20 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-rose-400 flex items-center justify-between">
              <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> ความปลอดภัยฉุกเฉิน SOS</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 font-bold animate-pulse">24 ชม.</span>
            </h4>
            <p className="text-xs text-gray-300 mt-2">กดปุ่มเพื่อส่งสัญญาณพิกัด GPS อัตโนมัติไปยังศูนย์ช่วยเหลือ</p>

            <div className="py-4 text-center">
              {!sosActive ? (
                <button 
                  onClick={() => setSosActive(true)}
                  className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-lg shadow-2xl mx-auto flex items-center justify-center pulse-sos transition"
                >
                  กด SOS
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-rose-600/40 border border-rose-400 text-white space-y-2">
                  <p className="font-bold text-xs">✓ ส่งสัญญาณ SOS ฉุกเฉินแล้ว!</p>
                  <p className="text-[10px] text-gray-300">พิกัด GPS 13.7563, 100.5018 ถูกส่งแล้ว</p>
                  <button onClick={() => setSosActive(false)} className="px-3 py-1 rounded bg-white/20 text-[10px]">ยกเลิก</button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-rose-500/20">
            <a href="tel:191" className="p-2.5 rounded-xl bg-blue-600/30 border border-blue-500 text-blue-300 text-center flex items-center justify-center gap-1">
              <Phone className="w-3.5 h-3.5" /> โทร 191
            </a>
            <a href="tel:1669" className="p-2.5 rounded-xl bg-rose-600/30 border border-rose-500 text-rose-300 text-center flex items-center justify-center gap-1">
              <Phone className="w-3.5 h-3.5" /> โทร 1669
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Sections: Stocks & News */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stocks Section */}
        <div id="stocks-section" className="glass-panel p-5 rounded-2xl space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center justify-between">
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-teal-400" /> ตลาดหุ้น SET Index & Watchlist</span>
            <span className="text-[10px] text-teal-400 font-medium">เรียลไทม์</span>
          </h4>
          
          <div className="space-y-2">
            {[
              { symbol: 'SET Index', price: '1,385.42', pct: '+0.90%', up: true },
              { symbol: 'PTT', price: '34.50', pct: '+1.47%', up: true },
              { symbol: 'CPALL', price: '58.25', pct: '+1.30%', up: true },
              { symbol: 'ADVANC', price: '215.00', pct: '-0.46%', up: false },
              { symbol: 'DELTA', price: '82.50', pct: '+2.48%', up: true },
            ].map((stk, idx) => (
              <div key={idx} className="glass-card p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{stk.symbol}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold">{stk.price} ฿</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${stk.up ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {stk.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div id="news-section" className="glass-panel p-5 rounded-2xl space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center justify-between">
            <span className="flex items-center gap-2"><Newspaper className="w-4 h-4 text-blue-400" /> ข่าวสารบ้านเมืองประจำวัน</span>
            <span className="text-[10px] text-blue-400 font-medium">อัปเดตล่าสุด</span>
          </h4>

          <div className="space-y-2.5">
            {[
              { id: 1, tag: 'เศรษฐกิจ', title: 'แบงก์ชาติประเมินเศรษฐกิจไทยปี 2026 ขยายตัวต่อเนื่อง', time: '15 นาทีที่แล้ว' },
              { id: 2, tag: 'พลังงาน', title: 'การไฟฟ้าเปิดตัวระบบ e-Service และลดค่าไฟรอบบิลใหม่', time: '1 ชั่วโมงที่แล้ว' },
              { id: 3, tag: 'เทคโนโลยี', title: 'เปิดตัวเทคโนโลยี AI ผู้ช่วยอัจฉริยะภาษาไทยเต็มรูปแบบ', time: '2 ชั่วโมงที่แล้ว' }
            ].map(n => (
              <div key={n.id} className="glass-card p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">{n.tag}</span>
                  <span className="text-[10px] text-gray-400">{n.time}</span>
                </div>
                <p className="text-xs font-semibold text-white">{n.title}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bill QR Code Payment Modal */}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-sm p-6 rounded-3xl text-center space-y-4 relative border border-emerald-500/40">
            <button onClick={() => setShowBillModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>

            <h3 className="font-bold text-base text-white">ชำระบิลค่าไฟฟ้า (MEA e-Service)</h3>
            <p className="text-xs text-gray-300">ผู้ใช้บริการ: คุณนรเศรษฐ์ (รหัส 020008891234)</p>

            <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center shadow-2xl">
              <QrCode className="w-32 h-32 text-black" />
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase">ยอดเงินสุทธิที่ต้องชำระ</p>
              <p className="text-2xl font-extrabold text-emerald-400">1,820.00 ฿</p>
            </div>

            {!billPaid ? (
              <button 
                onClick={() => { setBillPaid(true); setTimeout(() => setShowBillModal(false), 2000); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg hover:brightness-110"
              >
                จำลองการสแกนชำระสำเร็จ
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold">
                ✓ ชำระเงินเรียบร้อยแล้ว ออกใบเสร็จรับเงินสำเร็จ
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Quick Assistant Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl space-y-4 relative border border-violet-500/40 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">ผู้ช่วย AI ปรึกษา (AI Advisor)</h3>
                  <p className="text-[10px] text-violet-300">บริการให้คำปรึกษาตลอด 24 ชม.</p>
                </div>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-2 min-h-[220px]">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-violet-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <input 
                type="text" 
                value={aiInput} 
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendAiMessage()}
                placeholder="พิมพ์คำถามที่ต้องการปรึกษา..." 
                className="flex-1 bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs text-white outline-none focus:border-violet-500"
              />
              <button 
                onClick={handleSendAiMessage}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shrink-0 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่ง</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
