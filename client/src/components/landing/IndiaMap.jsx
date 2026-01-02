import { useEffect, useRef } from "react";
import { statesData } from "../../data/statesData";

export default function IndiaMap({ onHover }) {
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/maps/india.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg");
        if (!svg) return;

        svg.setAttribute("class", "w-full h-full");

        const stateGroups = svg.querySelectorAll("g[id]");

        stateGroups.forEach((group) => {
          const id = group.getAttribute("id");

          if (!statesData[id]) return;

          group.style.cursor = "pointer";

          group.addEventListener("mouseenter", (e) => {
            group.style.opacity = "0.75";
            onHover(statesData[id], e);
          });

          group.addEventListener("mouseleave", () => {
            group.style.opacity = "1";
            onHover(null);
          });
        });
      });
  }, [onHover]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px]"
    />
  );
}
