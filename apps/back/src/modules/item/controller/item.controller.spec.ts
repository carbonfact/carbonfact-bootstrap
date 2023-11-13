import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemWithMaterials } from 'src/database/customPrismaTypes.type';
import { CreateItemService } from '../services/create-item.service';
import { GetAllItemsService } from '../services/get-all-items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { ItemController } from './item.controller';

describe('ItemController', () => {
  let controller: ItemController;
  let getAllItemsServiceMock: jest.Mocked<GetAllItemsService>;
  let createItemServiceMock: jest.Mocked<CreateItemService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: GetAllItemsService,
          useValue: createMock<GetAllItemsService>(),
        },
        {
          provide: CreateItemService,
          useValue: createMock<CreateItemService>(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    getAllItemsServiceMock = module.get(GetAllItemsService);
    createItemServiceMock = module.get(CreateItemService);
    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /', async () => {
    const expectedResult: ItemResponseDto[] = [
      {
        id: 1,
        name: 'Item 1',
        rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
      },
    ];
    getAllItemsServiceMock.execute.mockResolvedValue(expectedResult);

    const result = controller.findAll();

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('POST /', async () => {
    const body: CreateItemDto = {
      name: 'Item 1',
      rawMaterials: [{ name: 'Raw Material 1', weight: 1 }],
    };
    const expectedResult: ItemWithMaterials = {
      id: 1,
      name: 'Item 1',
      rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
    };
    createItemServiceMock.execute.mockResolvedValue(expectedResult);

    const result = controller.createItem(body);

    await expect(result).resolves.toEqual(expectedResult);
  });
});
