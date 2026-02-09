import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import resourcesData from "../../data/resourcesData";

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // FIND RESOURCE FROM DUMMY DATA
  const resource = useMemo(() => {
    return resourcesData.find((r) => String(r.id) === String(id));
  }, [id]);

  // NOT FOUND
  if (!resource) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Resource not found</h2>
        <button
          onClick={() => navigate("/resources")}
          className="mt-6 text-red-600 underline hover:cursor-pointer"
        >
          Go back to Resources
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-14 max-w-4xl">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-red-600 font-semibold mb-6 hover:underline hover:cursor-pointer"
      >
        ← Back to Resources
      </button>

      {/* PUBLICATION IMAGE */}
      {resource.image && (
        <div className="flex justify-center mb-10">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-[210px] h-[297px] object-cover rounded-md border shadow"
          />
        </div>
      )}

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-900">
        {resource.title}
      </h1>

      {/* META */}
      <div className="mt-3 text-sm text-gray-500 flex gap-4 flex-wrap">
        {resource.date && <span>📅 {resource.date}</span>}
        {resource.source && <span>🏛 {resource.source}</span>}
        {resource.readTime && <span>⏱ {resource.readTime}</span>}
      </div>

      {/* CONTENT */}
      <div className="mt-8 text-gray-800 leading-relaxed whitespace-pre-line">
        {resource.content}
      </div>

      {/* DOWNLOAD */}
      {resource.pdf && (
        <div className="mt-12">
          <a
            href={resource.pdf}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ⬇ Download Full Report (PDF)
          </a>
        </div>
      )}
    </div>
  );
}
