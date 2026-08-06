import React, { useState } from 'react';
import { 
  Newspaper, Bookmark, Clock, Eye, Share2, Filter, 
  Flame, ArrowRight, ShieldAlert, Sparkles, Check
} from 'lucide-react';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([1]);

  const categories = [
    { id: 'all', name: 'ข่าวล่าสุดทั้งหมด' },
    { id: 'economy', name: 'เศรษฐกิจ & การเงิน' },
    { id: 'politics', name: 'การเมือง & บ้านเมือง' },
    { id: 'society', name: 'สังคม & จราจร/อากาศ' },
    { id: 'tech', name: 'เทคโนโลยี & นวัตกรรม' },
  ];

  const articles = [
    {
      id: 1,
      title: 'ด่วน! ธนาคารแห่งประเทศไทยปรับประมาณการเศรษฐกิจไทยปี 2026 เติบโตแกร่งขึ้น',
      category: 'economy',
      categoryName: 'เศรษฐกิจ & การเงิน',
      time: '15 นาทีที่แล้ว',
      views: '12.4K',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60',
      summary: 'แบงก์ชาติเผยดัชนีส่งออกและการท่องเที่ยวฟื้นตัวต่อเนื่อง ส่งผลให้ความเชื่อมั่นนักลงทุนทะยานสูงขึ้นในไตรมาสที่ 3',
      content: `ธนาคารแห่งประเทศไทย (ธปท.) ได้แถลงรายงานภาวะเศรษฐกิจการเงินประจำไตรมาสที่ 3 ปี 2026 โดยระบุว่าเศรษฐกิจไทยมีแนวโน้มขยายตัวดีกว่าที่คาดการณ์ไว้ ปัจจัยหลักมาจากการฟื้นตัวอย่างแข็งแกร่งของภาคการท่องเที่ยวและการบริโภคภาคเอกชน\n\nนอกจากนี้ ดัชนีตลาดหุ้นไทย (SET) ยังตอบรับในเชิงบวก โดยได้รับแรงซื้อจากนักลงทุนต่างชาติอย่างต่อเนื่องในกลุ่มพลังงานและธนาคารพาณิชย์`
    },
    {
      id: 2,
      title: 'กทม. เตรียมเปิดให้บริการระบบจราจรอัจฉริยะ AI ลดปัญหารถติด 15 สี่แยกใหญ่',
      category: 'society',
      categoryName: 'สังคม & จราจร/อากาศ',
      time: '1 ชม. ที่แล้ว',
      views: '8.1K',
      img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=500&auto=format&fit=crop&q=60',
      summary: 'ศาลาว่าการกรุงเทพมหานครทดสอบใช้กล้อง AI ควบคุมสัญญาณไฟจราจรตามปริมาณรถจริง หวังลดการสะสมท้ายแถวช่วงชั่วโมงเร่งด่วน',
      content: `กรุงเทพมหานครจับมือกับกระทรวงดิจิทัลฯ เปิดตัวระบบสัญญาณไฟจราจรอัจฉริยะประมวลผลด้วย AI เพื่อปรับระยะเวลาไฟเขียว-ไฟแดงตามความหนาแน่นของจราจรในแต่ละฝั่งทางข้าม\n\nจากการทดสอบเฟสแรกบริเวณถนนพระราม 9 และสุขุมวิท พบว่าสามารถลดเวลาการกระจายรถสะสมลงได้เฉลี่ยถึง 25%`
    },
    {
      id: 3,
      title: 'สภาฯ ผ่านร่างกฎหมายส่งเสริมพลังงานสะอาด นำร่องโซลาร์รูฟท็อปเสรีในครัวเรือน',
      category: 'politics',
      categoryName: 'การเมือง & บ้านเมือง',
      time: '3 ชม. ที่แล้ว',
      views: '15.2K',
      img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=60',
      summary: 'มติเป็นเอกฉันท์เห็นชอบร่าง พ.ร.บ. พลังงานหมุนเวียน ให้ประชาชนติดตั้งโซลาร์เซลล์บ้านและขายไฟคืนรัฐได้อย่างสะดวก',
      content: `ที่ประชุมสภาผู้แทนราษฎรมีมติเห็นชอบร่างพระราชบัญญัติส่งเสริมการผลิตไฟฟ้าจากพลังงานแสงอาทิตย์บนหลังคาบ้านเรือน (Solar Rooftop Freedom) ซึ่งจะช่วยลดขั้นตอนขออนุญาตติดตั้ง และเปิดโอกาสให้ประชาชนขายพลังงานส่วนเกินคืนให้การไฟฟ้าได้ง่ายขึ้น`
    },
    {
      id: 4,
      title: 'เปิดตัวชิปประมวลผล Quantum AI รุ่นใหม่ ความเร็วสูงกว่าเดิม 10 เท่า',
      category: 'tech',
      categoryName: 'เทคโนโลยี & นวัตกรรม',
      time: '5 ชม. ที่แล้ว',
      views: '6.9K',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
      summary: 'สถาบันวิจัยเทคโนโลยีเปิดตัวชิปประมวลผลระบบควอนตัม รองรับการทำงานโมเดลภาษาและการทำนายสภาพอากาศที่มีความซับซ้อนสูง',
      content: `วงการเทคโนโลยีระดับโลกตื่นตัวอีกครั้งหลังการเปิดตัวชิปประมวลผล Quantum AI ที่ใช้อัตราสิ้นเปลืองพลังงานต่ำลง 50% แต่ให้ความเร็วในการประมวลผลอัลกอริทึมสูงขึ้นถึง 10 เท่าเมื่อเทียบกับชิปรุ่นก่อน`
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-indigo-950/40 to-slate-900 border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <Newspaper className="w-3.5 h-3.5" /> ศูนย์ข่าวสารบ้านเมือง & เหตุการณ์ปัจจุบัน
          </div>
          <h2 className="text-2xl font-bold text-white">OmniNews Live Feed</h2>
          <p className="text-xs text-gray-300">เกาะติดข่าวด่วน เศรษฐกิจ การเมือง สังคม และจราจร ตลอด 24 ชั่วโมง</p>
        </div>
      </div>

      {/* Breaking News Live Ticker */}
      <div className="glass-panel p-3 bg-blue-950/30 border-blue-500/30 flex items-center gap-3 overflow-hidden">
        <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-black text-[11px] flex items-center gap-1 shrink-0 animate-pulse">
          <Flame className="w-3.5 h-3.5" /> BREAKING NEWS
        </span>
        <div className="overflow-hidden relative w-full text-xs text-gray-200">
          <div className="animate-marquee whitespace-nowrap">
            <span>🔴 แบงก์ชาติปรับประมาณการ GDP ปี 2026 เพิ่มขึ้น • 🔴 กทม. เปิดใช้กล้อง AI ควบคุมสัญญาณไฟจราจร 15 จุด • 🔴 สภาผ่านร่าง พ.ร.บ. โซลาร์เซลล์เสรี</span>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
              selectedCategory === c.id 
                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <div 
              key={article.id}
              className="glass-panel overflow-hidden flex flex-col justify-between hover:border-blue-500/40 transition group cursor-pointer"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-blue-300 text-[10px] font-bold">
                    {article.categoryName}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 text-white hover:text-amber-400 transition"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" /> {article.time}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-gray-400" /> {article.views}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2">{article.summary}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  onClick={() => setSelectedArticle(article)}
                  className="w-full glass-btn py-2.5 text-xs text-blue-300 border-blue-500/30 hover:bg-blue-500/20 justify-center font-bold"
                >
                  อ่านเนื้อหาข่าวฉบับเต็ม <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto relative border-blue-500/40">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <span className="badge badge-blue text-xs">{selectedArticle.categoryName}</span>
            <h2 className="font-bold text-lg text-white leading-snug">{selectedArticle.title}</h2>

            <div className="flex items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-3">
              <span>{selectedArticle.time}</span>
              <span>•</span>
              <span>เข้าชม {selectedArticle.views} ครั้ง</span>
            </div>

            <img src={selectedArticle.img} alt="" className="w-full h-64 object-cover rounded-2xl" />

            <div className="text-xs text-gray-200 leading-relaxed whitespace-pre-line space-y-2">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="glass-btn btn-primary px-6 py-2.5 text-xs bg-blue-600 border-none font-bold"
              >
                ปิดหน้าต่างข่าว
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
