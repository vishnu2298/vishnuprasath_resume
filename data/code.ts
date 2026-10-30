/** Illustrative code for the laptop screen in the 3D scene. Written for the portfolio — not production code. */
export const codeSnippets = {
  laptop: [
    "// services/search.service.ts",
    "export async function search(query) {",
    "  const intent = await parseIntent(query);",
    "  const local = await es.search(intent);",
    "  const fresh = await external.find(intent);",
    "  return rank(merge(local, fresh));",
    "}",
    "",
    "// workers/enrich.worker.ts",
    "queue.process('enrich', async (job) => {",
    "  const product = await repo.get(job.id);",
    "  return aiService.enrich(product);",
    "});",
  ],
};

export const monitorArchitecture = [
  "Client",
  "API Gateway",
  "Node.js Services",
  "MongoDB",
  "Elasticsearch",
  "AI / Python",
  "External APIs",
];
