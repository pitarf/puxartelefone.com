const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "acceptedTermsAt" TIMESTAMP(3);`);
    console.log("SUCESSO_COLUNA:", res);
    const user = await prisma.user.findFirst();
    console.log("TESTE_USER_OK:", user?.email);
  } catch (err) {
    console.error("ERRO_SQL:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
