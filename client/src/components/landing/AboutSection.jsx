// WB icon style: flat, filled, single-colour
const IconMission = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const IconVision = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const IconApproach = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
  </svg>
);

const cards = [
  {
    title: "Our Mission",
    desc: "Simplify regulatory procedures and reduce the compliance burden for emerging enterprises across India.",
    color: "#0071BC",
    icon: <IconMission />,
  },
  {
    title: "Our Vision",
    desc: "A transparent, innovation-friendly economy that fosters inclusive growth across all sectors.",
    color: "#00538A",
    icon: <IconVision />,
  },
  {
    title: "Our Approach",
    desc: "Evidence-based research, stakeholder engagement, and high-impact policy advocacy grounded in data.",
    color: "#002244",
    icon: <IconApproach />,
  },
];

export default function AboutSection() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-0.5 bg-[#0071BC]" />
          <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
            The Initiative
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#002244] mb-5 leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          About Ease of Doing Business
        </h2>

        <p className="text-gray-600 leading-relaxed text-base max-w-3xl mb-12">
          Ease of Doing Business is an initiative by the{" "}
          <strong className="text-[#002244] font-semibold">
            Centre for Civil Society (CCS)
          </strong>
          , aimed at promoting regulatory reforms, simplifying compliance
          procedures, and improving India's business environment through
          rigorous research, advocacy, and sustained policy engagement.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ title, desc, color, icon }) => (
            <div
              key={title}
              className="bg-white border border-gray-200 rounded-lg p-7 hover:border-[#0071BC] hover:shadow-md transition-all duration-200 group"
            >
              {/* Icon — WB flat style: tinted bg, solid fill icon */}
              <div
                className="w-12 h-12 rounded flex items-center justify-center mb-5"
                style={{ background: color + "12", color }}
              >
                {icon}
              </div>

              <h3
                className="text-sm font-bold text-[#002244] mb-2 uppercase tracking-wider"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
