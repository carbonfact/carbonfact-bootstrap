import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/database/PrismaService';
import { PrismaItemRepository } from './item.repository';

describe('PrismaItemRepository', () => {
  let module: TestingModule;
  let itemsRepository: PrismaItemRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaItemRepository,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    itemsRepository = module.get(PrismaItemRepository);
  });

  describe('create', () => {
    it('should create an Item', async () => {
      const item = {
        id: 1,
        name: 'Item 1',
        rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
      };
      prismaService.item.create.mockResolvedValue(item);
      const result = itemsRepository.create(item);
      await expect(result).resolves.toEqual(item);
    });
  });

  describe('getItems', () => {
    it('should return items', async () => {
      const mockedItems = [
        {
          id: 1,
          name: 'Item 1',
          rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
        },
        {
          id: 2,
          name: 'Item 2',
          rawMaterials: [{ id: 2, name: 'Raw Material 2', weight: 2 }],
        },
      ];
      prismaService.item.findMany.mockResolvedValue(mockedItems);

      const result = itemsRepository.findAll();
      await expect(result).resolves.toEqual(mockedItems);
    });
  });
});
