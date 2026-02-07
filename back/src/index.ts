import { Hono } from "hono";
import { cors } from "hono/cors";
import { readdir } from "node:fs/promises";
import { getProduct } from "./transform";
import type { RawProduct } from "./types";

const app = new Hono();

app.use("/*", cors());

async function loadAllProducts() {
  const dataDir = "../data";
  const files = await readdir(dataDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const products = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = (await Bun.file(`${dataDir}/${file}`).json()) as RawProduct;
      return getProduct(raw);
    }),
  );

  return products;
}

app.get("/api/products", async (c) => {
  const products = await loadAllProducts();
  return c.json(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      brand: p.brand,
      season: p.season,
      weight: p.weight,
    })),
  );
});

app.get("/api/products/:id", async (c) => {
  const products = await loadAllProducts();
  const product = products.find((p) => p.id === c.req.param("id"));
  if (!product) {
    return c.json({ error: "Product not found" }, 404);
  }
  return c.json(product);
});

export default {
  port: 3001,
  fetch: app.fetch,
};

console.log("Server running on http://localhost:3001");
