'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Microscope, 
  FlaskConical, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  Search,
  Phone,
  Mail,
  FileText,
  Award,
  ArrowUpRight,
  Hexagon,
  Dna,
  Sparkles,
  Bot,
  FileCode,
  Loader2,
  Copy,
  Upload,
  Box,
  Play
} from 'lucide-react';

// --- STYLE INJECTION FOR FONTS & ANIMATIONS ---
const StyleInjection = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    
    :root {
      --font-heading: 'Outfit', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    
    body {
      font-family: var(--font-body);
    }
    
    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: var(--font-heading);
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    
    .glass-nav {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.7);
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
    }

    .glass-card-hover:hover {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 25px 50px -12px rgba(5, 150, 105, 0.25);
      transform: translateY(-5px);
      border-color: rgba(16, 185, 129, 0.5);
    }
    
    .mesh-bg {
      background-color: #ffffff;
      background-image: 
        radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(5, 150, 105, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(236, 253, 245, 1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(209, 250, 229, 0.4) 0px, transparent 50%);
    }

    /* Animations */
    @keyframes float-particle {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float { animation: float-particle 4s ease-in-out infinite; }
    
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }

    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

    /* Helix Loader Animations */
    @keyframes loader-orbit-1 {
      0% { transform: translateY(0px) scale(1); opacity: 1; z-index: 10; }
      25% { transform: translateY(15px) scale(0.7); opacity: 0.6; z-index: 0; }
      50% { transform: translateY(0px) scale(1); opacity: 1; z-index: 10; }
      75% { transform: translateY(-15px) scale(0.7); opacity: 0.6; z-index: 0; }
      100% { transform: translateY(0px) scale(1); opacity: 1; z-index: 10; }
    }
    
    @keyframes loader-orbit-2 {
      0% { transform: translateY(0px) scale(0.7); opacity: 0.6; z-index: 0; }
      25% { transform: translateY(-15px) scale(1); opacity: 1; z-index: 10; }
      50% { transform: translateY(0px) scale(0.7); opacity: 0.6; z-index: 0; }
      75% { transform: translateY(15px) scale(1); opacity: 1; z-index: 10; }
      100% { transform: translateY(0px) scale(1); opacity: 1; z-index: 10; }
    }

    /* Subtle Tilt Float Animation */
    @keyframes subtle-tilt-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    .animate-tilt-float {
      animation: subtle-tilt-float 6s ease-in-out infinite;
      transform-origin: center center;
    }
  `}</style>
);

// --- MOCK DATA & TRANSLATIONS ---
interface Translations {
  nav: { [key: string]: string };
  hero: {
    badge: string;
    title: string;
    titleSpan: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: {
    labs: string;
    purity: string;
    uptime: string;
    states: string;
  };
  services: {
    title: string;
    therapeutic: string;
    cosmetic: string;
    performance: string;
    custom: string;
  };
}

const translations: { [key: string]: Translations } = {
  en: {
    nav: { services: "Services", compliance: "Compliance", network: "Network", contact: "Contact" },
    hero: {
      badge: "Nationwide Research Distribution",
      title: "Molecular Precision.",
      titleSpan: "Clinical Scale.",
      subtitle: "The premier infrastructure for peptide synthesis. Supplying 99.4%+ purity compounds to 140+ elite institutions across the United States.",
      ctaPrimary: "Explore Catalog",
      ctaSecondary: "Protocol Access"
    },
    stats: {
      labs: "Partner Labs",
      purity: "HPLC Purity",
      uptime: "System Uptime",
      states: "State Coverage"
    },
    services: {
      title: "Research Vectors",
      therapeutic: "Therapeutics",
      cosmetic: "Dermal Science",
      performance: "Bio-Performance",
      custom: "Custom Synthesis"
    }
  },
  es: {
    nav: { services: "Servicios", compliance: "Cumplimiento", network: "Red", contact: "Contacto" },
    hero: {
      badge: "Distribución Nacional de Investigación",
      title: "Precisión Molecular.",
      titleSpan: "Escala Clínica.",
      subtitle: "La infraestructura principal para la síntesis de péptidos. Suministrando compuestos con 99.4%+ de pureza a más de 140 instituciones de élite.",
      ctaPrimary: "Explorar Catálogo",
      ctaSecondary: "Acceso a Protocolos"
    },
    stats: {
      labs: "Laboratorios",
      purity: "Pureza HPLC",
      uptime: "Tiempo de Sistema",
      states: "Cobertura Estatal"
    },
    services: {
      title: "Vectores de Investigación",
      therapeutic: "Terapéutica",
      cosmetic: "Ciencia Dérmica",
      performance: "Bio-Rendimiento",
      custom: "Síntesis Personalizada"
    }
  }
};

// --- PRODUCT LIST ---
const products = [
  { name: "BPC-157", code: "BP-157", cat: "Recovery", purity: "≥99%", status: "In Stock", image: "https://placehold.co/600x600/f0fdf4/059669?text=BPC-157", video: "bpc157_spin.mp4" },
  { name: "BPC-157 + TB-500", code: "BLEND-01", cat: "Recovery Blend", purity: "≥99%", status: "In Stock", image: "https://placehold.co/600x600/f0fdf4/059669?text=Blend+BPC+TB", video: null },
  { name: "GHK-Cu", code: "GHK-50", cat: "Regeneration", purity: "≥99%", status: "In Stock", image: "https://placehold.co/600x600/f0fdf4/059669?text=GHK-Cu", video: null },
  { name: "CJC-1295 (No DAC)", code: "CJC-ND", cat: "Growth", purity: "≥99%", status: "Available", image: "https://placehold.co/600x600/f0fdf4/059669?text=CJC-1295", video: null },
  { name: "CJC-1295 + Ipamorelin", code: "BLEND-02", cat: "Growth Blend", purity: "≥99%", status: "Available", image: "https://placehold.co/600x600/f0fdf4/059669?text=Blend+CJC+Ipa", video: null },
  { name: "Ipamorelin", code: "IPA-10", cat: "Growth", purity: "≥99%", status: "In Stock", image: "https://placehold.co/600x600/f0fdf4/059669?text=Ipamorelin", video: null },
  { name: "AOD-9604", code: "AOD-05", cat: "Fat Loss", purity: "≥99%", status: "Low Stock", image: "https://placehold.co/600x600/f0fdf4/059669?text=AOD-9604", video: null },
  { name: "5-Amino-1MQ", code: "5AM-10", cat: "Metabolic", purity: "≥99%", status: "Limited", image: "https://placehold.co/600x600/f0fdf4/059669?text=5-Amino-1MQ", video: null },
  { name: "GHRP-6", code: "GHRP-10", cat: "Growth", purity: "≥99%", status: "Available", image: "https://placehold.co/600x600/f0fdf4/059669?text=GHRP-6", video: null },
  { name: "Glow 70", code: "GLOW-70", cat: "Cosmetic Blend", purity: "≥99%", status: "New Arrival", image: "https://placehold.co/600x600/f0fdf4/059669?text=Glow+70", video: null },
];

// --- COMPONENT: CODED LOGO (SVG) ---
const PolyBiotechLogo = ({ className = "h-10" }: { className?: string }) => (
  <svg viewBox="0 0 300 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 20L20 30L20 50L40 60L60 50L60 30L40 20Z" stroke="#059669" strokeWidth="3" fill="url(#logo-gradient)"/>
    <path d="M40 20V60" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 30L60 50" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
    <path d="M60 30L20 50" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="4" fill="#ffffff" stroke="#059669" strokeWidth="2"/>
    <text x="80" y="52" fontFamily="sans-serif" fontWeight="800" fontSize="32" fill="#1e293b" letterSpacing="-1">POLY</text>
    <text x="175" y="52" fontFamily="sans-serif" fontWeight="300" fontSize="32" fill="#059669" letterSpacing="1">BIOTECH</text>
    <defs>
      <linearGradient id="logo-gradient" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d1fae5"/>
        <stop offset="1" stopColor="#ffffff"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- COMPONENT: HELIX GRAPHIC ---
const PeptideHelixGraphic = () => {
  const width = 800;
  const height = 500;
  const amplitude = 80;
  const frequency = 0.02;
  const points: number[] = [];
  for (let x = 0; x <= width; x += 5) { points.push(x); }

  const strand1Path = points.map(x => {
    const y = height / 2 + amplitude * Math.sin(x * frequency);
    return `${x === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const strand2Path = points.map(x => {
    const y = height / 2 + amplitude * Math.sin(x * frequency + Math.PI);
    return `${x === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-emerald-50/10">
      <svg viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          <linearGradient id="strand-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g className="opacity-10" stroke="#059669" strokeWidth="0.5">
           <line x1="0" y1="100" x2="800" y2="100" />
           <line x1="0" y1="400" x2="800" y2="400" />
           {Array.from({length: 10}).map((_, i) => (
             <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="500" strokeDasharray="5 5" />
           ))}
        </g>
        <g stroke="#10b981" strokeWidth="1" strokeOpacity="0.3">
          {points.filter((_, i) => i % 10 === 0).map((x, i) => {
            const y1 = height / 2 + amplitude * Math.sin(x * frequency);
            const y2 = height / 2 + amplitude * Math.sin(x * frequency + Math.PI);
            return <line key={i} x1={x} y1={y1} x2={x} y2={y2} className="animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />;
          })}
        </g>
        <path d={strand1Path} fill="none" stroke="url(#strand-gradient)" strokeWidth="8" strokeLinecap="round" className="drop-shadow-lg" />
        <path d={strand2Path} fill="none" stroke="url(#strand-gradient)" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.6" />
        {points.filter((_, i) => i % 12 === 0).map((x, i) => {
          const y = height / 2 + amplitude * Math.sin(x * frequency);
          return (
            <g key={`s1-${i}`} className="animate-float" style={{ animationDelay: `${i * -0.2}s` }}>
              <circle cx={x} cy={y} r="6" fill="#059669" filter="url(#glow)" />
              <circle cx={x} cy={y} r="12" fill="#059669" fillOpacity="0.15" />
            </g>
          );
        })}
        {points.filter((_, i) => i % 12 === 0).map((x, i) => {
          const y = height / 2 + amplitude * Math.sin(x * frequency + Math.PI);
          return (
            <g key={`s2-${i}`} className="animate-float" style={{ animationDelay: `${i * -0.2 + 1}s` }}>
              <circle cx={x} cy={y} r="4" fill="#10b981" />
              <circle cx={x} cy={y} r="8" fill="#10b981" fillOpacity="0.15" />
            </g>
          );
        })}
        <g transform="translate(600, 100)">
          <rect x="0" y="0" width="140" height="50" rx="12" fill="rgba(255,255,255,0.9)" stroke="#d1fae5" strokeWidth="1" />
          <circle cx="20" cy="25" r="4" fill="#059669" className="animate-ping" />
          <text x="35" y="20" className="font-heading text-[10px] font-bold fill-slate-400 uppercase tracking-wide">Structure ID</text>
          <text x="35" y="35" className="font-heading text-sm font-bold fill-emerald-900">Alpha-Helix 2B</text>
        </g>
      </svg>
    </div>
  );
};

// --- COMPONENT: HELIX LOADER ---
const HelixLoader = () => {
  return (
    <div className="flex items-center gap-1.5 h-12 justify-center py-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative flex flex-col items-center justify-center h-full w-3">
           <div 
             className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full"
             style={{ animation: `loader-orbit-1 1.5s infinite linear`, animationDelay: `${i * 0.15}s` }}
           />
           <div 
             className="absolute w-2.5 h-2.5 bg-emerald-300 rounded-full"
             style={{ animation: `loader-orbit-2 1.5s infinite linear`, animationDelay: `${i * 0.15}s` }}
           />
           <div 
              className="w-0.5 h-8 bg-emerald-200/50"
              style={{ transform: 'scaleY(0.5)' }}
           />
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT: PRODUCT CARD ---
const ProductCard = ({ product }: { product: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && product.video) {
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current && product.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
       <div className="aspect-square bg-slate-50 relative flex items-center justify-center p-6 group-hover:bg-emerald-50/30 transition-colors overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-contain drop-shadow-sm transition-all duration-500 ${isHovering && product.video ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          />
          {product.video && (
             <video 
               ref={videoRef}
               src={product.video}
               loop 
               muted 
               playsInline
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
             />
          )}
          <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-sm ${
              product.status === 'In Stock' || product.status === 'Available' 
                ? 'bg-emerald-50/90 text-emerald-700 border-emerald-200'
                : product.status === 'New Arrival'
                ? 'bg-indigo-50/90 text-indigo-700 border-indigo-200'
                : 'bg-amber-50/90 text-amber-700 border-amber-200'
            }`}>
              {product.status}
            </span>
          </div>
          {product.video && !isHovering && (
             <div className="absolute bottom-4 right-4 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm">
                <Play className="w-3 h-3 fill-white" />
             </div>
          )}
       </div>
       <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
             <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.cat}</span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{product.code}</span>
             </div>
             <h4 className="font-heading font-bold text-lg text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h4>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
             <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {product.purity}
             </div>
             <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
             </button>
          </div>
       </div>
    </div>
  );
};

// --- COMPONENT: ABSTRACT MOLECULE BACKGROUND ---
const MoleculeBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <svg className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 transform translate-x-1/3 -translate-y-1/4" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path fill="url(#grad1)" d="M45.7,-76.3C58.9,-69.3,69.1,-57.6,76.5,-44.9C83.9,-32.2,88.5,-18.5,86.7,-5.6C84.9,7.3,76.7,19.4,67.8,30.4C58.9,41.4,49.3,51.3,38.1,59.5C26.9,67.7,14.1,74.2,0.5,73.4C-13.1,72.6,-25.1,64.5,-36.6,56.3C-48.1,48.1,-59.1,39.8,-68.1,28.7C-77.1,17.6,-84.1,3.7,-82.1,-9C-80.1,-21.7,-69.1,-33.2,-57.8,-41.8C-46.5,-50.4,-34.9,-56.1,-22.9,-63.8C-10.9,-71.5,1.5,-81.2,13.4,-80.6C25.3,-80,32.5,-69.3,45.7,-76.3Z" transform="translate(100 100)" />
    </svg>
  </div>
);

type Lang = 'en' | 'es';

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  // AI Feature State
  const [aiBloodPanel, setAiBloodPanel] = useState<string>('');
  const [aiBloodFile, setAiBloodFile] = useState<File | null>(null);
  const [aiBiometrics, setAiBiometrics] = useState<string>('');
  const [aiGoal, setAiGoal] = useState<string>(''); // string only
  const [aiAdditionalInfo, setAiAdditionalInfo] = useState<string>('');
  const [aiResult, setAiResult] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(false);

  const t = translations[lang];

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HEYGEN BUBBLE INJECTION ---
  useEffect(() => {
    // avoid double-init if React remounts
    if (document.getElementById('heygen-streaming-embed')) return;

    const host = 'https://labs.heygen.com';
    const url =
      host +
      '/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJKdW5lX0hSX3B1YmxpYyIsInByZXZpZXdJ%0D%0AbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzc0NDQ3YTI3ODU5YTQ1NmM5%0D%0ANTVlMDFmMjFlZjE4MjE2XzQ1NjIwL3ByZXZpZXdfdGFsa18xLndlYnAiLCJuZWVkUmVtb3ZlQmFj%0D%0Aa2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjcwOTgwNjU3ODU5NjQ2MDdiOWJiMjg4%0D%0AMTQyZTUyMmExIiwidXNlcm5hbWUiOiJmMDFlYjBmNjRmNmU0N2M2YTIwYWM4NmVlN2FlNDQxYyJ9&inIFrame=1';

    const clientWidth = document.body.clientWidth;

    const wrapDiv = document.createElement('div');
    wrapDiv.id = 'heygen-streaming-embed';

    const container = document.createElement('div');
    container.id = 'heygen-streaming-container';

    const stylesheet = document.createElement('style');
    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        z-index: 9999;
        position: fixed;
        left: 40px;
        bottom: 40px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        transition: all linear 0.1s;
        overflow: hidden;

        opacity: 0;
        visibility: hidden;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${clientWidth < 540
          ? 'height: 266px; width: 96%; left: 50%; transform: translateX(-50%);'
          : 'height: 366px; width: calc(366px * 16 / 9);'}
        border: 0;
        border-radius: 8px;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `;

    const iframe = document.createElement('iframe');
    iframe.title = 'Streaming Embed';
    iframe.role = 'dialog';
    iframe.allow = 'microphone';
    iframe.src = url;

    let visible = false;
    let initial = false;

    const messageHandler = (e: MessageEvent) => {
      const data: any = e.data;
      if (e.origin === host && data && data.type === 'streaming-embed') {
        if (data.action === 'init') {
          initial = true;
          wrapDiv.classList.toggle('show', initial);
        } else if (data.action === 'show') {
          visible = true;
          wrapDiv.classList.toggle('expand', visible);
        } else if (data.action === 'hide') {
          visible = false;
          wrapDiv.classList.toggle('expand', visible);
        }
      }
    };

    window.addEventListener('message', messageHandler);

    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);

    return () => {
      window.removeEventListener('message', messageHandler);
      wrapDiv.remove();
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAiBloodFile(file);
      setAiBloodPanel(`[File Attached: ${file.name}]`);
    }
  };

  const removeFile = () => {
    setAiBloodFile(null);
    setAiBloodPanel('');
  };

  const analyzeHealthProfile = async () => {
    if ((!aiBloodPanel && !aiBloodFile) || !aiGoal) return;
    setIsGenerating(true);
    setAiResult('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      let panelData = aiBloodPanel;
      
      if (aiBloodFile) {
        if (panelData.includes("[File Attached")) {
           panelData = "Standard Male Hormone Panel (Simulated Extraction): Total T: 350 ng/dL, Free T: 8 ng/dL, Estradiol: 22 pg/mL, IGF-1: 110 ng/mL, Cholesterol: 210 mg/dL.";
        }
      }

      const prompt = `Act as a senior research endocrinologist at Poly Biotech. Analyze the following subject data to recommend a peptide research regimen.
      
      Subject Profile:
      - Biometrics: ${aiBiometrics}
      - Blood Panel Data: ${panelData}
      - Primary Goal: ${aiGoal.toUpperCase()}
      - Additional Context/Goals: ${aiAdditionalInfo || 'None provided'}

      Based on these parameters, recommend the top 2-3 research peptides. For each, explain:
      1. Why it fits this specific blood profile (reference specific markers if available).
      2. The mechanism of action for the stated goal.
      3. A suggested research utilization protocol (dosage/frequency).
      
      Structure the response with Markdown headers (###). Keep it professional and scientific.
      DISCLAIMER: Explicitly state this is for research purposes only, not medical advice.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        setAiResult(data.candidates[0].content.parts[0].text);
        setGenerated(true);
      } else {
        setAiResult("Analysis failed. Please try again.");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setAiResult("Connection error. Please check your network.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper to render markdown-like text safely
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold text-emerald-800 mt-4 mb-2">{line.replace('###', '')}</h3>;
      if (line.startsWith('**')) return <strong key={i} className="block mt-2 text-emerald-700">{line.replace(/\*\*/g, '')}</strong>;
      if (line.startsWith('* ') || line.startsWith('- ')) return <div key={i} className="flex items-start gap-2 ml-2 mb-1 text-slate-600 text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />{line.substring(2)}</div>;
      return <p key={i} className="text-slate-600 text-sm mb-2 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen mesh-bg font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden">
      <StyleInjection />
      <MoleculeBackground />

      {/* --- NAVIGATION (Floating Pill with 95% Transparency) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-500 ease-out ${scrolled ? 'w	full max-w-5xl glass-nav rounded-full shadow-lg py-3 px-6' : 'w-full max-w-7xl bg-transparent py-4 px-4'}`}>
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <PolyBiotechLogo className="w-auto h-10" />
            </div>

            {/* Desktop Links */}
            <div className={`hidden md:flex items-center ${scrolled ? 'space-x-1' : 'space-x-6'}`}>
              {Object.entries(t.nav).map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all hover:bg-emerald-50 hover:text-emerald-800 ${scrolled ? 'text-slate-700' : 'text-slate-800'}`}
                >
                  {label as ReactNode}
                </a>
              ))}
            </div>

            {/* Utilities */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700 px-3 py-1.5 rounded-full border border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                <Globe className="w-3 h-3" />
                {lang.toUpperCase()}
              </button>
              <button className="bg-slate-900 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-heading font-medium transition-all shadow-lg hover:shadow-emerald-300/50 hover:-translate-y-0.5 flex items-center gap-2">
                Portal <ArrowUpRight className="w-3 h-3" />
              </button>
              
              {/* Mobile Toggle */}
              <button className="md:hidden p-2 text-slate-700 bg-white/70 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-32 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6 text-center">
             {Object.entries(t.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} className="text-2xl font-heading font-medium text-slate-900" onClick={() => setIsMenuOpen(false)}>
                  {label as ReactNode}
                </a>
              ))}
          </div>
        </div>
      )}

      {/* --- HERO SECTION WITH IMAGE BACKGROUND --- */}
      <section className="relative pt-48 pb-16 lg:pt-64 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE - Using image_729364.jpg */}
        <div className="absolute inset-0 z-0">
            <img 
               src="image_729364.jpg" 
               alt="Laboratory Background" 
               className="w-full h-full object-cover opacity-10" 
            />
            {/* Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-emerald-600 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-xs font-bold text-emerald-900 tracking-wider uppercase font-heading">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[0.95] tracking-tight mb-8 font-heading">
              {t.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-500 italic font-medium">
                {t.hero.titleSpan}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mb-10 font-light">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-heading font-semibold shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                {t.hero.ctaPrimary}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/60 hover:bg-white text-slate-800 border border-white hover:border-emerald-200 rounded-2xl font-heading font-semibold backdrop-blur-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Graphic Side */}
          <div className="lg:col-span-5 relative lg:translate-x-8">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-300/40 to-teal-200/40 rounded-[2rem] blur-2xl -z-10" />
            
            <div className="glass-card rounded-[2rem] p-6 relative">
              <div className="absolute top-6 right-6 z-10">
                 <div className="bg-white/90 backdrop-blur shadow-sm rounded-full px-4 py-1.5 flex items-center gap-2 border border-emerald-100">
                   <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold font-heading text-emerald-900 tracking-wider">MOLECULAR MODEL</span>
                 </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-white/50 border border-white/60 shadow-inner">
                {/* 3D Helix Graphic */}
                <PeptideHelixGraphic />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur p-5 rounded-2xl shadow-xl border border-white max-w-[16rem]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                     <Dna className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Structure</div>
                    <div className="text-lg font-heading font-bold text-slate-900">Alpha Helix <span className="text-emerald-600 text-xs">98%</span></div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[99%] bg-emerald-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: AI RESEARCH ASSISTANT (GEMINI INTEGRATION) --- */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/50 relative border-t border-emerald-100/50 overflow-hidden">
         {/* Background details for this section */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50 to-transparent -z-10" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/20 rounded-full blur-3xl -z-10" />

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-12 gap-12">
               
               {/* Left: Tool Interface */}
               <div className="lg:col-span-7">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-slate-900">Peptide Optimization Engine</h3>
                    </div>
                 </div>

                 <div className="glass-card p-8 rounded-3xl border border-white/80 shadow-xl">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between items-end mb-1">
                              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Blood Panel / Biomarkers</label>
                              <label className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-emerald-50">
                                 <input type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={handleFileUpload} />
                                 <Upload className="w-3 h-3" /> Upload PDF/Image
                              </label>
                          </div>
                          
                          {aiBloodFile ? (
                              <div className="w-full px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between group transition-colors">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <FileText className="w-4 h-4" />
                                      </div>
                                      <div className="min-w-0">
                                          <p className="text-sm font-bold text-emerald-900 truncate">{aiBloodFile.name}</p>
                                          <p className="text-[10px] text-emerald-600 font-medium">{(aiBloodFile.size / 1024).toFixed(1)} KB • Ready for Analysis</p>
                                      </div>
                                  </div>
                                  <button onClick={removeFile} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                      <X className="w-4 h-4" />
                                  </button>
                              </div>
                          ) : (
                              <textarea 
                                 placeholder="e.g. A1C 5.7, Testosterone 450 ng/dL, CRP 3.2, High LDL..."
                                 value={aiBloodPanel}
                                 onChange={(e) => setAiBloodPanel(e.target.value)}
                                 rows={2}
                                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-800 placeholder-slate-400 resize-none"
                              />
                          )}
                       </div>

                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Biometrics (Age, Ht, Wt)</label>
                             <input 
                                type="text" 
                                placeholder="e.g. 42M, 5'11, 210lbs"
                                value={aiBiometrics}
                                onChange={(e) => setAiBiometrics(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Primary Goal</label>
                             <select 
                                value={aiGoal}
                                onChange={(e) => setAiGoal(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-800"
                             >
                                <option value="">Select Goal...</option>
                                <option value="Fat Loss & Metabolic Health">Fat Loss & Metabolic Health</option>
                                <option value="Muscle Hypertrophy">Muscle Hypertrophy</option>
                                <option value="Injury Repair & Joint Health">Injury Repair & Joint Health</option>
                                <option value="Cognitive Function">Cognitive Function</option>
                                <option value="Anti-Aging & Longevity">Anti-Aging & Longevity</option>
                             </select>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Additional Context (Optional)</label>
                          <textarea 
                             placeholder="e.g. Prefer oral administration, history of joint pain, improve sleep quality..."
                             value={aiAdditionalInfo}
                             onChange={(e) => setAiAdditionalInfo(e.target.value)}
                             rows={2}
                             className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-800 placeholder-slate-400 resize-none"
                          />
                       </div>

                       <button 
                          onClick={analyzeHealthProfile}
                          disabled={isGenerating || (!aiBloodPanel && !aiBloodFile) || !aiGoal}
                          className={`w-full py-4 rounded-xl font-heading font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg
                             ${isGenerating || (!aiBloodPanel && !aiBloodFile) || !aiGoal 
                                ? 'bg-slate-300 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:shadow-emerald-200 hover:scale-[1.01] active:scale-[0.99]'}`}
                       >
                          {isGenerating ? (
                             <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Markers...</>
                          ) : (
                             <><Dna className="w-5 h-5" /> Generate Recommendations ✨</>
                          )}
                       </button>
                    </div>
                 </div>
               </div>

               {/* Right: Output Area */}
               <div className="lg:col-span-5 flex flex-col h-full">
                  <div className={`flex-1 rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden relative transition-all duration-500 animate-tilt-float ${generated ? 'shadow-xl ring-1 ring-emerald-100' : 'opacity-80'}`}>
                     
                     {/* Output Header */}
                     <div className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-500">
                           <FileCode className="w-4 h-4" />
                           <span className="text-xs font-bold uppercase tracking-wider">AI Analysis Report</span>
                        </div>
                        {generated && (
                           <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-emerald-600">
                              <Copy className="w-4 h-4" />
                           </button>
                        )}
                     </div>

                     {/* Output Content */}
                     <div className="p-6 h-full max-h-[400px] overflow-y-auto custom-scrollbar">
                        {!generated && !isGenerating && (
                           <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                              <Bot className="w-12 h-12 opacity-20" />
                              <p className="text-sm font-medium text-center max-w-[200px]">
                                 Input subject biometrics and blood markers to generate a personalized peptide protocol.
                              </p>
                           </div>
                        )}

                        {isGenerating && (
                           <div className="h-full flex flex-col items-center justify-center text-emerald-600 space-y-4">
                              <div className="relative scale-125">
                                 {/* Helix Loader */}
                                 <HelixLoader />
                              </div>
                              <p className="text-sm font-bold animate-pulse mt-2">Cross-referencing Biomarkers...</p>
                           </div>
                        )}

                        {generated && !isGenerating && (
                           <div className="prose-sm animate-fade-in">
                              <div className="text-xs font-mono text-emerald-600 mb-4 pb-2 border-b border-emerald-100/50">
                                 {/* SUBJECT GOAL output */}
                                 // SUBJECT GOAL: {aiGoal.toUpperCase()}
                              </div>
                              {renderText(aiResult)}
                           </div>
                        )}
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-16 bg-white relative border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: t.stats.labs, val: "140+" },
                { label: t.stats.purity, val: "99.4%" },
                { label: t.stats.states, val: "50" },
                { label: "ISO Certified", val: "9001:2015" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-emerald-900 font-heading mb-2 group-hover:scale-105 transition-transform">{stat.val}</div>
                  <div className="text-xs md:text-sm text-emerald-600 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-700 font-bold tracking-wide uppercase text-sm mb-3">Capabilities</h2>
            <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">{t.services.title}</h3>
            <p className="text-slate-700">Comprehensive peptide synthesis and distribution for distinct research verticals.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.services.therapeutic, icon: FlaskConical, desc: "GLP-1 agonists and metabolic research compounds." },
              { title: t.services.cosmetic, icon: Microscope, desc: "Anti-aging and dermal regeneration pathways." },
              { title: t.services.performance, icon: Activity, desc: "Muscle recovery and athletic performance markers." },
              { title: t.services.custom, icon: Award, desc: "Bespoke synthesis for specific institutional needs." },
            ].map((service, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:bg-white transition-all group glass-card-hover cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <service.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-heading font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="flex items-center text-emerald-700 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS (Modern Grid with Images) --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-heading font-bold text-slate-900">Compound Availability</h3>
              <p className="text-slate-700 mt-2">Real-time inventory status for research accounts.</p>
            </div>
            <button className="hidden sm:flex text-emerald-800 font-medium border border-emerald-300 px-6 py-3 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm">
              Full Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
             ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-300 py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 pr-8">
              <div className="flex items-center gap-3 mb-6">
                <PolyBiotechLogo className="w-auto h-12" />
              </div>
              <p className="text-sm leading-relaxed text-slate-500 mb-6">
                Leading the industry in research peptide synthesis and distribution. 
                Dedicated to advancing scientific discovery through purity and precision.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-900/50">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-emerald-500">Operational: 24/7 Support</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-pointer"><MapPin className="w-4 h-4 text-emerald-600" /> New York, NY 10012</li>
                <li className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-pointer"><Mail className="w-4 h-4 text-emerald-600" /> research@convexpeptides.com</li>
                <li className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-pointer"><Phone className="w-4 h-4 text-emerald-600" /> +1 (555) PEPTIDE</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">COA Request Portal</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Research Terms</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping & Cold Chain</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Regulatory Disclosures</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
            <p>&copy; 2025 Poly Biotech. All rights reserved.</p>
            <div className="flex items-center gap-2 text-slate-600">
               <ShieldCheck className="w-4 h-4" />
               <span>For Research Use Only. Not for human consumption.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
