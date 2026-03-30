import { useEffect, useState } from "react";
import { fetchNews, createNews, deleteNews } from "../../services/api";
import toast from "react-hot-toast";

export default function ManageNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
      title: "",
      description: "",
      date: "",
      source: "",
      url: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        const data = await fetchNews();
        setNews(data);
        setLoading(false);
    } catch (err) {
        toast.error("Failed to fetch news");
        setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await createNews(form);
          if (res.success) {
              toast.success("News item added");
              setForm({ title: "", description: "", date: "", source: "", url: "" });
              setShowAdd(false);
              loadData();
          }
      } catch (err) {
          toast.error("Failed to add news");
      }
  };

  const handleDelete = async (id) => {
      if (!window.confirm("Delete this news item?")) return;
      try {
          const res = await deleteNews(id);
          if (res.success) {
              toast.success("News deleted");
              setNews(prev => prev.filter(n => n._id !== id));
          }
      } catch (err) {
          toast.error("Failed to delete");
      }
  };

  if (loading) return <div className="p-8">Loading news...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Latest News & Announcements</h1>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-[#9A4020] text-white px-4 py-2 rounded shadow hover:cursor-pointer"
          >
              {showAdd ? "Cancel" : "+ Add News"}
          </button>
      </div>

      {showAdd && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-8 max-w-2xl">
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                      <input 
                        required
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                      <textarea 
                        required
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                          <input 
                            placeholder="e.g. 30 Sep 2025"
                            value={form.date}
                            onChange={e => setForm({...form, date: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Source</label>
                          <input 
                            placeholder="e.g. PIB"
                            value={form.source}
                            onChange={e => setForm({...form, source: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                          />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">URL (Read More link)</label>
                      <input 
                        type="url"
                        value={form.url}
                        onChange={e => setForm({...form, url: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      />
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:cursor-pointer">Save News</button>
              </div>
          </form>
      )}

      <div className="grid gap-4">
        {news.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1 italic mb-2">{item.description}</p>
                    <div className="flex gap-4 text-[10px] uppercase font-bold text-gray-400">
                        <span>📅 {item.date}</span>
                        <span>🏛 {item.source}</span>
                    </div>
                </div>
                <button 
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xs hover:cursor-pointer"
                >
                    Delete
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}
