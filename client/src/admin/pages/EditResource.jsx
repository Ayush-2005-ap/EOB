import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResourceForm from "../components/ResourceForm";
import { fetchResourceById, updateResource } from "../../services/api";
import toast from "react-hot-toast";

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        try {
            const data = await fetchResourceById(id);
            setResource(data);
            setLoading(false);
        } catch (err) {
            toast.error("Resource not found");
            setLoading(false);
        }
    };
    load();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const res = await updateResource(id, formData);
      if (res.success) {
        toast.success("Resource updated successfully");
        navigate("/admin/resources");
      }
    } catch (err) {
      toast.error("Error updating resource");
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 italic">Loading resource details...</div>;
  if (!resource) return <div className="p-8 text-center text-red-500">Resource not found.</div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/resources")}
            className="text-gray-500 hover:text-gray-800 transition hover:cursor-pointer"
          >
              ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit {resource.title}</h1>
      </div>
      <ResourceForm
        initialData={resource}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
