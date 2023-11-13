export interface RawMaterial {
  id?: number;
  name: string;
  weight: number;
}

export interface Item {
  id?: number;
  name: string;
  rawMaterials: RawMaterial[];
}
