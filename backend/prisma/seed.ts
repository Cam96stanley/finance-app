import { PrismaClient, CategoryName } from '@prisma/client';

const prisma = new PrismaClient();

const categories: { name: CategoryName }[] = [
  { name: CategoryName.ENTERTAINMENT },
  { name: CategoryName.BILLS },
  { name: CategoryName.GROCERIES },
  { name: CategoryName.DINING_OUT },
  { name: CategoryName.TRANSPORTATION },
  { name: CategoryName.PERSONAL_CARE },
  { name: CategoryName.EDUCATION },
  { name: CategoryName.INCOME },
  { name: CategoryName.MEDICAL },
  { name: CategoryName.SUBSCRIPTIONS },
  { name: CategoryName.SAVINGS },
  { name: CategoryName.GIFTS },
  { name: CategoryName.MISCELLANEOUS },
];

void (async function seed() {
  try {
    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
    }
    console.log('Categories seeded successfully!');
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
