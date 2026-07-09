import { useState, useEffect } from "react";
import { fetchRankings } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Slug map: maps state names from TopoJSON to your DB slugs
const NAME_TO_SLUG = {
  "Andaman and Nicobar": "andaman_and_nicobar",
  "Andhra Pradesh": "andhra_pradesh",
  "Arunachal Pradesh": "arunachal_pradesh",
  Assam: "assam",
  Bihar: "bihar",
  Chandigarh: "chandigarh",
  Chhattisgarh: "chhattisgarh",
  "Dadra and Nagar Haveli": "dadra_and_nagar_haveli",
  "Daman and Diu": "daman_and_diu",
  Delhi: "delhi",
  Goa: "goa",
  Gujarat: "gujarat",
  Haryana: "haryana",
  "Himachal Pradesh": "himachal_pradesh",
  "Jammu and Kashmir": "jammu_and_kashmir",
  Jharkhand: "jharkhand",
  Karnataka: "karnataka",
  Kerala: "kerala",
  Lakshadweep: "lakshadweep",
  "Madhya Pradesh": "madhya_pradesh",
  Maharashtra: "maharashtra",
  Manipur: "manipur",
  Meghalaya: "meghalaya",
  Mizoram: "mizoram",
  Nagaland: "nagaland",
  Odisha: "odisha",
  Puducherry: "puducherry",
  Punjab: "punjab",
  Rajasthan: "rajasthan",
  Sikkim: "sikkim",
  "Tamil Nadu": "tamil_nadu",
  Telangana: "telangana",
  Tripura: "tripura",
  "Uttar Pradesh": "uttar_pradesh",
  Uttarakhand: "uttarakhand",
  "West Bengal": "west_bengal",
};

const STATUS_COLORS = {
  "Top Performer": "#059669",
  "Acceleration Required": "#2563EB",
  "Jump-Start Needed": "#DC2626",
};

const DEFAULT_COLOR = "#D1D5DB";
const HOVER_OPACITY = "0.75";

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null);
  const [rankings, setRankings] = useState({});
  const [geoData, setGeoData] = useState(null);
  const [paths, setPaths] = useState([]);
  const navigate = useNavigate();

  // Load rankings from backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        const map = {};
        data.forEach((s) => {
          map[s.slug] = s;
        });
        setRankings(map);
      } catch (err) {
        console.error("Failed to load rankings:", err);
      }
    };
    load();
  }, []);

  // Load India GeoJSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
    )
      .then((r) => r.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data:", err));
  }, []);

  // Project GeoJSON -> SVG paths using a simple equirectangular projection
  useEffect(() => {
    if (!geoData) return;

    // India bounding box approx: lon 68-98, lat 6-38
    const minLon = 68,
      maxLon = 98,
      minLat = 6,
      maxLat = 38;
    const SVG_W = 500,
      SVG_H = 560;

    const project = ([lon, lat]) => {
      const x = ((lon - minLon) / (maxLon - minLon)) * SVG_W;
      const y = SVG_H - ((lat - minLat) / (maxLat - minLat)) * SVG_H;
      return [x, y];
    };

    const coordsToPath = (coords) => {
      return coords
        .map((ring) =>
          ring
            .map(([lon, lat], i) => {
              const [x, y] = project([lon, lat]);
              return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ") + " Z"
        )
        .join(" ");
    };

    const computed = geoData.features.map((feature) => {
      const name =
        feature.properties.NAME_1 ||
        feature.properties.ST_NM ||
        feature.properties.name ||
        "";
      const slug = NAME_TO_SLUG[name] || name.toLowerCase().replace(/\s+/g, "_");

      let d = "";
      const geom = feature.geometry;
      if (geom.type === "Polygon") {
        d = coordsToPath(geom.coordinates);
      } else if (geom.type === "MultiPolygon") {
        d = geom.coordinates.map((poly) => coordsToPath(poly)).join(" ");
      }

      return { name, slug, d };
    });

    setPaths(computed);
  }, [geoData]);

  const getStateColor = (slug) => {
    const state = rankings[slug];
    if (!state) return DEFAULT_COLOR;
    return STATUS_COLORS[state.status] || "#9A4020";
  };

  const handleMouseOver = (slug, name) => {
    const state = rankings[slug];
    setHoveredState(state ? state : { name, slug, noData: true });
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3 text-xs font-semibold">
        {Object.entries(STATUS_COLORS).map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: DEFAULT_COLOR }}
          />
          No Data
        </span>
      </div>

      {!geoData && (
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
          Loading map…
        </div>
      )}

      {geoData && (
        <svg
          viewBox="0 0 500 560"
          className="w-full h-auto cursor-pointer drop-shadow-xl"
          onMouseLeave={() => setHoveredState(null)}
        >
          {paths.map(({ name, slug, d }) =>
            d ? (
              <path
                key={slug}
                d={d}
                fill={getStateColor(slug)}
                stroke="#fff"
                strokeWidth="0.8"
                className="transition-opacity duration-200"
                style={{ opacity: hoveredState?.slug === slug ? HOVER_OPACITY : 1 }}
                onMouseOver={() => handleMouseOver(slug, name)}
                onClick={() => {
                  if (rankings[slug]) navigate(`/rankings/${slug}`);
                }}
              />
            ) : null
          )}
        </svg>
      )}

      {/* Hover Tooltip */}
      {hoveredState && (
        <div className="absolute top-0 right-0 bg-white/95 backdrop-blur-md p-5 shadow-2xl rounded-2xl border border-gray-100 min-w-[200px] pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">
            {hoveredState.name}
          </h3>
          {hoveredState.noData ? (
            <p className="text-xs text-gray-400 font-medium">No ranking data</p>
          ) : (
            <>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A4020]">
                Rank #{hoveredState.rankNumber}
              </span>
              <div className="mt-3 space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-1">
                    <span>Score</span>
                    <span>{hoveredState.score}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: hoveredState.score }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        STATUS_COLORS[hoveredState.status] || "#9A4020",
                    }}
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {hoveredState.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-[10px] font-bold text-gray-400 animate-pulse">
                CLICK TO VIEW DETAILS →
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
