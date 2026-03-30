import { useEffect, useState } from "react";
import { fetchNews } from "../../services/api";

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
        setLoading(false);
    } catch (err) {
        console.error("News fetch failed", err);
        setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 font-bold animate-pulse">Fetching latest updates...</div>;

  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl">
      <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-gray-200 flex-1"></div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Latest <span className="text-[#9A4020]">Intelligence</span></h1>
          <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {news.length === 0 ? (
            <div className="col-span-2 text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 italic text-gray-400">
                No active announcements at this moment.
            </div>
        ) : news.map(item => (
          <div
            key={item._id}
            className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#9A4020]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(154,64,32,0.1)] overflow-hidden"
          >
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#9A4020] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-start mb-4">
                <span className="bg-[#9A4020]/5 text-[#9A4020] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{item.source || "OFFICIAL"}</span>
                <span className="text-xs font-bold text-gray-400 font-mono">{item.date}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#9A4020] transition-colors leading-tight">
              {item.title}
            </h2>

            <p className="text-gray-500 leading-relaxed line-clamp-3 mb-6 text-sm">
              {item.description}
            </p>

            <a
              href={item.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 hover:text-[#9A4020] transition-colors group-hover:gap-4 duration-300"
            >
              Read Full Intelligence <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
