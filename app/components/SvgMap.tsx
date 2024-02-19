'use client'
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SvgMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const gridSize = 100; // Size of the grid (n x n)
  const unitSize = 20; // Size of each square unit

  useEffect(() => {
    // Ensure D3 code runs only on the client-side
    if (typeof window !== "undefined" && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Attach an SVG image as the map background
      svg.append('image')
        // .attr('href', '/cat.jpg') // Path to your SVG map image
        .attr('transform', 'scale(0.5)')

        const pathsData = [];

    // Calculate the grid's center
    const gridCenterX = (gridSize * unitSize) / 2;
    const gridCenterY = (gridSize * unitSize) / 2;

    // Define the circle at the grid's center
    const circleRadius = gridSize * 2.75; // Example radius, adjust as needed
    const circle = {
        cx: gridCenterX,
        cy: gridCenterY,
        r: circleRadius,
        id: 'center-circle'
    };

    // Generate the grid, excluding squares that overlap with the circle
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * unitSize;
            const y = row * unitSize;

            // Skip squares that overlap with the circle
            if (isInCircle(x, y, gridCenterX, gridCenterY, circleRadius)) {
                continue;
            }

            const d = `M${x} ${y} H${x + unitSize} V${y + unitSize} H${x} Z`;
            const id = `segment-${row * gridSize + col + 1}`;
            pathsData.push({ d, id });
        }
    }

console.log(pathsData);
console.log(circle);

    // const pathsData = [
    //   { d: 'M0 0 H30 V30 H0 Z', id: 'segment-1' },
    //   { d: 'M30 0 H60 V30 H30 Z', id: 'segment-2' },
    //   { d: 'M60 0 H90 V30 H60 Z', id: 'segment-3' },
    //   { d: 'M90 0 H120 V30 H90 Z', id: 'segment-4' },
    //   { d: 'M0 30 H30 V60 H0 Z', id: 'segment-5' },
    //   { d: 'M30 30 H60 V60 H30 Z', id: 'segment-6' },
    //   { d: 'M60 30 H90 V60 H60 Z', id: 'segment-7' },
    //   { d: 'M90 30 H120 V60 H90 Z', id: 'segment-8' },
    //   { d: 'M0 60 H30 V90 H0 Z', id: 'segment-9' },
    //   { d: 'M30 60 H60 V90 H30 Z', id: 'segment-10' },
    //   { d: 'M60 60 H90 V90 H60 Z', id: 'segment-11' },
    //   { d: 'M90 60 H120 V90 H90 Z', id: 'segment-12' },
    //   { d: 'M0 90 H30 V120 H0 Z', id: 'segment-13' },
    //   { d: 'M30 90 H60 V120 H30 Z', id: 'segment-14' },
    //   { d: 'M60 90 H90 V120 H60 Z', id: 'segment-15' },
    //   { d: 'M90 90 H120 V120 H90 Z', id: 'segment-16' }
    // ];

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

    // Function to check if a square overlaps with the circle
    function isInCircle(squareX: number, squareY: number, circleX: number, circleY: number, circleRadius: number) {
      // Check the distance of the square's center from the circle's center
      const squareCenterX = squareX + unitSize / 2;
      const squareCenterY = squareY + unitSize / 2;
      const distance = Math.sqrt((squareCenterX - circleX) ** 2 + (squareCenterY - circleY) ** 2);
  
      // If the distance is less than the radius, the square overlaps with the circle
      return distance < circleRadius + unitSize / 2;
    }

  return (
    <svg ref={svgRef} width="1192" height="1192" viewBox="0 0 1192 1192">
      {/* Paths will be appended dynamically by D3.js */}
    </svg>
  );
};

export default SvgMap;
