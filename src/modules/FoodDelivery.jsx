import React, { useState } from 'react';
import { 
  UtensilsCrossed, Search, Star, Clock, ShoppingBag, Plus, Minus, 
  Check, ArrowRight, Filter, Flame
} from 'lucide-react';

export default function FoodDelivery({ cart, addToCart, removeFromCart, clearCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'thai', name: 'อาหารไทย' },
    { id: 'japan', name: 'ญี่ปุ่น & ชาบู' },
    { id: 'street', name: 'สตรีทฟู้ด' },
    { id: 'cafe', name: 'กาแฟ & ของหวาน' },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'ร้านข้าวมันไก่เฮียเม้ง (สาขาต้นตำรับ)',
      category: 'street',
      rating: 4.9,
      deliveryTime: '15-25 นาที',
      distance: '1.2 กม.',
      img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&auto=format&fit=crop&q=60',
      dishes: [
        { id: 101, name: 'ข้าวมันไก่ต้มหนังนุ่ม + น้ำซุปฟัก', price: 65, desc: 'ไก่เนื้อทองนุ่มฉ่ำ เสิร์ฟพร้อมน้ำจิ้มเต้าเจี้ยวสูตรเด็ด' },
        { id: 102, name: 'ข้าวมันไก่ทอดกรอบซอสเกาหลี', price: 70, desc: 'ไก่ทอดแป้งกรอบสไตล์เกาหลี โรยงาขาว' },
        { id: 103, name: 'น้ำมะนาวคั้นสด 100%', price: 25, desc: 'เปรี้ยวหวานสดชื่น แก้เลี่ยน' }
      ]
    },
    {
      id: 2,
      name: 'Ramen Ichiban (ราเมนหมูชาชูเข้มข้น)',
      category: 'japan',
      rating: 4.8,
      deliveryTime: '20-30 นาที',
      distance: '2.5 กม.',
      img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
      dishes: [
        { id: 201, name: 'ทงคตสึราเมน ซุปกระดูกหมูเข้มข้น', price: 180, desc: 'เส้นราเมนเหนียวนุ่ม ชาชู 2 แผ่น และไข่ต้มยางมะตอย' },
        { id: 202, name: 'เกี๊ยวซ่าทอดกรอบ (6 ชิ้น)', price: 90, desc: 'ไส้หมูสับเต็มคำ ทอดสไตล์ญี่ปุ่น' }
      ]
    },
    {
      id: 3,
      name: 'ส้มตำแซ่บเวอร์ ครัวอีสานระเบิด',
      category: 'thai',
      rating: 4.7,
      deliveryTime: '15-20 นาที',
      distance: '0.8 กม.',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60',
      dishes: [
        { id: 301, name: 'ส้มตำปูปลาร้าเครื่องแน่น', price: 60, desc: 'ปลาร้าต้มสุกหอมนัว เผ็ดจัดจ้านสะใจ' },
        { id: 302, name: 'คอหมูย่างน้ำจิ้มแจ่วข้าวคั่ว', price: 110, desc: 'คอหมูหมักนุ่ม หมักเครื่องเทศย่างเตาถ่าน' }
      ]
    },
    {
      id: 4,
      name: 'Matcha & Bakery Cozy Cafe',
      category: 'cafe',
      rating: 4.9,
      deliveryTime: '10-15 นาที',
      distance: '1.0 กม.',
      img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60',
      dishes: [
        { id: 401, name: 'Uji Matcha Latte เย็น (หวาน 50%)', price: 120, desc: 'ชาเขียวมัทฉะเกรดพิธีการ จากเมืองอูจิ ประเทศญี่ปุ่น' },
        { id: 402, name: 'Croissant เนยสดฝรั่งเศส', price: 85, desc: 'อบสดใหม่แป้งกรอบนอกนุ่มใน หอมเนยแท้' }
      ]
    }
  ];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-orange-950/60 to-slate-900 border-orange-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" /> สั่งซื้ออาหาร
          </div>
          <h2 className="text-2xl font-bold text-white">สั่งซื้ออาหาร (GrabFood)</h2>
          <p className="text-xs text-gray-300">คัดสรรร้านอร่อยส่งตรงถึงหน้าบ้านคุณ รวดเร็ว สะอาด ปลอดภัย</p>
        </div>

        <a 
          href="https://www.grab.com/th/food/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition-transform shrink-0"
        >
          <span>เปิดใช้งาน GrabFood</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาร้านค้า หรือเมนู..." 
            className="glass-input pl-10 text-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
              selectedCategory === c.id 
                ? 'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Restaurants & Cart Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Restaurant List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" /> ร้านแนะนำใกล้น่าทานประจำวันนี้
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRestaurants.map((resto) => (
              <div 
                key={resto.id}
                onClick={() => setActiveRestaurant(resto)}
                className="glass-panel overflow-hidden cursor-pointer hover:border-orange-500/50 transition group"
              >
                <div className="h-36 overflow-hidden relative">
                  <img 
                    src={resto.img} 
                    alt={resto.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-400 text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {resto.rating}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition truncate">{resto.name}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-orange-400" /> {resto.deliveryTime}</span>
                    <span>•</span>
                    <span>{resto.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Drawer Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 sticky top-24 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-orange-400" /> ตะกร้าสินค้าของคุณ
              </h3>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-[10px] text-gray-400 hover:text-rose-400">
                  ล้างรายการ
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30 text-orange-400" />
                <p className="text-xs">ยังไม่มีรายการในตะกร้า</p>
                <p className="text-[10px] text-gray-500 mt-1">เลือกร้านค้าเพื่อเพิ่มเมนูอาหารโปรด</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="glass-card p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">{item.name}</p>
                      <p className="text-[10px] text-orange-400">{item.price} ฿ / ชิ้น</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white min-w-[16px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total & Checkout */}
            {cart.length > 0 && (
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>ค่าอาหารรวม</span>
                  <span className="font-bold text-white">{cartTotal} ฿</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>ค่าจัดส่ง</span>
                  <span className="font-bold text-emerald-400">FREE</span>
                </div>

                <div className="flex items-center justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>ยอดสุทธิ</span>
                  <span className="text-orange-400 text-lg">{cartTotal} ฿</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full glass-btn btn-primary py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-600 border-none justify-center shadow-lg shadow-orange-500/20"
                >
                  ชำระเงิน & สั่งซื้อทันที
                </button>
              </div>
            )}

            {/* Order Confirmation Notification */}
            {orderPlaced && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center animate-fade-in">
                <Check className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <p className="font-bold">รับออเดอร์เรียบร้อยแล้ว!</p>
                <p className="text-[10px] text-gray-300 mt-0.5">ไรเดอร์กำลังเตรียมจัดส่งให้คุณใน 20 นาที</p>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Restaurant Menu Modal */}
      {activeRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto relative border-orange-500/40">
            <button 
              onClick={() => setActiveRestaurant(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <img src={activeRestaurant.img} alt="" className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-base text-white">{activeRestaurant.name}</h3>
                <p className="text-xs text-gray-400">ส่งตรงถึงคุณใน {activeRestaurant.deliveryTime}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">รายการอาหารแนะนำ</h4>

              {activeRestaurant.dishes.map((dish) => (
                <div key={dish.id} className="glass-card p-3.5 flex items-center justify-between">
                  <div className="pr-4">
                    <h5 className="font-bold text-xs text-white">{dish.name}</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">{dish.desc}</p>
                    <p className="text-xs font-bold text-orange-400 mt-1">{dish.price} ฿</p>
                  </div>

                  <button 
                    onClick={() => addToCart(dish)}
                    className="glass-btn px-3 py-1.5 text-xs bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/40 font-bold"
                  >
                    + เพิ่ม
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
