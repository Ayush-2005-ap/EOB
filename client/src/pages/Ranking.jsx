import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../services/api";
import { Search, MapPin, Award } from "lucide-react";

export default function Rankings() {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        setRankings(data);
      } catch (err) {
        console.error("Failed to fetch rankings", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rows = rankings
    .filter((state) => {
      // Category filter
      const matchesCategory = filter === "ALL" || state.status === filter;
      // Search filter
      const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => (a.rankNumber || 999) - (b.rankNumber || 999));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E88C30]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Page Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3">
            National Assessment
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F1E3C] tracking-tight mb-4">
            Compliance Index
          </h1>
          <div className="w-16 h-1 bg-[#E88C30] mx-auto mb-6 rounded-full" />
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            State-wise performance assessment based on business reform implementation and regulatory efficiency. Updated in real-time by the EODB board.
          </p>
        </div>

        {/* Toolbar: Search + Filters */}
        <div className="space-y-6 mb-10">
          
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search states/UTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-[#0F1E3C] focus:border-transparent outline-none text-sm transition shadow-xs text-gray-700"
            />
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex justify-center gap-2 flex-wrap">
            {["ALL", "Top Performer", "Acceleration Required", "Jump-Start Needed"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    filter === type
                      ? "bg-[#0F1E3C] text-white shadow-md shadow-[#0F1E3C]/10 scale-102"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Table container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-8 py-5">State / UT</th>
                  <th className="px-8 py-5 text-center">National Rank</th>
                  <th className="px-8 py-5 text-center">Compliance Score</th>
                  <th className="px-8 py-5">Status Category</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-gray-400 italic text-sm">
                      No states found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  rows.map((state, index) => (
                    <tr
                      key={state._id}
                      onClick={() => navigate(`/rankings/${state.slug}`)}
                      className="group hover:bg-[#0F1E3C]/[0.015] cursor-pointer transition-colors"
                    >
                      {/* Name */}
                      <td className="px-8 py-5 group-hover:translate-x-1 transition-transform duration-200">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:bg-[#0F1E3C]/10 group-hover:text-[#0F1E3C] transition-colors">
                            {index + 1}
                          </span>
                          <span className="font-bold text-[#0F1E3C] text-base">{state.name}</span>
                        </div>
                      </td>

                      {/* Rank */}
                      <td className="px-8 py-5 text-center">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-[#0F1E3C] bg-[#0F1E3C]/5 px-3 py-1 rounded-lg text-sm">
                          <Award size={12} className="text-[#E88C30]" />
                          {state.rank}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-8 py-5 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-black text-lg text-[#0F1E3C]">{state.score}</span>
                          <div className="w-20 h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-[#E88C30] rounded-full"
                              style={{ width: state.score }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-8 py-5">
                        <StatusBadge status={state.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = "bg-gray-50 text-gray-400 border-gray-100 dot-gray-400";
  if (status === "Top Performer") {
    colorClass = "bg-emerald-50 text-emerald-700 border-emerald-100 dot-emerald-500";
  } else if (status === "Acceleration Required") {
    colorClass = "bg-blue-50 text-blue-700 border-blue-100 dot-blue-500";
  } else if (status === "Jump-Start Needed") {
    colorClass = "bg-red-50 text-red-700 border-red-100 dot-red-500";
  }

  const dotColor = colorClass.split(" ").find(c => c.startsWith("dot-")).replace("dot-", "bg-");

  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}
