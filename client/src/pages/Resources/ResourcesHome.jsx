import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fetchResources } from "../../services/api";
import { useTranslation, Trans } from "react-i18next";

const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ResourcesHome() {
  const { t } = useTranslation();
  
  const CATEGORIES = [
    { label: t("resources.categories.reports"), value: "reports" },
    { label: t("resources.categories.research"), value: "research" },
    { label: t("resources.categories.policy-briefs"), value: "policy-briefs" },
    { label: t("resources.categories.articles"), value: "articles" },
    { label: t("resources.categories.publications"), value: "publications" },
  ];
  
  const STATES = [
    t("resources.states.gujarat"),
    t("resources.states.andhra-pradesh"),
    t("resources.states.jharkhand"),
    t("resources.states.karnataka"),
    t("resources.states.tamil-nadu"),
    t("resources.states.maharashtra"),
    t("resources.states.uttar-pradesh"),
    t("resources.states.delhi")
  ];

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
      r.source || t("resources.labels.defaultSource"),
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
          <p className="text-xs font-bold text-gray-600 mb-2">{t("resources.labels.categoryDropdownLabel")}</p>
          <div className="relative">
            <button
              onClick={() => { setCategoryDropdownOpen(!categoryDropdownOpen); setStateDropdownOpen(false); }}
              className="w-full bg-[#0071BC] hover:bg-[#C8793F] text-white font-semibold text-sm px-4 py-3 rounded flex items-center justify-between transition cursor-pointer"
            >
              <span>{selectedCategory === "all" ? t("resources.labels.selectCategory") : selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
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
                  {t("resources.labels.allCategories")}
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
          <p className="text-xs font-bold text-gray-600 mb-2">{t("resources.labels.stateDropdownLabel")}</p>
          <div className="relative">
            <button
              onClick={() => { setStateDropdownOpen(!stateDropdownOpen); setCategoryDropdownOpen(false); }}
              className="w-full bg-[#0071BC] hover:bg-[#C8793F] text-white font-semibold text-sm px-4 py-3 rounded flex items-center justify-between transition cursor-pointer"
            >
              <span>{selectedState === "all" ? t("resources.labels.selectState") : selectedState}</span>
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
                  {t("resources.labels.allStates")}
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
    ? t("resources.labels.researchOn", { category: selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") })
    : selectedState !== "all"
      ? t("resources.labels.researchRelatedTo", { state: selectedState })
      : t("resources.labels.doingBusinessResearch");

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
                  {t("resources.labels.breadcrumbDoingBusiness")}
                </button>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">{selectedCategory !== "all" ? selectedCategory : selectedState}</span>
              </div>
            )}

            {/* Intro text (shows only on root overview page) */}
            {!isFilterActive && (
              <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed">
                <p>
                  <Trans i18nKey="resources.messages.intro1">
                    Each year <em>Ease of Doing Business</em> highlights important new work that speaks to a variety of issues impacting the private sector. Brief summaries of this work — including policy briefs, regulatory impact assessments, and academic papers — are available by <em>Ease of Doing Business</em> topic and related policy spaces. If you would like to recommend any additional papers that are not already listed on the website please email your suggestions to the team.
                  </Trans>
                </p>
                <p>
                  {t("resources.messages.intro2")}
                </p>
                <p>
                  {t("resources.messages.intro3")}
                </p>
              </div>
            )}

            {/* Render select dropdowns in main content if no filter is active */}
            {!isFilterActive && renderSelectors(false)}

            {/* Italic category note on topic view */}
            {isFilterActive && (
              <p className="text-sm text-gray-600 italic">
                {t("resources.messages.italicNote")}
              </p>
            )}

            {/* List of Research Papers (WB Flat Style) */}
            <div className="space-y-10 pt-4">
              {initialView ? (
                <div className="bg-gray-50 border border-gray-200 rounded p-8 text-center">
                  <p className="text-[#002244] font-bold mb-1.5" style={{ fontFamily: "'Open Sans', sans-serif" }}>{t("resources.messages.selectTopicHeader")}</p>
                  <p className="text-xs text-gray-500">{t("resources.messages.selectTopicSub")}</p>
                </div>
              ) : filteredResources.length === 0 ? (
                <p className="text-gray-400 italic text-sm">{t("resources.messages.noPapers")}</p>
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
                        <strong className="text-gray-800">{t("resources.labels.author")}</strong> {item.author || t("resources.labels.defaultAuthor")}
                      </p>
                      <p>
                        <strong className="text-gray-800">{t("resources.labels.source")}</strong> {item.source || t("resources.labels.defaultSource")} {item.date ? `(${item.date})` : ""}
                      </p>
                    </div>

                    {/* Abstract / Summary */}
                    <p className="text-sm text-gray-600 leading-relaxed pt-2">
                      <strong className="text-gray-700">{t("resources.labels.abstract")}</strong> {item.description || item.excerpt || t("resources.labels.defaultAbstract")}
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
                  {t("resources.labels.modifySearchFocus")}
                </h2>
                {renderSelectors(true)}
              </div>
            )}

            {/* DOWNLOAD SECTION */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {t("resources.labels.downloadHeading")}
              </h2>
              <a
                href="#export"
                onClick={handleExcelExport}
                className="text-sm text-[#0071BC] hover:text-[#C8793F] hover:underline block leading-snug"
              >
                {t("resources.labels.downloadExcel")}
              </a>
            </div>

            {/* SIDEBAR NAVIGATION: PAPERS BY TOPICS */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {t("resources.labels.papersOnTopics")}
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
                    {t("resources.labels.allResearchTopics")}
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
                {t("resources.labels.regionalProfiles")}
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
