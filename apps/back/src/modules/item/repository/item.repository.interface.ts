import {
  CreateItemWithMaterials,
  ItemWithMaterials,
} from 'src/database/customPrismaTypes.type';

export interface ItemRepositoryInterface {
  create(item: CreateItemWithMaterials): Promise<ItemWithMaterials>;
  findAll(): Promise<ItemWithMaterials[]>;
}
