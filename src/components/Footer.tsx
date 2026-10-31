import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  logoUrl?: string | null;
}

/**
 * Bloco 27 — Footer Padronizado Conforme o PROMPT SUPREMO
 * Coluna 1: Consultas
 * Coluna 2: Ferramentas & Como Funciona
 * Coluna 3: Outros Serviços Cadastrais
 * Coluna 4: Institucional & Privacidade
 * Texto legal independente sem menções a outras plataformas.
 */
export default async function Footer({ logoUrl }: FooterProps) {
  const dbPages = await prisma.page.findMany({
    where: { 
      published: true, 
      showInFooter: true,
      OR: [
        { publishedAt: null },
        { publishedAt: { lte: new Date() } }
      ]
    },
    select: { title: true, slug: true },
    orderBy: { title: 'asc' }
  });

  const legalKeywords = ['termo', 'política', 'privacidade', 'cookies', 'proteção', 'lgpd', 'legal', 'reembolso'];
  const empresaPages: { label: string, href: string }[] = [];
  const legalPages: { label: string, href: string }[] = [];

  for (const p of dbPages) {
    const isLegal = legalKeywords.some(kw => p.title.toLowerCase().includes(kw));
    if (isLegal) {
      legalPages.push({ label: p.title, href: `/${p.slug}` });
    } else {
      empresaPages.push({ label: p.title, href: `/${p.slug}` });
    }
  }

  const footerLinks = {
    consultas: [
      { label: 'Consultar telefone', href: '/#consultar-telefone', featured: true },
      { label: 'Consulta cadastral', href: '/#tipos-de-consulta' },
      { label: 'Consulta reversa', href: '/#consulta-reversa' },
      { label: 'Consultar número desconhecido', href: '/#numero-desconhecido' },
      { label: 'Consultar DDD', href: '/#consultar-ddd' },
    ],
    ferramentas: [
      { label: 'Verificar telefone', href: '/#verificar-numero' },
      { label: 'Consultar DDD', href: '/#consultar-ddd' },
      { label: 'Como funciona', href: '/#como-funciona' },
      { label: 'Preços e Módulos', href: '/#precos' },
      { label: 'Perguntas Frequentes (FAQ)', href: '/#faq' },
    ],
    outrosServicos: [
      { label: 'Consulta CPF', href: '/consulta-cpf' },
      { label: 'Consulta CNPJ', href: '/consulta-cnpj' },
      { label: 'Consulta placa de veículo', href: '/consulta-placa' },
      { label: 'Consulta por nome', href: '/consulta-nome' },
    ],
    institucional: [
      { label: 'Sobre o PuxarTelefone', href: '/sobre' },
      { label: 'Fale Conosco', href: '/contato' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Proteção de Dados (LGPD)', href: '/protecao-de-dados' },
      { label: 'Política de Cookies', href: '/politica-de-cookies' },
      { label: 'Blog & Artigos', href: '/blog' },
      ...empresaPages.filter(p => !['sobre', 'contato'].includes(p.href.replace('/', '')))
    ]
  };

  return (
    <footer className="bg-[#F7FAFC] dark:bg-[#090E17] border-t border-[#E2EAF0] dark:border-white/10 pt-16 pb-12 text-[#667784] dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de Links e Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E2EAF0] dark:border-white/10">
          
          {/* Coluna da Marca */}
          <div className="lg:col-span-1 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <img 
                src={(logoUrl && !logoUrl.includes('canva.com')) ? logoUrl : '/logo.webp'} 
                alt="PuxarTelefone" 
                className="h-8 w-auto object-contain" 
              />
              <span className="text-lg font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                puxar<span className="text-[#0061D9]">telefone</span>
              </span>
            </Link>

            <p className="text-xs text-[#667784] dark:text-slate-400 leading-relaxed">
              Plataforma independente especializada em consultas iniciadas por números de telefone e informações educativas sobre numeração telefônica.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0061D9] dark:text-[#00B7C2]">
              <ShieldCheck className="w-4 h-4 text-[#0BD976]" />
              <span>Conformidade com a LGPD (Lei 13.709/2018)</span>
            </div>
          </div>

          {/* Coluna 1: Consultas */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Consultas
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.consultas.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className={`transition-colors ${
                      link.featured 
                        ? 'font-bold text-[#0061D9] dark:text-[#00B7C2] hover:underline' 
                        : 'hover:text-[#0061D9] dark:hover:text-[#00B7C2]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Ferramentas */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Ferramentas
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.ferramentas.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Outros Serviços */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Outros Serviços
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.outrosServicos.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Institucional */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.institucional.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Rodapé inferior com Copyright e Avisos Legais rigorosamente independentes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#667784] dark:text-slate-500">
          <p>© {new Date().getFullYear()} PuxarTelefone. Todos os direitos reservados.</p>
          <p className="text-center md:text-right max-w-2xl">
            PuxarTelefone — Plataforma independente de consultas online. Os resultados dependem dos serviços contratados, das fontes acessíveis e das condições legais aplicáveis. Não disponibilizamos dados privados, senhas ou histórico de comunicações.
          </p>
        </div>

      </div>
    </footer>
  );
}
