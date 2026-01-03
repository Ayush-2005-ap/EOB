import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { statesData } from "../data/statesData";

export default function Rankings() {
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  const rows = Object.values(statesData)
    .filter((state) => {
      if (filter === "ALL") return true;
      return state.status === filter;
    })
    .sort((a, b) => {
      const rankA = parseInt(a.rank);
      const rankB = parseInt(b.rank);

      if (isNaN(rankA)) return 1;
      if (isNaN(rankB)) return -1;
      return rankA - rankB;
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        India & State Rankings
      </h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap ">
        {["ALL", "Top Performer", "Acceleration Required", "Jump-Start Needed"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold hover:cursor-pointer transition ${
                filter === type
                  ? "bg-red-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-red-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">State / UT</th>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Score</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((state, index) => (
              <tr
                key={index}
                onClick={() =>
                  navigate(
                    `/rankings/${state.name
                      .toLowerCase()
                      .replace(/\s+/g, "_")}`
                  )
                }
                className="border-t hover:bg-gray-100 cursor-pointer transition"
              >
                <td className="px-4 py-3 font-medium">
                  {state.name}
                </td>
                <td className="px-4 py-3">
                  {state.rank}
                </td>
                <td className="px-4 py-3">
                  {state.score}
                </td>
                <td className="px-4 py-3">
                  {state.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
