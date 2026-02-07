// Shared types between backend and frontend

export interface Material {
  name: string;
  proportion: number;
  processSteps: unknown[];
}

export interface Component {
  name: string;
  proportion: number;
  materials: Material[];
  processSteps: unknown[];
}

export interface ProductSummary {
  id: string;
  name: string;
  category: string;
  brand: string;
  season: string;
  weight: { value: number; unit: string };
}

export interface TransportSummary {
  mode: string;
  distanceKm: number;
}

export interface Product extends ProductSummary {
  components: Component[];
  processSteps: unknown[];
  distribution: {
    packagingWeight: { value: number; unit: string };
    transport: TransportSummary[];
  };
}
