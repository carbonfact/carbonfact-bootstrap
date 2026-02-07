import { Gem, Puzzle } from "lucide-react";
import type { Component } from "../../../shared/types";
import { formatName } from "../utils/format";
import { MaterialCard } from "./MaterialCard";

interface ComponentCardProps {
  component: Component;
  productWeight: number;
}

export function ComponentCard({
  component,
  productWeight,
}: ComponentCardProps) {
  const componentWeight = (productWeight * component.proportion) / 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Puzzle className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold">
            {formatName(component.name)}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-blue-600 font-semibold">
            {component.proportion.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">{componentWeight.toFixed(0)}g</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Gem className="w-4 h-4 text-amber-500" />
          <p className="text-sm text-gray-500">Materials</p>
        </div>
        {component.materials.map((material) => (
          <MaterialCard
            key={material.name}
            material={material}
            componentWeight={componentWeight}
          />
        ))}
      </div>
    </div>
  );
}
