import { useEffect, useState } from "react";
import { fetchNews } from "../../services/api";

const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function LatestNewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await fetchNews();
      setNews(data);
    } catch (err) {
      console.error("News fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-[#F5F7FA] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm animate-pulse">
          Fetching latest updates…
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Latest Updates
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002244] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Policy Intelligence
          </h2>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-16 bg-white rounded border border-gray-200 text-gray-400 text-sm italic">
            No active announcements at this moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-gray-200 rounded p-7 hover:border-[#C8793F] hover:shadow-lg hover:shadow-[#C8793F]/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Meta row */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071BC] bg-[#0071BC]/10 px-2.5 py-1 rounded">
                    {item.source || "Official"}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#002244] mb-3 leading-snug group-hover:text-[#C8793F] transition-colors" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">
                  {item.description}
                </p>

                {/* Read link */}
                <a
                  href={item.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#002244] hover:text-[#C8793F] transition-colors group/link"
                >
                  Read Full Report
                  <IconExternalLink />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
