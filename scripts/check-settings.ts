import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const current = await prisma.systemSetting.findUnique({
    where: { id: 'default' }
  });
  console.log('SYSTEM SETTING ATUAL:', current);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
