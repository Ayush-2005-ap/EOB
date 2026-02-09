import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  // FETCH DATA
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/resources`)
      .then((res) => res.json())
      .then((data) => setResources(data.data || []))
      .catch((err) => console.error(err));
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Resources</h1>

      {/* ================= CATEGORY FILTER ================= */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-5 py-2 rounded-full border font-medium transition hover:cursor-pointer
              ${
                activeCategory === cat.value
                  ? "bg-red-700 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ================= RESOURCE LIST ================= */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {currentResources.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-6 bg-white hover:shadow-md transition"
          >
            {/* 🔥 PUBLICATION LAYOUT */}
            {item.category === "publications" && item.image ? (
              <div className="flex gap-6 items-start">

                {/* LEFT — A4 PREVIEW IMAGE */}
                <div className="w-[180px] shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain border rounded-md shadow"
                  />
                </div>

                {/* RIGHT — CONTENT */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-red-700">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-gray-700 line-clamp-4">
                    {item.excerpt}
                  </p>

                  <Link
                    to={`/resources/${item.id}`}
                    className="inline-block mt-4 text-red-600 font-semibold hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ) : (
              /* 🔹 NORMAL LAYOUT */
              <>
                <h2 className="text-xl font-semibold text-red-700">
                  {item.title}
                </h2>

                <p className="mt-2 text-gray-700">
                  {item.excerpt}
                </p>

                <Link
                  to={`/resources/${item.id}`}
                  className="inline-block mt-4 text-red-600 font-semibold hover:underline"
                >
                  Read more →
                </Link>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
          {/* FIRST */}
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            «
          </button>

          {/* PREV */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            ‹
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded border hover:cursor-pointer transition
                ${
                  currentPage === i + 1
                    ? "bg-red-700 text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            ›
          </button>

          {/* LAST */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
