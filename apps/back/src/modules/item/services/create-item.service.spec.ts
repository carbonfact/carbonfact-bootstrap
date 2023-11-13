import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ItemResponseDto } from '../controller/dto/item-response.dto';
import { ItemRepositoryInterface } from '../repository/item.repository.interface';
import { CreateItemService } from './create-item.service';

describe('CreateItemService', () => {
  let module: TestingModule;
  let itemRepositoryMock: jest.Mocked<ItemRepositoryInterface>;
  let createItemService: CreateItemService;
  beforeEach(async () => {
    itemRepositoryMock = mock<ItemRepositoryInterface>();
    module = await Test.createTestingModule({
      providers: [
        CreateItemService,

        {
          provide: 'ItemRepositoryInterface',
          useValue: itemRepositoryMock,
        },
      ],
    })
      .useMocker(createMock)
      .compile();
    createItemService = module.get(CreateItemService);
  });

  it('should create an Item', async () => {
    const item: ItemResponseDto = {
      id: 1,
      name: 'Item 1',
      rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
    };
    itemRepositoryMock.create.mockResolvedValue(item);
    const result = createItemService.execute(item);
    await expect(result).resolves.toEqual(item);
  });
});
