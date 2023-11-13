import { Item } from '@/app/types/item.type';
import { rest } from 'msw';

export const createItemMock: Item = {
  name: 'Item1',
  rawMaterials: [{ name: 'rawMaterial1', weight: 12 }],
};

export const itemsMock: Item[] = [
  {
    id: 1,
    name: 'Item1',
    rawMaterials: [{ id: 1, name: 'rawMaterial1', weight: 12 }],
  },
  {
    id: 2,
    name: 'Item2',
    rawMaterials: [{ id: 2, name: 'rawMaterial2', weight: 12 }],
  },
];
export const handlers = [
  rest.get(`${process.env.BACKEND_URL}/items`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(itemsMock));
  }),
  rest.post(`${process.env.BACKEND_URL}/items`, (req, res, ctx) => {
    return res(ctx.json(createItemMock));
  }),
];
