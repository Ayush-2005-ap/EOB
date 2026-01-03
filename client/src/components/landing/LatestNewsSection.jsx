import { newsData } from "../../data/newsData";

export default function LatestNewsSection() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest News
          </h2>
          <div className="mt-2 h-1 w-24 bg-red-700 rounded"></div>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {newsData.map((news, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition"
                >
                  {news.title}
                </a>
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {news.date} &nbsp;|&nbsp; <span className="italic">{news.source}</span>
              </p>

              <p className="mt-3 text-gray-600">
                {news.description}
              </p>

              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-red-700 font-medium hover:underline"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>

        {/* Footer link */}
        {/* <div className="mt-8 text-right">
          <a
            href="#"
            className="text-red-700 font-semibold hover:underline"
          >
            Read more news →
          </a>
        </div> */}

      </div>
    </section>
  );
}
