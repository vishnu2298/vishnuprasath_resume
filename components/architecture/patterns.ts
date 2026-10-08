import type { PatternId } from "@/data/thinking";

export type Shape = "screen" | "box" | "gateway" | "db" | "ai" | "external";
export type LabNode = { id: string; label: string; shape: Shape };

export const labNodes: LabNode[] = [
  { id: "client", label: "Client", shape: "screen" },
  { id: "app", label: "Node Application", shape: "box" },
  { id: "mongo", label: "MongoDB", shape: "db" },
  { id: "gateway", label: "API Gateway", shape: "gateway" },
  { id: "svc-app", label: "App Service", shape: "box" },
  { id: "svc-search", label: "Search Service", shape: "box" },
  { id: "svc-product", label: "Product Service", shape: "box" },
  { id: "svc-analytics", label: "Analytics Service", shape: "box" },
  { id: "svc-ai", label: "AI Service", shape: "ai" },
  { id: "svc-notify", label: "Notification Service", shape: "box" },
  { id: "api", label: "API", shape: "gateway" },
  { id: "data", label: "Data Services", shape: "db" },
  { id: "search", label: "Search", shape: "box" },
  { id: "ailayer", label: "AI Layer", shape: "ai" },
  { id: "external", label: "External Intelligence APIs", shape: "external" },
];

type V3 = [number, number, number];

export const patterns: Record<PatternId, { positions: Record<string, V3>; edges: [string, string][]; flow: string[] }> = {
  monolith: {
    positions: { client: [0, 2.2, 0], app: [0, 0.2, 0], mongo: [0, -1.9, 0] },
    edges: [
      ["client", "app"],
      ["app", "mongo"],
    ],
    flow: ["Client", "Node Application", "MongoDB"],
  },
  microservices: {
    positions: {
      client: [0, 2.7, 0],
      gateway: [0, 1.3, 0],
      "svc-app": [-4.0, -0.6, -0.6],
      "svc-search": [-2.4, -1.7, 0.4],
      "svc-product": [-0.8, -0.6, 0.9],
      "svc-analytics": [0.8, -1.7, 0.9],
      "svc-ai": [2.4, -0.6, 0.4],
      "svc-notify": [4.0, -1.7, -0.6],
    },
    edges: [
      ["client", "gateway"],
      ["gateway", "svc-app"],
      ["gateway", "svc-search"],
      ["gateway", "svc-product"],
      ["gateway", "svc-analytics"],
      ["gateway", "svc-ai"],
      ["gateway", "svc-notify"],
    ],
    flow: ["Client", "API Gateway", "App · Search · Product · Analytics · AI · Notification services"],
  },
  ai: {
    positions: {
      client: [0, 3.0, 0],
      api: [0, 1.85, 0],
      data: [-1.5, 0.7, 0.5],
      search: [1.5, -0.35, 0.2],
      ailayer: [0, -1.5, -0.4],
      external: [0, -2.9, -1.1],
    },
    edges: [
      ["client", "api"],
      ["api", "data"],
      ["data", "search"],
      ["search", "ailayer"],
      ["ailayer", "external"],
    ],
    flow: ["Client", "API", "Data Services", "Search", "AI Layer", "External Intelligence APIs"],
  },
};
