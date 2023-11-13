import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ItemWithMaterials } from 'src/database/customPrismaTypes.type';
import { ItemRepositoryInterface } from '../repository/item.repository.interface';
import { PrismaItemRepository } from '../repository/prisma/item.repository';
import { GetAllItemsService } from './get-all-items.service';

describe('GetAllItemsService', () => {
  let module: TestingModule;
  let itemRepositoryMock: jest.Mocked<ItemRepositoryInterface>;
  let getAllItemsService: GetAllItemsService;

  beforeEach(async () => {
    itemRepositoryMock = mock<ItemRepositoryInterface>();
    module = await Test.createTestingModule({
      providers: [
        PrismaItemRepository,
        GetAllItemsService,
        {
          provide: 'ItemRepositoryInterface',
          useValue: itemRepositoryMock,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    getAllItemsService = module.get(GetAllItemsService);
  });
  it('should return items', async () => {
    const expectedResult: ItemWithMaterials[] = [
      {
        id: 1,
        name: 'Item 1',
        rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
      },
    ];
    itemRepositoryMock.findAll.mockResolvedValue(expectedResult);

    const results = getAllItemsService.execute();
    await expect(results).resolves.toEqual(expectedResult);
  });
});
