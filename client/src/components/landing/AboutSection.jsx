export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
      {/* Label */}
      <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-4">
        The Initiative
      </span>

      <h2 className="text-3xl md:text-4xl font-black text-[#0F1E3C] mb-4 leading-tight">
        About Ease of Doing Business
      </h2>

      {/* Amber underline accent */}
      <div className="w-16 h-[3px] bg-[#E88C30] mx-auto mb-8 rounded-full" />

      <p className="text-gray-600 leading-[1.75] text-lg max-w-3xl mx-auto">
        Ease of Doing Business is an initiative by the{" "}
        <strong className="text-[#0F1E3C] font-semibold">
          Centre for Civil Society (CCS)
        </strong>
        , aimed at promoting regulatory reforms, simplifying compliance
        procedures, and improving India's business environment through
        rigorous research, advocacy, and sustained policy engagement.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
        {[
          {
            title: "Our Mission",
            desc: "Simplify regulatory procedures and reduce the compliance burden for emerging enterprises across India.",
          },
          {
            title: "Our Vision",
            desc: "A transparent, innovation-friendly economy that fosters inclusive growth across all sectors.",
          },
          {
            title: "Our Approach",
            desc: "Evidence-based research, stakeholder engagement, and high-impact policy advocacy grounded in data.",
          },
        ].map((box) => (
          <div
            key={box.title}
            className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-8 h-[3px] bg-[#E88C30] mb-4 rounded-full" />
            <h3 className="text-base font-black text-[#0F1E3C] mb-2 uppercase tracking-wide">
              {box.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
