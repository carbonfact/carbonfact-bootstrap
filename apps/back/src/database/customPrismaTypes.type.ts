import { Prisma } from '@prisma/client';

const createItemWithMaterials = Prisma.validator<Prisma.ItemDefaultArgs>()({
  select: {
    name: true,
    rawMaterials: { select: { name: true, weight: true } },
  },
});

const ItemWithMaterials = Prisma.validator<Prisma.ItemDefaultArgs>()({
  select: {
    id: true,
    name: true,
    rawMaterials: { select: { id: true, name: true, weight: true } },
  },
});
// cf https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
export type CreateItemWithMaterials = Prisma.ItemGetPayload<
  typeof createItemWithMaterials
>;
export type ItemWithMaterials = Prisma.ItemGetPayload<typeof ItemWithMaterials>;
