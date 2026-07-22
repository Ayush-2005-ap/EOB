import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// --- Subcomponents ---

function AnimatedCounter({ end, duration = 1200, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    let frameId;
    let startTime;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const easePercent = 1 - Math.pow(1 - percent, 3); // ease-out cubic
      setCount(Math.floor(easePercent * end));
      
      if (percent < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        startTime = null;
        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      }
    };

    observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (observer) observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StatBadge({ end, suffix, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex flex-col items-center shadow-xl pointer-events-none">
      <div className="text-[#C8793F] text-3xl font-black leading-none mb-1">
        <AnimatedCounter end={end} suffix={suffix} />
      </div>
      <div className="text-white/80 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function RankingTicker() {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    fetch('/EoOS_Index_Rankings.csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1).filter(r => r.trim());
        const data = rows.map(row => {
          // Columns up to index 4 are safe from commas inside quotes
          const cols = row.split(',');
          return { state: cols[1], score: parseFloat(cols[4]).toFixed(1) };
        });
        setTickerData(data);
      })
      .catch(console.error);
  }, []);

  if (tickerData.length === 0) return null;

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-4 z-40 bg-[#001833]/90 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden hidden md:block w-48 shadow-2xl pointer-events-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/20 flex items-center gap-2 bg-black/30">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0"></div>
        <span className="text-xs font-bold text-white/90 tracking-wider uppercase">Live Rankings</span>
      </div>
      {/* Ticker Window */}
      <div className="h-[160px] overflow-hidden relative">
        <div className="animate-ticker flex flex-col">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2.5 text-sm border-b border-white/5">
              <span className="text-white/80">{item.state}</span>
              <span className="text-[#C8793F] font-bold">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Section ---

export default function EoosGlimpseSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] flex flex-col md:block border-y border-gray-200">
      
      {/* Right Column Content (Constrained by container on desktop) */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="md:w-1/2 ml-auto py-16 md:py-28 md:pl-12 lg:pl-16 flex flex-col justify-center text-right">
          
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              A CCS Research Initiative
            </span>
          </div>

          {/* Headline */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002244] leading-[1.15] mb-6"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Ranking India's States on{" "}
            <span className="text-[#C8793F]">Ease of Operating Schools</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-lg ml-auto">
            A Comparative Assessment of <br />School Regulatory Frameworks <br />Across Indian States
          </p>

          {/* Divider */}
          <div className="w-16 h-[2px] bg-gray-300 mb-8 ml-auto"></div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-end relative z-50">
            <a 
              href="https://studentfirst.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0071BC] hover:text-[#C8793F] font-bold text-sm tracking-wide transition-colors group cursor-pointer"
            >
              Explore the Index 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://studentfirst.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0071BC] hover:text-[#C8793F] font-bold text-sm tracking-wide transition-colors group cursor-pointer"
            >
              Download the Report 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      {/* Left Column Visual (Full bleed) */}
      <a 
        href="https://studentfirst.in/"
        target="_blank" 
        rel="noopener noreferrer"
        className="block md:absolute md:top-0 md:left-0 w-full md:w-1/2 h-80 md:h-full bg-[#002244] transition-colors group cursor-pointer overflow-hidden"
        aria-label="Visit Ease of Operating Schools website"
      >
        {/* Navy Hover Background Overlay */}
        <div className="absolute inset-0 bg-[#001833] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* 3D Container */}
        <div 
          className="relative flex items-center justify-center w-full h-full p-8 md:p-12 z-10"
          style={{ perspective: "800px" }}
        >
          <RankingTicker />

          {/* Floating badges vertically on the left center */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 flex flex-col gap-4 z-30 hidden sm:flex">
             <StatBadge end={32} suffix="" label="States Indexed" />
             <StatBadge end={72} suffix="%" label="Avg. Compliance" />
          </div>

          {/* Wrapper doing the Z rotation */}
          <div className="relative book-wrapper z-20 inline-block shrink-0">
            {/* The page behind the cover */}
            <div className="book-page absolute inset-0 rounded-r-[16px] rounded-l-[5px] shadow-[0_0_5px_1.5px_rgba(0,0,0,0.25)] z-0 overflow-hidden bg-[#001833]">
               {/* Inner page image */}
               <img 
                 src="/firstpage.png" 
                 alt="Inner Page" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Image doing the Y tilt */}
            <img 
              src="/cover.png" 
              alt="Ease of Operating Schools - Front Cover" 
              className="book-cover relative h-full max-h-64 md:max-h-80 lg:max-h-96 object-contain z-10 rounded-r-[15px] rounded-l-[5px]" 
            />
          </div>
        </div>
      </a>

      {/* Custom Styles for Animations & 3D */}
      <style>{`
        .book-wrapper {
          transform: rotateZ(0deg);
          transition: transform 0.4s ease-in-out;
          transform-origin: left center 0px;
        }
        .group:hover .book-wrapper {
          transform: rotateZ(-8deg);
        }
        .book-cover {
          transform: rotateY(0deg);
          transform-origin: left center 0px;
          transition: transform 0.5s linear, box-shadow 0.5s linear;
          transform-style: preserve-3d;
        }
        .group:hover .book-cover {
          transform: rotateY(-40deg);
          box-shadow: 20px 10px 50px rgba(0,0,0,0.4);
          z-index: 999;
        }
        @keyframes ticker {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
