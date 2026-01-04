import React, { useState } from 'react';
import { ACADEMY_DATA, QUIZ_QUESTIONS, GLOSSARY_DATA } from '../constants';
import { 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  GraduationCap, 
  Globe, 
  Activity, 
  PieChart, 
  BarChart,
  HelpCircle,
  Heart,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Layers,
  Zap,
  BookText,
  Search,
  ChevronDown
} from 'lucide-react';

const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'glossary'>('learn');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={24} className="text-primary" />;
      case 'TrendingUp': return <TrendingUp size={24} className="text-green-500" />;
      case 'AlertTriangle': return <AlertTriangle size={24} className="text-red-500" />;
      case 'Globe': return <Globe size={24} className="text-blue-500" />;
      case 'Activity': return <Activity size={24} className="text-orange-500" />;
      case 'PieChart': return <PieChart size={24} className="text-purple-500" />;
      case 'BarChart': return <BarChart size={24} className="text-indigo-500" />;
      case 'Layers': return <Layers size={24} className="text-pink-500" />;
      case 'Zap': return <Zap size={24} className="text-yellow-500" />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
          <GraduationCap size={32} className="text-primary" /> Investor Academy
        </h2>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 flex-wrap">
           <button 
             onClick={() => setActiveTab('learn')}
             className={`px-6 py-2 rounded-full font-bold transition-all ${
               activeTab === 'learn' 
                 ? 'bg-primary text-white shadow-lg' 
                 : 'bg-white dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-50'
             }`}
           >
             Learn Concepts
           </button>
           <button 
             onClick={() => setActiveTab('glossary')}
             className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
               activeTab === 'glossary' 
                 ? 'bg-primary text-white shadow-lg' 
                 : 'bg-white dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-50'
             }`}
           >
             <BookText size={18} /> Glossary
           </button>
           <button 
             onClick={() => setActiveTab('quiz')}
             className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
               activeTab === 'quiz' 
                 ? 'bg-primary text-white shadow-lg' 
                 : 'bg-white dark:bg-charcoal-light text-gray-600 dark:text-gray-400 hover:bg-gray-50'
             }`}
           >
             <HelpCircle size={18} /> Daily Quiz
           </button>
        </div>
      </div>

      {activeTab === 'learn' ? (
        <div className="space-y-16 animate-fadeIn">
          
          {/* Categorized Learning Sections */}
          {ACADEMY_DATA.learningSections.map((section) => (
            <section key={section.id} className="scroll-mt-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-1 bg-primary rounded-full"></div>
                <div>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400">{section.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.topics.map((topic, idx) => (
                  <div key={idx} className="bg-white dark:bg-charcoal-light p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-gray-50 dark:bg-charcoal w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      {getIcon(topic.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{topic.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Timeline Section */}
          <div className="bg-white dark:bg-charcoal-light rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">History of Indian Markets</h3>
            <div className="relative border-l-2 border-primary/30 ml-4 md:ml-10 space-y-8">
              {ACADEMY_DATA.timeline.map((item, index) => (
                <div key={index} className="relative pl-8 md:pl-12 group">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-charcoal border-4 border-primary group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="text-2xl font-black text-primary/80 font-mono">{item.year}</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Evolution */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h3 className="text-2xl font-bold mb-6 relative z-10">Market Evolution: Physical to Digital</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {ACADEMY_DATA.marketEvolution.map((stage, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <h4 className="font-bold text-primary mb-2 text-lg">{stage.stage}</h4>
                  <p className="text-gray-300 text-sm">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'glossary' ? (
        <GlossarySection />
      ) : (
        <QuizSection />
      )}

    </div>
  );
};

// ---------------- GLOSSARY SUB-COMPONENT ---------------- //
const GlossarySection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredTerms = GLOSSARY_DATA.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
       {/* Search Bar */}
       <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search financial terms (e.g. 'GMP', 'ASBA')..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(null); // Close accordion on search
            }}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-charcoal-light text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none shadow-sm transition-all"
          />
       </div>

       {/* Accordion List */}
       <div className="space-y-4">
          {filteredTerms.length === 0 ? (
             <div className="text-center py-10 bg-white dark:bg-charcoal-light rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
               <p className="text-gray-500 dark:text-gray-400">No matching terms found for "{search}"</p>
             </div>
          ) : (
             filteredTerms.map((item, idx) => (
               <div key={idx} className="bg-white dark:bg-charcoal-light rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                     <span className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                       {item.term}
                     </span>
                     <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <div 
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                     <div className="overflow-hidden">
                        <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/50 mt-2">
                           {item.definition}
                        </div>
                     </div>
                  </div>
               </div>
             ))
          )}
       </div>
    </div>
  );
};

// ---------------- QUIZ SUB-COMPONENT ---------------- //
const QuizSection: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const question = QUIZ_QUESTIONS[currentQIndex];

  const handleOptionClick = (optionIndex: number) => {
    if (showExplanation || isGameOver) return;

    setSelectedOption(optionIndex);
    setShowExplanation(true);

    if (optionIndex === question.correctAnswer) {
      setScore(prev => prev + 10);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setIsGameOver(true);
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setIsGameWon(true);
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentQIndex(0);
    setScore(0);
    setLives(3);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsGameOver(false);
    setIsGameWon(false);
  };

  if (isGameOver && lives === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-charcoal-light rounded-3xl shadow-lg animate-fadeIn">
        <XCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Game Over!</h2>
        <p className="text-gray-500 mb-6">You ran out of lives. Better luck next time!</p>
        <p className="text-xl font-bold mb-8">Final Score: {score}</p>
        <button onClick={resetGame} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
          <RefreshCw size={20} /> Try Again
        </button>
      </div>
    );
  }

  if (isGameWon) {
    return (
      <div className="text-center py-20 bg-white dark:bg-charcoal-light rounded-3xl shadow-lg animate-fadeIn">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Master!</h2>
        <p className="text-gray-500 mb-6">You completed all questions.</p>
        <p className="text-xl font-bold mb-8">Final Score: {score}</p>
        <button onClick={resetGame} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto">
          <RefreshCw size={20} /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-charcoal-light p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 animate-fadeIn">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={24} className={`${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300 dark:text-gray-700'}`} />
          ))}
        </div>
        <div className="text-2xl font-black text-primary">{score} pts</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 mb-2 inline-block`}>
          {question.difficulty}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          let optionClass = "w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 ";
          
          if (showExplanation) {
            if (idx === question.correctAnswer) {
              optionClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
            } else if (idx === selectedOption) {
              optionClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
            } else {
              optionClass += "border-gray-100 dark:border-gray-800 opacity-50";
            }
          } else {
            optionClass += "border-gray-100 dark:border-gray-800 hover:border-primary hover:bg-blue-50 dark:hover:bg-charcoal dark:text-gray-300";
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={showExplanation}
              className={optionClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {showExplanation && (
        <div className="animate-fadeIn">
          <div className="bg-gray-50 dark:bg-charcoal p-4 rounded-xl mb-6">
            <p className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">Explanation:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{question.explanation}</p>
          </div>
          <button 
            onClick={handleNext}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
          >
            {currentQIndex === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Academy;