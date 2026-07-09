import IndiaMap from "./IndiaMap";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const navigate = useNavigate();



  return (
    <section className="bg-gray-200 py-12 relative overflow-hidden">
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
        <div className="relative flex justify-center items-center">
          <IndiaMap />
        </div>

      </div>


    </section>
  );
}
