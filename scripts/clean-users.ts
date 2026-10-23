import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'rfpita.ti@gmail.com';

  console.log(`🔒 Iniciando limpeza de dados com transação relacional...`);
  console.log(`Email preservado: ${adminEmail}`);

  await prisma.$transaction(async (tx) => {
    // 1. Localizar o admin
    const admin = await tx.user.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      throw new Error(`Usuário admin ${adminEmail} não encontrado! Operação abortada para segurança.`);
    }

    // 2. Identificar todos os outros usuários
    const usersToDelete = await tx.user.findMany({
      where: {
        id: { not: admin.id },
      },
      select: { id: true, email: true },
    });

    const userIds = usersToDelete.map((u) => u.id);
    console.log(`Identificados ${userIds.length} usuários para exclusão:`, usersToDelete);

    if (userIds.length === 0) {
      console.log('Nenhum outro usuário encontrado para deletar.');
      return;
    }

    // 3. Desvincular indicações de/para os usuários que serão excluídos
    await tx.user.updateMany({
      where: { referredById: { in: userIds } },
      data: { referredById: null },
    });

    // 4. Limpar transações de comissão vinculadas
    const deletedReferralTx = await tx.referralTransaction.deleteMany({
      where: {
        OR: [
          { userId: { in: userIds } },
          { fromUserId: { in: userIds } },
        ],
      },
    });
    console.log(`Transações de indicação removidas: ${deletedReferralTx.count}`);

    // 5. Limpar transações financeiras dos usuários excluídos
    const deletedTransactions = await tx.transaction.deleteMany({
      where: { userId: { in: userIds } },
    });
    console.log(`Transações financeiras removidas: ${deletedTransactions.count}`);

    // 6. Limpar histórico de buscas dos usuários excluídos
    const deletedSearches = await tx.searchHistory.deleteMany({
      where: { userId: { in: userIds } },
    });
    console.log(`Consultas no histórico removidas: ${deletedSearches.count}`);

    // 7. Limpar tokens de redefinição de senha vinculados
    const otherEmails = usersToDelete.map((u) => u.email);
    const deletedTokens = await tx.passwordResetToken.deleteMany({
      where: { email: { in: otherEmails } },
    });
    console.log(`Tokens de reset de senha removidos: ${deletedTokens.count}`);

    // 8. Limpar Push Subscriptions vinculadas a esses usuários
    const deletedPush = await tx.adminPushSubscription.deleteMany({
      where: { userId: { in: userIds } },
    });
    console.log(`Assinaturas de push removidas: ${deletedPush.count}`);

    // 9. Deletar os usuários
    const deletedUsers = await tx.user.deleteMany({
      where: { id: { in: userIds } },
    });
    console.log(`Usuários deletados: ${deletedUsers.count}`);
  });

  // Verificação final pós-transação
  const remainingUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, balance: true },
  });

  console.log(`\n✅ Limpeza concluída com sucesso!`);
  console.log(`Total de usuários restantes no banco: ${remainingUsers.length}`);
  console.log(`Usuários ativos:`, JSON.stringify(remainingUsers, null, 2));
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a limpeza:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
