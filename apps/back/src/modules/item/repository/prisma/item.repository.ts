import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import {
  CreateItemWithMaterials,
  ItemWithMaterials,
} from 'src/database/customPrismaTypes.type';
import { ItemRepositoryInterface } from '../item.repository.interface';

const selection = {
  id: true,
  name: true,
  rawMaterials: {
    select: {
      id: true,
      name: true,
      weight: true,
    },
  },
};
@Injectable()
export class PrismaItemRepository implements ItemRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  findAll(): Promise<ItemWithMaterials[]> {
    return this.prisma.item.findMany({
      select: selection,
    });
  }
  create(item: CreateItemWithMaterials): Promise<ItemWithMaterials> {
    return this.prisma.item.create({
      select: selection,
      data: {
        name: item.name,
        rawMaterials: {
          create: item.rawMaterials,
        },
      },
    });
  }
}
