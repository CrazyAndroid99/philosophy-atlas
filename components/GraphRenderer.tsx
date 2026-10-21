'use client';
import cytoscape, { type Core } from 'cytoscape';
import { useEffect, useRef } from 'react';
import type { AtlasNode, Relationship } from '../lib/graph';
import { visualSettings as theme, graphStyles } from '../lib/theme';
type Props = { nodes: AtlasNode[]; edges: Relationship[]; selected: string; onSelect: (id: string) => void; reset: number; zoom: number };
export default function GraphRenderer({ nodes, edges, selected, onSelect, reset, zoom }: Props) {
 const container = useRef<HTMLDivElement>(null); const graph = useRef<Core | null>(null);
 const callback = useRef(onSelect); callback.current = onSelect;
 useEffect(() => {
  const cy = cytoscape({ container: container.current, elements: [], minZoom: theme.minZoom, maxZoom: theme.maxZoom, wheelSensitivity: 0.2,
   style: graphStyles });
  cy.on('tap','node, edge', e => callback.current(e.target.id()));
  graph.current = cy;
  const observer = new ResizeObserver(() => cy.resize()); observer.observe(container.current!);
  return () => { observer.disconnect(); cy.destroy(); };
 }, []);
 useEffect(() => {
  const cy = graph.current!;
  const positions = new Map(cy.nodes().map(n => [n.id(), n.position()]));
  cy.elements().remove();
  cy.add([...nodes.map(n => ({ data: { ...n, color: theme.colors[n.type] }, position: positions.get(n.id) ?? {x:n.x,y:n.y} })), ...edges.map(e => ({ data:e }))]);
  if (!positions.size) cy.fit(undefined, theme.fitPadding);
 }, [nodes,edges]);
 useEffect(() => { const cy = graph.current!; cy.elements().removeClass('active'); cy.getElementById(selected).addClass('active'); },[selected,nodes,edges]);
 useEffect(() => { graph.current?.fit(undefined,theme.fitPadding); },[reset]);
 useEffect(() => { const cy = graph.current!; if (zoom) cy.zoom({level: Math.max(theme.minZoom,Math.min(theme.maxZoom,cy.zoom() * (zoom > 0 ? 1.25 : 0.8))), renderedPosition:{x:cy.width()/2,y:cy.height()/2}}); },[zoom]);
 return <div ref={container} className="graph" role="img" aria-label="Interactive philosophy constellation. Use the searchable node list and details panel for keyboard access." />;
}
