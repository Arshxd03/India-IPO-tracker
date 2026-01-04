import { GoogleGenAI } from "@google/genai";
import { IPOData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Expanded Mock Data with requested Closed IPOs and new details
const MOCK_DATA: IPOData[] = [
  // --- ONGOING / UPCOMING ---
  {
    id: "mock-1",
    companyName: "Bharat Coking Coal Ltd",
    type: "Mainboard",
    status: "Upcoming",
    priceBand: "₹250-265",
    lotSize: 50,
    issueSize: "1200 Cr",
    openDate: "Jan 28, 2026",
    closeDate: "Jan 31, 2026",
    listingDate: "Feb 05, 2026",
    subscription: { retail: "0x", nii: "0x", qib: "0x" },
    gmp: "+₹45",
    expectedGain: "18%",
    registrar: "KFin Technologies",
    leadManager: "SBI Capital Markets"
  },
  {
    id: "mock-2",
    companyName: "Victory Electric Vehicles",
    type: "SME",
    status: "Ongoing",
    priceBand: "₹95-100",
    lotSize: 1200,
    issueSize: "45 Cr",
    openDate: "Jan 24, 2026",
    closeDate: "Jan 27, 2026",
    listingDate: "Feb 01, 2026",
    subscription: { retail: "12.5x", nii: "4.2x", qib: "1.1x" },
    gmp: "+₹80",
    expectedGain: "80%",
    registrar: "Bigshare Services",
    leadManager: "Hem Securities"
  },
  
  // --- CLOSED IPOs (Dec 2025 - Jan 2026) ---
  {
    id: "closed-1",
    companyName: "E to E Transportation",
    type: "SME",
    status: "Closed",
    priceBand: "₹72-76",
    lotSize: 1600,
    issueSize: "22 Cr",
    openDate: "Jan 10, 2026",
    closeDate: "Jan 13, 2026",
    listingDate: "Jan 18, 2026",
    subscription: { retail: "185x", nii: "98x", qib: "45x" },
    gmp: "+₹40",
    expectedGain: "52%",
    listingGain: "58%",
    listingPrice: "₹120",
    registrar: "Maashitla Securities",
    leadManager: "Beeline Capital"
  },
  {
    id: "closed-2",
    companyName: "Dhara Rail Projects",
    type: "SME",
    status: "Closed",
    priceBand: "₹102-108",
    lotSize: 1200,
    issueSize: "35 Cr",
    openDate: "Jan 08, 2026",
    closeDate: "Jan 11, 2026",
    listingDate: "Jan 16, 2026",
    subscription: { retail: "210x", nii: "150x", qib: "80x" },
    gmp: "+₹90",
    expectedGain: "83%",
    listingGain: "92%",
    listingPrice: "₹207",
    registrar: "Skyline Financial",
    leadManager: "Interactive Fin"
  },
  {
    id: "closed-3",
    companyName: "Nanta Tech",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹340-360",
    lotSize: 40,
    issueSize: "600 Cr",
    openDate: "Jan 05, 2026",
    closeDate: "Jan 08, 2026",
    listingDate: "Jan 13, 2026",
    subscription: { retail: "15x", nii: "32x", qib: "45x" },
    gmp: "+₹120",
    expectedGain: "33%",
    listingGain: "35%",
    listingPrice: "₹486",
    registrar: "Link Intime",
    leadManager: "ICICI Securities"
  },
  {
    id: "closed-4",
    companyName: "Apollo Techno Industries",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹210-225",
    lotSize: 65,
    issueSize: "450 Cr",
    openDate: "Jan 02, 2026",
    closeDate: "Jan 05, 2026",
    listingDate: "Jan 10, 2026",
    subscription: { retail: "8x", nii: "12x", qib: "20x" },
    gmp: "+₹15",
    expectedGain: "7%",
    listingGain: "12%",
    listingPrice: "₹252",
    registrar: "KFin Tech",
    leadManager: "JM Financial"
  },
  {
    id: "closed-5",
    companyName: "Bai-Kakaji Polymers",
    type: "SME",
    status: "Closed",
    priceBand: "₹55-58",
    lotSize: 2000,
    issueSize: "18 Cr",
    openDate: "Dec 28, 2025",
    closeDate: "Dec 31, 2025",
    listingDate: "Jan 05, 2026",
    subscription: { retail: "450x", nii: "320x", qib: "110x" },
    gmp: "+₹65",
    expectedGain: "112%",
    listingGain: "125%",
    listingPrice: "₹130",
    registrar: "Bigshare Services",
    leadManager: "Shreni Shares"
  },
  {
    id: "closed-6",
    companyName: "Meesho",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹320-340",
    lotSize: 45,
    issueSize: "3500 Cr",
    openDate: "Dec 26, 2025",
    closeDate: "Dec 29, 2025",
    listingDate: "Jan 03, 2026",
    subscription: { retail: "12x", nii: "45x", qib: "95x" },
    gmp: "+₹70",
    expectedGain: "20%",
    listingGain: "22%",
    listingPrice: "₹414",
    registrar: "Link Intime",
    leadManager: "Kotak Mahindra"
  },
  {
    id: "closed-7",
    companyName: "Admach Systems",
    type: "SME",
    status: "Closed",
    priceBand: "₹88-92",
    lotSize: 1200,
    issueSize: "28 Cr",
    openDate: "Dec 24, 2025",
    closeDate: "Dec 27, 2025",
    listingDate: "Jan 01, 2026",
    subscription: { retail: "120x", nii: "85x", qib: "25x" },
    gmp: "+₹25",
    expectedGain: "27%",
    listingGain: "18%",
    listingPrice: "₹108",
    registrar: "Cameo Corporate",
    leadManager: "Fedex Securities"
  },
  {
    id: "closed-8",
    companyName: "ICICI Prudential AMC",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹850-900",
    lotSize: 15,
    issueSize: "2500 Cr",
    openDate: "Dec 20, 2025",
    closeDate: "Dec 23, 2025",
    listingDate: "Dec 29, 2025",
    subscription: { retail: "35x", nii: "60x", qib: "95x" },
    gmp: "+₹200",
    expectedGain: "22%",
    listingGain: "25%",
    listingPrice: "₹1125",
    registrar: "KFin Tech",
    leadManager: "ICICI Securities"
  },
  {
    id: "closed-9",
    companyName: "Corona Remedies",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹450-480",
    lotSize: 30,
    issueSize: "1200 Cr",
    openDate: "Dec 19, 2025",
    closeDate: "Dec 22, 2025",
    listingDate: "Dec 27, 2025",
    subscription: { retail: "8x", nii: "15x", qib: "32x" },
    gmp: "+₹20",
    expectedGain: "4%",
    listingGain: "1%",
    listingPrice: "₹485",
    registrar: "Link Intime",
    leadManager: "Axis Capital"
  },
  {
    id: "closed-10",
    companyName: "TechNova Systems",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹450-480",
    lotSize: 30,
    issueSize: "800 Cr",
    openDate: "Dec 18, 2025",
    closeDate: "Dec 21, 2025",
    listingDate: "Dec 26, 2025",
    subscription: { retail: "45x", nii: "90x", qib: "120x" },
    gmp: "+₹150",
    expectedGain: "35%",
    listingGain: "42%",
    listingPrice: "₹681",
    registrar: "Bigshare Services",
    leadManager: "HDFC Bank"
  },
  {
    id: "closed-11",
    companyName: "Zenith Drugs & Pharma",
    type: "SME",
    status: "Closed",
    priceBand: "₹110-115",
    lotSize: 1000,
    issueSize: "40 Cr",
    openDate: "Dec 15, 2025",
    closeDate: "Dec 18, 2025",
    listingDate: "Dec 23, 2025",
    subscription: { retail: "85x", nii: "55x", qib: "20x" },
    gmp: "+₹30",
    expectedGain: "26%",
    listingGain: "30%",
    listingPrice: "₹149",
    registrar: "Maashitla",
    leadManager: "Unistone Capital"
  },
  {
    id: "closed-12",
    companyName: "NephroPlus",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹600-630",
    lotSize: 24,
    issueSize: "1800 Cr",
    openDate: "Dec 14, 2025",
    closeDate: "Dec 17, 2025",
    listingDate: "Dec 22, 2025",
    subscription: { retail: "5x", nii: "8x", qib: "18x" },
    gmp: "+₹0",
    expectedGain: "0%",
    listingGain: "-2%",
    listingPrice: "₹617",
    registrar: "KFin Tech",
    leadManager: "IIFL Securities"
  },
  {
    id: "closed-13",
    companyName: "Greenhitech Ventures",
    type: "SME",
    status: "Closed",
    priceBand: "₹45-50",
    lotSize: 3000,
    issueSize: "12 Cr",
    openDate: "Dec 12, 2025",
    closeDate: "Dec 15, 2025",
    listingDate: "Dec 20, 2025",
    subscription: { retail: "310x", nii: "220x", qib: "100x" },
    gmp: "+₹50",
    expectedGain: "100%",
    listingGain: "115%",
    listingPrice: "₹107",
    registrar: "Purva Sharegistry",
    leadManager: "Beeline"
  },
  {
    id: "closed-14",
    companyName: "Tata Technologies",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹500-500",
    lotSize: 30,
    issueSize: "3042 Cr",
    openDate: "Dec 10, 2025",
    closeDate: "Dec 13, 2025",
    listingDate: "Dec 18, 2025",
    subscription: { retail: "16x", nii: "62x", qib: "203x" },
    gmp: "+₹400",
    expectedGain: "80%",
    listingGain: "140%",
    listingPrice: "₹1200",
    registrar: "Link Intime",
    leadManager: "JM Financial"
  },
  {
    id: "closed-15",
    companyName: "Gandhar Oil Refinery",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹160-169",
    lotSize: 88,
    issueSize: "500 Cr",
    openDate: "Dec 05, 2025",
    closeDate: "Dec 08, 2025",
    listingDate: "Dec 13, 2025",
    subscription: { retail: "29x", nii: "64x", qib: "152x" },
    gmp: "+₹75",
    expectedGain: "44%",
    listingGain: "76%",
    listingPrice: "₹298",
    registrar: "Link Intime",
    leadManager: "Nuvama"
  },
  {
    id: "closed-16",
    companyName: "Flair Writing Industries",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹288-304",
    lotSize: 49,
    issueSize: "593 Cr",
    openDate: "Dec 01, 2025",
    closeDate: "Dec 04, 2025",
    listingDate: "Dec 09, 2025",
    subscription: { retail: "13x", nii: "35x", qib: "122x" },
    gmp: "+₹80",
    expectedGain: "26%",
    listingGain: "65%",
    listingPrice: "₹501",
    registrar: "Link Intime",
    leadManager: "Nuvama"
  },
  {
    id: "closed-17",
    companyName: "Innova Captab",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹426-448",
    lotSize: 33,
    issueSize: "570 Cr",
    openDate: "Nov 28, 2025",
    closeDate: "Dec 01, 2025",
    listingDate: "Dec 06, 2025",
    subscription: { retail: "17x", nii: "25x", qib: "116x" },
    gmp: "+₹90",
    expectedGain: "20%",
    listingGain: "22%",
    listingPrice: "₹546",
    registrar: "KFin Tech",
    leadManager: "JM Financial"
  },
  {
    id: "closed-18",
    companyName: "Azad Engineering",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹524-524",
    lotSize: 28,
    issueSize: "740 Cr",
    openDate: "Nov 25, 2025",
    closeDate: "Nov 28, 2025",
    listingDate: "Dec 03, 2025",
    subscription: { retail: "23x", nii: "90x", qib: "179x" },
    gmp: "+₹300",
    expectedGain: "57%",
    listingGain: "35%",
    listingPrice: "₹707",
    registrar: "KFin Tech",
    leadManager: "Axis Capital"
  },
  {
    id: "closed-19",
    companyName: "Happy Forgings",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹808-850",
    lotSize: 17,
    issueSize: "1000 Cr",
    openDate: "Nov 22, 2025",
    closeDate: "Nov 25, 2025",
    listingDate: "Nov 30, 2025",
    subscription: { retail: "15x", nii: "63x", qib: "214x" },
    gmp: "+₹450",
    expectedGain: "53%",
    listingGain: "55%",
    listingPrice: "₹1317",
    registrar: "Link Intime",
    leadManager: "JM Financial"
  },
  {
    id: "closed-20",
    companyName: "Credo Brands (Mufti)",
    type: "Mainboard",
    status: "Closed",
    priceBand: "₹266-280",
    lotSize: 53,
    issueSize: "550 Cr",
    openDate: "Nov 20, 2025",
    closeDate: "Nov 23, 2025",
    listingDate: "Nov 28, 2025",
    subscription: { retail: "4x", nii: "11x", qib: "22x" },
    gmp: "+₹10",
    expectedGain: "3%",
    listingGain: "0%",
    listingPrice: "₹280",
    registrar: "Link Intime",
    leadManager: "DAM Capital"
  }
];

export const fetchIPOData = async (): Promise<IPOData[]> => {
  try {
    const prompt = `
      Act as a scraper service. Fetch live IPO data for **December 2025 to January 2026** from reputable Indian financial sources like **Chittorgarh.com** or **Zerodha**.
      
      Look for the following sections to extract data:
      1. **"Recent Listings"** (for Closed IPOs)
      2. **"Current IPOs"** (for Ongoing IPOs)
      3. **"Forthcoming"** (for Upcoming IPOs)
      
      I need details for at least 25 IPOs total.
      Ensure you include companies like:
      - Meesho
      - Corona Remedies
      - NephroPlus
      - ICICI Prudential AMC
      
      Extract the following fields for each IPO:
      - Company Name
      - Type (Mainboard or SME)
      - Status (Ongoing, Upcoming, or Closed) based on current date (Jan 2026).
      - Price Band
      - Lot Size
      - Issue Size
      - Open Date, Close Date, Listing Date
      - Subscription figures (Retail, NII, QIB)
      - Grey Market Premium (GMP) and calculate Expected Gain %.
      - If Status is 'Closed', include 'listingGain' and 'listingPrice'.
      - **CRITICAL**: Include 'registrar' (e.g., Link Intime, KFin Tech) and 'leadManager' names.

      Return ONLY a VALID JSON array.
      
      The JSON objects must strictly follow this structure:
      {
        "id": "string",
        "companyName": "string",
        "type": "Mainboard" | "SME",
        "status": "Ongoing" | "Upcoming" | "Closed",
        "priceBand": "string",
        "lotSize": number,
        "issueSize": "string",
        "openDate": "string",
        "closeDate": "string",
        "listingDate": "string",
        "subscription": {
          "retail": "string",
          "nii": "string",
          "qib": "string"
        },
        "gmp": "string",
        "expectedGain": "string",
        "listingGain": "string",
        "listingPrice": "string",
        "registrar": "string",
        "leadManager": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });

    const text = response.text;
    if (!text) {
      console.warn("Gemini returned empty text, using mock data.");
      return MOCK_DATA;
    }

    // Clean up potential markdown code blocks
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data: IPOData[] = JSON.parse(cleanText);
    
    // Validate if array is empty or malformed
    if (!Array.isArray(data) || data.length === 0) {
       console.warn("Gemini returned empty array, using mock data.");
       return MOCK_DATA;
    }

    return data;

  } catch (error) {
    console.error("Error fetching IPO data via Gemini:", error);
    // Return mock data so the app doesn't break
    return MOCK_DATA;
  }
};