import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRankings } from "../services/api";

// ─── Icons ──────────────────────────────────────────────────────────────────
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 text-gray-500">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconExcel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#0071BC]">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconPDF = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

// ─── Comparison panel (Side-by-side WB style) ────────────────────────────────
function ComparisonPanel({ allStates }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = allStates.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find((x) => x._id === s._id)
  );

  const add = (state) => {
    if (selected.length < 3) {
      setSelected([...selected, state]);
      setSearch("");
      setOpen(false);
    }
  };
  const remove = (id) => setSelected(selected.filter((s) => s._id !== id));

  return (
    <section className="mt-14 bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#002244]" style={{ fontFamily: "'Open Sans', sans-serif" }}>State Comparison</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Select up to 3 states to compare performance side-by-side
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071BC] bg-[#0071BC]/10 px-3 py-1 rounded">
          {selected.length} / 3 selected
        </span>
      </div>

      {/* State picker */}
      <div className="px-8 py-4 border-b border-gray-200 flex flex-wrap gap-3 items-center">
        {selected.map((s) => (
          <div
            key={s._id}
            className="flex items-center gap-2 text-[#002244] border border-gray-200 text-xs font-bold px-3 py-2 rounded bg-gray-50"
          >
            Rank #{s.rankNumber} {s.name}
            <button onClick={() => remove(s._id)} className="opacity-70 hover:opacity-100 transition-opacity">
              <IconX />
            </button>
          </div>
        ))}

        {selected.length < 3 && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-xs font-bold text-[#0071BC] border border-[#0071BC] px-4 py-2 rounded hover:bg-[#0071BC]/10 transition-all cursor-pointer"
            >
              <IconPlus /> Add State
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden">
                <div className="p-3 border-b border-gray-200">
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search state..."
                    className="w-full text-xs px-3 py-2 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-[#0071BC] focus:border-transparent"
                  />
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <p className="text-xs text-gray-400 px-4 py-3 text-center">No states found</p>
                  ) : (
                    filtered.map((s) => (
                      <button
                        key={s._id}
                        onClick={() => add(s)}
                        className="w-full text-left px-4 py-3 hover:bg-[#0071BC]/10 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-sm font-semibold text-[#002244] group-hover:text-[#C8793F]">{s.name}</span>
                        <span className="text-xs text-gray-400">Rank #{s.rankNumber}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="text-xs text-gray-400 hover:text-red-500 font-bold transition-colors ml-auto cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Comparison table */}
      {selected.length === 0 ? (
        <div className="py-16 text-center text-gray-400 text-sm">
          <p className="font-semibold text-gray-500">No states selected</p>
          <p className="text-xs mt-1 text-gray-400">Add regional states above to build comparison matrix</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider w-44">Indicator</th>
                {selected.map((s) => (
                  <th key={s._id} className="px-8 py-3.5 text-sm font-bold text-[#002244]">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Rank */}
              <tr>
                <td className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ease of Doing Business Rank</td>
                {selected.map((s) => (
                  <td key={s._id} className="px-8 py-4 text-[#002244] font-bold text-base">
                    {s.rankNumber}
                  </td>
                ))}
              </tr>
              {/* Score */}
              <tr>
                <td className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Compliance Score</td>
                {selected.map((s) => (
                  <td key={s._id} className="px-8 py-4 text-[#002244] font-semibold">
                    {s.score}
                  </td>
                ))}
              </tr>
              {/* Status */}
              <tr>
                <td className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reform Category</td>
                {selected.map((s) => (
                  <td key={s._id} className="px-8 py-4 text-[#0071BC] font-semibold text-sm">
                    {s.status}
                  </td>
                ))}
              </tr>
              {/* View link */}
              <tr>
                <td className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Details</td>
                {selected.map((s) => (
                  <td key={s._id} className="px-8 py-4">
                    <a
                      href={`/rankings/${s.slug}`}
                      className="text-xs font-bold text-[#0071BC] hover:underline uppercase tracking-wider"
                    >
                      View Profile →
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ─── Main Rankings page ──────────────────────────────────────────────────────
const PAGE_SIZE = 5;

export default function Rankings() {
  const [filter, setFilter]         = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [rankings, setRankings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [visible, setVisible]       = useState(PAGE_SIZE);
  const navigate = useNavigate();

  // Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        setRankings(data);
      } catch (err) {
        console.error("Failed to fetch rankings", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Reset visible count when filter / search changes
  useEffect(() => { setVisible(PAGE_SIZE); }, [filter, searchQuery]);

  const filtered = rankings
    .filter((s) => {
      const cat = filter === "ALL" || s.status === filter;
      const srch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return cat && srch;
    })
    .sort((a, b) => (a.rankNumber || 999) - (b.rankNumber || 999));

  const rows    = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const exportToCSV = () => {
    const headers = ["State / UT", "Ease of Doing Business Rank", "Compliance Score", "Reform Category"];
    const rows = filtered.map((s) => [
      s.name,
      s.rankNumber,
      s.score,
      s.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EODB_India_State_Rankings_${filter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    const tableRows = filtered.map(s => `
      <tr>
        <td style="padding: 10px; border: 1px solid #e2e8f0;">${s.name}</td>
        <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${s.rankNumber}</td>
        <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: center;">${s.score}</td>
        <td style="padding: 10px; border: 1px solid #e2e8f0;">${s.status}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>EODB India State Rankings - ${filter}</title>
          <style>
            body { font-family: sans-serif; margin: 40px; color: #002244; }
            h1 { font-size: 22px; margin-bottom: 5px; color: #002244; }
            p { color: #666; font-size: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th { background-color: #f8fafc; color: #002244; font-weight: bold; border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
            tr:nth-child(even) { background-color: #f8fafc; }
          </style>
        </head>
        <body>
          <h1>Ease of Doing Business — India State Rankings</h1>
          <p>Generated on ${new Date().toLocaleDateString()} | Category filter: ${filter}</p>
          <table>
            <thead>
              <tr>
                <th style="width: 35%;">State / UT</th>
                <th style="text-align: center; width: 25%;">Ease of Doing Business Rank</th>
                <th style="text-align: center; width: 20%;">Compliance Score</th>
                <th style="width: 20%;">Reform Category</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[450px] bg-[#F5F7FA]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-[#0071BC] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Methodology &amp; Scores
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002244] tracking-tight mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            State Rankings
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            State-wise performance assessment based on business reform implementation and regulatory efficiency.
          </p>
        </div>

        {/* Toolbar: WB Solid blue drop-down buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative">
            
            {/* Category Dropdown (Solid Blue block style matching screenshot) */}
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full sm:w-64 bg-[#0071BC] hover:bg-[#C8793F] text-white font-semibold text-sm px-5 py-3 rounded flex items-center justify-between transition cursor-pointer"
              >
                <span>{filter === "ALL" ? "Select Rankings by Category" : filter}</span>
                <IconChevronDown />
              </button>
              
              {categoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden">
                  {["ALL", "Top Performer", "Acceleration Required", "Jump-Start Needed"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilter(cat);
                        setCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {cat === "ALL" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input styled professionally */}
            <div className="relative w-full sm:w-64">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><IconSearch /></span>
              <input
                type="text"
                placeholder="Search State/UT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-11 pr-4 py-3 rounded text-sm outline-none focus:ring-2 focus:ring-[#0071BC] focus:border-transparent text-gray-700 transition"
              />
            </div>
          </div>

          {/* Export tools */}
          <div className="flex gap-2 shrink-0">
            <button onClick={exportToCSV} className="p-2.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition cursor-pointer" title="Export to Excel">
              <IconExcel />
            </button>
            <button onClick={exportToPDF} className="p-2.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition cursor-pointer" title="Export to PDF">
              <IconPDF />
            </button>
          </div>
        </div>

        {/* Rankings Table - Clean, Corporate, World Bank Style */}
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs font-bold text-[#002244]">
                  <th className="px-6 py-4 w-1/3">State / UT</th>
                  <th className="px-6 py-4 text-center">Ease of Doing Business Rank</th>
                  <th className="px-6 py-4 text-center">Compliance Score</th>
                  <th className="px-6 py-4">Reform Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-gray-400 italic text-sm">
                      No states match your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  rows.map((state) => (
                    <tr
                      key={state._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Name - Styled as Blue Link */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/rankings/${state.slug}`)}
                          className="font-bold text-[#0071BC] hover:underline text-left text-sm"
                        >
                          {state.name}
                        </button>
                      </td>

                      {/* Rank - Simple flat text number */}
                      <td className="px-6 py-4 text-center text-[#002244] font-semibold text-sm">
                        {state.rankNumber}
                      </td>

                      {/* Score - Simple text */}
                      <td className="px-6 py-4 text-center text-gray-700 font-medium text-sm">
                        {state.score}
                      </td>

                      {/* Category status */}
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {state.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Load More / Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <span className="text-xs text-gray-400 font-medium">
                Showing <strong>{rows.length}</strong> of <strong>{filtered.length}</strong> regions
              </span>
              <div className="flex gap-2">
                {hasMore && (
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="text-xs font-bold text-white bg-[#0071BC] hover:bg-[#C8793F] px-4 py-2.5 rounded transition shadow-sm cursor-pointer"
                  >
                    Load More
                  </button>
                )}
                {visible > PAGE_SIZE && (
                  <button
                    onClick={() => setVisible(PAGE_SIZE)}
                    className="text-xs font-bold text-gray-400 hover:text-gray-600 px-4 py-2.5 rounded transition cursor-pointer"
                  >
                    Collapse
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* State Comparison Tool */}
        <ComparisonPanel allStates={rankings} />

      </div>
    </div>
  );
}
