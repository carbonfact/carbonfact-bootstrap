import { Injectable } from '@nestjs/common';
import {
  CreateItemWithMaterials,
  ItemWithMaterials,
} from 'src/database/customPrismaTypes.type';
import { ItemRepositoryInterface } from '../item.repository.interface';

@Injectable()
export class DummyItemRepository implements ItemRepositoryInterface {
  findAll(): Promise<ItemWithMaterials[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'DUMMY1',
        rawMaterials: [{ id: 1, name: 'DUMMY - Raw Material 1', weight: 1 }],
      },
      {
        id: 2,
        name: 'DUMMY2',
        rawMaterials: [{ id: 2, name: 'DUMMY - Raw Material 2', weight: 2 }],
      },
    ]);
  }
  create(item: CreateItemWithMaterials): Promise<ItemWithMaterials> {
    return Promise.resolve({
      id: 1,
      name: item.name + 'DUMMY1',
      rawMaterials: [{ id: 1, name: 'DUMMY - Raw Material 1', weight: 1 }],
    });
  }
}
