import IndiaMap from "./IndiaMap";
import { useNavigate } from "react-router-dom";

/*
  World Bank "Doing Business" Design Language:
  Primary   #0071BC  — WB institutional blue
  Dark      #002244  — deep navy
  Mid       #00538A  — secondary blue
  Text      rgba(0,0,0,0.87)
  Accent    #DF3416  — WB red (used sparingly)
  BG        #F5F7FA  — cool light grey
  Icons: flat filled, no gradients, single-colour on clean white chip
*/

const IconPaper = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.5 4.5 4.5H13V3.5zM8 13h8v1.5H8zm0 3h5v1.5H8zm0-6h3v1.5H8z"/>
  </svg>
);

const IconData = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-3h2v3z"/>
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
  </svg>
);

const IconScore = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5zm-2 8.83l-2-2-1.41 1.41L10 16.66l6-6-1.42-1.42L10 13.83z"/>
  </svg>
);

const stats = [
  { Icon: IconPaper, value: "34",   label: "Research & Publications", color: "#0071BC" },
  { Icon: IconData,  value: "850+", label: "Regulatory Data Points",  color: "#00538A" },
  { Icon: IconMap,   value: "32",   label: "States & UTs Indexed",    color: "#002244" },
  { Icon: IconScore, value: "72%",  label: "Avg. Compliance Score",   color: "#0071BC" },
];

export default function HeroV2() {
  const navigate = useNavigate();

  return (
    <section className="bg-white relative overflow-hidden">
      {/* WB-style top bar: thick navy */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#002244]" />

      {/* Subtle vertical rule pattern */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #0071BC 0px, #0071BC 1px, transparent 1px, transparent 48px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left */}
        <div>
          {/* Eyebrow — WB style uppercase label with left rule */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#0071BC]" />
            <span className="text-[#0071BC] text-xs font-bold uppercase tracking-[0.18em]">
              Centre for Civil Society Initiative
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#002244] leading-[1.1] mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Ranking India's States on{" "}
            <span className="text-[#0071BC]">Ease of Doing Business</span>
          </h1>

          <p className="text-gray-600 text-base leading-relaxed max-w-lg mb-10">
            Tracking regulatory reforms, compliance scores, and business
            environment progress across all Indian states and union territories.
          </p>

          {/* Stat grid — WB style: flat white card, blue icon, no gradients */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {stats.map(({ Icon, value, label, color }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3 hover:border-[#C8793F] hover:shadow-sm transition-all duration-200 group"
              >
                <div
                  className="shrink-0 w-9 h-9 rounded flex items-center justify-center mt-0.5"
                  style={{ background: color + "12", color }}
                >
                  <Icon />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#002244] leading-none mb-0.5">
                    {value}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-8 leading-relaxed">
            India's World Bank Ease of Doing Business Rank:{" "}
            <strong className="text-gray-500">63rd</strong> (2020, latest
            available). Source: World Bank Doing Business Report.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/ranking")}
              className="bg-[#0071BC] hover:bg-[#C8793F] text-white font-bold px-7 py-3 rounded transition-colors duration-200 text-sm tracking-wide"
            >
              View State Rankings →
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border border-[#002244] text-[#002244] hover:bg-[#002244] hover:text-white font-bold px-7 py-3 rounded transition-colors duration-200 text-sm tracking-wide"
            >
              About the Initiative
            </button>
          </div>
        </div>

        {/* Right: India Map */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-2xl" />
          <div className="relative w-full max-w-sm">
            <IndiaMap />
          </div>
        </div>
      </div>
    </section>
  );
}
