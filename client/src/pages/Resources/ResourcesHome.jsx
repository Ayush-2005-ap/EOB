import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fetchResources } from "../../services/api";

const CATEGORIES = [
  { label: "Reports", value: "reports" },
  { label: "Research", value: "research" },
  { label: "Policy Briefs", value: "policy-briefs" },
  { label: "Articles", value: "articles" },
  { label: "Publications", value: "publications" },
];

const STATES = [
  "Gujarat", "Andhra Pradesh", "Jharkhand", "Karnataka", "Tamil Nadu", "Maharashtra", "Uttar Pradesh", "Delhi"
];

const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ResourcesHome() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [initialView, setInitialView] = useState(true);

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

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

  // Filter resources based on selections
  const filteredResources = resources.filter((r) => {
    const matchesCategory = selectedCategory === "all" || r.category === selectedCategory;
    const matchesState = selectedState === "all" || 
      r.title.toLowerCase().includes(selectedState.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(selectedState.toLowerCase())) ||
      (r.excerpt && r.excerpt.toLowerCase().includes(selectedState.toLowerCase()));
    return matchesCategory && matchesState;
  });

  const isFilterActive = selectedCategory !== "all" || selectedState !== "all";

  // Export all resources to CSV (Excel format)
  const handleExcelExport = (e) => {
    e.preventDefault();
    if (resources.length === 0) return;

    const headers = ["Title", "Category", "Date", "Source/Publisher", "Description/Excerpt", "Download Link"];
    const rows = resources.map((r) => [
      r.title,
      r.category,
      r.date || "N/A",
      r.source || "Centre for Civil Society",
      r.excerpt || r.description || "",
      r.pdf || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CCS_EODB_Research_Publications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reusable selector drop downs rendering
  const renderSelectors = (isSidebar = false) => {
    const wrapperClass = isSidebar 
      ? "space-y-4 pt-1" 
      : "grid sm:grid-cols-2 gap-4 pt-4 pb-8 border-b border-gray-100";
    
    return (
      <div className={wrapperClass}>
        {/* Dropdown 1: Category */}
        <div>
          <p className="text-xs font-bold text-gray-600 mb-2">Papers on Doing Business categories:</p>
          <div className="relative">
            <button
              onClick={() => { setCategoryDropdownOpen(!categoryDropdownOpen); setStateDropdownOpen(false); }}
              className="w-full bg-[#0071BC] hover:bg-[#C8793F] text-white font-semibold text-sm px-4 py-3 rounded flex items-center justify-between transition cursor-pointer"
            >
              <span>{selectedCategory === "all" ? "Select a category" : selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
              <IconChevronDown />
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setInitialView(false);
                    setCategoryDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setSelectedState("all");
                      setInitialView(false);
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dropdown 2: State focus */}
        <div>
          <p className="text-xs font-bold text-gray-600 mb-2">Doing Business state focus:</p>
          <div className="relative">
            <button
              onClick={() => { setStateDropdownOpen(!stateDropdownOpen); setCategoryDropdownOpen(false); }}
              className="w-full bg-[#0071BC] hover:bg-[#C8793F] text-white font-semibold text-sm px-4 py-3 rounded flex items-center justify-between transition cursor-pointer"
            >
              <span>{selectedState === "all" ? "Select a state" : selectedState}</span>
              <IconChevronDown />
            </button>
            {stateDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedState("all");
                    setInitialView(false);
                    setStateDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  All States
                </button>
                {STATES.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setSelectedState(st);
                      setSelectedCategory("all");
                      setInitialView(false);
                      setStateDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-white">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-[#0071BC] animate-spin" />
      </div>
    );
  }

  const activeTitle = selectedCategory !== "all" 
    ? `Research on ${selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`
    : selectedState !== "all"
      ? `Research related to ${selectedState}`
      : "Doing Business and Related Research";

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Main Grid Layout */}
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Column: Title, Intro & Selected Research List */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Dynamic Title */}
            <h1 className="text-3xl font-bold text-[#002244] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              {activeTitle}
            </h1>

            {/* Breadcrumb if active filter */}
            {isFilterActive && (
              <div className="text-sm text-gray-500">
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedState("all");
                    setInitialView(false);
                  }}
                  className="text-[#0071BC] hover:text-[#C8793F] hover:underline"
                >
                  Doing Business and related research
                </button>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">{selectedCategory !== "all" ? selectedCategory : selectedState}</span>
              </div>
            )}

            {/* Intro text (shows only on root overview page) */}
            {!isFilterActive && (
              <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed">
                <p>
                  Each year <em>Ease of Doing Business</em> highlights important new work that speaks to a variety of issues impacting the private sector. Brief summaries of this work — including policy briefs, regulatory impact assessments, and academic papers — are available by <em>Ease of Doing Business</em> topic and related policy spaces. If you would like to recommend any additional papers that are not already listed on the website please email your suggestions to the team.
                </p>
                <p>
                  Blogs and publications from our research team are also provided periodically to reflect ground-level MSME reform progress across Indian states.
                </p>
                <p>
                  Make a selection below to see the papers published by category or filtered by regional state focus.
                </p>
              </div>
            )}

            {/* Render select dropdowns in main content if no filter is active */}
            {!isFilterActive && renderSelectors(false)}

            {/* Italic category note on topic view */}
            {isFilterActive && (
              <p className="text-sm text-gray-600 italic">
                Ease of Doing Business considers the following list of publications as relevant for research on regulations affecting private sector growth. If you find any missing publications, please let us know.
              </p>
            )}

            {/* List of Research Papers (WB Flat Style) */}
            <div className="space-y-10 pt-4">
              {initialView ? (
                <div className="bg-gray-50 border border-gray-200 rounded p-8 text-center">
                  <p className="text-[#002244] font-bold mb-1.5" style={{ fontFamily: "'Open Sans', sans-serif" }}>Select a Topic or Regional Profile</p>
                  <p className="text-xs text-gray-500">Choose a research category or state focus to explore reports, briefings, and publications.</p>
                </div>
              ) : filteredResources.length === 0 ? (
                <p className="text-gray-400 italic text-sm">No research papers found matching this selection.</p>
              ) : (
                filteredResources.map((item) => (
                  <div key={item._id} className="pb-8 border-b border-gray-100 space-y-2">
                    {/* Title as Link */}
                    <RouterLink
                      to={`/resources/${item._id}`}
                      className="text-[#0071BC] hover:text-[#C8793F] hover:underline font-bold text-lg block leading-snug"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {item.title}
                    </RouterLink>
                    
                    {/* Meta Row: Authors / Source */}
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <strong className="text-gray-800">Author(s):</strong> {item.author || "Centre for Civil Society Research Team"}
                      </p>
                      <p>
                        <strong className="text-gray-800">Source:</strong> {item.source || "EODB India Policy Working Paper Series"} {item.date ? `(${item.date})` : ""}
                      </p>
                    </div>

                    {/* Abstract / Summary */}
                    <p className="text-sm text-gray-600 leading-relaxed pt-2">
                      <strong className="text-gray-700">Abstract:</strong> {item.description || item.excerpt || "This publication investigates state reform action plans and DIPP compliance index outcomes."}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Right Column: Sidebar (Sticky self-start) */}
          <div className="md:col-span-4 space-y-8 md:border-l md:border-gray-200 md:pl-8 sticky top-24 self-start">
            
            {/* Active selectors rendered at the top of the sidebar when active */}
            {isFilterActive && (
              <div className="space-y-2 pb-6 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Modify Search Focus
                </h2>
                {renderSelectors(true)}
              </div>
            )}

            {/* DOWNLOAD SECTION */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Download
              </h2>
              <a
                href="#export"
                onClick={handleExcelExport}
                className="text-sm text-[#0071BC] hover:text-[#C8793F] hover:underline block leading-snug"
              >
                Download full list of research papers related to Doing Business topics (Excel)
              </a>
            </div>

            {/* SIDEBAR NAVIGATION: PAPERS BY TOPICS */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Papers on EODB Topics
              </h2>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedState("all");
                      setInitialView(false);
                    }}
                    className={`text-sm text-left hover:text-[#C8793F] hover:underline cursor-pointer block ${
                      selectedCategory === "all" && selectedState === "all" && !initialView ? "text-gray-900 font-bold" : "text-[#0071BC]"
                    }`}
                  >
                    All research topics
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setSelectedState("all");
                        setInitialView(false);
                      }}
                      className={`text-sm text-left hover:text-[#C8793F] hover:underline cursor-pointer block ${
                        selectedCategory === cat.value ? "text-gray-900 font-bold" : "text-[#0071BC]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIDEBAR NAVIGATION: PAPERS BY STATE */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Regional Profiles
              </h2>
              <ul className="space-y-2.5">
                {STATES.map((st) => (
                  <li key={st}>
                    <button
                      onClick={() => {
                        setSelectedState(st);
                        setSelectedCategory("all");
                        setInitialView(false);
                      }}
                      className={`text-sm text-left hover:text-[#C8793F] hover:underline cursor-pointer block ${
                        selectedState === st ? "text-gray-900 font-bold" : "text-[#0071BC]"
                      }`}
                    >
                      {st}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
