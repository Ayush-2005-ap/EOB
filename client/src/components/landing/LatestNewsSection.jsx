import { useEffect, useState } from "react";
import { fetchNews } from "../../services/api";
import { ArrowRight, ExternalLink } from "lucide-react";

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
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm animate-pulse">
          Fetching latest updates…
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F1E3C] leading-tight">
            Policy Intelligence
          </h2>

        </div>

        {news.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm italic">
            No active announcements at this moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
              >


                {/* Meta row */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] bg-[#E88C30]/8 px-2.5 py-1 rounded-full">
                    {item.source || "Official"}
                  </span>
                  <span className="text-xs font-bold text-gray-300 font-mono">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F1E3C] mb-3 leading-snug group-hover:text-[#E88C30] transition-colors">
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
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0F1E3C] hover:text-[#E88C30] transition-colors group/link"
                >
                  Read Full Report
                  <ExternalLink size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
