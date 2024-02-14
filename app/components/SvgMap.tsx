'use client'
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SvgMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Ensure D3 code runs only on the client-side
    if (typeof window !== "undefined" && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Attach an SVG image as the map background
      svg.append('image')
        .attr('href', '/cat.jpg') // Path to your SVG map image
        .attr('transform', 'scale(0.5)')

      // Define interactive paths separately
    //   const pathsData = [
    //     { d: 'M297,1v296H1V1h296M298,0H0v298h298V0h0Z', id: 'segment-1' },
    //     { d: 'M595,1v296h-296V1h296M596,0h-298v298h298V0h0Z', id: 'segment-2' },
    //     { d: 'M297,299v296H1v-296h296M298,298H0v298h298v-298h0Z', id: 'segment-3' },
    //     { d: 'M595,299v296h-296v-296h296M596,298h-298v298h298v-298h0Z', id: 'segment-4' },
    //     { d: 'M893,1v296h-296V1h296M894,0h-298v298h298V0h0Z', id: 'segment-5' },
    //     { d: 'M1191,1v296h-296V1h296M1192,0h-298v298h298V0h0Z', id: 'segment-6' },
    //     { d: 'M893,299v296h-296v-296h296M894,298h-298v298h298v-298h0Z', id: 'segment-7' },
    //     { d: 'M1191,299v296h-296v-296h296M1192,298h-298v298h298v-298h0Z', id: 'segment-8' },
    //     { d: 'M297,597v296H1v-296h296M298,596H0v298h298v-298h0Z', id: 'segment-9' },
    //     { d: 'M595,597v296h-296v-296h296M596,596h-298v298h298v-298h0Z', id: 'segment-10' },
    //     { d: 'M297,895v296H1v-296h296M298,894H0v298h298v-298h0Z', id: 'segment-11' },
    //     { d: 'M595,895v296h-296v-296h296M596,894h-298v298h298v-298h0Z', id: 'segment-12' },
    //     { d: 'M893,597v296h-296v-296h296M894,596h-298v298h298v-298h0Z', id: 'segment-13' },
    //     { d: 'M1191,597v296h-296v-296h296M1192,596h-298v298h298v-298h0Z', id: 'segment-14' },
    //     { d: 'M893,895v296h-296v-296h296M894,894h-298v298h298v-298h0Z', id: 'segment-15' },
    //     { d: 'M1191,895v296h-296v-296h296M1192,894h-298v298h298v-298h0Z', id: 'segment-16' },
    //     // Add more path data objects with 'd' and 'id' properties
    //   ];

      const pathsData = [
        { d: 'M1 1 H297 V297 H1 Z', id: 'segment-1' },
        { d: 'M298 1 H595 V297 H298 Z', id: 'segment-2' },
        { d: 'M1 298 H297 V595 H1 Z', id: 'segment-3' },
        { d: 'M298 298 H595 V595 H298 Z', id: 'segment-4' },
        { d: 'M596 1 H893 V297 H596 Z', id: 'segment-5' },
        { d: 'M894 1 H1191 V297 H894 Z', id: 'segment-6' },
        { d: 'M596 298 H893 V595 H596 Z', id: 'segment-7' },
        { d: 'M894 298 H1191 V595 H894 Z', id: 'segment-8' },
        // Continue for the remaining segments...
      ];

      // Create and style paths based on pathsData
      pathsData.forEach(pathData => {
        svg.append('path')
          .attr('d', pathData.d)
          .attr('id', pathData.id)
          .attr('transform', 'scale(0.5)')
          .style('stroke', 'blue')
        //   .style('stroke-width', '5')
        //   .style('pointer-events', 'all')
          .style('fill', 'transparent')
          .style('fill-rule', 'evenodd')
          .on('mouseenter', function() {
            // d3.select(this).style('stroke', 'red'); // Highlight on hover
            d3.select(this).style('fill', 'red'); // Highlight on hover
          })
          .on('mouseleave', function() {
            d3.select(this).style('fill', 'transparent'); // Revert on mouse leave
          });
      });
    }
  }, []);

  return (
    <svg ref={svgRef} width="1192" height="1192" viewBox="0 0 1192 1192">
      {/* Paths will be appended dynamically by D3.js */}
    </svg>
  );
};

export default SvgMap;
