export type CreateItem = {
  name: string;
  rawMaterials: CreateRawMaterial[];
};

export type CreateRawMaterial = {
  name: string;
  weight: number;
};
