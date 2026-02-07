import type { Component } from "../../../shared/types";
import { ComponentCard } from "./ComponentCard";

interface ComponentListProps {
  components: Component[];
  productWeight: number;
}

export function ComponentList({
  components,
  productWeight,
}: ComponentListProps) {
  return (
    <div className="space-y-6">
      {components.map((component) => (
        <ComponentCard
          key={component.name}
          component={component}
          productWeight={productWeight}
        />
      ))}
    </div>
  );
}
