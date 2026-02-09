import { useState } from "react";

const CATEGORIES = [
  "research",
  "reports",
  "policy-briefs",
  "articles",
  "publications",
];

export default function ResourceForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    category: initialData.category || "",
    title: initialData.title || "",
    excerpt: initialData.excerpt || "",
    content: initialData.content || "",
    pdf: initialData.pdf || "",
    date: initialData.date || "",
    source: initialData.source || "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isPublication = form.category === "publications";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-5 max-w-3xl"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {initialData.id ? "Edit Resource" : "Add Resource"}
      </h2>

      {/* CATEGORY */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* TITLE */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* EXCERPT */}
      <div>
        <label className="block font-medium mb-1">Excerpt</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* CONTENT */}
      <div>
        <label className="block font-medium mb-1">Full Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* PDF */}
      <div>
        <label className="block font-medium mb-1">PDF Link / Path</label>
        <input
          type="text"
          name="pdf"
          value={form.pdf}
          onChange={handleChange}
          placeholder="/downloads/file.pdf"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* DATE + SOURCE */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="text"
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="2025 / 30 Sep 2025"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Source</label>
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* 🔥 IMAGE — ONLY FOR PUBLICATION */}
      {isPublication && (
        <div>
          <label className="block font-medium mb-1">
            Publication Image Path
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/cover.png"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      {/* SUBMIT */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded font-semibold"
        >
          {initialData.id ? "Update Resource" : "Add Resource"}
        </button>
      </div>
    </form>
  );
}
