import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateItemService } from '../services/create-item.service';
import { GetAllItemsService } from '../services/get-all-items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';

@Controller('items')
export class ItemController {
  constructor(
    private createItemService: CreateItemService,
    private getAllItemsService: GetAllItemsService,
  ) {}
  @Post()
  createItem(@Body() createItem: CreateItemDto): Promise<ItemResponseDto> {
    return this.createItemService.execute(createItem);
  }

  @Get()
  findAll(): Promise<ItemResponseDto[]> {
    return this.getAllItemsService.execute();
  }
}
