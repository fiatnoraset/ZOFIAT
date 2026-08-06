import React, { useState } from 'react';
import { 
  Tv, ShoppingCart, ShieldCheck, Truck, Check, Filter, 
  Info, Star, CreditCard
} from 'lucide-react';

export default function ApplianceMall({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'tv', name: 'สมาร์ททีวี & โฮมเธียเตอร์' },
    { id: 'fridge', name: 'ตู้เย็นอัจฉริยะ' },
    { id: 'ac', name: 'เครื่องปรับอากาศ Inverter' },
    { id: 'vacuum', name: 'หุ่นยนต์ดูดฝุ่น' },
  ];

  const products = [
    {
      id: 501,
      name: 'Samsung Neo QLED 4K Smart TV 65 นิ้ว',
      category: 'tv',
      price: 28990,
      installment: '2,899 ฿/เดือน (ผ่อน 0% 10 เดือน)',
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60',
      specs: ['ความละเอียด 4K Ultra HD', 'ระบบเสียง Dolby Atmos 3D', 'รองรับการสั่งงานด้วยเสียง Thai Bixby', 'ประกันศูนย์ไทย 3 ปี']
    },
    {
      id: 502,
      name: 'LG InstaView Door-in-Door ตู้เย็น 4 ประตู (21.7 คิว)',
      category: 'fridge',
      price: 45900,
      installment: '4,590 ฿/เดือน (ผ่อน 0% 10 เดือน)',
      rating: 4.95,
      img: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=60',
      specs: ['เคาะ 2 ครั้งมองเห็นข้างใน', 'ระบบทำน้ำแข็งอัตโนมัติ Craft Ice', 'กรองอากาศ Hygiene FRESH+', 'ประหยัดไฟเบอร์ 5 (3 ดาว)']
    },
    {
      id: 503,
      name: 'Daikin Inverter Smart Aircon 18,000 BTU',
      category: 'ac',
      price: 24500,
      installment: '2,450 ฿/เดือน (ผ่อน 0% 10 เดือน)',
      rating: 4.85,
      img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60',
      specs: ['แผ่นกรองฝุ่น PM 2.5', 'สั่งงานผ่านแอปมือถือ', 'เสียงเงียบเพียง 19 เดซิเบล', 'ฟรีบริการติดตั้งทั่วประเทศ']
    },
    {
      id: 504,
      name: 'Roborock S8 Pro Ultra หุ่นยนต์ดูดฝุ่น & ถูพื้นอัตโนมัติ',
      category: 'vacuum',
      price: 32900,
      installment: '3,290 ฿/เดือน (ผ่อน 0% 10 เดือน)',
      rating: 4.98,
      img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=60',
      specs: ['แท่นชาร์จซักผ้าถูและเติมน้ำอัตโนมัติ', 'แรงดูด 6,000 Pa', 'สแกนห้องแบบ LiDAR 3D', 'หลบหลีกสิ่งกีดขวาง AI']
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleBuyNow = (prod) => {
    addToCart({ id: prod.id, name: prod.name, price: prod.price });
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 to-slate-900 border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Tv className="w-3.5 h-3.5" /> ห้างสรรพสินค้าเครื่องใช้ไฟฟ้า Smart Home
          </div>
          <h2 className="text-2xl font-bold text-white">OmniHome Mall</h2>
          <p className="text-xs text-gray-300">เครื่องใช้ไฟฟ้าแบรนด์ชั้นนำ ผ่อน 0% สูงสุด 10 เดือน พร้อมบริการจัดส่งและติดตั้งฟรี</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-300">
          <Truck className="w-4 h-4 text-purple-400" /> จัดส่งฟรีถึงหน้าบ้านใน 24 ชม.
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
              selectedCategory === c.id 
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Success Notification */}
      {purchaseSuccess && (
        <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-purple-400" />
            <span>เพิ่มสินค้าลงในตะกร้าเรียบร้อยแล้ว! สามารถชำระเงินในเมนู "สั่งซื้ออาหาร/ตะกร้า" ได้ทันที</span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id}
            className="glass-panel overflow-hidden flex flex-col justify-between hover:border-purple-500/50 transition group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={prod.img} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> {prod.rating}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition line-clamp-2">{prod.name}</h4>
                <p className="text-[11px] text-purple-400 font-medium">{prod.installment}</p>

                <div className="space-y-1 pt-2 border-t border-white/10">
                  {prod.specs.slice(0, 2).map((s, i) => (
                    <p key={i} className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Check className="w-3 h-3 text-purple-400 shrink-0" /> {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] text-gray-400">ราคาพิเศษ</span>
                <span className="text-lg font-extrabold text-white">{prod.price.toLocaleString()} ฿</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedProduct(prod)}
                  className="flex-1 glass-btn py-2 text-xs text-gray-300 justify-center"
                >
                  <Info className="w-3.5 h-3.5" /> สเปก
                </button>
                <button 
                  onClick={() => handleBuyNow(prod)}
                  className="flex-1 glass-btn btn-primary py-2 text-xs bg-purple-600 border-none justify-center font-bold"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> สั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Specs Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md p-6 space-y-4 relative border-purple-500/40">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <img src={selectedProduct.img} alt="" className="w-full h-40 object-cover rounded-2xl" />

            <h3 className="font-bold text-base text-white">{selectedProduct.name}</h3>
            <p className="text-xs text-purple-400 font-bold">{selectedProduct.price.toLocaleString()} ฿ ({selectedProduct.installment})</p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-300">สเปก & คุณสมบัติเด่น:</h4>
              {selectedProduct.specs.map((spec, i) => (
                <div key={i} className="text-xs text-gray-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => { handleBuyNow(selectedProduct); setSelectedProduct(null); }}
              className="w-full glass-btn btn-primary py-3 rounded-xl text-xs font-bold bg-purple-600 border-none justify-center"
            >
              หยอดใส่ตะกร้าทันที
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
