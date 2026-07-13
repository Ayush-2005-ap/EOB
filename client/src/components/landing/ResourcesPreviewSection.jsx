import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../../services/api";
import { FileText, ArrowRight } from "lucide-react";

function ResourcePreviewCard({ resource }) {
  return (
    <Link
      to={`/resources/${resource._id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Icon chip */}
      <div className="w-10 h-10 bg-[#E88C30]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#E88C30]/20 transition-colors">
        <FileText size={18} className="text-[#E88C30]" strokeWidth={2} />
      </div>

      {/* Category tag */}
      {resource.category && (
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0F1E3C]/40 mb-2">
          {resource.category}
        </span>
      )}

      {/* Title */}
      <h3 className="text-base font-bold text-[#0F1E3C] mb-2 leading-snug group-hover:text-[#E88C30] transition-colors line-clamp-2">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
        {resource.description || resource.summary || "Research publication by CCS."}
      </p>

      {/* Read more */}
      <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0F1E3C] group-hover:text-[#E88C30] transition-colors">
        Read more
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3">
              Research Library
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F1E3C] leading-tight">
              Publications & Resources
            </h2>
            <div className="w-12 h-[3px] bg-[#E88C30] mt-3 rounded-full" />
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            Evidence-based research papers, policy briefs, and regulatory
            analyses from CCS.
          </p>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-100 animate-pulse h-52"
              />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No resources available yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {resources.map((r) => (
              <ResourcePreviewCard key={r._id} resource={r} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-[#E88C30] font-black text-sm uppercase tracking-widest hover:gap-4 transition-all duration-200"
          >
            View All Resources
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
