import React from 'react';
import { FaBoxOpen, FaTags, FaMoneyBillWave, FaChartBar, FaPalette, FaLaptopCode } from 'react-icons/fa';

export const metadata = {
  title: "Store Statistics | El-Shehawy Store",
  description: "View comprehensive statistics, inventory data, and pricing trends for our premium electronics store.",
};

async function getStats() {
  try {
    const res = await fetch('https://electronics-store-api-two.vercel.app/api/products/stats', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProfileStatsPage() {
  const data = await getStats();

  if (!data || !data.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent text-red-500">
        <p className="text-xl font-semibold">Failed to load statistics.</p>
      </div>
    );
  }

  const { stats } = data;

  return (
    <div className="min-h-screen pt-24 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tight mb-4">
            Store Profile & Statistics
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of our store's inventory, pricing trends, and product categories.
          </p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Products */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-500/20 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Products</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalProducts}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-900/40 flex items-center justify-center text-cyan-400">
                <FaBoxOpen size={24} />
              </div>
            </div>
          </div>

          {/* Total Categories */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-cyan-500/20 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Categories</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalCategories}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-400">
                <FaTags size={24} />
              </div>
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Average Price</p>
                <p className="text-3xl font-bold text-white mt-2">
                  ${stats.priceRange.average.toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald-900/40 flex items-center justify-center text-emerald-400">
                <FaMoneyBillWave size={24} />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pink-500/20 hover:border-pink-500/50 transition-colors flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-400 mb-2">Price Range</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">${stats.priceRange.min}</span>
              <span className="text-xs text-gray-500 px-2">to</span>
              <span className="text-lg font-bold text-white">${stats.priceRange.max}</span>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Category Breakdown */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <FaChartBar className="text-cyan-400 text-xl" />
              <h2 className="text-2xl font-bold text-white">Category Breakdown</h2>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {stats.categoryBreakdown.map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-900/80 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-cyan-400 transition-colors">
                      <FaLaptopCode size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white capitalize">{item.category}</h3>
                      <p className="text-xs text-gray-400">{item.count} items available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-200">${item.avgPrice.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">avg. price</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colors & Models */}
          <div className="space-y-8">
            {/* Top Colors */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <FaPalette className="text-pink-400 text-xl" />
                <h2 className="text-2xl font-bold text-white">Popular Colors</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {stats.topColors.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-800/50 px-4 py-3 rounded-2xl border border-slate-700 shadow-sm">
                    {/* Render color circle based on actual color name */}
                    <span 
                      className="w-4 h-4 rounded-full border border-gray-600" 
                      style={{ 
                        backgroundColor: color.color === 'white' ? '#fff' : 
                                         color.color === 'black' ? '#000' : 
                                         color.color === 'silver' ? '#C0C0C0' : 
                                         color.color === 'space gray' ? '#334155' : 
                                         color.color === 'rgb' ? '#d946ef' : color.color 
                      }}
                    ></span>
                    <span className="font-medium text-gray-200 capitalize">{color.color}</span>
                    <span className="text-sm text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded-full">{color.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Years */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-purple-500/20 rounded-3xl p-8 text-white shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Model Years Analysis</h2>
              <div className="flex items-center justify-between bg-slate-950/40 rounded-2xl p-6">
                <div className="text-center w-full">
                  <p className="text-gray-400 font-medium text-sm text-center mb-4">Available Model Years</p>
                  <div className="flex items-center gap-2 justify-center flex-wrap">
                    {stats.modelYears.available.map(year => (
                      <span key={year} className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-4 py-1.5 rounded-lg font-semibold">{year}</span>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8 pt-6 border-t border-slate-700/50">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Oldest</p>
                      <p className="font-bold text-2xl text-cyan-400">{stats.modelYears.oldest}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Latest</p>
                      <p className="font-bold text-2xl text-purple-400">{stats.modelYears.latest}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
