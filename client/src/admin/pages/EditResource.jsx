import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResourceForm from "../components/ResourceForm";

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/resources/${id}`)
      .then(res => res.json())
      .then(data => setResource(data.data));
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/resources/${id}`,
        {
          method: "PUT",
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
      alert("Error updating resource");
    }
  };

  if (!resource) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <ResourceForm
        initialData={resource}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
