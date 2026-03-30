import { useEffect, useState } from "react";
import { fetchRankings, updateRanking } from "../../services/api";
import toast from "react-hot-toast";

export default function ManageRankings() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
      rankNumber: "",
      score: "",
      status: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        const data = await fetchRankings();
        setRankings(data);
        setLoading(false);
    } catch (err) {
        toast.error("Failed to fetch rankings");
        setLoading(false);
    }
  };

  const handleEdit = (state) => {
      setEditing(state.slug);
      setEditForm({
          rankNumber: state.rankNumber || "",
          score: state.score || "",
          status: state.status || ""
      });
  };

  const handleUpdate = async (slug) => {
      try {
        // Build rank string e.g. "5 / 32"
        const rankStr = `${editForm.rankNumber} / ${rankings.length}`;
        const finalData = {
          ...editForm,
          rank: rankStr
        };

        const response = await updateRanking(slug, finalData);
        if (response.success) {
            toast.success("Ranking updated");
            setEditing(null);
            loadData();
        }
      } catch (err) {
          toast.error("Failed to update ranking");
      }
  };

  if (loading) return <div className="p-8">Loading rankings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage State Rankings</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">State/UT</th>
              <th className="px-6 py-3 text-center">Rank</th>
              <th className="px-6 py-3 text-center">Score (%)</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {rankings.map(state => (
              <tr key={state._id} className={editing === state.slug ? "bg-[#9A4020]/10" : "hover:bg-gray-50"}>
                <td className="px-6 py-4 font-medium">{state.name}</td>
                <td className="px-6 py-4 text-center">
                  {editing === state.slug ? (
                    <input 
                        type="number" 
                        value={editForm.rankNumber} 
                        onChange={e => setEditForm({...editForm, rankNumber: e.target.value})}
                        className="w-16 border rounded p-1 text-center"
                    />
                  ) : (
                    <span>{state.rank || state.rankNumber}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editing === state.slug ? (
                    <input 
                        value={editForm.score} 
                        onChange={e => setEditForm({...editForm, score: e.target.value})}
                        className="w-20 border rounded p-1 text-center"
                    />
                  ) : (
                    <span>{state.score}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editing === state.slug ? (
                    <select 
                        value={editForm.status} 
                        onChange={e => setEditForm({...editForm, status: e.target.value})}
                        className="border rounded p-1"
                    >
                        <option value="Top Performer">Top Performer</option>
                        <option value="Acceleration Required">Acceleration Required</option>
                        <option value="Jump-Start Needed">Jump-Start Needed</option>
                    </select>
                  ) : (
                    <StatusBadge status={state.status} />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editing === state.slug ? (
                    <div className="flex justify-end gap-2 text-xs">
                        <button 
                            onClick={() => handleUpdate(state.slug)}
                            className="bg-green-600 text-white px-3 py-1 rounded shadow hover:cursor-pointer"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => setEditing(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded shadow hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                  ) : (
                    <button 
                        onClick={() => handleEdit(state)}
                        className="text-blue-600 font-semibold hover:underline hover:cursor-pointer"
                    >
                        Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
    let colorClass = "bg-gray-100 text-gray-800";
    if (status === "Top Performer") colorClass = "bg-green-100 text-green-800";
    if (status === "Acceleration Required") colorClass = "bg-blue-100 text-blue-800";
    if (status === "Jump-Start Needed") colorClass = "bg-red-100 text-red-800";

    return (
        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${colorClass}`}>
            {status}
        </span>
    );
}
