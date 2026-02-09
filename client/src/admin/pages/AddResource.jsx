import { useNavigate } from "react-router-dom";
import ResourceForm from "../components/ResourceForm";

export default function AddResource() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/resources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer admin-secret-token",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed");

      navigate("/admin/resources");
    } catch (err) {
      alert("Error adding resource");
    }
  };

  return (
    <div className="p-8">
      <ResourceForm onSubmit={handleAdd} />
    </div>
  );
}
