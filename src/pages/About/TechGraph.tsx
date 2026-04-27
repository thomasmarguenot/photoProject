import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { fadeOpacityVariants } from '@/utils/animations';

import './TechGraph.css';
import type { TechLink, TechNode } from './TechGraph.types';

const RAW_NODES: Array<Omit<TechNode, 'index'>> = [
  { id: 'React', category: 'frontend', size: 36 },
  { id: 'TypeScript', category: 'frontend', size: 32 },
  { id: 'React Native', category: 'mobile', size: 30 },
  { id: 'Node.js', category: 'backend', size: 28 },
  { id: 'Next.js', category: 'frontend', size: 22 },
  { id: 'Redux Toolkit', category: 'frontend', size: 20 },
  { id: 'Vite', category: 'tooling', size: 18 },
  { id: 'Tailwind', category: 'frontend', size: 18 },
  { id: 'Storybook', category: 'tooling', size: 18 },
  { id: 'Framer Motion', category: 'frontend', size: 18 },
  { id: 'GraphQL', category: 'backend', size: 18 },
  { id: 'REST', category: 'backend', size: 16 },
  { id: 'Express', category: 'backend', size: 16 },
  { id: 'Jest', category: 'tooling', size: 18 },
  { id: 'CI/CD', category: 'tooling', size: 16 },
  { id: 'Auth0', category: 'backend', size: 16 },
];

const RAW_LINKS: Array<{ source: string; target: string }> = [
  { source: 'React', target: 'TypeScript' },
  { source: 'React', target: 'React Native' },
  { source: 'React', target: 'Next.js' },
  { source: 'React', target: 'Redux Toolkit' },
  { source: 'React', target: 'Tailwind' },
  { source: 'React', target: 'Storybook' },
  { source: 'React', target: 'Framer Motion' },
  { source: 'React', target: 'Vite' },
  { source: 'React', target: 'Jest' },
  { source: 'TypeScript', target: 'Node.js' },
  { source: 'TypeScript', target: 'React Native' },
  { source: 'Node.js', target: 'Express' },
  { source: 'Node.js', target: 'GraphQL' },
  { source: 'Node.js', target: 'REST' },
  { source: 'Node.js', target: 'Jest' },
  { source: 'Node.js', target: 'Auth0' },
  { source: 'Next.js', target: 'GraphQL' },
  { source: 'Express', target: 'REST' },
  { source: 'CI/CD', target: 'Jest' },
  { source: 'CI/CD', target: 'Storybook' },
];

const WIDTH = 800;
const HEIGHT = 560;

/** Quadratic bezier path between two nodes — gentle arc for visual elegance. */
function buildCurve(s: TechNode, t: TechNode): string {
  const sx = s.x ?? 0;
  const sy = s.y ?? 0;
  const tx = t.x ?? 0;
  const ty = t.y ?? 0;
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  const dx = tx - sx;
  const dy = ty - sy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const offset = dist * 0.12;
  const cx = mx + (-dy / dist) * offset;
  const cy = my + (dx / dist) * offset;
  return `M ${sx},${sy} Q ${cx},${cy} ${tx},${ty}`;
}

export function TechGraph() {
  const data = useMemo(() => {
    const nodes: TechNode[] = RAW_NODES.map((n) => ({ ...n }));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const links: TechLink[] = RAW_LINKS.map((l) => ({
      source: byId.get(l.source) as TechNode,
      target: byId.get(l.target) as TechNode,
    }));
    return { nodes, links };
  }, []);

  const [, force] = useState(0);
  const simRef = useRef<ReturnType<typeof forceSimulation<TechNode>> | null>(
    null
  );
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const sim = forceSimulation<TechNode>(data.nodes)
      .force(
        'link',
        forceLink<TechNode, TechLink>(data.links)
          .id((d) => d.id)
          .distance(120)
          .strength(0.5)
      )
      .force('charge', forceManyBody().strength(-580))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force(
        'collide',
        forceCollide<TechNode>().radius((d) => d.size + 28)
      )
      .force('x', forceX(WIDTH / 2).strength(0.07))
      .force('y', forceY(HEIGHT / 2).strength(0.1))
      .alphaDecay(0.025)
      .on('tick', () => force((n) => n + 1));

    simRef.current = sim;
    return () => {
      sim.stop();
    };
  }, [data]);

  const adjacentIds = useMemo(() => {
    if (!hovered) return new Set<string>();
    const set = new Set<string>([hovered]);
    data.links.forEach((l) => {
      const s = (l.source as TechNode).id;
      const t = (l.target as TechNode).id;
      if (s === hovered) set.add(t);
      if (t === hovered) set.add(s);
    });
    return set;
  }, [hovered, data.links]);

  return (
    <motion.div
      className="tech-graph"
      variants={fadeOpacityVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="tech-graph-svg"
        role="img"
        aria-label="Graphe des technologies"
      >
        <g className="tech-graph-links">
          {data.links.map((link, i) => {
            const s = link.source as TechNode;
            const t = link.target as TechNode;
            const dim =
              hovered !== null &&
              !(adjacentIds.has(s.id) && adjacentIds.has(t.id));
            const active =
              hovered !== null && (s.id === hovered || t.id === hovered);
            return (
              <path
                key={i}
                d={buildCurve(s, t)}
                className={`tech-link ${dim ? 'is-dim' : ''} ${active ? 'is-active' : ''}`}
              />
            );
          })}
        </g>

        <g className="tech-graph-nodes">
          {data.nodes.map((node) => {
            const dim = hovered !== null && !adjacentIds.has(node.id);
            const isHovered = hovered === node.id;
            const isHub = node.size >= 28;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x ?? 0}, ${node.y ?? 0})`}
                className={`tech-node tech-node--${node.category} ${dim ? 'is-dim' : ''} ${isHovered ? 'is-hovered' : ''} ${isHub ? 'is-hub' : ''}`}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle r={node.size} className="tech-node-circle" />
                <text
                  className="tech-node-label"
                  dy={node.size + 18}
                  textAnchor="middle"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
}

export default TechGraph;
