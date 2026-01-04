import React, { useState } from 'react';
import { Calculator, PieChart as PieChartIcon, TrendingUp, IndianRupee, Layers } from 'lucide-react';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'sip' | 'ipo'>('sip');

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
          <Calculator size={32} className="text-primary" /> Financial Tools
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Plan your wealth creation journey with our financial calculators.</p>
        
        {/* Tool Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveTool('sip')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              activeTool === 'sip'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-50'
            }`}
          >
            <TrendingUp size={18} /> SIP Calculator
          </button>
          <button
            onClick={() => setActiveTool('ipo')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              activeTool === 'ipo'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Layers size={18} /> IPO Estimators
          </button>
        </div>
      </div>

      <div className="transition-all duration-300">
        {activeTool === 'sip' ? <SIPCalculator /> : <IPOCalculators />}
      </div>
    </div>
  );
};

// ---------------- SIP CALCULATOR ---------------- //
const SIPCalculator: React.FC = () => {
  const [investment, setInvestment] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  // SIP Calculation Formula
  // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const totalValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvested = investment * months;
  const estimatedReturns = totalValue - totalInvested;

  // Formatting helpers
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Chart Logic (CSS Conic Gradient)
  const investedPercentage = (totalInvested / totalValue) * 100;
  // const returnPercentage = (estimatedReturns / totalValue) * 100; // Unused variable

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-charcoal-light rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Input Section */}
        <div className="p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">SIP Details</h3>
              <p className="text-sm text-gray-500">Adjust the sliders or type values directly.</p>
            </div>
          </div>

          {/* Monthly Investment - Dual Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700 dark:text-gray-300">Monthly Investment</label>
              <div className="relative w-36">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                 <input 
                   type="number" 
                   value={investment}
                   onChange={(e) => setInvestment(Number(e.target.value))}
                   className="w-full pl-7 pr-3 py-1.5 bg-gray-50 dark:bg-charcoal border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary transition-all text-right"
                 />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="1000000"
              step="500"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>₹500</span>
              <span>₹10L</span>
            </div>
          </div>

          {/* Expected Return - Dual Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700 dark:text-gray-300">Expected Annual Return</label>
              <div className="relative w-24">
                 <input 
                   type="number" 
                   value={rate}
                   onChange={(e) => setRate(Number(e.target.value))}
                   className="w-full pl-3 pr-8 py-1.5 bg-gray-50 dark:bg-charcoal border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary transition-all text-right"
                 />
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Tenure - Dual Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-700 dark:text-gray-300">Time Period</label>
              <div className="relative w-24">
                 <input 
                   type="number" 
                   value={years}
                   onChange={(e) => setYears(Number(e.target.value))}
                   className="w-full pl-3 pr-8 py-1.5 bg-gray-50 dark:bg-charcoal border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary transition-all text-right"
                 />
                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold uppercase">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1 Yr</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-8 bg-gray-50 dark:bg-[#151515] flex flex-col justify-center">
           <div className="flex flex-col items-center mb-8">
              {/* CSS-based Pie Chart */}
              <div 
                className="w-48 h-48 rounded-full shadow-inner relative flex items-center justify-center mb-6"
                style={{
                  background: `conic-gradient(
                    #3b82f6 0% ${investedPercentage}%, 
                    #22c55e ${investedPercentage}% 100%
                  )`
                }}
              >
                {/* Inner white circle for donut effect */}
                <div className="w-36 h-36 bg-gray-50 dark:bg-[#151515] rounded-full flex flex-col items-center justify-center z-10 shadow-sm">
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Total Value</span>
                   <span className="text-xl font-black text-gray-900 dark:text-white">
                     {formatCurrency(totalValue)}
                   </span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Invested</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Returns</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-charcoal-light p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                 <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Invested Amount</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-white dark:bg-charcoal-light p-4 rounded-xl shadow-sm border border-green-200 dark:border-green-900/30">
                 <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase mb-1">Est. Returns</p>
                 <p className="text-lg font-bold text-green-600 dark:text-green-400">+{formatCurrency(estimatedReturns)}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- IPO ESTIMATORS (Existing) ---------------- //
const IPOCalculators: React.FC = () => {
  const [lotPrice, setLotPrice] = useState<number>(0);
  const [lotShares, setLotShares] = useState<number>(0);
  const [subRate, setSubRate] = useState<number>(0);

  const lotValue = lotPrice * lotShares;
  const probability = subRate <= 1 ? 100 : (1 / subRate) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fadeIn">
      
      {/* Lot Size & Value Calculator */}
      <div className="bg-white dark:bg-charcoal-light p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IndianRupee size={18} className="text-primary" /> Investment Estimator
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Share Price (₹)</label>
            <input 
              type="number" 
              value={lotPrice || ''} 
              onChange={(e) => setLotPrice(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-charcoal p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all"
              placeholder="e.g. 150"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Lot Size (Shares)</label>
            <input 
              type="number" 
              value={lotShares || ''} 
              onChange={(e) => setLotShares(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-charcoal p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all"
              placeholder="e.g. 90"
            />
          </div>
          <div className="bg-primary/10 p-4 rounded-xl mt-4">
            <p className="text-xs text-primary font-bold uppercase">Total Investment Required</p>
            <p className="text-2xl font-black text-primary">₹ {lotValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Allotment Probability */}
      <div className="bg-white dark:bg-charcoal-light p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
           <PieChartIcon size={18} className="text-purple-500" /> Allotment Probability
        </h3>
        <div className="space-y-4">
          <div>
             <label className="block text-xs font-medium text-gray-500 mb-1">Subscription Rate (Retail) in X times</label>
            <input 
              type="number" 
              value={subRate || ''} 
              onChange={(e) => setSubRate(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-charcoal p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-all"
              placeholder="e.g. 55"
            />
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mt-4">
            <p className="text-xs text-purple-600 dark:text-purple-300 font-bold uppercase">Estimated Chance</p>
            <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-purple-600 dark:text-purple-300">
                    {subRate > 0 ? probability.toFixed(2) : 0}%
                </p>
                <span className="text-xs text-purple-400 mb-1">
                    (1 in {Math.max(1, Math.round(subRate))} applicants)
                </span>
            </div>
            
          </div>
          <p className="text-xs text-gray-400 mt-2">
              Note: This is a mathematical probability based on random lottery selection for Retail category.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Tools;