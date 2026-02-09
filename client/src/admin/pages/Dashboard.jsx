import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    resources: 0,
    news: 0,
    publications: 0,
  });
  const [recentResources, setRecentResources] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/resources`)
      .then(res => res.json())
      .then(data => {
        const list = data.data || [];
        setStats(prev => ({
          ...prev,
          resources: list.length,
          publications: list.filter(r => r.category === "publications").length,
        }));
        setRecentResources(list.slice(0, 5));
      });

    fetch(`${import.meta.env.VITE_API_URL}/news`)
      .then(res => res.json())
      .then(data => {
        const list = data.data || [];
        setStats(prev => ({ ...prev, news: list.length }));
        setRecentNews(list.slice(0, 5));
      });
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage resources, news and publications
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Resources" value={stats.resources} />
        <StatCard title="Total News" value={stats.news} />
        <StatCard title="Publications" value={stats.publications} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/resources/add")}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded hover:cursor-pointer"
          >
            ➕ Add Resource
          </button>

          <button
            onClick={() => navigate("/admin/news")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded hover:cursor-pointer"
          >
            📰 Manage News
          </button>
        </div>
      </div>

      {/* RECENT SECTION */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* RECENT RESOURCES */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Resources
          </h2>

          {recentResources.length === 0 && (
            <p className="text-gray-500">No resources yet.</p>
          )}

          <ul className="space-y-3">
            {recentResources.map(r => (
              <li
                key={r.id}
                className="flex justify-between items-center"
              >
                <span className="text-sm truncate">
                  {r.title}
                </span>
                <button
                  onClick={() =>
                    navigate(`/admin/resources/edit/${r.id}`)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RECENT NEWS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent News
          </h2>

          {recentNews.length === 0 && (
            <p className="text-gray-500">No news yet.</p>
          )}

          <ul className="space-y-3">
            {recentNews.map(n => (
              <li
                key={n.id}
                className="flex justify-between items-center"
              >
                <span className="text-sm truncate">
                  {n.title}
                </span>
                <button
                  onClick={() =>
                    navigate(`/admin/news`)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Card ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}
