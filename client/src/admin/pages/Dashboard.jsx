import { useEffect, useState } from "react";
import { fetchResources, fetchRankings } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    resources: 0,
    states: 0,
    publications: 0,
  });
  const [recentResources, setRecentResources] = useState([]);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        try {
            const resData = await fetchResources();
            setStats(prev => ({
                ...prev,
                resources: resData.length,
                publications: resData.filter(r => r.category === "publications").length,
            }));
            setRecentResources(resData.slice(0, 5));

            const rankData = await fetchRankings();
            setStats(prev => ({ ...prev, states: rankData.length }));
            setRankings(rankData.slice(0, 5));
        } catch (err) {
            console.error(err);
        }
    };
    loadData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage state rankings and resource library</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Resources" value={stats.resources} color="border-blue-500" />
        <StatCard title="States Tracked" value={stats.states} color="border-green-500" />
        <StatCard title="Publications" value={stats.publications} color="border-purple-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Resources</h2>
            <button 
              onClick={() => navigate("/admin/resources")}
              className="text-[#9A4020] text-sm font-medium hover:underline hover:cursor-pointer"
            >
              View All
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {recentResources.map(r => (
              <li key={r._id} className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 truncate max-w-[250px]">{r.title}</span>
                <span className="text-xs text-gray-400 uppercase">{r.category}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">State Rankings</h2>
            <button 
                onClick={() => navigate("/admin/rankings")}
                className="text-[#9A4020] text-sm font-medium hover:underline hover:cursor-pointer"
            >
                Update Rankings
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {rankings.map(s => (
              <li key={s._id} className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{s.name}</span>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded">Rank: {s.rankNumber}</span>
                    <span className="text-xs text-gray-500">{s.score}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} p-6`}>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-gray-800">{value}</h3>
    </div>
  );
}
