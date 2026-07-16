import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../../services/api";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

function RankingCard({ state, variant }) {
  const navigate = useNavigate();
  const isTop = variant === "top";

  return (
    <div
      onClick={() => navigate(`/rankings/${state.slug}`)}
      className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      style={{ borderColor: isTop ? "#d1fae5" : "#fee2e2" }}
    >
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: isTop ? "#ecfdf5" : "#fef2f2",
            color: isTop ? "#059669" : "#dc2626",
          }}
        >
          #{state.rankNumber} National
        </span>
        <MapPin
          size={14}
          className="text-gray-300 group-hover:text-[#E88C30] transition-colors"
        />
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
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: state.score,
              background: isTop
                ? "linear-gradient(to right,#10b981,#34d399)"
                : "linear-gradient(to right,#ef4444,#f87171)",
            }}
          />
        </div>
      </div>

      {/* Status chip */}
      <span
        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border"
        style={{
          background: isTop ? "#ecfdf5" : "#fef2f2",
          color: isTop ? "#059669" : "#dc2626",
          borderColor: isTop ? "#d1fae5" : "#fee2e2",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: isTop ? "#10b981" : "#ef4444" }}
        />
        {state.status}
      </span>
    </div>
  );
}

export default function RankingsPreviewSection() {
  const [top3, setTop3] = useState([]);
  const [bottom3, setBottom3] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        const sorted = [...data]
          .filter((s) => s.rankNumber)
          .sort((a, b) => a.rankNumber - b.rankNumber);

        setTop3(sorted.slice(0, 3));
        setBottom3(sorted.slice(-3));
      } catch (err) {
        console.error("Rankings preview failed:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const SkeletonRow = () => (
    <div className="grid md:grid-cols-3 gap-5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse h-40"
        />
      ))}
    </div>
  );

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

        {loading ? (
          <div className="space-y-10">
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : (
          <div className="space-y-10">

            {/* ── Top 3 ── */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-emerald-500" />
                <span className="text-sm font-black uppercase tracking-widest text-emerald-600">
                  Top Performers
                </span>
                <div className="flex-1 h-px bg-emerald-100 ml-2" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {top3.map((state) => (
                  <RankingCard key={state._id} state={state} variant="top" />
                ))}
              </div>
            </div>

            {/* ── Bottom 3 ── */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <TrendingDown size={16} className="text-red-400" />
                <span className="text-sm font-black uppercase tracking-widest text-red-500">
                  Need Acceleration
                </span>
                <div className="flex-1 h-px bg-red-100 ml-2" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {bottom3.map((state) => (
                  <RankingCard key={state._id} state={state} variant="bottom" />
                ))}
              </div>
            </div>

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
