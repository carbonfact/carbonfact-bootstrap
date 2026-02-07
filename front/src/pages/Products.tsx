import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ProductSummary } from "../../shared/types";

export function Products() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {product.weight.value}
                  {product.weight.unit}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {product.brand}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                {product.season}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
