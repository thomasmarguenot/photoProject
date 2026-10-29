import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

type TechCategory = 'frontend' | 'mobile' | 'backend' | 'tooling';

export interface TechNode extends SimulationNodeDatum {
  id: string;
  category: TechCategory;
  size: number;
}

// Links are built with resolved node objects, never ids or indices.
export interface TechLink extends SimulationLinkDatum<TechNode> {
  source: TechNode;
  target: TechNode;
}
