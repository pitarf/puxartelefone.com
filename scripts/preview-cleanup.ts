import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'rfpita.ti@gmail.com';
  
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
    select: { id: true, email: true, name: true, role: true }
  });

  const totalUsers = await prisma.user.count();
  const usersToDelete = await prisma.user.findMany({
    where: { email: { not: adminEmail } },
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });

  console.log(`Total de usuários na base: ${totalUsers}`);
  console.log(`Usuário admin que SERÁ PRESERVADO:`, adminUser);
  console.log(`Quantidade de usuários a serem DELETADOS: ${usersToDelete.length}`);
  console.log(`Lista prévia dos usuários a deletar:`, JSON.stringify(usersToDelete, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
