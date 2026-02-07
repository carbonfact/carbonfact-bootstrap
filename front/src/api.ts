import type { Product, ProductSummary } from "../../shared/types";

const BASE_URL = "http://localhost:3001/api";

export async function getProducts(): Promise<ProductSummary[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}
