export const nodeTypes = ['philosopher', 'concept', 'tradition', 'book'] as const;
export type NodeType = typeof nodeTypes[number];
export type AtlasNode = { id: string; label: string; type: NodeType; description: string; x: number; y: number; initial?: boolean };
export type Reference = { title: string; locator: string; url: string };
export type Relationship = { id: string; source: string; target: string; type: 'authorship' | 'discusses' | 'association' | 'comparison'; explanation: string; evidence: 'sourced' | 'illustrative' | 'inferred'; sources: Reference[] };
export function neighbors(id: string, edges: Relationship[]) { return edges.flatMap(e => e.source === id ? [e.target] : e.target === id ? [e.source] : []); }
