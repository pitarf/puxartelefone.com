import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'rfpita.ti@gmail.com';
  const password = 'Rafael@67';
  const role = 'ADMIN';

  console.log(`Buscando usuário com email: ${email}...`);
  let user = await prisma.user.findUnique({
    where: { email },
  });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  if (user) {
    console.log(`Usuário encontrado (ID: ${user.id}). Atualizando para ADMIN e definindo nova senha...`);
    user = await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        role,
        active: true,
        adminAttempts: 0,
        adminLockoutUntil: null,
      },
    });
    console.log(`Usuário ${email} atualizado com sucesso como ADMIN!`);
  } else {
    console.log(`Usuário não encontrado. Criando novo usuário ADMIN...`);
    user = await prisma.user.create({
      data: {
        name: 'Rafael Pita',
        email,
        passwordHash,
        role,
        active: true,
        balance: 100.0,
      },
    });
    console.log(`Usuário ADMIN criado com sucesso! ID: ${user.id}`);
  }
}

main()
  .catch((e) => {
    console.error('Erro ao configurar usuário ADMIN:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
