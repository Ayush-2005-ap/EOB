import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../../services/api";

const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#0071BC]">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconTrendingDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#DF3416]">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>
);

function RankingCard({ state, variant }) {
  const navigate = useNavigate();
  const isTop = variant === "top";
  
  // World Bank primary blue (#0071BC) vs World Bank accent red (#DF3416)
  const themeColor = isTop ? "#0071BC" : "#DF3416";
  const themeBg = isTop ? "#0071BC12" : "#DF341612"; // ~7% opacity

  return (
    <div
      onClick={() => navigate(`/rankings/${state.slug}`)}
      className="bg-white border border-gray-200 rounded p-6 hover:border-[#0071BC] hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
          style={{ background: themeBg, color: themeColor }}
        >
          #{state.rankNumber} National
        </span>
      </div>

      {/* State name */}
      <h3 className="text-lg font-bold text-[#002244] mb-1 group-hover:text-[#0071BC] transition-colors leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {state.name}
      </h3>

      {/* Score bar */}
      <div className="mt-4 mb-4">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
          <span>Compliance Score</span>
          <span className="text-[#002244] font-semibold">{state.score}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded overflow-hidden">
          <div
            className="h-full rounded transition-all duration-700"
            style={{ width: state.score, background: themeColor }}
          />
        </div>
      </div>

      {/* Status chip */}
      <span
        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border"
        style={{ background: themeBg, color: themeColor, borderColor: "transparent" }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: themeColor }} />
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
          className="bg-white rounded p-6 border border-gray-200 animate-pulse h-40"
        />
      ))}
    </div>
  );

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-0.5 bg-[#0071BC]" />
              <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
                National Compliance Index
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002244] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              State Rankings Preview
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            State-wise performance assessed on business reform implementation and regulatory efficiency.
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
                <IconTrendingUp />
                <span className="text-sm font-bold uppercase tracking-widest text-[#0071BC]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Top Performers
                </span>
                <div className="flex-1 h-px bg-[#0071BC]/20 ml-2" />
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
                <IconTrendingDown />
                <span className="text-sm font-bold uppercase tracking-widest text-[#DF3416]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Need Acceleration
                </span>
                <div className="flex-1 h-px bg-[#DF3416]/20 ml-2" />
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
            className="bg-[#0071BC] hover:bg-[#00538A] text-white font-bold px-8 py-3.5 rounded transition-colors duration-200 shadow-sm text-sm"
          >
            View Full Rankings Table →
          </button>
        </div>
      </div>
    </section>
  );
}
