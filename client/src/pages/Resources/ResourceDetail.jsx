import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchResourceById } from "../../services/api";
import { ArrowLeft, Calendar, FileDown, BookOpen, Clock, Download } from "lucide-react";

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
      } catch (err) {
        console.error("Failed to load publication details:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E88C30]"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-24 px-6 bg-[#FAFAFA] container max-w-xl mx-auto mt-12 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-[#0F1E3C] mb-2">Publication Not Found</h2>
        <p className="text-gray-500 mb-6">The report you are looking for might have been moved or removed.</p>
        <button
          onClick={() => navigate("/resources")}
          className="bg-[#0F1E3C] hover:bg-[#1a2f5a] text-white font-bold px-7 py-3 rounded-xl transition text-sm cursor-pointer"
        >
          Explore All Resources
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Back Link */}
        <button
          onClick={() => navigate("/resources")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0F1E3C] hover:text-[#E88C30] transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </button>

        {/* Article Card */}
        <article className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 md:p-12 overflow-hidden">
          
          {/* Category Chip */}
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#E88C30] bg-[#E88C30]/8 px-3 py-1 rounded-full mb-6">
            {resource.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-[#0F1E3C] leading-tight mb-6">
            {resource.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap gap-y-3 gap-x-6 py-4 border-y border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-8">
            {resource.date && (
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-[#E88C30]" />
                <span>{resource.date}</span>
              </div>
            )}
            {resource.source && (
              <div className="flex items-center gap-2">
                <BookOpen size={13} className="text-[#E88C30]" />
                <span>{resource.source}</span>
              </div>
            )}
            {resource.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-[#E88C30]" />
                <span>{resource.readTime}</span>
              </div>
            )}
          </div>

          {/* Featured Image (if exists) */}
          {resource.image && (
            <div className="flex justify-center mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full max-w-[200px] h-auto object-contain rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Main Content body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg font-serif">
              {resource.content}
            </div>
          </div>

          {/* PDF Download section (styled like premium resource) */}
          {resource.pdf && (
            <div className="mt-14 p-8 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0F1E3C]/10 rounded-full flex items-center justify-center mb-4">
                <FileDown size={20} className="text-[#0F1E3C]" />
              </div>
              <h3 className="text-base font-black text-[#0F1E3C] mb-1">
                Access the Full Publication
              </h3>
              <p className="text-xs text-gray-500 mb-6 max-w-xs">
                Download the complete PDF report for comprehensive maps, data tables, and analytical findings.
              </p>
              <a
                href={resource.pdf}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#E88C30] hover:bg-[#d07a20] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg text-sm cursor-pointer"
              >
                <Download size={14} />
                Download PDF Report
              </a>
            </div>
          )}

        </article>
      </div>
    </div>
  );
}
