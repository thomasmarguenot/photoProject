import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

export type TechCategory = 'frontend' | 'mobile' | 'backend' | 'tooling';

export interface TechNode extends SimulationNodeDatum {
  id: string;
  category: TechCategory;
  size: number;
}

export type TechLink = SimulationLinkDatum<TechNode>;

export interface TechGraphData {
  nodes: TechNode[];
  links: TechLink[];
}
