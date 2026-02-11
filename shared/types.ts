// Shared types between backend and frontend

export interface Material {
  name: string;
  proportion: number;
}

export interface Component {
  name: string;
  proportion: number;
  materials: Material[];
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
  distribution: {
    packagingWeight: { value: number; unit: string };
    transport: TransportSummary[];
  };
}
