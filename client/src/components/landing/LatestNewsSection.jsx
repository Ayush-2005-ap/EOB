import { useEffect, useState } from "react";

export default function NewsHome() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>

      <div className="space-y-6">
        {news.map(item => (
          <div
            key={item.id}
            className="border rounded-lg p-6 bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-red-700">
              {item.title}
            </h2>

            <p className="mt-2 text-gray-700">
              {item.description}
            </p>

            <div className="mt-3 text-sm text-gray-500 flex gap-4">
              <span>📰 {item.source}</span>
              <span>📅 {item.date}</span>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              Read full article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
