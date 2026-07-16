import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchResourceById } from "../../services/api";

// Crisp SVG Icons (World Bank style: filled solid)
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-8zm6 14H11V5h7v12zM6.5 22H20v-2H6.5A1.5 1.5 0 0 1 5 18.5V5.5A1.5 1.5 0 0 1 6.5 4H9V2H6.5A3.5 3.5 0 0 0 3 5.5v13A3.5 3.5 0 0 0 6.5 22z"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

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
      <div className="flex justify-center items-center min-h-[450px] bg-[#F5F7FA]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-[#0071BC] animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-24 px-6 bg-[#F5F7FA] container max-w-xl mx-auto mt-12 rounded border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-[#002244] mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>Publication Not Found</h2>
        <p className="text-gray-500 mb-6">The report you are looking for might have been moved or removed.</p>
        <button
          onClick={() => navigate("/resources")}
          className="bg-[#0071BC] hover:bg-[#00538A] text-white font-bold px-7 py-3 rounded transition text-sm cursor-pointer"
        >
          Explore All Resources
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Back Link */}
        <button
          onClick={() => navigate("/resources")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#002244] hover:text-[#0071BC] transition-colors mb-8 group cursor-pointer"
        >
          <IconArrowLeft />
          Back to Library
        </button>

        {/* Article Card */}
        <article className="bg-white rounded border border-gray-200 shadow-md p-8 md:p-12 overflow-hidden">
          
          {/* Category Chip */}
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#0071BC] bg-[#0071BC]/10 px-3 py-1 rounded mb-6">
            {resource.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#002244] leading-tight mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            {resource.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap gap-y-3 gap-x-6 py-4 border-y border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">
            {resource.date && (
              <div className="flex items-center gap-2">
                <span className="text-[#0071BC]"><IconCalendar /></span>
                <span>{resource.date}</span>
              </div>
            )}
            {resource.source && (
              <div className="flex items-center gap-2">
                <span className="text-[#0071BC]"><IconBook /></span>
                <span>{resource.source}</span>
              </div>
            )}
            {resource.readTime && (
              <div className="flex items-center gap-2">
                <span className="text-[#0071BC]"><IconClock /></span>
                <span>{resource.readTime}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {resource.image && (
            <div className="flex justify-center mb-10 bg-gray-50 p-6 rounded border border-gray-200">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full max-w-[200px] h-auto object-contain rounded shadow-sm"
              />
            </div>
          )}

          {/* Main Content body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg font-serif">
              {resource.content}
            </div>
          </div>

          {/* PDF Download section */}
          {resource.pdf && (
            <div className="mt-14 p-8 bg-gray-50 border border-gray-200 rounded flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#0071BC]/10 rounded flex items-center justify-center mb-4 text-[#0071BC]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#002244] mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
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
                className="inline-flex items-center gap-2 bg-[#0071BC] hover:bg-[#00538A] text-white font-bold px-8 py-3.5 rounded transition shadow text-sm cursor-pointer"
              >
                <IconDownload />
                Download PDF Report
              </a>
            </div>
          )}

        </article>
      </div>
    </div>
  );
}
