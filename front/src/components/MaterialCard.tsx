import { Hexagon } from "lucide-react";
import type { Material } from "../../../shared/types";
import { formatName } from "../utils/format";

interface MaterialCardProps {
  material: Material;
  componentWeight: number;
}

export function MaterialCard({ material, componentWeight }: MaterialCardProps) {
  const weight = (componentWeight * material.proportion) / 100;

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 ml-4 pl-4 border-l-2 border-gray-200">
      <div className="flex items-center gap-2">
        <Hexagon className="w-3 h-3 text-amber-500 fill-amber-100" />
        <p className="text-gray-700">{formatName(material.name)}</p>
      </div>
      <div className="text-right">
        <p className="text-blue-600 font-semibold">{material.proportion}%</p>
        <p className="text-sm text-gray-500">{weight.toFixed(0)}g</p>
      </div>
    </div>
  );
}
