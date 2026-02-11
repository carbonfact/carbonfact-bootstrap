// Raw JSON structure (input) - backend only
export interface RawMaterial {
  category: { norm: string };
  proportion: { norm: number };
}

export interface RawComponent {
  norm: string;
  proportion: { norm: number };
  materials: RawMaterial[];
}

export interface RawProduct {
  carbonverseId: string;
  carbonverse: {
    norm: string;
    account_taxonomy: { Name: string; Season: string };
    brand_slug: string;
    weight: { norm: number; unit: string };
    components: RawComponent[];
    distribution: {
      packaging: {
        weight: { norm: number; unit: string };
      };
      transport_scenarios: Array<{
        probability: { norm: number };
        sequence: Array<{
          norm: string;
          distance: { norm: number };
        }>;
      }>;
    };
  };
}
