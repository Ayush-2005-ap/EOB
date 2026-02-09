import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResourcesAdmin() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/resources`)
      .then(res => res.json())
      .then(data => setResources(data.data));
  }, []);

  const deleteResource = async (id) => {
    if (!confirm("Delete this resource?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/resources/${id}`, {
      method: "DELETE",
    });

    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        <button
          onClick={() => navigate("/admin/resources/add")}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          + Add Resource
        </button>
      </div>

      <div className="bg-white rounded shadow">
        {resources.map(r => (
          <div
            key={r.id}
            className="flex justify-between items-center border-b p-4"
          >
            <div>
              <p className="font-semibold">{r.title}</p>
              <p className="text-sm text-gray-500">{r.category}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/admin/resources/edit/${r.id}`)
                }
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteResource(r.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
