import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../../services/api";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  { label: "All Materials", value: "all" },
  { label: "Reports", value: "reports" },
  { label: "Research", value: "research" },
  { label: "Policy Briefs", value: "policy-briefs" },
  { label: "Articles", value: "articles" },
  { label: "Publications", value: "publications" },
];

// Crisp filled SVG icons
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-8zm6 14H11V5h7v12zM6.5 22H20v-2H6.5A1.5 1.5 0 0 1 5 18.5V5.5A1.5 1.5 0 0 1 6.5 4H9V2H6.5A3.5 3.5 0 0 0 3 5.5v13A3.5 3.5 0 0 0 6.5 22z"/>
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.5 4.5 4.5H13V3.5zM8 13h8v1.5H8zm0 3h5v1.5H8zm0-6h3v1.5H8z"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

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
      <div className="flex justify-center items-center min-h-[450px] bg-[#F5F7FA]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-[#0071BC] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-0.5 bg-[#0071BC]" />
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Knowledge Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002244] tracking-tight mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Resource Library
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Access our latest research publications, regulatory frameworks, policy briefs, and state compliance reports.
          </p>
        </div>

        {/* Toolbar: Search + Category Filter */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><IconSearch /></span>
            <input
              type="text"
              placeholder="Search reports, research, articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded focus:ring-2 focus:ring-[#0071BC] focus:border-transparent outline-none text-sm transition shadow-sm text-gray-700"
            />
          </div>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#002244] text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid/List */}
        <div className="max-w-4xl mx-auto space-y-5">
          {currentResources.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded text-gray-400 italic text-sm">
              No publications found matching your search.
            </div>
          ) : (
            currentResources.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded p-6 md:p-8 shadow-sm hover:border-[#0071BC] transition-all duration-200 flex flex-col md:flex-row gap-6 items-start group"
              >
                {/* Visual Thumbnail */}
                <div className="w-12 h-12 bg-[#0071BC]/10 rounded flex items-center justify-center shrink-0 text-[#0071BC] transition-colors">
                  {item.category === "publications" || item.category === "reports" ? (
                    <IconBook />
                  ) : (
                    <IconFile />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0071BC]">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="text-xs text-gray-300 font-medium font-mono">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-[#002244] group-hover:text-[#0071BC] transition-colors leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt || item.description || "Research analysis publication from the Centre for Civil Society."}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/resources/${item._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#002244] hover:text-[#0071BC] transition-colors"
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
              className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-100 disabled:opacity-20 hover:cursor-pointer transition shrink-0"
            >
              <IconChevronLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded border text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#002244] text-white border-[#002244] shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded bg-white hover:bg-gray-100 disabled:opacity-20 hover:cursor-pointer transition shrink-0"
            >
              <IconChevronRight />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
