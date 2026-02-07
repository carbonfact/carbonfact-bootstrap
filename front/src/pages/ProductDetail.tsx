import { useQuery } from "@tanstack/react-query";
import { Folder, Loader2, Plane, Ship, Train, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import { ComponentList } from "../components/ComponentList";
import { formatName } from "../utils/format";

function TransportIcon({ mode }: { mode: string }) {
  const props = { size: 20, className: "text-gray-600" };
  switch (mode) {
    case "TRUCK":
      return <Truck {...props} />;
    case "AIRPLANE":
      return <Plane {...props} />;
    case "CONTAINER_SHIP":
      return <Ship {...props} />;
    case "TRAIN":
      return <Train {...props} />;
    default:
      return <Truck {...props} />;
  }
}

export function ProductDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: id.length > 0,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">
          Error: {error?.message || "Product not found"}
        </p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/products" className="text-gray-500 hover:text-gray-700">
          ← Back
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <Folder className="w-4 h-4" />
              <span>{formatName(product.category)}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold">
              {product.weight.value}
              {product.weight.unit}
            </p>
            <p className="text-sm text-gray-500">Total weight</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
            {product.brand}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
            {product.season}
          </span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Packaging Weight</p>
            <p className="font-semibold">
              {product.distribution.packagingWeight.value}
              {product.distribution.packagingWeight.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Transport (weighted avg)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {product.distribution.transport.map((t) => (
                <div
                  key={t.mode}
                  className="bg-white p-3 rounded flex items-center gap-3"
                >
                  <TransportIcon mode={t.mode} />
                  <div>
                    <p className="font-semibold">{t.distanceKm} km</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Components</h2>
        <ComponentList
          components={product.components}
          productWeight={product.weight.value}
        />
      </div>
    </div>
  );
}
