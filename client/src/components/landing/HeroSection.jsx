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
    <section className="bg-gray-200 py-8 relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            India Ease of Doing Business
          </h1>

          <p className="mt-3 text-gray-600">
            Tracking reforms, rankings, and experiences across Indian states.
          </p>

          <div className="mt-5 flex gap-3 flex-wrap">
            <span className="px-4 py-2 bg-[#9A4020] text-white rounded-lg text-sm font-semibold">
              2017 Rank: 100
            </span>
            <span className="px-4 py-2 bg-[#9A4020] text-white rounded-lg text-sm font-semibold">
              2016 Rank: 130
            </span>
          </div>

          <button
            onClick={() => navigate("/ranking")}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            India & State Rankings
          </button>
        </div>

        {/* Right Side: Map */}
        <div className="relative flex justify-center">
          <div className="scale-150 origin-center"> {/* ⬅ shrink without crop */}
            <IndiaMap onHover={handleHover} />
          </div>
        </div>

      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-yellow-400 text-black p-3 rounded shadow-lg text-sm z-50 pointer-events-none"
          style={{
            top: position.y - 110,
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
