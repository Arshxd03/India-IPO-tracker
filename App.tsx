import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Academy from './components/Academy';
import Tools from './components/Tools';
import ThemeToggle from './components/ThemeToggle';
import { LayoutDashboard, GraduationCap, Calculator } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'academy' | 'tools'>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'academy':
        return <Academy />;
      case 'tools':
        return <Tools />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 font-sans antialiased">
      {/* Top Navbar (Desktop) / Header (Mobile) */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-charcoal/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                 <span className="text-white font-black text-xl tracking-tighter">IP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                IPO Pathshala
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeView === 'dashboard' ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <LayoutDashboard size={18} /> Tracker
              </button>
              <button 
                onClick={() => setActiveView('academy')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeView === 'academy' ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <GraduationCap size={18} /> Academy
              </button>
              <button 
                onClick={() => setActiveView('tools')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeView === 'tools' ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <Calculator size={18} /> Tools
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-charcoal border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
           <button 
              onClick={() => setActiveView('dashboard')}
              className={`flex flex-col items-center justify-center w-full h-full ${activeView === 'dashboard' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-[10px] mt-1 font-medium">Tracker</span>
           </button>
           <button 
              onClick={() => setActiveView('academy')}
              className={`flex flex-col items-center justify-center w-full h-full ${activeView === 'academy' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
            >
              <GraduationCap size={20} />
              <span className="text-[10px] mt-1 font-medium">Learn</span>
           </button>
           <button 
              onClick={() => setActiveView('tools')}
              className={`flex flex-col items-center justify-center w-full h-full ${activeView === 'tools' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
            >
              <Calculator size={20} />
              <span className="text-[10px] mt-1 font-medium">Tools</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;