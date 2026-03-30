import { useNavigate } from "react-router-dom";
import ResourceForm from "../components/ResourceForm";
import { createResource } from "../../services/api";
import toast from "react-hot-toast";

export default function AddResource() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      const res = await createResource(formData);
      if (res.success) {
        toast.success("Resource added successfully");
        navigate("/admin/resources");
      }
    } catch (err) {
      toast.error("Error adding resource");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/resources")}
            className="text-gray-500 hover:text-gray-800 transition hover:cursor-pointer"
          >
              ← Back
          </button>
          <h1 className="text-2xl font-bold">Add New Resource</h1>
      </div>
      <ResourceForm onSubmit={handleAdd} />
    </div>
  );
}
