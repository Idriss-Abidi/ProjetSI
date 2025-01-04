import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface PieChartProps {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  colors: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height, colors }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal<string>().range(colors);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    // Draw slices
    arcs
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d, i) => color(d.data.label) as string);

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.label)
      .style("font-size", "12px")
      .style("fill", "#fff");
  }, [data, width, height, colors]);

  return <svg ref={svgRef} />;
};

export default PieChart;
