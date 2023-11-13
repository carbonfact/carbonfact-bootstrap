import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { ItemController } from './controller/item.controller';
import { PrismaItemRepository } from './repository/prisma/item.repository';
import { CreateItemService } from './services/create-item.service';
import { GetAllItemsService } from './services/get-all-items.service';

@Module({
  imports: [PrismaModule],
  controllers: [ItemController],
  providers: [
    GetAllItemsService,
    PrismaItemRepository,
    {
      provide: 'ItemRepositoryInterface',
      useExisting: PrismaItemRepository,
    },
    CreateItemService,
  ],
})
export class ItemModule {}
