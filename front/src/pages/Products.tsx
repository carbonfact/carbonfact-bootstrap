import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Folder, Loader2, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";
import { formatName } from "../utils/format";

export function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading products...</span>
      </div>
    );
  }

  if (error || !products) {
    return (
      <p className="text-red-500">
        Error: {error?.message || "Failed to load"}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="flex items-center gap-4 bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <Folder className="w-3 h-3" />
                <span>{formatName(product.category)}</span>
              </div>
              <div className="mt-3 flex gap-3 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {product.brand}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  {product.season}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {product.weight.value}
                  {product.weight.unit}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
