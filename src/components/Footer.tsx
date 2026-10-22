import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Phone, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  logoUrl?: string | null;
}

export default async function Footer({ logoUrl }: FooterProps) {
  // Busca dinamicamente no banco as páginas que devem aparecer no rodapé
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
      { label: 'Consulta de Telefone', href: '/#consulta-hero', featured: true },
      { label: 'Consulta CPF', href: '/consulta-cpf' },
      { label: 'Consulta CNPJ', href: '/consulta-cnpj' },
      { label: 'Consulta de Veículos', href: '/consulta-placa' },
      { label: 'Consulta por Nome', href: '/consulta-nome' },
    ],
    empresa: [
      { label: 'Como Funciona', href: '/#como-funciona' },
      { label: 'Tipos de Consulta', href: '/#tipos-consulta' },
      { label: 'Benefícios', href: '/#beneficios' },
      { label: 'Blog & Artigos', href: '/blog' },
      ...empresaPages,
    ],
    legal: legalPages.length > 0 ? legalPages : [
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Proteção de Dados (LGPD)', href: '/protecao-de-dados' },
      { label: 'Política de Cookies', href: '/politica-de-cookies' }
    ]
  };

  return (
    <footer className="bg-[#F7FAFC] dark:bg-[#090E17] border-t border-[#E2EAF0] dark:border-white/10 pt-16 pb-12 text-[#667784] dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de Links e Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E2EAF0] dark:border-white/10">
          
          {/* Coluna da Marca */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-2.5">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="puxartelefone.com" 
                  className="h-8 w-auto object-contain" 
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] flex items-center justify-center text-white">
                  <Phone className="w-4 h-4" />
                </div>
              )}
              <span className="text-lg font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                puxar<span className="text-[#0061D9]">telefone</span><span className="text-[#00B7C2]">.com</span>
              </span>
            </Link>

            <p className="text-sm text-[#667784] dark:text-slate-400 max-w-sm leading-relaxed">
              Plataforma tecnológica especializada em consultas a partir de números de telefone e validações cadastrais complementares com alta velocidade, transparência e conformidade legal.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0061D9] dark:text-[#00B7C2]">
              <ShieldCheck className="w-4 h-4 text-[#0BD976]" />
              <span>Conformidade estrita com a LGPD (Lei 13.709/2018)</span>
            </div>
          </div>

          {/* Coluna Consultas */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Serviços & Consultas
            </h4>
            <ul className="space-y-2.5 text-sm">
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

          {/* Coluna Plataforma */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna Legal */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white tracking-wider uppercase">
              Privacidade & Jurídico
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Rodapé inferior com Copyright e Avisos Legais */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#667784] dark:text-slate-500">
          <p>© {new Date().getFullYear()} puxartelefone.com. Todos os direitos reservados.</p>
          <p className="text-center md:text-right max-w-xl">
            A plataforma consulta bases públicas e fontes legais em conformidade com a legislação aplicável. Não disponibilizamos dados privados, senhas ou histórico de comunicações.
          </p>
        </div>

      </div>
    </footer>
  );
}
