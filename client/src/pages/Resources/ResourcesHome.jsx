import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../../services/api";
import { FileText, BookOpen, Search, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  { label: "All Materials", value: "all" },
  { label: "Reports", value: "reports" },
  { label: "Research", value: "research" },
  { label: "Policy Briefs", value: "policy-briefs" },
  { label: "Articles", value: "articles" },
  { label: "Publications", value: "publications" },
];

export default function ResourcesHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to load resources", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter category + search query
  const filteredResources = resources.filter((r) => {
    const matchesCategory = activeCategory === "all" || r.category === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.excerpt && r.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResources = filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E88C30]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-3">
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F1E3C] tracking-tight mb-4 animate-fade-in">
            Resource Library
          </h1>
          <div className="w-16 h-1 bg-[#E88C30] mx-auto mb-6 rounded-full" />
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Access our latest research publications, regulatory frameworks, policy briefs, and state compliance reports.
          </p>
        </div>

        {/* Toolbar: Search + Category Filter */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports, research, articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-[#0F1E3C] focus:border-transparent outline-none text-sm transition shadow-xs text-gray-700"
            />
          </div>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#0F1E3C] text-white shadow-md shadow-[#0F1E3C]/10 scale-102"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid/List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {currentResources.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl text-gray-400 italic text-sm">
              No publications found matching your search.
            </div>
          ) : (
            currentResources.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-200 group flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Visual Thumbnail */}
                <div className="w-14 h-14 bg-[#E88C30]/8 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#E88C30]/15 transition-colors">
                  {item.category === "publications" || item.category === "reports" ? (
                    <BookOpen size={24} className="text-[#E88C30]" strokeWidth={2} />
                  ) : (
                    <FileText size={24} className="text-[#E88C30]" strokeWidth={2} />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E88C30] bg-[#E88C30]/8 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="text-xs text-gray-300 font-medium font-mono">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#0F1E3C] group-hover:text-[#E88C30] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt || item.description || "Research analysis publication from the Centre for Civil Society."}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/resources/${item._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0F1E3C] hover:text-[#E88C30] transition-colors group/link"
                    >
                      Read full publication <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-20 hover:cursor-pointer transition shrink-0"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#0F1E3C] text-white border-[#0F1E3C] shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-20 hover:cursor-pointer transition shrink-0"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
