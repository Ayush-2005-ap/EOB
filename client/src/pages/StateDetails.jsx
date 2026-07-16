import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRankings } from "../services/api";
import { statesData } from "../data/statesData";

const STATUS_CONFIG = {
  "Top Performer": {
    bg: "#ecfdf5",
    text: "#065f46",
    dot: "#10b981",
    description: "This state demonstrates outstanding performance in regulatory simplicity and ease of starting/running a business.",
  },
  "Acceleration Required": {
    bg: "#eff6ff",
    text: "#1e40af",
    dot: "#3b82f6",
    description: "This state has solid foundations but requires accelerated implementation of targeted business reforms.",
  },
  "Jump-Start Needed": {
    bg: "#fef2f2",
    text: "#991b1b",
    dot: "#ef4444",
    description: "Critical business regulatory barriers exist. Substantial and immediate policy action is required.",
  },
};

// Crisp filled SVG icons
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const IconPercent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.5 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5.5 12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm14.4-13.6-14 14 1.4 1.4 14-14-1.4-1.4z"/>
  </svg>
);

const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

export default function StateDetails() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        const found = data.find((s) => s.slug === stateId);
        if (found) {
          setState(found);
        } else {
          setState(statesData[stateId]);
        }
      } catch (err) {
        console.error("Failed to fetch live state info, using fallback data", err);
        setState(statesData[stateId]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [stateId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-[#F5F7FA]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-[#0071BC] animate-spin" />
      </div>
    );
  }

  if (!state) {
    return (
      <div className="text-center py-24 px-6 bg-[#F5F7FA] max-w-xl mx-auto mt-12 rounded border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-[#002244] mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>State Not Found</h2>
        <p className="text-gray-500 mb-6">The requested regional ranking details could not be found.</p>
        <button
          onClick={() => navigate("/ranking")}
          className="bg-[#0071BC] hover:bg-[#00538A] text-white font-bold px-6 py-3 rounded transition text-sm cursor-pointer"
        >
          ← Back to Rankings
        </button>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[state.status] || {
    bg: "#f9fafb",
    text: "#6b7280",
    dot: "#d1d5db",
    description: "No description available.",
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate("/ranking")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#002244] hover:text-[#0071BC] transition-colors mb-8 group cursor-pointer"
        >
          <IconArrowLeft />
          Back to Rankings Index
        </button>

        {/* State Main Dashboard Card */}
        <div className="bg-white rounded border border-gray-200 shadow-md p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071BC] mb-2 block">
                Regional Profile
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#002244] leading-none" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {state.name}
              </h1>
            </div>

            {/* Status badge */}
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border"
              style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.bg }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
              {state.status}
            </span>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            
            {/* Metric 1: National Rank */}
            <div className="bg-[#F5F7FA] rounded p-6 border border-gray-200 flex items-start gap-4 transition hover:border-[#0071BC]">
              <div className="w-10 h-10 bg-[#0071BC]/10 rounded flex items-center justify-center shrink-0 text-[#0071BC]">
                <IconAward />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  National Rank
                </div>
                <div className="text-2xl font-bold text-[#002244]">
                  {state.rank || `#${state.rankNumber}`}
                </div>
              </div>
            </div>

            {/* Metric 2: Compliance Score */}
            <div className="bg-[#F5F7FA] rounded p-6 border border-gray-200 flex items-start gap-4 transition hover:border-[#0071BC]">
              <div className="w-10 h-10 bg-[#0071BC]/10 rounded flex items-center justify-center shrink-0 text-[#0071BC]">
                <IconPercent />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Compliance Score
                </div>
                <div className="text-2xl font-bold text-[#002244] mb-2">
                  {state.score}
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: state.score,
                      background:
                        parseInt(state.score) >= 70 ? "#10b981" :
                        parseInt(state.score) >= 40 ? "#3b82f6" : "#ef4444",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: Groupings */}
            <div className="bg-[#F5F7FA] rounded p-6 border border-gray-200 flex items-start gap-4 transition hover:border-[#0071BC]">
              <div className="w-10 h-10 bg-[#00538A]/10 rounded flex items-center justify-center shrink-0 text-[#00538A]">
                <IconInfo />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Benchmark Tier
                </div>
                <div className="text-sm font-bold text-[#002244] mt-1 leading-snug">
                  {state.status}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Informational Profile Info Card */}
        <div className="bg-white rounded border border-gray-200 shadow-md p-8 md:p-10">
          <h2 className="text-xl font-bold text-[#002244] mb-4 flex items-center gap-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            <span className="text-[#0071BC]"><IconSparkles /></span>
            Regulatory Reform Insights
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {cfg.description} This rating represents the collective state implementation of the Business Reform Action Plan (BRAP) defined by DIPP/DPIIT.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded p-6 flex items-start gap-3">
            <span className="text-[#0071BC] shrink-0 mt-0.5"><IconAlert /></span>
            <div className="text-xs text-gray-500 leading-relaxed">
              <strong>Notice:</strong> Detailed metrics on labor law, single-window clearances, tax registrations, and utility connection timelines are updated periodically. Contact state EODB node coordinators for official BRAP compliance filing audits.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
