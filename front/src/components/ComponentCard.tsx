import type { Component } from "../../shared/types";
import { MaterialCard } from "./MaterialCard";

interface ComponentCardProps {
  component: Component;
  productWeight: number;
}

function formatName(name: string): string {
  return name
    .split("/")
    .join(" › ")
    .split("_")
    .join(" ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function ComponentCard({
  component,
  productWeight,
}: ComponentCardProps) {
  const componentWeight = (productWeight * component.proportion) / 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{formatName(component.name)}</h3>
        <div className="text-right">
          <p className="text-blue-600 font-semibold">
            {component.proportion.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">{componentWeight.toFixed(0)}g</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Materials</p>
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
