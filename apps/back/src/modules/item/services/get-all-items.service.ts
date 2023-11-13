import { Inject, Injectable } from '@nestjs/common';
import { ItemWithMaterials } from 'src/database/customPrismaTypes.type';
import { ItemRepositoryInterface } from '../repository/item.repository.interface';

@Injectable()
export class GetAllItemsService {
  constructor(
    @Inject('ItemRepositoryInterface')
    private itemProvider: ItemRepositoryInterface,
  ) {}

  execute(): Promise<ItemWithMaterials[]> {
    return this.itemProvider.findAll();
  }
}
