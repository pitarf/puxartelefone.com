import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { DashboardNavbar } from '@/components/DashboardNavbar';
import { TermsComplianceGuard } from '@/components/TermsComplianceGuard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, balance: true, role: true, lastActiveAt: true, hasAcceptedTerms: true },
  });

  if (!user) {
    redirect('/login');
  }

  // Atualiza lastActiveAt se passou mais de 10 minutos para não sobrecarregar o banco
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  if (!user.lastActiveAt || user.lastActiveAt < tenMinutesAgo) {
    prisma.user.update({
      where: { id: session.userId },
      data: { lastActiveAt: new Date() }
    }).catch(err => console.error("Erro ao atualizar lastActiveAt no Dashboard:", err));
  }

  const settings = await prisma.systemSetting.findFirst();
  const whatsappNumber = (settings?.supportWhatsapp || "5511999999999").replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20suporte%20no%20PuxarTelefone`;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-background flex flex-col">
      {/* Guardião de Termos e LGPD: Bloqueia qualquer navegação no Dashboard até o aceite */}
      <TermsComplianceGuard hasAcceptedTerms={!!user.hasAcceptedTerms} />

      {/* Navbar Superior do Painel */}
      <DashboardNavbar
        user={{
          name: user.name,
          email: user.email,
          balance: user.balance,
          role: user.role,
        }}
        logoUrl={settings?.logoUrl}
        whatsappLink={whatsappLink}
      />

      {/* Conteúdo Principal com Largura Máxima Adaptada */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
