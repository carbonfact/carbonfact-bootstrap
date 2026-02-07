import type { Product, TransportSummary } from "../../shared/types";
import type { RawProduct } from "./types";

function aggregateTransport(
  scenarios: RawProduct["carbonverse"]["distribution"]["transport_scenarios"],
): TransportSummary[] {
  const byMode = new Map<string, number>();

  for (const scenario of scenarios) {
    const probability = scenario.probability.norm / 100;
    for (const step of scenario.sequence) {
      const current = byMode.get(step.norm) || 0;
      byMode.set(step.norm, current + step.distance.norm * probability);
    }
  }

  return Array.from(byMode.entries()).map(([mode, distanceKm]) => ({
    mode,
    distanceKm: Math.round(distanceKm),
  }));
}

export function getProduct(raw: RawProduct): Product {
  const { carbonverse, carbonverseId } = raw;

  return {
    id: carbonverseId,
    name: carbonverse.account_taxonomy.Name,
    category: carbonverse.norm,
    brand: carbonverse.brand_slug,
    season: carbonverse.account_taxonomy.Season,
    weight: {
      value: carbonverse.weight.norm,
      unit: carbonverse.weight.unit,
    },
    processSteps: carbonverse.process_steps,
    distribution: {
      packagingWeight: {
        value: carbonverse.distribution.packaging.weight.norm,
        unit: carbonverse.distribution.packaging.weight.unit,
      },
      transport: aggregateTransport(
        carbonverse.distribution.transport_scenarios,
      ),
    },
    components: carbonverse.components.map((component) => ({
      name: component.norm,
      proportion: component.proportion.norm,
      processSteps: component.process_steps,
      materials: component.materials.map((material) => ({
        name: material.category.norm,
        proportion: material.proportion.norm,
        processSteps: material.process_steps,
      })),
    })),
  };
}
