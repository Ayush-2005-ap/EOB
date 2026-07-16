import { useState, useEffect } from "react";
import { fetchRankings } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Slug map: maps ST_NM from the new GeoJSON to your DB slugs
const NAME_TO_SLUG = {
  "Andaman & Nicobar Island": "andaman_and_nicobar",
  "Andhra Pradesh": "andhra_pradesh",
  "Arunachal Pradesh": "arunachal_pradesh",
  "Assam": "assam",
  "Bihar": "bihar",
  "Chandigarh": "chandigarh",
  "Chhattisgarh": "chhattisgarh",
  "Dadara & Nagar Havelli": "dadra_and_nagar_haveli",
  "Daman & Diu": "daman_and_diu",
  "NCT of Delhi": "delhi",
  "Goa": "goa",
  "Gujarat": "gujarat",
  "Haryana": "haryana",
  "Himachal Pradesh": "himachal_pradesh",
  "Jammu & Kashmir": "jammu_and_kashmir",
  "Jharkhand": "jharkhand",
  "Karnataka": "karnataka",
  "Kerala": "kerala",
  "Lakshadweep": "lakshadweep",
  "Madhya Pradesh": "madhya_pradesh",
  "Maharashtra": "maharashtra",
  "Manipur": "manipur",
  "Meghalaya": "meghalaya",
  "Mizoram": "mizoram",
  "Nagaland": "nagaland",
  "Odisha": "odisha",
  "Puducherry": "puducherry",
  "Punjab": "punjab",
  "Rajasthan": "rajasthan",
  "Sikkim": "sikkim",
  "Tamil Nadu": "tamil_nadu",
  "Telangana": "telangana",
  "Tripura": "tripura",
  "Uttar Pradesh": "uttar_pradesh",
  "Uttarakhand": "uttarakhand",
  "West Bengal": "west_bengal",
  "Ladakh": "ladakh"
};

// No data / no rank color (matches reference image background for Ladakh)
const NO_DATA_COLOR = "#E8EEF4";
const HOVER_OPACITY = "0.75";
const MAX_RANK = 32;

/**
 * Interpolate between dark navy-blue (rank 1) and pale sky-blue (rank MAX_RANK)
 * Rank 1  → #1a3a8f  (deep blue — highest performance)
 * Rank 30+ → #bdd7f0 (pale blue — lowest performance)
 */
function rankToColor(rankNumber) {
  if (!rankNumber) return NO_DATA_COLOR;
  const t = Math.min((rankNumber - 1) / (MAX_RANK - 1), 1); // 0 = best, 1 = worst

  // Deep navy → light sky-blue interpolation (matching reference image)
  const r = Math.round(26  + t * (189 - 26));   // 26 → 189
  const g = Math.round(58  + t * (215 - 58));   // 58 → 215
  const b = Math.round(143 + t * (240 - 143));  // 143 → 240

  return `rgb(${r},${g},${b})`;
}

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null);
  const [rankings, setRankings] = useState({});
  const [geoData, setGeoData] = useState(null);
  const [paths, setPaths] = useState([]);
  const [maxRankLoaded, setMaxRankLoaded] = useState(MAX_RANK);
  const navigate = useNavigate();

  // Load rankings from backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRankings();
        const map = {};
        let max = 0;
        data.forEach((s) => {
          map[s.slug] = s;
          if (s.rankNumber && s.rankNumber > max) max = s.rankNumber;
        });
        setRankings(map);
        if (max > 0) setMaxRankLoaded(max);
      } catch (err) {
        console.error("Failed to load rankings:", err);
      }
    };
    load();
  }, []);

  // Load India GeoJSON (2019 version containing Ladakh and split J&K)
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson"
    )
      .then((r) => r.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data:", err));
  }, []);

  // Project GeoJSON → SVG paths using equirectangular projection
  useEffect(() => {
    if (!geoData) return;

    // Adjusted India bounding box to fit the new coordinates nicely
    const minLon = 68, maxLon = 98, minLat = 6, maxLat = 38;
    const SVG_W = 500, SVG_H = 560;

    const project = ([lon, lat]) => {
      const x = ((lon - minLon) / (maxLon - minLon)) * SVG_W;
      const y = SVG_H - ((lat - minLat) / (maxLat - minLat)) * SVG_H;
      return [x, y];
    };

    const coordsToPath = (coords) =>
      coords
        .map((ring) =>
          ring
            .map(([lon, lat], i) => {
              const [x, y] = project([lon, lat]);
              return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ") + " Z"
        )
        .join(" ");

    const computed = geoData.features.map((feature) => {
      const name = feature.properties.ST_NM || "";
      const slug =
        NAME_TO_SLUG[name] || name.toLowerCase().replace(/\s+/g, "_");

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
    if (!state || !state.rankNumber) return NO_DATA_COLOR;
    return rankToColor(state.rankNumber);
  };

  const handleMouseOver = (slug, name) => {
    const state = rankings[slug];
    setHoveredState(state ? state : { name, slug, noData: true });
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* Loading skeleton */}
      {!geoData && (
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm animate-pulse">
          Loading map…
        </div>
      )}

      {/* SVG Map */}
      {geoData && (
        <svg
          viewBox="0 0 500 560"
          className="w-full h-auto cursor-pointer"
          style={{ filter: "drop-shadow(0 4px 24px rgba(15,30,60,0.10))" }}
          onMouseLeave={() => setHoveredState(null)}
        >
          {paths.map(({ name, slug, d }) =>
            d ? (
              <path
                key={slug}
                d={d}
                fill={getStateColor(slug)}
                stroke="#000000"
                strokeWidth="1"
                className="transition-opacity duration-150"
                style={{
                  opacity: hoveredState?.slug === slug ? HOVER_OPACITY : 1,
                }}
                onMouseOver={() => handleMouseOver(slug, name)}
                onClick={() => {
                  if (rankings[slug]) navigate(`/rankings/${slug}`);
                }}
              />
            ) : null
          )}
        </svg>
      )}

      {/* Gradient Legend */}
      {geoData && (
        <div className="mt-4 px-1">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
              Rank 1
            </span>
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
              Rank {maxRankLoaded}+
            </span>
          </div>
          {/* Gradient bar */}
          <div
            className="h-3 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgb(26,58,143), rgb(189,215,240))",
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400 font-medium">
              Highest Performance
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              Lowest Performance
            </span>
          </div>
          {/* No data swatch */}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-gray-200"
              style={{ background: NO_DATA_COLOR }}
            />
            <span className="text-[10px] text-gray-400 font-medium">
              No ranking data
            </span>
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredState && (
        <div className="absolute top-0 right-0 bg-white/95 backdrop-blur-md p-5 shadow-2xl rounded-2xl border border-gray-100 min-w-[200px] pointer-events-none z-10">
          <h3 className="font-black text-[#0F1E3C] text-lg leading-tight mb-1">
            {hoveredState.name}
          </h3>
          {hoveredState.noData ? (
            <p className="text-xs text-gray-400 font-medium">No ranking data</p>
          ) : (
            <>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E88C30]">
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
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: hoveredState.score,
                        background: rankToColor(hoveredState.rankNumber),
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: rankToColor(hoveredState.rankNumber) }}
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
