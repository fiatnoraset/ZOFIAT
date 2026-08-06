import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, User, Lightbulb, Shield, Utensils, 
  Tv, RefreshCw, ThumbsUp, Copy, Check
} from 'lucide-react';

export default function AIConsultant({ setActiveTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'สวัสดีครับผมคือ **OmniBot AI Advisor** ผู้ช่วยส่วนตัวและที่ปรึกษาอัจฉริยะของคุณ! ยินดีให้คำแนะนำเกี่ยวกับ การดูแลบ้าน, อาหาร & สุขภาพ, การประหยัดพลังงาน, และการใช้ชีวิตประจำวันครับ มีอะไรให้ผมช่วยเหลือวันนี้ไหมครับ?',
      time: '10:00 น.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const presets = [
    { label: '💡 วิธีประหยัดค่าไฟหน้าร้อน', prompt: 'แนะนำวิธีประหยัดค่าไฟในบ้านช่วงหน้าร้อนหน่อยครับ ทำอย่างไรให้ค่าไฟลดลง?' },
    { label: '🏠 ซ่อมก๊อกน้ำซึมเบื้องต้น', prompt: 'ก๊อกน้ำอ่างล้างจานหยดไม่หยุด แก้ไขเบื้องต้นอย่างไรดีครับ?' },
    { label: '🥗 แนะนำเมนูอาหารเย็นแคลต่ำ', prompt: 'แนะนำเมนูอาหารเย็นคลีนๆ แคลอรีต่ำสำหรับคนอยากคุมน้ำหนักหน่อยครับ' },
    { label: '📺 วิธีเลือกซื้อ Smart TV', prompt: 'จะเลือกซื้อ Smart TV เข้าห้องรับแขก ควรดูสเปกและขนาดหน้าจออย่างไรครับ?' }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    // Simulate intelligent response tailored to query
    setTimeout(() => {
      let aiReply = '';
      const text = textToSend.toLowerCase();

      if (text.includes('ไฟ') || text.includes('ประหยัด')) {
        aiReply = `ยินดีครับ! นี่คือ 4 เทคนิคประหยัดค่าไฟในบ้านทันที:\n\n1. **ปรับแอร์ที่ 26°C ร่วมกับเปิดพัดลม**: ช่วยประหยัดไฟได้ถึง 10-15% โดยความรู้สึกเย็นสบายเท่าเดิม\n2. **ล้างแอร์ทุก 6 เดือน**: แอร์ที่สะอาดจะทำงานไม่หนัก และประหยัดพลังงานขึ้น\n3. **เปลี่ยนมาใช้หลอดไฟ LED**: หลอด LED กินไฟน้อยกว่าหลอดไส้ถึง 80%\n4. **ถอดปลั๊กเครื่องใช้ไฟฟ้าที่ไม่ใช้งาน**: ช่วยตัดกระแสไฟแฝง (Standby Power)\n\nคุณสามารถกดดูบิลค่าไฟเดือนนี้ได้ที่เมนู **"จ่ายบิล"** ได้เลยครับ!`;
      } else if (text.includes('ก๊อก') || text.includes('ซ่อม') || text.includes('บ้าน')) {
        aiReply = `วิธีแก้ไขก๊อกน้ำหยดเบื้องต้นทำได้ 3 สเต็ปครับ:\n\n1. **ปิดวาล์วน้ำหลัก**: ตัดการจ่ายน้ำเข้าก๊อกเพื่อความปลอดภัย\n2. **เปลี่ยนซีลยาง (O-Ring)**: ส่วนใหญ่น้ำหยดเกิดจากยางซีลเสื่อมสภาพตามอายุการใช้งาน สามารถซื้อซีลเทียบขนาดเปลี่ยนได้เอง\n3. **ขันเกลียวให้แน่น**: ใช้ประแจขันน็อตยึดก๊อกให้กระชับพอดี\n\nหากต้องการเรียกรถหรือบริการช่างซ่อม สามารถเลือกบริการใน **OmniLife Hub** ได้เลยครับ!`;
      } else if (text.includes('อาหาร') || text.includes('กิน') || text.includes('แคล')) {
        aiReply = `เมนูอาหารเย็นสุขภาพดี แคลอรีต่ำแนะนำดังนี้ครับ:\n\n• **ต้มยำกุ้งน้ำใส** (~120 kcal): แซ่บ ร้อนคอ สมุนไพรไทยสูง\n• **สลัดอกไก่ย่างซอสไขมันต่ำ** (~220 kcal): โปรตีนสูง อิ่มนาน\n• **ปลากะพงนึ่งซีอิ๊ว** (~180 kcal): ย่อยง่าย มีโอเมก้า 3\n\nสามารถสั่งอาหารสดอร่อยส่งด่วนได้ที่เมนู **"สั่งซื้ออาหาร"** ครับ!`;
      } else {
        aiReply = `ยินดีให้คำแนะนำครับสำหรับคำถาม "${textToSend}"!\n\nในฐานะ AI ผู้ช่วยประจำ OmniLife Hub ผมพร้อมช่วยคุณวางแผน วิจัย และให้โซลูชันที่ดีที่สุดในการดำเนินชีวิตประจำวัน หากต้องการสั่งซื้อสินค้า บริการ หรือควบคุมอุปกรณ์ในบ้าน สามารถสลับไปที่แถบเมนูด้านบนได้ตลอดเวลาครับ!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-slate-900 border-indigo-500/30 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Consultant & Assistant 24/7
          </div>
          <h2 className="text-2xl font-bold text-white">ผู้ช่วย AI ให้คำปรึกษาอัจฉริยะ</h2>
          <p className="text-xs text-gray-300">ไขข้อสงสัย ให้คำแนะนำการดูแลบ้าน สุขภาพ อาหาร และการเงินครบวงจร</p>
        </div>
      </div>

      {/* Preset Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p.prompt)}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition shrink-0 hover:text-white"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Chat Box Container */}
      <div className="glass-panel p-4 md:p-6 flex flex-col h-[520px] justify-between border-indigo-500/30">
        
        {/* Messages History */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                m.sender === 'user' 
                  ? 'bg-indigo-600/30 text-white border border-indigo-500/40 rounded-tr-none' 
                  : 'bg-slate-800/80 text-gray-100 border border-white/10 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{m.text}</p>
                <p className="text-[9px] text-gray-400 text-right">{m.time}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-white/10 text-xs text-gray-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>OmniBot กำลังประมวลผลคำตอบ...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="พิมพ์คำถาม หรือปรึกษาเรื่องต่างๆ ที่คุณต้องการ..." 
            className="glass-input text-xs flex-1"
          />
          <button 
            onClick={() => handleSend()}
            className="glass-btn btn-primary px-5 py-3 rounded-xl bg-indigo-600 border-none justify-center font-bold"
          >
            <Send className="w-4 h-4" /> ส่ง
          </button>
        </div>

      </div>

    </div>
  );
}
