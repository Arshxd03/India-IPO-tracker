import React from 'react';
import { StaticAcademyData, QuizQuestion, GlossaryItem } from './types';

export const GLOSSARY_DATA: GlossaryItem[] = [
  { 
    term: "ASBA", 
    definition: "Applications Supported by Blocked Amount. A process where the application money remains in your bank account but is 'blocked' or frozen until shares are allotted to you. It prevents money from leaving your account unless you get the shares." 
  },
  { 
    term: "DRHP", 
    definition: "Draft Red Herring Prospectus. A preliminary registration document filed by the company with SEBI. It acts as a bio/blueprint containing financial data, future plans, risks, and business operations." 
  },
  { 
    term: "GMP", 
    definition: "Grey Market Premium. The extra amount (premium) over the issue price that investors are willing to pay for IPO shares in the unofficial 'Grey Market' before listing. It indicates market sentiment." 
  },
  { 
    term: "Lot Size", 
    definition: "The minimum number of shares an investor must apply for in an IPO. You cannot buy 1 share; you must bid for at least 1 lot (e.g., 1 lot = 50 shares)." 
  },
  { 
    term: "Cut-off Price", 
    definition: "The price within the price band at which the company decides to issue shares to investors. Retail investors usually bid at this price to maximize their chances of allotment." 
  },
  { 
    term: "Price Band", 
    definition: "The price range (Lower Limit to Upper Limit) set by the company within which investors can bid for shares. For example, ₹100 - ₹120." 
  },
  { 
    term: "RHP", 
    definition: "Red Herring Prospectus. The final version of the prospectus filed with the Registrar of Companies (ROC) containing the final issue dates and price band information." 
  },
  { 
    term: "Listing Gains", 
    definition: "The profit made by an investor if the stock lists on the exchange at a price higher than the issue price. E.g., Issued at ₹100, Listed at ₹150 = 50% Listing Gain." 
  },
  { 
    term: "Oversubscription", 
    definition: "When the total number of shares applied for by investors is greater than the total number of shares available in the IPO. This leads to a lottery-based allotment for retail investors." 
  },
  { 
    term: "Face Value", 
    definition: "The nominal value of the share as entered in the company's books. It is distinct from the market value and is used to calculate dividends." 
  },
  { 
    term: "Anchor Investor", 
    definition: "Institutional investors (like mutual funds) who are invited to subscribe to shares a day before the IPO opens to the public, helping to build market confidence." 
  },
  { 
    term: "Upper Circuit", 
    definition: "The maximum percentage limit (usually 5%, 10%, or 20%) by which a stock price can rise in a single trading day before trading is halted." 
  }
];

export const ACADEMY_DATA: StaticAcademyData = {
  timeline: [
    { year: '1875', title: 'Birth of BSE', description: 'The Native Share & Stock Brokers Association (now BSE) was established under a Banyan tree.' },
    { year: '1991', title: 'Liberalization', description: 'India opened its economy, leading to a massive influx of foreign investment and modernizing markets.' },
    { year: '1992', title: 'SEBI & Reforms', description: 'SEBI became a statutory body. The Harshad Mehta scam triggered strict regulations to protect investors.' },
    { year: '1994', title: 'NSE Launch', description: 'National Stock Exchange launched, introducing electronic screen-based trading to India.' },
  ],
  marketEvolution: [
    { stage: 'The Paper Era', description: 'Physical share certificates, manual transfer deeds, and risk of theft or damage.' },
    { stage: 'The Demat Era', description: 'Introduction of NSDL/CDSL. Shares became electronic entries.' },
    { stage: 'Settlement Cycles', description: 'Moved from T+5 to T+2, then T+1, and now T+0 (Instant Settlement) in 2026.' }
  ],
  learningSections: [
    {
      id: 'trading-basics',
      title: 'Trading Basics',
      description: 'Understand the fundamental structure of the stock market and how trading works.',
      topics: [
        { 
          title: 'Market Structure', 
          content: 'The Primary Market is for new securities (IPOs), while the Secondary Market (NSE/BSE) is where existing shares are traded.',
          icon: 'Globe'
        },
        { 
          title: 'Bull vs Bear', 
          content: 'A "Bull Market" signifies rising prices and optimism, while a "Bear Market" indicates falling prices (>20%) and pessimism.',
          icon: 'TrendingUp'
        },
        { 
          title: 'Financial Instruments', 
          content: 'Key instruments include Equity (Ownership), Derivatives (F&O for hedging), and Bonds (Debt securities).',
          icon: 'PieChart'
        }
      ]
    },
    {
      id: 'investment-strategies',
      title: 'Investment Strategies',
      description: 'Explore different approaches to growing wealth in the financial markets.',
      topics: [
        { 
          title: 'Long-term Investing', 
          content: 'Buying and holding quality stocks for years to build wealth through the power of compounding.',
          icon: 'BookOpen'
        },
        { 
          title: 'Swing Trading', 
          content: 'Holding stocks for a few days or weeks to capture gains from expected upward price shifts.',
          icon: 'Activity'
        },
        { 
          title: 'Mutual Funds', 
          content: 'Pooled money managed by professionals. SIPs (Systematic Investment Plans) are popular for disciplined investing.',
          icon: 'Layers'
        }
      ]
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Tools and metrics to evaluate the health and potential of stocks.',
      topics: [
        { 
          title: 'Valuation Metrics', 
          content: 'P/E Ratio (Price-to-Earnings) and EPS (Earnings Per Share) help determine if a stock is overvalued or undervalued.',
          icon: 'BarChart'
        },
        { 
          title: 'Key Indices', 
          content: 'NIFTY 50 tracks the top 50 companies on NSE, while SENSEX tracks the top 30 on BSE. They reflect overall market health.',
          icon: 'TrendingUp'
        },
        { 
          title: 'Red Flags', 
          content: 'Watch out for declining revenue, high debt-to-equity ratios, or promoter pledging, which signal financial distress.',
          icon: 'AlertTriangle'
        }
      ]
    },
    {
      id: 'ipo-lifecycle',
      title: 'IPO Lifecycle',
      description: 'The complete journey of a company going public, from DRHP to Listing.',
      topics: [
        { 
          title: 'What is an IPO?', 
          content: 'An Initial Public Offering transforms a Private Limited company into a Public Limited entity to raise capital.',
          icon: 'BookOpen'
        },
        { 
          title: 'The Process', 
          content: 'It starts with filing a DRHP with SEBI, followed by roadshows, price band fixing, public bidding, and finally listing.',
          icon: 'Activity'
        },
        { 
          title: 'Listing Day', 
          content: 'Shares debut on the exchange. "Listing Gains" refer to the profit made if the opening price is higher than the issue price.',
          icon: 'Zap'
        }
      ]
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What does 'GMP' stand for in the IPO market?",
    options: ["General Market Price", "Grey Market Premium", "Gross Margin Percentage", "Global Market Position"],
    correctAnswer: 1,
    explanation: "Grey Market Premium (GMP) is the unofficial premium at which IPO shares are traded before they list on the stock exchange.",
    difficulty: "Basic"
  },
  {
    id: 2,
    question: "Who is a 'QIB' in an IPO subscription?",
    options: ["Quick Investment Banker", "Qualified Institutional Buyer", "Quality Index Broker", "Quota Individual Buyer"],
    correctAnswer: 1,
    explanation: "QIBs are institutional investors like mutual funds and banks who generally invest large amounts.",
    difficulty: "Basic"
  },
  {
    id: 3,
    question: "Which regulatory body approves IPOs in India?",
    options: ["RBI", "NSE", "SEBI", "BSE"],
    correctAnswer: 2,
    explanation: "The Securities and Exchange Board of India (SEBI) is the regulator that approves IPO Draft Red Herring Prospectus (DRHP).",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    question: "What is the 'Lot Size'?",
    options: ["Total shares issued", "Minimum number of shares to bid", "Market capitalization", "Price of one share"],
    correctAnswer: 1,
    explanation: "Investors cannot buy single shares in an IPO; they must bid for a minimum fixed number of shares known as a 'Lot'.",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "If an IPO is oversubscribed 100x, what happens?",
    options: ["Everyone gets shares", "Lottery system is used", "Price increases", "IPO is cancelled"],
    correctAnswer: 1,
    explanation: "For Retail investors, allotment is done via a computerized lottery system when demand exceeds supply.",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    question: "What is an ASBA application?",
    options: ["Account Supported by Blocked Amount", "All Share Buyback Agreement", "Automated Stock Buying Agent", "Application for Secondary Bond Allocation"],
    correctAnswer: 0,
    explanation: "ASBA ensures money leaves your bank account only if you get the allotment.",
    difficulty: "Expert"
  },
  {
    id: 7,
    question: "Which ratio helps determine if an IPO is expensive?",
    options: ["Debt-to-Equity", "P/E Ratio", "Current Ratio", "ROE"],
    correctAnswer: 1,
    explanation: "The Price-to-Earnings (P/E) ratio compares the share price to the company's earnings per share.",
    difficulty: "Basic"
  },
  {
    id: 8,
    question: "What is a 'Red Herring Prospectus'?",
    options: ["A warning letter", "A preliminary registration document", "A rejection letter", "A marketing brochure"],
    correctAnswer: 1,
    explanation: "The DRHP or RHP contains details about the company's business, finances, and risks, filed with SEBI.",
    difficulty: "Expert"
  },
  {
    id: 9,
    question: "What is the 'Anchor Investor' portion?",
    options: ["Investors who buy after listing", "Institutional investors who invest before the IPO opens", "Founders of the company", "Retail investors"],
    correctAnswer: 1,
    explanation: "Anchor investors are QIBs who invest a day before the IPO opens to generate confidence in the issue.",
    difficulty: "Expert"
  },
  {
    id: 10,
    question: "What does listing at a 'Discount' mean?",
    options: ["Listing price < Issue price", "Listing price > Issue price", "Listing price = Issue price", "Shares are free"],
    correctAnswer: 0,
    explanation: "Listing at a discount means the market price on opening day is lower than what investors paid during the IPO.",
    difficulty: "Basic"
  }
];

export const LOADING_TIPS = [
  "Tip: Always read the RHP (Red Herring Prospectus) 'Risk Factors' section before investing.",
  "Did you know? The first ever IPO was by the Dutch East India Company in 1602.",
  "Tip: Don't just follow the GMP; it can be manipulated. Look at fundamentals.",
  "Fact: SEBI was given statutory powers on January 30, 1992.",
  "Tip: For long-term listing gains, check the QIB subscription figures on Day 3.",
  "Tip: Never borrow money to invest in an IPO.",
];