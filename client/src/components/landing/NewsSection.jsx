export default function NewsSection() {
    const newsItems = [
      {
        title: "Ease of doing business via tax reforms to continue",
        source: "Economic Times",
        date: "6 March 2019",
        link: "#",
      },
      {
        title: "Cross-border insolvency law changes to boost ease of doing business",
        source: "International Business Times",
        date: "5 March 2019",
        link: "#",
      },
      // Add real links later
    ];
  
    return (
      <section className="py-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Latest News</h2>
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          {newsItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="block border-b pb-2 hover:text-blue-700"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.source} | {item.date}</p>
            </a>
          ))}
        </div>
      </section>
    );
  }
  