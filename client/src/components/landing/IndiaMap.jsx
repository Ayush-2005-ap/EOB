import { useEffect, useRef } from "react";
import { statesData } from "../../data/statesData";

export default function IndiaMap({ onHover }) {
  const containerRef = useRef(null);
  const lastStateRef = useRef(null);

  useEffect(() => {
    fetch("/maps/india.svg")
      .then((res) => res.text())
      .then((svgText) => {
        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg");
        svg.setAttribute("class", "w-full h-full");

        const stateGroups = svg.querySelectorAll("g[id]");

        stateGroups.forEach((group) => {
          const id = group.getAttribute("id");
          if (!statesData[id]) return;

          group.style.cursor = "pointer";

          group.addEventListener("mouseenter", (e) => {
            if (lastStateRef.current === id) return; // ✅ KEY FIX
            lastStateRef.current = id;
            onHover(statesData[id], e);
          });

          group.addEventListener("mouseleave", () => {
            lastStateRef.current = null;
            onHover(null);
          });
        });
      });
  }, [onHover]);

  return <div ref={containerRef} className="w-full h-125" />;
}
