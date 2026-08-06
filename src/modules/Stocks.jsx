import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Star, Search, BarChart2, 
  DollarSign, Activity, RefreshCw, Eye
} from 'lucide-react';

export default function Stocks({ watchlist, toggleWatchlist }) {
  const [activeTab, setActiveTab] = useState('popular');
  const [timeframe, setTimeframe] = useState('1D');
  const [searchQuery, setSearchQuery] = useState('');

  const stocks = [
    { symbol: 'PTT', name: 'บมจ. ปตท.', price: 34.50, change: '+0.50', percent: '+1.47%', isUp: true, volume: '1.2B', marketCap: '985B' },
    { symbol: 'CPALL', name: 'บมจ. ซีพี ออลล์', price: 58.75, change: '+1.25', percent: '+2.17%', isUp: true, volume: '950M', marketCap: '527B' },
    { symbol: 'AOT', name: 'บมจ. ท่าอากาศยานไทย', price: 62.00, change: '-0.50', percent: '-0.80%', isUp: false, volume: '720M', marketCap: '885B' },
    { symbol: 'ADVANC', name: 'บมจ. แอดวานซ์ อินโฟร์ เซอร์วิส', price: 245.00, change: '+3.00', percent: '+1.24%', isUp: true, volume: '610M', marketCap: '728B' },
    { symbol: 'KBANK', name: 'ธนาคารกสิกรไทย', price: 132.50, change: '-1.00', percent: '-0.75%', isUp: false, volume: '880M', marketCap: '313B' },
    { symbol: 'SCB', name: 'บมจ. เอสซีบี เอกซ์', price: 104.00, change: '+1.50', percent: '+1.46%', isUp: true, volume: '540M', marketCap: '349B' },
  ];

  const filteredStocks = stocks.filter(s => {
    if (activeTab === 'watchlist') return watchlist.includes(s.symbol);
    return s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.includes(searchQuery);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-teal-950/70 via-emerald-950/40 to-slate-900 border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> ตลาดหุ้น & การลงทุน (Stock Tracker)
          </div>
          <h2 className="text-2xl font-bold text-white">OmniTrade Stock Market</h2>
          <p className="text-xs text-gray-300">ติดตามราคาหุ้นไทย ดัชนี SET และวิเคราะห์กราฟเทคนิคอย่างมืออาชีพ</p>
        </div>

        {/* SET Index Quick Status */}
        <div className="flex items-center gap-4 glass-panel p-3 rounded-2xl border-emerald-500/30">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">SET Index วันนี้</p>
            <p className="text-lg font-extrabold text-white">1,385.42 <span className="text-xs text-emerald-400 font-semibold">+12.30 (+0.90%)</span></p>
          </div>
        </div>
      </div>

      {/* Main Grid: Stock Watchlist & Interactive Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stock List & Search */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="flex items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('popular')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'popular' ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-300'
                }`}
              >
                หุ้นยอดนิยม
              </button>
              <button 
                onClick={() => setActiveTab('watchlist')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                  activeTab === 'watchlist' ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-300'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" /> Watchlist ({watchlist.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-40">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาหุ้น..." 
                className="glass-input pl-8 py-1.5 text-xs"
              />
            </div>
          </div>

          {/* Stock Table / List */}
          <div className="space-y-2.5">
            {filteredStocks.map((stock) => {
              const isSaved = watchlist.includes(stock.symbol);
              return (
                <div 
                  key={stock.symbol}
                  className="glass-panel p-4 flex items-center justify-between hover:border-teal-500/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleWatchlist(stock.symbol)}
                      className={`p-1.5 rounded-lg transition ${
                        isSaved ? 'text-amber-400 bg-amber-400/10' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                    </button>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{stock.symbol}</h4>
                      <p className="text-[10px] text-gray-400">{stock.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-extrabold text-sm text-white">{stock.price.toFixed(2)} ฿</p>
                    <p className={`text-xs font-semibold flex items-center justify-end gap-1 ${
                      stock.isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {stock.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{stock.change} ({stock.percent})</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Simulated Interactive Chart */}
        <div className="lg:col-span-6 glass-panel p-6 space-y-4 border-teal-500/30">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-400" /> กราฟเทคนิค PTT (ปตท.)
              </h3>
              <p className="text-xs text-gray-400">ราคาล่าสุด 34.50 บาท (+1.47%)</p>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
              {['1D', '1W', '1M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    timeframe === tf ? 'bg-teal-500 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Chart Graphic */}
          <div className="h-56 relative overflow-hidden flex items-end">
            <svg className="w-full h-full" viewBox="0 0 400 180">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

              {/* Chart Line & Gradient Area */}
              <path 
                d="M 0 130 Q 80 140 140 80 T 260 90 T 400 30 L 400 180 L 0 180 Z" 
                fill="url(#chartGrad)" 
              />
              <path 
                d="M 0 130 Q 80 140 140 80 T 260 90 T 400 30" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3" 
              />
              
              {/* Endpoint Dot */}
              <circle cx="400" cy="30" r="5" fill="#10b981" className="animate-pulse" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-300 border-t border-white/10">
            <div>
              <span className="text-gray-400 text-[10px]">ปริมาณการซื้อขายรวม:</span>
              <p className="font-bold text-white">1,240,500 หุ้น</p>
            </div>
            <div>
              <span className="text-gray-400 text-[10px]">มูลค่าบริษัท (Market Cap):</span>
              <p className="font-bold text-white">985.4 พันล้านบาท</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
