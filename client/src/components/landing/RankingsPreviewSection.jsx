import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../../services/api";
import { TrendingUp, TrendingDown, Minus, MapPin } from "lucide-react";

const STATUS_CONFIG = {
  "Top Performer": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  "Acceleration Required": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  "Jump-Start Needed": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
    dot: "bg-red-500",
  },
};

function RankingCard({ state, index }) {
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[state.status] || {
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-100",
    dot: "bg-gray-400",
  };

  const scoreNum = parseInt(state.score) || 0;

  return (
    <div
      onClick={() => navigate(`/rankings/${state.slug}`)}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] bg-[#E88C30]/8 px-2.5 py-1 rounded-full">
          #{index + 1} National
        </span>
        <MapPin size={14} className="text-gray-300 group-hover:text-[#E88C30] transition-colors" />
      </div>

      {/* State name */}
      <h3 className="text-xl font-black text-[#0F1E3C] mb-1 group-hover:text-[#E88C30] transition-colors leading-tight">
        {state.name}
      </h3>

      {/* Score bar */}
      <div className="mt-4 mb-4">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
          <span>Compliance Score</span>
          <span className="text-[#0F1E3C]">{state.score}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E88C30] rounded-full transition-all duration-700"
            style={{ width: state.score }}
          />
        </div>
      </div>

      {/* Status chip */}
      <span
        className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {state.status}
      </span>
    </div>
  );
}

export default function RankingsPreviewSection() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        // Show top 6 by rankNumber
        const sorted = [...data]
          .sort((a, b) => (a.rankNumber || 999) - (b.rankNumber || 999))
          .slice(0, 6);
        setRankings(sorted);
      } catch (err) {
        console.error("Rankings preview failed:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3">
              National Compliance Index
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F1E3C] leading-tight">
              State Rankings Preview
            </h2>
            <div className="w-12 h-[3px] bg-[#E88C30] mt-3 rounded-full" />
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            State-wise performance assessed on business reform implementation
            and regulatory efficiency.
          </p>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse h-40"
              />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Ranking data unavailable.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {rankings.map((state, i) => (
              <RankingCard key={state._id} state={state} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/ranking")}
            className="bg-[#0F1E3C] hover:bg-[#1a2f5a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 shadow-sm text-sm"
          >
            View Full Rankings Table →
          </button>
        </div>
      </div>
    </section>
  );
}
