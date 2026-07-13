import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRankings } from "../services/api";
import { statesData } from "../data/statesData";
import { ArrowLeft, Award, Percent, Info, ShieldAlert, Sparkles } from "lucide-react";

const STATUS_CONFIG = {
  "Top Performer": {
    bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dot: "bg-emerald-500",
    description: "This state demonstrates outstanding performance in regulatory simplicity and ease of starting/running a business.",
  },
  "Acceleration Required": {
    bg: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
    description: "This state has solid foundations but requires accelerated implementation of targeted business reforms.",
  },
  "Jump-Start Needed": {
    bg: "bg-red-50 text-red-700 border-red-100",
    dot: "bg-red-500",
    description: "Critical business regulatory barriers exist. Substantial and immediate policy action is required.",
  },
};

export default function StateDetails() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Try getting live rankings data first
        const data = await fetchRankings();
        const found = data.find((s) => s.slug === stateId);
        if (found) {
          setState(found);
        } else {
          // Fall back to static mock data
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
      <div className="flex justify-center items-center min-h-[450px] bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E88C30]"></div>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="text-center py-24 px-6 bg-[#FAFAFA]">
        <h2 className="text-2xl font-black text-[#0F1E3C] mb-2">State Not Found</h2>
        <p className="text-gray-500 mb-6">The requested regional ranking details could not be found.</p>
        <button
          onClick={() => navigate("/ranking")}
          className="bg-[#0F1E3C] hover:bg-[#1a2f5a] text-white font-bold px-6 py-3 rounded-xl transition text-sm"
        >
          ← Back to Rankings
        </button>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[state.status] || {
    bg: "bg-gray-50 text-gray-700 border-gray-100",
    dot: "bg-gray-400",
    description: "No description available.",
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate("/ranking")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0F1E3C] hover:text-[#E88C30] transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Rankings Index
        </button>

        {/* State Main Dashboard Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] mb-2 block">
                Regional Profile
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#0F1E3C] leading-none">
                {state.name}
              </h1>
            </div>

            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full border ${cfg.bg}`}>
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {state.status}
            </span>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            
            {/* Metric 1: National Rank */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 flex items-start gap-4 hover:shadow-xs transition">
              <div className="w-10 h-10 bg-[#E88C30]/10 rounded-xl flex items-center justify-center shrink-0">
                <Award size={20} className="text-[#E88C30]" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  National Rank
                </div>
                <div className="text-2xl font-black text-[#0F1E3C]">
                  {state.rank}
                </div>
              </div>
            </div>

            {/* Metric 2: Compliance Score */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 flex items-start gap-4 hover:shadow-xs transition">
              <div className="w-10 h-10 bg-[#0F1E3C]/10 rounded-xl flex items-center justify-center shrink-0">
                <Percent size={18} className="text-[#0F1E3C]" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Compliance Score
                </div>
                <div className="text-2xl font-black text-[#0F1E3C] mb-2">
                  {state.score}
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E88C30] rounded-full"
                    style={{ width: state.score }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: Groupings */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 flex items-start gap-4 hover:shadow-xs transition">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Info size={18} className="text-indigo-600" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Benchmark Tier
                </div>
                <div className="text-sm font-black text-[#0F1E3C] mt-1 leading-snug">
                  {state.status}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Informational Profile Info Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 md:p-10">
          <h2 className="text-xl font-black text-[#0F1E3C] mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#E88C30]" />
            Regulatory Reform Insights
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {cfg.description} This rating represents the collective state implementation of the Business Reform Action Plan (BRAP) defined by DIPP/DPIIT.
          </p>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-start gap-3">
            <ShieldAlert size={20} className="text-[#E88C30] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 leading-relaxed">
              <strong>Notice:</strong> Detailed metrics on labor law, single-window clearances, tax registrations, and utility connection timelines are updated periodically. Contact state EODB node coordinators for official BRAP compliance filing audits.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
