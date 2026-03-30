import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResources, deleteResource } from "../../services/api";
import toast from "react-hot-toast";

export default function ResourcesAdmin() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
        const data = await fetchResources();
        setResources(data);
        setLoading(false);
    } catch (err) {
        toast.error("Failed to load resources");
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;

    try {
        const res = await deleteResource(id);
        if (res.success) {
            toast.success("Resource deleted");
            setResources(prev => prev.filter(r => r._id !== id));
        }
    } catch (err) {
        toast.error("Failed to delete resource");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading resources...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Resource Library</h1>
            <p className="text-sm text-gray-500 mt-1">Manage publications, research papers, and reports</p>
        </div>
        <button
          onClick={() => navigate("/admin/resources/add")}
          className="bg-[#9A4020] hover:bg-[#80351A] text-white px-5 py-2 rounded-lg shadow-sm font-medium transition hover:cursor-pointer"
        >
          + Add New Resource
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Title & Category</th>
                        <th className="px-6 py-4 text-center">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 italic md:not-italic">
                    {resources.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic">No resources found in the library.</td>
                        </tr>
                    ) : (
                        resources.map(r => (
                            <tr key={r._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-gray-800 line-clamp-1">{r.title}</p>
                                    <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-1 inline-block">
                                        {r.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                                    {r.date || "N/A"}
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex justify-end gap-3 text-sm">
                                        <button
                                            onClick={() => navigate(`/admin/resources/edit/${r._id}`)}
                                            className="text-white bg-[#9A4020] px-3 py-1 rounded hover:opacity-80 transition hover:cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="text-red-600 font-medium hover:text-red-700 hover:cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
