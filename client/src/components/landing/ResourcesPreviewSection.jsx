import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../../services/api";

const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.5L18.5 9H13V3.5zM8 13h8v1.5H8zm0 3.5h5V18H8zm0-7h2.5V11H8V9.5z"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function ResourcePreviewCard({ resource }) {
  return (
    <Link
      to={`/resources/${resource._id}`}
      className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#C8793F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded flex items-center justify-center mb-4 bg-gray-50 border border-gray-100">
        <img src="/publication_icon.png" alt="Publication Icon" className="w-6 h-6 object-contain" />
      </div>

      {resource.category && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071BC] mb-2">
          {resource.category}
        </span>
      )}

      <h3 className="text-sm font-bold text-[#002244] mb-2 leading-snug group-hover:text-[#C8793F] transition-colors line-clamp-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {resource.title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
        {resource.description || resource.summary || "Research publication by CCS."}
      </p>

      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#002244] group-hover:text-[#C8793F] transition-colors">
        Read more <IconArrow />
      </span>
    </Link>
  );
}

export default function ResourcesPreviewSection() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchResources();
        setResources(data.slice(0, 3));
      } catch (err) {
        console.error("Resources preview failed:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              
              <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
                Research Library
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002244] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Publications &amp; Resources
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            Evidence-based research papers, policy briefs, and regulatory analyses from CCS.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg border border-gray-200 animate-pulse h-52" />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No resources available yet.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {resources.map((r) => (
              <ResourcePreviewCard key={r._id} resource={r} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-[#0071BC] font-bold text-sm uppercase tracking-widest hover:text-[#C8793F] transition-colors group"
          >
            View All Resources <IconArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
