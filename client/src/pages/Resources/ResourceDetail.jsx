import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchResourceById } from "../../services/api";

export default function ResourceDetail() {
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
            console.error(err);
            setLoading(false);
        }
    };
    load();
  }, [id]);

  if (loading) return (
      <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A4020]"></div>
      </div>
  );

  if (!resource) {
    return (
      <div className="text-center py-24 px-4 bg-gray-50 rounded-2xl mx-auto container mt-12">
        <h2 className="text-3xl font-bold text-gray-800">Resource not found</h2>
        <p className="text-gray-500 mt-2">The publication you are looking for might have been moved or removed.</p>
        <button
          onClick={() => navigate("/resources")}
          className="mt-8 bg-[#9A4020] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition hover:cursor-pointer"
        >
          Explore All Resources
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-14 max-w-4xl">
            {/* BACK */}
            <button
                onClick={() => navigate(-1)}
                className="text-[#9A4020] font-semibold flex items-center gap-2 mb-10 hover:translate-x-[-4px] transition-transform hover:cursor-pointer"
            >
                ← Back to Resources
            </button>

            <article>
                {/* PUBLICATION IMAGE */}
                {resource.image && (
                    <div className="flex justify-center mb-12">
                        <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-[240px] h-auto object-cover rounded-xl border shadow-2xl ring-4 ring-gray-50"
                        />
                    </div>
                )}

                {/* HEADER */}
                <div className="space-y-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-[#9A4020]/10 text-[#9A4020] px-3 py-1 rounded-full">
                        {resource.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        {resource.title}
                    </h1>

                    {/* META */}
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium py-4 border-y border-gray-100">
                        {resource.date && <div className="flex items-center gap-2"><span>📅</span> {resource.date}</div>}
                        {resource.source && <div className="flex items-center gap-2"><span>🏛</span> {resource.source}</div>}
                        {resource.readTime && <div className="flex items-center gap-2"><span>⏱</span> {resource.readTime}</div>}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="mt-12 prose prose-lg max-w-none">
                    <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg md:text-xl font-serif">
                        {resource.content}
                    </div>
                </div>

                {/* DOWNLOAD */}
                {resource.pdf && (
                    <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Access the full publication</h3>
                        <p className="text-sm text-gray-500 mb-6 max-w-md">Download the complete PDF report for detailed insights and data analysis.</p>
                        <a
                            href={resource.pdf}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 bg-[#9A4020] hover:bg-[#80351A] hover:cursor-pointer text-white px-10 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-xl shadow-[#9A4020]/20"
                        >
                            <span className="text-xl">⬇</span> Download PDF Report
                        </a>
                    </div>
                )}
            </article>
        </div>
    </div>
  );
}
