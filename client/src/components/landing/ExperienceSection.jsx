export default function ExperiencesSection() {
    const experiences = [
      { title: "Easy to Do Business", location: "Andaman and Nicobar Islands", summary: "There was attempt to: Register the business" },
      { title: "Easy to Do Business", location: "Kerala", summary: "Simplified tax compliance helped small firms" },
      // Add more as needed
    ];
  
    return (
      <section className="bg-gray-50 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">What Others Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6">
          {experiences.map((item, i) => (
            <div key={i} className="bg-white shadow rounded p-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.location}</p>
              <p className="text-gray-700 mt-2">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  