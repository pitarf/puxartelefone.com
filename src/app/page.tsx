import Link from 'next/link';
import { prisma } from '../lib/prisma';
import NavbarClient from '@/components/NavbarClient';
import Footer from '@/components/Footer';
import HomeTabs from '@/components/HomeTabs';
import FaqAccordion from '@/components/FaqAccordion';
import HomeSearchBox from '@/components/HomeSearchBox';
import ComoFuncionaStacking from '@/components/ComoFuncionaStacking';
import { Metadata } from 'next';
import { 
  Phone,
  ShieldCheck, 
  Zap, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Fingerprint,
  RefreshCw,
  Wallet,
  CheckCircle,
  Building2,
  Car,
  UserCheck,
  Check,
  Lock,
  Search,
  Database
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Consulta de Telefone Online | Informações e Validação Cadastral";
  const description = "Consulte informações a partir de um número de telefone com DDD. Plataforma rápida, segura e em conformidade com a LGPD com pagamento avulso via Pix.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://puxartelefone.com/"
    },
    robots: "index, follow, max-image-preview:large",
    openGraph: {
      title,
      description,
      url: "https://puxartelefone.com/",
      siteName: "puxartelefone.com",
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function Home() {
  const [settings, pricings, seoPages, latestArticles, menuPages] = await Promise.all([
    prisma.systemSetting.findFirst(),
    prisma.modulePricing.findMany(),
    prisma.page.findMany({
      where: {
        published: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      select: { title: true, slug: true, showInFooter: true },
      orderBy: { title: 'asc' }
    }),
    prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { title: true, slug: true, metaDescription: true, createdAt: true }
    }),
    prisma.page.findMany({
      where: {
        published: true,
        showInMenu: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      select: { title: true, slug: true },
      orderBy: { title: 'asc' }
    })
  ]);

  const getPrice = (id: string, defaultPrice: number) => {
    const found = pricings.find(p => p.id === id);
    return found ? found.price : defaultPrice;
  };

  const phonePrice = getPrice('telefones', 0.50);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#090E17] text-[#172B3A] dark:text-slate-100 antialiased overflow-x-clip selection:bg-[#00B7C2]/20 selection:text-[#0061D9]">
      
      {/* 0. HEADER / NAVBAR REATIVA DINÂMICA */}
      <NavbarClient logoUrl={settings?.logoUrl} siteTitle={settings?.siteTitle} menuPages={menuPages} />

      {/* 1. HERO SECTION COM ONDA ORGÂNICA NA BASE */}
      <section id="consulta-hero" className="relative pt-10 pb-20 md:pt-20 md:pb-32 bg-white dark:bg-[#090E17] overflow-hidden">
        {/* Fundos suaves turquesa e azul tecnológico */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#EFFBFC] dark:bg-[#0061D9]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-[#F0FCF5] dark:bg-[#0BD976]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
            {/* Coluna Principal: Título, Descrição e Campo Principal de Telefone */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge de Destaque */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFFBFC] dark:bg-white/5 border border-[#00B7C2]/40 text-[#0061D9] dark:text-[#00B7C2] text-xs font-bold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-[#00B7C2]" />
                <span>Consulta de Telefone Especializada</span>
              </div>

              {/* H1 Principal */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#172B3A] dark:text-white tracking-tight leading-[1.15]">
                Consulte informações a partir de um <span className="text-[#0061D9] underline decoration-[#00B7C2] decoration-4 underline-offset-6">número de telefone</span>
              </h1>

              {/* Descrição Direta e Ética */}
              <p className="text-base sm:text-lg text-[#667784] dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                Informe o número com DDD que deseja pesquisar e conheça as opções de consulta disponíveis na plataforma para identificação cadastral, validação de titularidade e canais de contato.
              </p>

              {/* FORMULÁRIO PRINCIPAL DE CONSULTA (PRIMEIRA DOBRA) */}
              <div className="pt-2">
                <HomeSearchBox />
              </div>

              {/* Selos de Confiança Comprovados */}
              <div className="pt-4 border-t border-[#E2EAF0] dark:border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#667784] dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0BD976]" />
                  Conformidade com a LGPD
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#0061D9]" />
                  Retornos em Milissegundos
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#0ACF06]" />
                  Sem mensalidade ou fidelidade
                </span>
              </div>

            </div>

            {/* Coluna Secundária: Card Demonstrativo de Interface */}
            <div className="lg:col-span-5 w-full hidden lg:block">
              <div className="relative">
                {/* Glow decorativo de fundo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0061D9]/15 to-[#00B7C2]/15 rounded-3xl blur-2xl -z-10" />

                {/* Card Demonstrativo da Estrutura de Retorno */}
                <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-3xl p-6 shadow-xl space-y-5">
                  
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between border-b border-[#E2EAF0] dark:border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold">
                        <Phone className="w-5 h-5 text-[#0061D9]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">Painel de Dados Telefônicos</h4>
                        <p className="text-[10px] text-[#667784] font-semibold uppercase tracking-wider">Estrutura de Demonstração</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#F0FCF5] text-[#0ACF06] border border-[#0BD976]/30 rounded-full text-[10px] font-bold">
                      BASE PÚBLICA
                    </span>
                  </div>

                  {/* Linhas de Dados Demonstrativos */}
                  <div className="space-y-3">
                    {[
                      { label: 'Telefone Consultado', value: '(11) 9****-**** (Formato Válido)', icon: Phone, color: 'text-[#0061D9]' },
                      { label: 'Titular Cadastral', value: 'Nome Completo Identificado', icon: UserCheck, color: 'text-[#00B7C2]' },
                      { label: 'Documento Vinculado', value: 'CPF com máscara de segurança', icon: ShieldCheck, color: 'text-[#0BD976]' },
                      { label: 'Localização Aproximada', value: 'Região geográfica do DDD informada', icon: Database, color: 'text-[#0061D9]' },
                      { label: 'Opções de Contato', value: 'E-mails e telefones alternativos', icon: Zap, color: 'text-[#0B00CF]' },
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <ItemIcon className={`w-3.5 h-3.5 ${item.color}`} />
                            <span className="text-[#667784] dark:text-slate-400 font-medium">{item.label}</span>
                          </div>
                          <span className="font-semibold text-[#172B3A] dark:text-white">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rodapé do Card demonstrativo */}
                  <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10 flex items-center justify-between text-[11px] text-[#667784] dark:text-slate-400 font-medium">
                    <span>Módulos a partir de R$ 0,50</span>
                    <span className="text-[#0061D9] font-bold">Validação Rápida</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Divisor de Onda Orgânica na Base da Hero Section */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-12 sm:h-20 md:h-28 text-[#F7FAFC] dark:text-[#0e1726]" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* 2. COMO FUNCIONA (CARROSSEL VERTICAL COM STACKING CARDS A 60 FPS) */}
      <ComoFuncionaStacking />

      {/* 3. TIPOS DE CONSULTA TELEFÔNICA DISPONÍVEIS */}
      <section id="tipos-consulta" className="relative pt-20 pb-28 md:pb-36 bg-white dark:bg-[#090E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
              Serviços Telefônicos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
              Opções de pesquisa por telefone disponíveis
            </h2>
            <p className="text-[#667784] dark:text-slate-300 text-sm md:text-base">
              Conheça os módulos específicos que você pode consultar a partir de uma linha telefônica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Titularidade e Dados Cadastrais */}
            <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#0061D9]/40 hover:shadow-md transition-all text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5 text-[#0061D9]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Titularidade Cadastral</h3>
                  <p className="text-xs text-[#0061D9] font-bold mt-0.5">Módulo de Pessoas Físicas e Jurídicas</p>
                </div>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Permite identificar o nome ou razão social vinculada ao número de telefone em bases públicas, CPF ou CNPJ mascarado e status do registro.
                </p>
                <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#667784] block mb-1">INFORMAÇÕES DISPONÍVEIS:</span>
                  <ul className="text-xs space-y-1 text-[#172B3A] dark:text-slate-200">
                    <li>• Nome do titular vinculado</li>
                    <li>• Documento principal cadastrado</li>
                    <li>• Data de registro no cadastro nacional</li>
                  </ul>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/cadastro?type=telefone"
                  className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Consultar este serviço
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Enriquecimento de Contato */}
            <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#00B7C2]/40 dark:border-[#00B7C2]/30 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all text-left relative">
              <span className="absolute -top-3 right-6 bg-[#00B7C2] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Mais Utilizado
              </span>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#00B7C2] flex items-center justify-center font-bold">
                  <RefreshCw className="w-5 h-5 text-[#00B7C2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Enriquecimento de Contatos</h3>
                  <p className="text-xs text-[#00B7C2] font-bold mt-0.5">Canais Alternativos e E-mails</p>
                </div>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Localiza canais de contato complementares vinculados ao mesmo perfil do titular do telefone para atualização cadastral corporativa.
                </p>
                <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#667784] block mb-1">INFORMAÇÕES DISPONÍVEIS:</span>
                  <ul className="text-xs space-y-1 text-[#172B3A] dark:text-slate-200">
                    <li>• Outros números telefônicos ativos</li>
                    <li>• E-mails corporativos e pessoais</li>
                    <li>• Histórico recente de atualização</li>
                  </ul>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/cadastro?type=telefone"
                  className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Consultar este serviço
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Localização e Região */}
            <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#0061D9]/40 hover:shadow-md transition-all text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0BD976] flex items-center justify-center font-bold">
                  <Database className="w-5 h-5 text-[#0BD976]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Localização e Endereços</h3>
                  <p className="text-xs text-[#0BD976] font-bold mt-0.5">Geografia e Vínculos de DDD</p>
                </div>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Confirmação da UF e microrregião de origem do DDD, além de histórico de logradouros atribuídos ao mesmo titular em fontes públicas.
                </p>
                <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10">
                  <span className="text-[11px] font-bold text-[#667784] block mb-1">INFORMAÇÕES DISPONÍVEIS:</span>
                  <ul className="text-xs space-y-1 text-[#172B3A] dark:text-slate-200">
                    <li>• Estado e cidade do prefixo (DDD)</li>
                    <li>• Histórico de logradouros mapeados</li>
                    <li>• Validação de conformidade geográfica</li>
                  </ul>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/cadastro?type=telefone"
                  className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Consultar este serviço
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Onda Orgânica de Transição (conectando com a seção de Benefícios) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-10 sm:h-16 md:h-20 text-[#EFFBFC]/60" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* 4. BENEFÍCIOS DA PLATAFORMA (DESIGN CLEAN COM CARDS BRANCOS E ACENTOS DA MARCA) */}
      <section id="beneficios" className="bg-[#EFFBFC]/60 text-[#172B3A] relative overflow-hidden pt-16 pb-28 md:pb-36">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white border border-[#00B7C2]/40 shadow-2xs px-3.5 py-1.5 rounded-full inline-block">
              Diferenciais Tecnológicos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] tracking-tight">
              Por que utilizar o puxartelefone.com?
            </h2>
            <p className="text-[#667784] text-sm md:text-base">
              Projetado para oferecer a melhor experiência em consultas cadastrais rápidas com segurança jurídica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: Zap,
                title: "Resposta em Milissegundos",
                desc: "Consultas conectadas diretamente a servidores de alta performance para retornos imediatos na tela.",
                color: "text-[#0061D9]",
                bgColor: "bg-[#EFFBFC]"
              },
              {
                icon: Wallet,
                title: "Pagamento Avulso via Pix",
                desc: "Sem mensalidades ou assinaturas obrigatórias. Recarregue apenas o valor necessário para suas consultas.",
                color: "text-[#00B7C2]",
                bgColor: "bg-[#EFFBFC]"
              },
              {
                icon: ShieldCheck,
                title: "Conformidade LGPD",
                desc: "Estruturado com base legal e canal ativo de opt-out para garantir proteção e respeito à privacidade.",
                color: "text-[#0BD976]",
                bgColor: "bg-[#F0FCF5]"
              },
              {
                icon: RefreshCw,
                title: "Cache Inteligente 48h",
                desc: "Garante zero cobranças duplicadas ao consultar novamente o mesmo registro em até 48 horas.",
                color: "text-[#0061D9]",
                bgColor: "bg-[#EFFBFC]"
              }
            ].map((b, i) => {
              const BIcon = b.icon;
              return (
                <div key={i} className="bg-white border border-[#E2EAF0] rounded-3xl p-7 space-y-4 shadow-sm hover:shadow-md hover:border-[#0061D9]/30 transition-all">
                  <div className={`w-12 h-12 rounded-2xl ${b.bgColor} flex items-center justify-center ${b.color}`}>
                    <BIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A]">{b.title}</h3>
                  <p className="text-xs text-[#667784] leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Onda Orgânica Inferior (transição para a seção seguinte branca) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-12 sm:h-20 md:h-24 text-white" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
              fill="currentColor"
            />
          </svg>
        </div>

      </section>

      {/* 5. INFORMAÇÕES SOBRE OS SERVIÇOS & ABAS INTERATIVAS */}
      <section id="detalhes-servicos" className="py-20 bg-white dark:bg-[#090E17] border-b border-[#E2EAF0] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
              Demonstração de Estrutura
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
              Estrutura de dados das consultas
            </h2>
            <p className="text-[#667784] dark:text-slate-300 text-sm md:text-base">
              Veja abaixo como as informações são organizadas em cada modalidade dentro do painel logado.
            </p>
          </div>

          <HomeTabs />

          <p className="mt-6 text-xs text-[#667784] dark:text-slate-500 font-medium max-w-xl mx-auto">
            * As telas acima representam modelos visuais conceituais da estrutura retornada no painel. Informações de cadastros reais são exibidas exclusivamente no painel logado autenticado.
          </p>

        </div>
      </section>

      {/* 6. OUTROS SERVIÇOS CADASTRAIS (POSIÇÃO SECUNDÁRIA) */}
      <section id="outros-servicos" className="py-20 bg-[#F7FAFC] dark:bg-[#0e1726] border-b border-[#E2EAF0] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <span className="text-[#667784] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 px-3 py-1 rounded-full">
              Recursos Complementares
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
              Outros serviços cadastrais disponíveis
            </h2>
            <p className="text-[#667784] dark:text-slate-300 text-sm max-w-2xl mx-auto">
              Além da consulta especializada de telefone, a plataforma mantém opções secundárias para consultas de pessoas físicas, jurídicas e veículos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* CPF */}
            <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7FAFC] dark:bg-white/5 text-[#0061D9] flex items-center justify-center">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de CPF</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Verificação cadastral na Receita Federal, dados básicos, históricos de endereços e vínculos de pessoas físicas.
                </p>
              </div>
              <div className="pt-5">
                <Link
                  href="/consulta-cpf"
                  className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                >
                  <span>Acessar consulta de CPF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CNPJ */}
            <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7FAFC] dark:bg-white/5 text-[#0061D9] flex items-center justify-center">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de CNPJ</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Informações cadastrais sobre empresas, quadro societário (QSA), atividades econômicas e situação cadastral.
                </p>
              </div>
              <div className="pt-5">
                <Link
                  href="/consulta-cnpj"
                  className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                >
                  <span>Acessar consulta de CNPJ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Placa de Veículo */}
            <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7FAFC] dark:bg-white/5 text-[#0061D9] flex items-center justify-center">
                  <Car className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de Placa</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Dados técnicos de veículos, ano de fabricação, situação do licenciamento e restrições públicas via placa.
                </p>
              </div>
              <div className="pt-5">
                <Link
                  href="/consulta-placa"
                  className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                >
                  <span>Acessar consulta de Placa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Consulta por Nome */}
            <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7FAFC] dark:bg-white/5 text-[#0061D9] flex items-center justify-center">
                  <Search className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta por Nome</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Pesquisa por nome e sobrenome com listagem prévia de homônimos e refinamento por estado para localizar perfis.
                </p>
              </div>
              <div className="pt-5">
                <Link
                  href="/consulta-nome"
                  className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                >
                  <span>Acessar busca nominal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. USO RESPONSÁVEL E PRIVACIDADE (LGPD) */}
      <section id="uso-responsavel" className="py-20 bg-white dark:bg-[#090E17] border-b border-[#E2EAF0] dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
              Segurança e Compliance
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
              Uso responsável e proteção de dados
            </h2>
          </div>

          <div className="text-left bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-5 text-xs md:text-sm text-[#667784] dark:text-slate-300 leading-relaxed shadow-xs">
            <p>
              A plataforma <strong className="text-[#172B3A] dark:text-white">puxartelefone.com</strong> deve ser utilizada estritamente para finalidades legítimas, em total consonância com a legislação brasileira vigente, em especial a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da Internet.
            </p>
            <p>
              O usuário é individualmente responsável pelas consultas que executa e pela base legal que fundamenta sua pesquisa (como prevenção a fraudes em cadastros, proteção ao crédito ou legítimo interesse corporativo). É terminantemente proibido utilizar a plataforma para perseguição, ameaça, discriminação, práticas de extorsão ou qualquer conduta que viole direitos de terceiros.
            </p>
            <p>
              Informações não encontradas podem decorrer de números novos, portabilidades recentes ou opção de bloqueio (opt-out) exercida pelo titular da linha. Respeitamos plenamente a solicitação de remoção cadastral a qualquer momento.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-bold">
            <Link href="/politica-de-privacidade" className="text-[#0061D9] hover:underline">
              Política de Privacidade
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/termos" className="text-[#0061D9] hover:underline">
              Termos de Uso
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/protecao-de-dados" className="text-[#0061D9] hover:underline">
              Canal de Proteção de Dados (Opt-out)
            </Link>
          </div>

        </div>
      </section>

      {/* 8. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-20 bg-[#F7FAFC] dark:bg-[#0e1726] border-b border-[#E2EAF0] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
              Dúvidas Comuns
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
              Perguntas frequentes
            </h2>
            <p className="text-[#667784] dark:text-slate-300 text-sm md:text-base">
              Esclarecimentos transparentes sobre como funciona a consulta de telefone na plataforma.
            </p>
          </div>

          <FaqAccordion />

        </div>
      </section>

      {/* 9. CTA FINAL COM DESIGN CLEAN E ONDA ORGÂNICA DE ENTRADA */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-[#EFFBFC]/50 overflow-hidden">
        
        {/* Onda Orgânica Superior (Vinda da Seção FAQ) */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-10 sm:h-16 md:h-20 text-[#F7FAFC]" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0L60,10.7C120,21,240,43,360,48C480,53,600,43,720,32C840,21,960,10,1080,10.7C1200,11,1320,21,1380,26.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Glow suave ao fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EFFBFC] rounded-full blur-[100px] -z-0 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          
          <div className="w-16 h-16 rounded-3xl bg-white border border-[#E2EAF0] text-[#0061D9] flex items-center justify-center mx-auto shadow-sm">
            <Phone className="w-8 h-8 text-[#0061D9]" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#172B3A] tracking-tight leading-tight">
            Comece sua consulta de telefone
          </h2>

          <p className="text-[#667784] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Informe o número e conheça as opções de consulta disponíveis na plataforma com rapidez, segurança e total conformidade.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="#consulta-hero"
              className="w-full sm:w-auto bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-4 px-9 rounded-2xl shadow-lg shadow-[#0061D9]/25 flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Consultar telefone</span>
            </Link>
            <Link
              href="/cadastro"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-[#E2EAF0] text-[#172B3A] font-bold py-4 px-8 rounded-2xl transition-colors text-base shadow-xs"
            >
              Criar Conta Gratuita
            </Link>
          </div>

          <p className="text-[#667784] text-xs font-medium">
            Modelo Pay-per-use • Sem mensalidades • Saldo via Pix instantâneo
          </p>

        </div>
      </section>

      {/* 10. ARTIGOS RECENTES DO BLOG (SEO) */}
      {latestArticles.length > 0 && (
        <section className="py-16 md:py-20 bg-white dark:bg-[#090E17] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
              <div>
                <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                  Conteúdo Educativo
                </span>
                <h3 className="text-2xl font-extrabold text-[#172B3A] dark:text-white mt-2">
                  Artigos e Guias sobre Consultas
                </h3>
              </div>
              <Link href="/blog" className="text-xs font-bold text-[#0061D9] hover:underline flex items-center gap-1">
                Ver todos os artigos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-[#0061D9]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-[#00B7C2]">
                      {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <h4 className="text-base font-bold text-[#172B3A] dark:text-white group-hover:text-[#0061D9] transition-colors leading-snug">
                      {article.title}
                    </h4>
                    {article.metaDescription && (
                      <p className="text-xs text-[#667784] dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {article.metaDescription}
                      </p>
                    )}
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E2EAF0] dark:border-white/10 flex items-center gap-1.5 text-xs font-bold text-[#0061D9]">
                    <span>Ler artigo completo</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. FOOTER */}
      <Footer logoUrl={settings?.logoUrl} />

    </div>
  );
}
