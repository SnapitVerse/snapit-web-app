"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useRouter } from "next/navigation";

import pathData from "../fixtures/mapPaths.json";

const SvgMap: React.FC = () => {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 1024;
  const height = 1024;

  useEffect(() => {
    const handleMapSegmentClick = (segmentI: string) => {
      // Update the URL with the selected segment ID as a query parameter
      router.push(`?selectedSegment=${segmentI}`, { scroll: false });
    };
    // Ensure D3 code runs only on the client-side
    if (typeof window !== "undefined" && svgRef.current) {
      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");
      // .on("click", () => {
      //   svg
      //     .transition()
      //     .duration(750)
      //     .call(
      //       zoom.transform as any,
      //       d3.zoomIdentity,
      //       d3.zoomTransform(svg.node() as any).invert([width / 2, height / 2])
      //     );
      // });

      const g = svg.append("g");

      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          const { transform } = event;
          g.attr("transform", transform);
          g.attr("stroke-width", 1 / transform.k);
        });

      // Attach an image as the map background
      g.append("image").attr("href", "/mapdemo.png");

      zoom.translateExtent([
        [0, 0],
        [width, height],
      ]);

      svg.call(zoom as any);

      // Create and style paths based on pathsData
      pathData.forEach((path) => {
        g.append("path")
          .attr("d", path.d)
          .attr("id", path.id)
          .attr("transform", "translate(205,114)")
          // .style("stroke", "red")
          // .style("stroke-width", "5")
          //   .style('pointer-events', 'all')
          .style("fill", "transparent")
          .style("fill-rule", "evenodd")
          .on("mouseenter", function () {
            // d3.select(this).style('stroke', 'red'); // Highlight on hover
            d3.select(this)
              .transition()
              .duration(300)
              .style("fill", "rgba(200,200,200,0.7)"); // Highlight on hover
          })
          .on("mouseleave", function () {
            d3.select(this).interrupt().style("fill", "transparent"); // Revert on mouse leave
          })
          .on("click", function () {
            d3.selectAll("path")
              .style("stroke", null)
              .style("stroke-width", null);
            handleMapSegmentClick(path.id);
            d3.select(this).style("stroke", "blue").style("stroke-width", "5");
          });
      });
    }
  }, []);

  return (
    <div className="map-container rounded-2xl">
      <svg ref={svgRef} width="%100" height="%100">
        {/* Paths will be appended dynamically by D3.js */}
      </svg>
    </div>
  );
};

export default SvgMap;
