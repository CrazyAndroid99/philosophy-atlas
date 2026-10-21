import type { StylesheetJson } from 'cytoscape';
import type { NodeType } from './graph';
export const visualSettings = {
  colors: { philosopher: '#c1a0ff', concept: '#6edbcc', tradition: '#edae72', book: '#85baff' } satisfies Record<NodeType, string>,
  minZoom: 0.15, maxZoom: 2.5, fitPadding: 65,
};

export const graphStyles: StylesheetJson = [
    { selector: 'node', style: { label: 'data(label)', 'background-color': 'data(color)', width: 15, height: 15, 'border-width': 7, 'border-color': 'data(color)', 'border-opacity': 0.12, color: '#d9dfed', 'font-size': 18, 'text-valign': 'bottom', 'text-margin-y': 12, 'text-background-color': '#0c1220', 'text-background-opacity': 0.85, 'text-background-padding': '3px' } },
    { selector: 'node[type="philosopher"]', style: { width: 23, height: 23, 'font-size': 20 } },
    { selector: 'node[type="book"]', style: { shape: 'round-rectangle' } },
    { selector: 'edge', style: { width: 1.2, 'line-color': '#39465d', 'curve-style': 'bezier', 'overlay-padding': 12 } },
    { selector: 'edge[evidence="illustrative"], edge[evidence="inferred"]', style: { 'line-style': 'dashed' } },
    { selector: '.active', style: { 'border-width': 10, 'border-opacity': 0.4, 'line-color': '#d7c4ff', width: 3 } },
    { selector: 'node.active', style: { width: 28, height: 28, color: '#fff' } },
   ];
