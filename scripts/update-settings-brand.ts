import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Ajustando SystemSetting para PuxarTelefone (sem .com)...');
  const updated = await prisma.systemSetting.upsert({
    where: { id: 'default' },
    update: {
      siteTitle: 'PuxarTelefone - Consulta de Telefone e Dados Cadastrais',
      siteDescription: 'Consulte informações cadastrais completas a partir de um número de telefone com precisão e segurança.',
      siteKeywords: 'consulta telefone, puxar telefone, descobrir titular de telefone, enriquecimento cadastral, puxartelefone',
      companyName: 'PUXARTELEFONE TECNOLOGIA LTDA',
      companyEmail: 'contato@puxartelefone.com',
    },
    create: {
      id: 'default',
      siteTitle: 'PuxarTelefone - Consulta de Telefone e Dados Cadastrais',
      siteDescription: 'Consulte informações cadastrais completas a partir de um número de telefone com precisão e segurança.',
      siteKeywords: 'consulta telefone, puxar telefone, descobrir titular de telefone, enriquecimento cadastral, puxartelefone',
      companyName: 'PUXARTELEFONE TECNOLOGIA LTDA',
      companyEmail: 'contato@puxartelefone.com',
      supportWhatsapp: '5511999999999',
    }
  });

  console.log('SystemSetting atualizado com sucesso:', updated);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
