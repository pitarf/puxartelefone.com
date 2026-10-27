import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import CadastroClient from './CadastroClient';

/**
 * Página de Cadastro de Novos Usuários.
 * Busca as configurações da marca (logoUrl e faviconUrl) diretamente do banco de dados
 * para garantir que o ícone do sistema configurado pelo admin seja renderizado.
 */
export default async function RegisterPage() {
  const settings = await prisma.systemSetting.findFirst({
    select: {
      logoUrl: true,
      faviconUrl: true,
    },
  });

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CadastroClient logoUrl={settings?.logoUrl} faviconUrl={settings?.faviconUrl} />
    </Suspense>
  );
}
