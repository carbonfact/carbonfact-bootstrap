import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [PrismaModule, ItemModule],
})
export class AppModule {}
