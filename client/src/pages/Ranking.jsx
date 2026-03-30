import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../services/api";

export default function Rankings() {
  const [filter, setFilter] = useState("ALL");
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
        try {
            const data = await fetchRankings();
            setRankings(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch rankings", err);
            setLoading(false);
        }
    };
    load();
  }, []);

  const rows = rankings
    .filter((state) => {
      if (filter === "ALL") return true;
      return state.status === filter;
    })
    .sort((a, b) => (a.rankNumber || 999) - (b.rankNumber || 999));

  if (loading) return (
      <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A4020]"></div>
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">NATIONAL COMPLIANCE INDEX</h1>
        <p className="text-gray-500 text-lg">State-wise performance assessment based on business reform implementation and regulatory efficiency. Updated in real-time by the EODB board.</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {["ALL", "Top Performer", "Acceleration Required", "Jump-Start Needed"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:cursor-pointer transition-all duration-300 ${
                filter === type
                  ? "bg-[#9A4020] text-white shadow-lg shadow-[#9A4020]/20 scale-105"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-5">State / UT</th>
                <th className="px-8 py-5 text-center">National Rank</th>
                <th className="px-8 py-5 text-center">Compliance Score</th>
                <th className="px-8 py-5">Status Category</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
                {rows.map((state, index) => (
                <tr
                    key={state._id}
                    onClick={() => navigate(`/rankings/${state.slug}`)}
                    className="group hover:bg-[#9A4020]/[0.02] cursor-pointer transition-colors"
                >
                    <td className="px-8 py-5 group-hover:translate-x-1 transition-transform">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:bg-[#9A4020]/10 group-hover:text-[#9A4020]">
                                {index + 1}
                            </span>
                            <span className="font-bold text-gray-800 text-lg">{state.name}</span>
                        </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                        <span className="font-mono font-bold text-[#9A4020] bg-[#9A4020]/5 px-3 py-1 rounded">
                            {state.rank}
                        </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl text-gray-900">{state.score}</span>
                            <div className="w-20 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                <div 
                                    className="h-full bg-green-500" 
                                    style={{ width: state.score }}
                                ></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-8 py-5">
                        <StatusBadge status={state.status} />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
    let colorClass = "bg-gray-50 text-gray-400 border-gray-100";
    if (status === "Top Performer") colorClass = "bg-green-50 text-green-600 border-green-100";
    if (status === "Acceleration Required") colorClass = "bg-blue-50 text-blue-600 border-blue-100";
    if (status === "Jump-Start Needed") colorClass = "bg-red-50 text-red-600 border-red-100";

    return (
        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${colorClass}`}>
            {status}
        </span>
    );
}
