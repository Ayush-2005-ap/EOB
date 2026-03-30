import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchResources } from "../../services/api";

const ITEMS_PER_PAGE = 10;

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Reports", value: "reports" },
  { label: "Research", value: "research" },
  { label: "Policy Briefs", value: "policy-briefs" },
  { label: "Articles", value: "articles" },
  { label: "Publications", value: "publications" },
];

export default function ResourcesHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        try {
            const data = await fetchResources();
            setResources(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load resources", err);
            setLoading(false);
        }
    };
    load();
  }, []);

  // FILTER
  const filteredResources =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  // PAGINATION
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResources = filteredResources.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  if (loading) return (
      <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A4020]"></div>
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 uppercase tracking-tight">Resource Library</h1>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-5 py-2 rounded-full border font-medium transition hover:cursor-pointer
              ${
                activeCategory === cat.value
                  ? "bg-[#9A4020] text-white border-[#9A4020]"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* RESOURCE LIST */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {currentResources.length === 0 ? (
            <div className="text-center py-20 text-gray-500 italic">No resources found in this category.</div>
        ) : (
            currentResources.map((item) => (
            <div
                key={item._id}
                className="border rounded-xl p-6 bg-white hover:shadow-lg transition-shadow duration-300 group"
            >
                {item.category === "publications" && item.image ? (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-[180px] shrink-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-contain border rounded-md shadow group-hover:scale-[1.02] transition-transform"
                    />
                    </div>

                    <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#9A4020] transition-colors">
                        {item.title}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed line-clamp-4">
                        {item.excerpt}
                    </p>

                    <Link
                        to={`/resources/${item._id}`}
                        className="inline-block mt-4 text-[#9A4020] font-semibold hover:underline"
                    >
                        Read more →
                    </Link>
                    </div>
                </div>
                ) : (
                <>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#9A4020] transition-colors">
                    {item.title}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.excerpt}
                    </p>

                    <Link
                    to={`/resources/${item._id}`}
                    className="inline-block mt-4 text-[#9A4020] font-semibold hover:underline"
                    >
                    Read more →
                    </Link>
                </>
                )}
            </div>
            ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-30 hover:cursor-pointer"
          >
            «
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-30 hover:cursor-pointer"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded border hover:cursor-pointer transition
                ${
                  currentPage === i + 1
                    ? "bg-[#9A4020] text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-30 hover:cursor-pointer"
          >
            ›
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-30 hover:cursor-pointer"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
