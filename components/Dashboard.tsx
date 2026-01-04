import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IPOData, IPOStatus } from '../types';
import { fetchIPOData } from '../services/geminiService';
import SkeletonCard from './SkeletonCard';
import { 
  BadgeIndianRupee, 
  Calendar, 
  Layers, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Clock, 
  RotateCw, 
  Filter, 
  X, 
  Building2, 
  Briefcase 
} from 'lucide-react';

const CACHE_KEY = 'ipo_data_cache';

interface CachedData {
  ipos: IPOData[];
  timestamp: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IPOStatus>('Ongoing');
  const [closedFilter, setClosedFilter] = useState<'All' | 'Mainboard' | 'SME'>('All');
  const [selectedIPO, setSelectedIPO] = useState<IPOData | null>(null);

  // React Query with Fetch-on-Demand & Caching Strategy
  const { 
    data: queryData, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isRefetching 
  } = useQuery<CachedData>({
    queryKey: ['ipoData'],
    queryFn: async () => {
      const ipos = await fetchIPOData();
      const timestamp = Date.now();
      const cacheObj = { data: ipos, timestamp };
      
      // Save to localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
      
      return { ipos, timestamp };
    },
    // Check cache on initial load
    initialData: () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // If valid data exists, use it immediately
          if (parsed && Array.isArray(parsed.data)) {
            return { ipos: parsed.data, timestamp: parsed.timestamp || Date.now() };
          }
        } catch (e) {
          console.error("Failed to parse cached IPO data", e);
        }
      }
      return undefined;
    },
    staleTime: Infinity, // Prevent auto-refetching; rely on manual refresh
    gcTime: 1000 * 60 * 60 * 24, // Keep in memory for 24 hours
  });

  // Derived state
  const ipoData = queryData?.ipos || [];
  const lastUpdatedRaw = queryData?.timestamp;
  
  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdatedRaw) return 'Never';
    return new Date(lastUpdatedRaw).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  }, [lastUpdatedRaw]);

  // Filter Data Logic
  const filteredData = useMemo(() => {
    let data = ipoData.filter(ipo => ipo.status === activeTab);
    
    // Apply secondary filter for Closed tab
    if (activeTab === 'Closed' && closedFilter !== 'All') {
      data = data.filter(ipo => ipo.type === closedFilter);
    }
    
    return data;
  }, [ipoData, activeTab, closedFilter]);

  const showSkeleton = isLoading || isRefetching;

  // --- SAFETY HELPERS (FIX FOR ERROR #31) ---

  // 1. Universal Safe Render: Converts ANY type (Object, Array, Null) to String
  // This prevents the app from crashing if API returns { value: 10 } instead of "10"
  const safeRender = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val);
      } catch {
        return '';
      }
    }
    return String(val);
  };

  // 2. Robust Subscription Calculator
  const getTotalSub = (sub: any): string => {
    if (!sub || typeof sub !== 'object') return 'N/A';
    
    const clean = (val: any) => {
        if (typeof val === 'number') return val;
        if (typeof val !== 'string') return 0;
        // Remove 'x', commas, spaces
        const parsed = parseFloat(val.replace(/[x,\s]/gi, ''));
        return isNaN(parsed) ? 0 : parsed;
    };

    try {
        const total = clean(sub.retail) + clean(sub.nii) + clean(sub.qib);
        // Return with 1 decimal place and 'x' suffix
        return total.toFixed(1) + 'x';
    } catch (e) {
        return 'N/A';
    }
  };

  // --- ERROR UI BLOCK (FIX FOR ERROR #31) ---
  if (isError && !ipoData.length) {
    // Extract error message safely as a string
    let errorMessage = "An unexpected error occurred.";
    if (error) {
       // Force conversion to string to avoid Object-as-child error
       errorMessage = (error as any)?.message || String(error);
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fadeIn">
        <AlertCircle size={48} className="text-red-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Failed to load market data</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md break-words">
          {errorMessage}
        </p>
        <button 
          onClick={() => refetch()} 
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RotateCw size={18} /> Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn relative">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Mainboard & SME Dashboard
            <button 
              onClick={() => refetch()} 
              disabled={showSkeleton}
              className={`p-2 rounded-full bg-gray-100 dark:bg-charcoal-light hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-primary border border-gray-200 dark:border-gray-700 shadow-sm`}
              title="Force Refresh Data"
            >
              <RotateCw size={18} className={showSkeleton ? "animate-spin" : ""} />
            </button>
          </h2>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <Clock size={12} />
            <span>Last Updated: {formattedLastUpdated}</span>
          </div>
        </div>

        <div className="flex space-x-2 bg-gray-200 dark:bg-charcoal-light p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {(['Ongoing', 'Upcoming', 'Closed'] as IPOStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Filter for Closed Tab */}
      {activeTab === 'Closed' && !showSkeleton && (
        <div className="flex justify-end animate-fadeIn">
          <div className="flex items-center space-x-2 bg-white dark:bg-charcoal-light border border-gray-200 dark:border-gray-800 rounded-lg p-1">
             <Filter size={14} className="ml-2 text-gray-400" />
             {(['All', 'Mainboard', 'SME'] as const).map(filter => (
               <button
                 key={filter}
                 onClick={() => setClosedFilter(filter)}
                 className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                   closedFilter === filter 
                     ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                     : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                 }`}
               >
                 {filter}
               </button>
             ))}
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div className={`
        ${filteredData.length > 5 && !showSkeleton ? 'max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar' : ''}
        grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4
      `}>
        
        {showSkeleton ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : filteredData.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white dark:bg-charcoal-light rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">No {activeTab} {closedFilter !== 'All' ? closedFilter : ''} IPOs found currently.</p>
            <p className="text-sm text-gray-400 mt-2">Check back later or try refreshing.</p>
          </div>
        ) : (
          filteredData.map((ipo) => {
            const isClosed = ipo.status === 'Closed';
            const listingGainStr = safeRender(ipo?.listingGain);
            const listingGainVal = parseFloat(listingGainStr.replace('%', '')) || 0;
            const isProfit = listingGainVal >= 0;

            return (
              <div
                key={ipo.id}
                onClick={() => setSelectedIPO(ipo)}
                className="bg-white dark:bg-charcoal-light rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    ipo.type === 'Mainboard' 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                  }`}>
                    {safeRender(ipo?.type)}
                  </span>
                  {!isClosed && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                      GMP: {safeRender(ipo?.gmp)}
                    </span>
                  )}
                  {isClosed && (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
                      isProfit 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      Gain: {safeRender(ipo?.listingGain || 'N/A')}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pr-24 truncate" title={String(ipo?.companyName)}>
                  {safeRender(ipo?.companyName || "Unknown Company")}
                </h3>

                <div className="space-y-3 flex-grow">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <BadgeIndianRupee size={16} /> Price Band
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{safeRender(ipo?.priceBand)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Layers size={16} /> Lot Size
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{safeRender(ipo?.lotSize)} Shares</span>
                  </div>

                   <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Calendar size={16} /> {isClosed ? 'Listed On' : 'Issue Dates'}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs text-right">
                      {isClosed 
                        ? safeRender(ipo?.listingDate) 
                        : `${safeRender(ipo?.openDate)} - ${safeRender(ipo?.closeDate)}`
                      }
                    </span>
                  </div>
                </div>

                {/* Status Highlight */}
                {isClosed ? (
                  <div className="mt-5 p-3 bg-gray-50 dark:bg-[#121212] rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users size={16} />
                          <span className="text-sm font-medium">Total Subs</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {getTotalSub(ipo?.subscription)}
                        </span>
                     </div>
                  </div>
                ) : (
                  <div className="mt-5 p-3 bg-gray-50 dark:bg-[#121212] rounded-xl border border-dashed border-gray-200 dark:border-gray-700 group-hover:border-primary/30 transition-colors">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2 text-primary">
                         <TrendingUp size={18} />
                         <span className="text-sm font-bold">Est. Gain</span>
                       </div>
                       <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                         {safeRender(ipo?.expectedGain)}
                       </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 text-center">
                   <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest group-hover:text-primary transition-colors">Tap for details</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedIPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={() => setSelectedIPO(null)}
           ></div>

           <div className="bg-white dark:bg-charcoal w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-fadeInUp">
              
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start bg-gray-50 dark:bg-[#151515]">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                       {safeRender(selectedIPO?.companyName)}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="px-2 py-1 rounded-md bg-white dark:bg-charcoal text-xs font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                         {safeRender(selectedIPO?.type)}
                       </span>
                       <span className={`px-2 py-1 rounded-md text-xs font-bold ${selectedIPO?.status === 'Closed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                         {safeRender(selectedIPO?.status)}
                       </span>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSelectedIPO(null)}
                   className="p-2 rounded-full bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 >
                    <X size={20} className="text-gray-500" />
                 </button>
              </div>

              <div className="p-6 overflow-y-auto">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 dark:bg-charcoal-light p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Price</p>
                       <p className="font-bold text-gray-900 dark:text-white">{safeRender(selectedIPO?.priceBand)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-charcoal-light p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Lot Size</p>
                       <p className="font-bold text-gray-900 dark:text-white">{safeRender(selectedIPO?.lotSize)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-charcoal-light p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Issue Size</p>
                       <p className="font-bold text-gray-900 dark:text-white">{safeRender(selectedIPO?.issueSize)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-charcoal-light p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{selectedIPO?.status === 'Closed' ? 'Listed On' : 'Closes'}</p>
                       <p className="font-bold text-gray-900 dark:text-white">
                         {selectedIPO?.status === 'Closed' ? safeRender(selectedIPO?.listingDate) : safeRender(selectedIPO?.closeDate)}
                       </p>
                    </div>
                 </div>

                 <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Users size={16} className="text-primary" /> Subscription Status
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                           <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Retail</span>
                           <span className="text-lg font-black text-blue-800 dark:text-blue-300">
                             {selectedIPO?.subscription ? safeRender(selectedIPO.subscription.retail) : 'N/A'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                           <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">NII (HNI)</span>
                           <span className="text-lg font-black text-blue-800 dark:text-blue-300">
                             {selectedIPO?.subscription ? safeRender(selectedIPO.subscription.nii) : 'N/A'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                           <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">QIB</span>
                           <span className="text-lg font-black text-blue-800 dark:text-blue-300">
                             {selectedIPO?.subscription ? safeRender(selectedIPO.subscription.qib) : 'N/A'}
                           </span>
                        </div>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Briefcase size={16} className="text-primary" /> Issue Management
                    </h4>
                    <div className="bg-gray-50 dark:bg-[#151515] rounded-2xl p-5 space-y-4 border border-gray-100 dark:border-gray-800">
                       <div className="flex items-start gap-4">
                          <div className="bg-white dark:bg-charcoal p-2 rounded-lg text-gray-500 border border-gray-200 dark:border-gray-700">
                             <Building2 size={20} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-gray-500 uppercase">Registrar</p>
                             <p className="text-base font-semibold text-gray-900 dark:text-white">
                               {safeRender(selectedIPO?.registrar) || "Link Intime India Pvt Ltd"}
                             </p>
                             <p className="text-xs text-gray-400 mt-1">Check allotment status on their website.</p>
                          </div>
                       </div>
                       <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
                       <div className="flex items-start gap-4">
                          <div className="bg-white dark:bg-charcoal p-2 rounded-lg text-gray-500 border border-gray-200 dark:border-gray-700">
                             <Briefcase size={20} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-gray-500 uppercase">Lead Manager</p>
                             <p className="text-base font-semibold text-gray-900 dark:text-white">
                               {safeRender(selectedIPO?.leadManager) || "Not Disclosed"}
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#151515] flex justify-end">
                 <button 
                   onClick={() => setSelectedIPO(null)}
                   className="px-6 py-2 rounded-lg font-bold bg-white dark:bg-charcoal border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 >
                   Close
                 </button>
              </div>

           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;