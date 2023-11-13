import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AppModule } from 'src/app.module';
import generateRandomString from 'src/common/utils/generateRandomString';
import { PrismaService } from 'src/database/PrismaService';
import * as request from 'supertest';

describe('Items', () => {
  let app: INestApplication;
  let module: TestingModule;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    prismaService = module.get(PrismaService);
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  describe('/GET items', () => {
    it('should return items ', () => {
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
      const expectedItems = [...mockedItems];

      prismaService.item.findMany.mockResolvedValue(mockedItems);
      return request(app.getHttpServer())
        .get('/items')
        .expect(200)
        .expect(expectedItems);
    });

    it('should return an empty array when no result', () => {
      const mockedItems = [];
      const expectedItems = [];

      prismaService.item.findMany.mockResolvedValue(mockedItems);
      return request(app.getHttpServer())
        .get('/items')
        .expect(200)
        .expect(expectedItems);
    });
  });

  describe('/POST items', () => {
    it('should create an item', () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ name: 'Raw Material 1', weight: 1 }],
      };

      const mockedItem = {
        id: 1,
        name: 'Item 1',
        rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
      };
      const expectedItem = {
        id: 1,
        name: 'Item 1',
        rawMaterials: [{ id: 1, name: 'Raw Material 1', weight: 1 }],
      };

      prismaService.item.create.mockResolvedValue(mockedItem);
      return request(app.getHttpServer())
        .post('/items')
        .send(postedItem)
        .expect(201)
        .expect(expectedItem);
    });

    it('should throw an error if name is > 30 characters', async () => {
      const postedItem = {
        name: generateRandomString(31),
        rawMaterials: [{ name: 'Raw Material 1', weight: 1 }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };

      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if name is missing', async () => {
      const postedItem = {
        rawMaterials: [{ name: 'Raw Material 1', weight: 1 }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials are missing', async () => {
      const postedItem = {
        name: 'Item 1',
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };

      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials name is missing', async () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ weight: 1 }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials name are > 30 characters', async () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ name: generateRandomString(31), weight: 1 }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials weight is missing', async () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ name: 'Raw Material 1' }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };

      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials weight is not a number', async () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ name: 'Raw Material 1', weight: 'hello' }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };

      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });

    it('should throw an error if RawMaterials weight is negative', async () => {
      const postedItem = {
        name: 'Item 1',
        rawMaterials: [{ name: 'Raw Material 1', weight: -12 }],
      };
      const expectedError = {
        statusCode: 400,
        error: 'Bad Request',
      };

      const response = await request(app.getHttpServer())
        .post('/items')
        .send(postedItem);

      expect(response.statusCode).toBe(expectedError.statusCode);
      expect(response.body.error).toBe('Bad Request');
    });
  });
});
