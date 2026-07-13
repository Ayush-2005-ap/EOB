import { BookOpen, BarChart2, MapPin, CheckCircle } from "lucide-react";
import IndiaMap from "./IndiaMap";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    icon: BookOpen,
    value: "34",
    label: "Research & Publications",
  },
  {
    icon: BarChart2,
    value: "850+",
    label: "Regulatory Data Points",
  },
  {
    icon: MapPin,
    value: "32",
    label: "States & UTs Indexed",
  },
  {
    icon: CheckCircle,
    value: "72%",
    label: "Avg. Compliance Score",
  },
];

export default function HeroV2() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAFAFA] relative overflow-hidden">
      {/* Navy top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F1E3C]" />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0F1E3C 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text + Stats */}
        <div>
          {/* Eyebrow */}
          <span className="inline-block text-[#E88C30] text-xs font-black uppercase tracking-widest mb-4">
            Centre for Civil Society Initiative
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black text-[#0F1E3C] leading-[1.1] mb-5">
            Ranking India's States on{" "}
            <span className="relative inline-block">
              Ease of Doing Business
              <span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #E88C30, transparent)",
                }}
              />
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-10">
            Tracking regulatory reforms, compliance scores, and business
            environment progress across all Indian states and union territories.
          </p>

          {/* Stat cards row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-3"
              >
                <div className="mt-0.5 shrink-0">
                  <Icon size={18} className="text-[#E88C30]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-3xl font-black text-[#0F1E3C] leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dated citation */}
          <p className="text-xs text-gray-400 mb-8">
            India's World Bank Ease of Doing Business Rank:{" "}
            <strong className="text-gray-500">63rd</strong> (2020, latest
            available). Source: World Bank Doing Business Report.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/ranking")}
              className="bg-[#E88C30] hover:bg-[#d07a20] text-white font-bold px-7 py-3 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md text-sm"
            >
              View State Rankings →
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border border-[#0F1E3C] text-[#0F1E3C] hover:bg-[#0F1E3C] hover:text-white font-bold px-7 py-3 rounded-xl transition-colors duration-200 text-sm"
            >
              About the Initiative
            </button>
          </div>
        </div>

        {/* Right: India Map */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent rounded-3xl" />
          <div className="relative w-full max-w-sm">
            <IndiaMap />
          </div>
        </div>
      </div>
    </section>
  );
}
