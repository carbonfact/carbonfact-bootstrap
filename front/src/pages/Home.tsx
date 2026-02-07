import { BarChart3, Leaf, Package } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-100 rounded-full">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product Carbon Footprint
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the environmental impact of products through detailed
          component analysis and process step tracking.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/products"
          className="flex items-start gap-4 p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className="p-3 bg-blue-100 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">View Products</h2>
            <p className="text-gray-600">
              Browse the product catalog and see detailed breakdowns of
              materials and manufacturing processes.
            </p>
          </div>
        </Link>

        <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow opacity-50">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-gray-600">
              Coming soon: Compare products and track carbon footprint trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
