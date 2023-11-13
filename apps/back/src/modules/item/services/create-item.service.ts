import { Inject, Injectable } from '@nestjs/common';
import { ItemWithMaterials } from 'src/database/customPrismaTypes.type';
import { ItemRepositoryInterface } from '../repository/item.repository.interface';
import { CreateItem } from './create-item.service.type';

@Injectable()
export class CreateItemService {
  constructor(
    @Inject('ItemRepositoryInterface')
    private itemRepository: ItemRepositoryInterface,
  ) {}

  execute(item: CreateItem): Promise<ItemWithMaterials> {
    return this.itemRepository.create(item);
  }
}
