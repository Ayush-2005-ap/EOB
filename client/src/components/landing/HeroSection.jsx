import { useState } from "react";
import IndiaMap from "./IndiaMap";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

  const handleHover = (data, event) => {
    if (!data) {
      setTooltip(null);
      return;
    }

    setTooltip(data);
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <section className="bg-gray-200 py-16 relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            India Ease of Doing Business
          </h1>

          <p className="mt-4 text-gray-600">
            Tracking reforms, rankings, and experiences across Indian states.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <span className="px-4 py-2 bg-[#9A4020] text-white rounded-lg text-sm font-semibold">
              2017 Rank: 100
            </span>
            <span className="px-4 py-2 bg-[#9A4020] text-white rounded-lg text-sm font-semibold">
              2016 Rank: 130
            </span>
          </div>

          <button onClick={() => navigate('/ranking')} className="mt-8 bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer text-black px-6 py-3 rounded-lg font-semibold transition">
            India & State Rankings
          </button>
        </div>

        {/* Right Side: Interactive India Map */}
        <div className="relative">
          <IndiaMap onHover={handleHover} />
        </div>

      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-yellow-400 text-black p-4 rounded shadow-lg text-sm z-50 pointer-events-none"
          style={{
            top: position.y - 120,
            left: position.x - 80,
          }}
        >
          <p className="font-bold">{tooltip.name}</p>
          <p>Rank: {tooltip.rank}</p>
          <p>Score: {tooltip.score}</p>
        </div>
      )}
    </section>
  );
}
