import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tshirt = await prisma.item.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'T-Shirt',
      rawMaterials: {
        create: [
          {
            name: 'Water',
            weight: 80,
          },
          {
            name: 'Leather',
            weight: 40,
          },
          {
            name: 'Cotton',
            weight: 60,
          },
          {
            name: 'Marketing',
            weight: 10,
          },
          {
            name: 'Transport',
            weight: 30,
          },
        ],
      },
    },
  });

  const pants = await prisma.item.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: 'Pants',
      rawMaterials: {
        create: [
          {
            name: 'Water',
            weight: 30,
          },
          {
            name: 'Cotton',
            weight: 90,
          },
          {
            name: 'Marketing',
            weight: 30,
          },
          {
            name: 'Transport',
            weight: 40,
          },
        ],
      },
    },
  });

  console.log(tshirt, pants);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
