/** Illustrative snippets for the 3D screens. Written for the portfolio — not production code. */
export const codeSnippets = {
  route: [
    "app.get('/products', async (req, res) => {",
    "  const products = await productService",
    "    .search(req.query);",
    "  return res.json(products);",
    "});",
  ],
  recommend: [
    "const recommendations =",
    "  await recommendationEngine",
    "    .generate(userId);",
  ],
  enrich: [
    "const enrichedProduct =",
    "  await aiService.enrich(product);",
  ],
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
