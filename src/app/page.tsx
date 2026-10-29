import Link from 'next/link';
import { prisma } from '../lib/prisma';
import NavbarClient from '@/components/NavbarClient';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQ_LIST } from '@/lib/faqData';
import HomeSearchBox from '@/components/HomeSearchBox';
import DddLookupTool from '@/components/DddLookupTool';
import PhoneValidatorTool from '@/components/PhoneValidatorTool';
import MobileFloatingCta from '@/components/MobileFloatingCta';
import { Metadata } from 'next';
import { 
  Phone,
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  Check,
  Building2,
  Car,
  Search,
  Database,
  Lock,
  RefreshCw,
  Wallet,
  AlertTriangle,
  HelpCircle,
  FileText,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Consultar Número de Telefone Online | PuxarTelefone";
  const description = "Quer consultar um número de telefone? Pesquise celular ou fixo com DDD, conheça as modalidades de consulta cadastral e confira os preços no PuxarTelefone.";

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
      siteName: "PuxarTelefone",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: "https://puxartelefone.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "Consulta de Telefone Online | PuxarTelefone"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://puxartelefone.com/og-image.png"]
    }
  };
}

export default async function Home() {
  const [settings, pricings, latestArticles, menuPages] = await Promise.all([
    prisma.systemSetting.findFirst(),
    prisma.modulePricing.findMany(),
    prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      take: 6,
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
  const basicPrice = getPrice('dados_basicos', 1.00);
  const addressPrice = getPrice('enderecos', 1.00);
  const emailPrice = getPrice('emails', 0.50);

  // JSON-LD estruturado: WebSite, Organization, WebPage, FAQPage
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PuxarTelefone",
      "url": "https://puxartelefone.com/"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PuxarTelefone",
      "url": "https://puxartelefone.com/",
      "logo": settings?.logoUrl || "https://puxartelefone.com/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Consultar Número de Telefone Online | PuxarTelefone",
      "url": "https://puxartelefone.com/",
      "inLanguage": "pt-BR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "PuxarTelefone",
        "url": "https://puxartelefone.com/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_LIST.map(faq => ({
        "@type": "Question",
        "name": faq.question.replace(/^\d+\.\s*/, ''),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#090E17] text-[#172B3A] dark:text-slate-100 antialiased overflow-x-clip selection:bg-[#00B7C2]/20 selection:text-[#0061D9]">
      
      {/* Injeção JSON-LD Estruturado para Rastreamento e Indexação Rápida */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* BLOCO 01 — HEADER */}
      <NavbarClient logoUrl={settings?.logoUrl} siteTitle={settings?.siteTitle} menuPages={menuPages} />

      <main>
        {/* BLOCO 02, 03 & 04 — HERO PRINCIPAL COM FORMULÁRIO E CARD ILUSTRATIVO */}
        <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-white dark:bg-[#090E17] overflow-hidden">
          {/* Fundos suaves de ambientação */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#EFFBFC] dark:bg-[#0061D9]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-[#F0FCF5] dark:bg-[#0BD976]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
              
              {/* Coluna Principal da Primeira Dobra */}
              <div className="lg:col-span-7 space-y-5 text-left">
                
                {/* Texto acima do H1 */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFFBFC] dark:bg-white/5 border border-[#00B7C2]/40 text-[#0061D9] dark:text-[#00B7C2] text-xs font-bold uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#00B7C2]" />
                  <span>CONSULTA DE TELEFONE ONLINE</span>
                </div>

                {/* H1 Principal Padronizado */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#172B3A] dark:text-white tracking-tight leading-[1.15]">
                  Consultar número de telefone online
                </h1>

                {/* Descrição Principal Padronizada */}
                <p className="text-base sm:text-lg text-[#667784] dark:text-slate-300 leading-relaxed font-normal">
                  Pesquise um número de celular ou telefone fixo com DDD e conheça as consultas cadastrais disponíveis no PuxarTelefone.
                </p>

                {/* BLOCO 02 & 03: FORMULÁRIO PRINCIPAL E RETORNO IMEDIATO */}
                <div className="pt-2">
                  <HomeSearchBox phonePrice={phonePrice} />
                </div>

                {/* Micro selos de transparência e conformidade */}
                <div className="pt-3 border-t border-[#E2EAF0] dark:border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#667784] dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0BD976]" />
                    Conformidade com a LGPD
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#0061D9]" />
                    Consulta Direta por Telefone
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#0ACF06]" />
                    Sem mensalidade ou fidelidade
                  </span>
                </div>

              </div>

              {/* BLOCO 04 — CARD ILUSTRATIVO DE CONSULTA (Desktop ao lado; Mobile abaixo) */}
              <div className="lg:col-span-5 w-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0061D9]/15 to-[#00B7C2]/15 rounded-3xl blur-2xl -z-10" />

                  <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-3xl p-6 shadow-xl space-y-4 text-left">
                    
                    {/* Cabeçalho do Card */}
                    <div className="flex items-center justify-between border-b border-[#E2EAF0] dark:border-white/10 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">
                          Exemplo de informações telefônicas
                        </h4>
                        <p className="text-[10px] text-[#667784] font-semibold uppercase tracking-wider">
                          Estrutura de apresentação
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-[#EFFBFC] text-[#0061D9] border border-[#00B7C2]/30 rounded-full text-[10px] font-bold">
                        DEMO
                      </span>
                    </div>

                    {/* Linhas de Dados Ilustrativos */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Telefone:</span>
                        <span className="font-semibold text-[#172B3A] dark:text-white">(11) 99999-9999</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Tipo de numeração:</span>
                        <span className="font-semibold text-[#172B3A] dark:text-white">celular</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">DDD:</span>
                        <span className="font-semibold text-[#172B3A] dark:text-white">11</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Região de numeração:</span>
                        <span className="font-semibold text-[#172B3A] dark:text-white">São Paulo e região</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Formato:</span>
                        <span className="font-semibold text-[#0ACF06]">compatível</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Pesquisa cadastral:</span>
                        <span className="font-semibold text-[#667784]">não executada</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0]/60 dark:border-white/5">
                        <span className="text-[#667784] dark:text-slate-400">Titular cadastral:</span>
                        <span className="font-semibold text-[#667784]">não consultado</span>
                      </div>
                    </div>

                    {/* Legenda Obrigatória */}
                    <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10">
                      <p className="text-[11px] text-[#667784] dark:text-slate-400 font-medium italic">
                        Exemplo de apresentação. Nenhuma consulta cadastral real foi executada.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* BLOCO 05 — INTRODUÇÃO EDITORIAL */}
        <section id="introducao-editorial" className="py-16 md:py-20 bg-[#F7FAFC] dark:bg-[#0e1726] border-y border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Guia Inicial
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como consultar um número de telefone pela internet?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Consultar um número de telefone online é uma forma de iniciar uma pesquisa a partir dos dígitos de uma linha telefônica. Em vez de começar pelo nome de uma pessoa ou empresa, o usuário informa o telefone e verifica quais modalidades de consulta podem estar disponíveis.
                </p>
                <p>
                  A pesquisa pode envolver informações sobre o formato do número, região de numeração e possíveis registros cadastrais, dependendo do serviço contratado e das fontes legalmente acessíveis.
                </p>
                <p>
                  No PuxarTelefone, o processo começa com a digitação do número completo, incluindo o DDD. Depois de conferir o formato, o usuário pode continuar para o painel, conhecer os módulos disponíveis e verificar as condições de contratação.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Preciso saber o nome da pessoa para consultar?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não é necessário conhecer previamente um nome para iniciar o formulário de pesquisa por telefone. Entretanto, a existência de informações cadastrais relacionadas ao número não é garantida, e a disponibilidade de dados pessoais depende das regras aplicáveis.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  É necessário informar o DDD?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Sim. O código DDD faz parte da numeração brasileira e permite identificar a área de numeração à qual o telefone está associado.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  A consulta funciona para qualquer número?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  A ferramenta de formatação é direcionada aos padrões brasileiros suportados. A cobertura de consultas cadastrais depende da modalidade e dos registros disponíveis.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="#consultar-telefone"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0061D9] dark:text-[#00B7C2] hover:underline"
              >
                <span>Consultar número de telefone</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* BLOCO 06 — COMO FUNCIONA O PUXARTELEFONE? (6 ETAPAS CLARAS) */}
        <section id="como-funciona" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Passo a Passo
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Como funciona a consulta de telefone no PuxarTelefone?
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Processo transparente e simplificado para você pesquisar e contratar apenas as consultas que realmente precisa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                {
                  step: '01',
                  title: 'Informe o número',
                  desc: 'Digite um número brasileiro com DDD no campo de pesquisa. O sistema verifica se o formato é compatível com a numeração suportada.'
                },
                {
                  step: '02',
                  title: 'Continue para a plataforma',
                  desc: 'Crie uma conta ou faça login para conhecer as modalidades de consulta disponíveis. O cadastro não significa que algum dado cadastral já foi encontrado.'
                },
                {
                  step: '03',
                  title: 'Escolha o módulo',
                  desc: 'Dentro do painel, confira quais serviços estão disponíveis para o tipo de pesquisa desejado. Cada modalidade deve apresentar seu escopo e suas limitações.'
                },
                {
                  step: '04',
                  title: 'Confira o preço',
                  desc: 'Antes de contratar, verifique o valor e as condições comerciais. Cada módulo individual possui seu preço transparente.'
                },
                {
                  step: '05',
                  title: 'Confirme a contratação',
                  desc: 'Utilize os métodos de pagamento ou saldo efetivamente disponíveis no sistema, com recargas via Pix sem mensalidade.'
                },
                {
                  step: '06',
                  title: 'Visualize o resultado',
                  desc: 'Após a execução real da pesquisa, o painel apresenta as informações retornadas pela modalidade contratada. Os dados podem estar ausentes, incompletos ou desatualizados.'
                }
              ].map((etapa) => (
                <div 
                  key={etapa.step}
                  className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 relative hover:border-[#0061D9]/40 transition-colors shadow-2xs"
                >
                  <span className="text-3xl font-black text-[#0061D9]/20 block mb-2 font-mono">
                    {etapa.step}
                  </span>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white mb-2">
                    {etapa.title}
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    {etapa.desc}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="#consultar-telefone"
                className="inline-flex items-center justify-center gap-2 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                <span>Começar consulta de telefone</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* BLOCO 07 — TIPOS DE CONSULTA TELEFÔNICA (5 CARDS DETALHADOS) */}
        <section id="tipos-de-consulta" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Modalidades Disponíveis
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Quais tipos de consulta por telefone estão disponíveis?
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Diferentes serviços podem trabalhar com categorias específicas de informações relacionadas a números telefônicos. Conheça o conteúdo e condições de cada modalidade antes da contratação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              
              {/* Card 1 — Consulta Cadastral */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">
                    Consulta cadastral por número de telefone
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    A pesquisa cadastral utiliza o número informado como ponto de partida para verificar possíveis referências existentes em registros legalmente acessíveis. Quando houver uma modalidade específica disponível, ela apresenta os campos que podem ser retornados. Um eventual registro não comprova necessariamente quem utiliza o telefone atualmente.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Conhecer consulta cadastral</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 2 — Telefone de Empresa */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">
                    Pesquisa de informações relacionadas a telefones comerciais
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Números de telefone de empresas podem aparecer em sites institucionais, cadastros empresariais e outros canais públicos. A consulta pode ser utilizada como informação complementar, mas a confirmação de um contato empresarial deve considerar os canais oficiais da organização.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Consultar telefone comercial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 3 — Informações de Numeração */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#00B7C2] flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">
                    Consulta de DDD e formato do telefone
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    O DDD permite identificar uma região associada à numeração, enquanto o formato ajuda a distinguir padrões de celular e telefone fixo. Essas informações podem ser verificadas sem acessar registros pessoais.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="#consultar-ddd"
                    className="w-full bg-[#F7FAFC] dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-[#172B3A] dark:text-white border border-[#E2EAF0] dark:border-white/10 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Conferir número e DDD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 4 — Consulta Reversa */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0BD976] flex items-center justify-center font-bold">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">
                    Pesquisa reversa de telefone
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Uma consulta reversa começa pelo número e busca possíveis referências relacionadas a ele. O conteúdo de uma pesquisa reversa varia conforme a modalidade e não garante a identificação da pessoa que realizou uma ligação.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Conhecer consulta reversa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 5 — Registros Cadastrais Complementares */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all md:col-span-2 lg:col-span-2">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">
                    Informações adicionais relacionadas ao número
                  </h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Caso existam módulos específicos com registros complementares, suas categorias, finalidades e valores são apresentados de forma individual no painel. Não anunciamos acesso irrestrito a documentos, endereços particulares, e-mails pessoais ou outros dados de terceiros.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10 flex justify-end">
                  <Link
                    href="#precos"
                    className="bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm"
                  >
                    <span>Ver módulos disponíveis e preços</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BLOCO 08 — PREÇOS E PAGAMENTO (LENDO PRISMA) */}
        <section id="precos" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Transparência Comercial
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Quanto custa consultar um número de telefone?
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                O valor de uma consulta depende da modalidade selecionada e das informações incluídas no serviço. Você confere o formato inicial e o DDD gratuitamente antes de contratar qualquer módulo pago.
              </p>
            </div>

            {/* Cards Comerciais com Preços Reais do Banco */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#0061D9] uppercase tracking-wider">Módulo Telefones</span>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Pesquisa Telefônica</h3>
                  <div className="flex items-baseline gap-1 py-2">
                    <span className="text-xs text-[#667784]">R$</span>
                    <span className="text-3xl font-black text-[#172B3A] dark:text-white">{phonePrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-xs text-[#667784]">/ consulta</span>
                  </div>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Identificação de outros números telefônicos ativos e histórico de vínculos informados em bases públicas acessíveis.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Consultar telefone</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border-2 border-[#0061D9] rounded-2xl p-6 flex flex-col justify-between shadow-md relative text-left">
                <span className="absolute -top-3 right-6 bg-[#0061D9] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  Mais Procurado
                </span>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#0061D9] uppercase tracking-wider">Módulo Cadastral</span>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Dados Básicos Cadastrais</h3>
                  <div className="flex items-baseline gap-1 py-2">
                    <span className="text-xs text-[#667784]">R$</span>
                    <span className="text-3xl font-black text-[#0061D9]">{basicPrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-xs text-[#667784]">/ consulta</span>
                  </div>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Verificação do nome ou razão social vinculada ao identificador, documento principal mascarado e informações cadastrais gerais.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Conhecer modalidade</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-all">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#0061D9] uppercase tracking-wider">Módulo Complementar</span>
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Endereços e Geografia</h3>
                  <div className="flex items-baseline gap-1 py-2">
                    <span className="text-xs text-[#667784]">R$</span>
                    <span className="text-3xl font-black text-[#172B3A] dark:text-white">{addressPrice.toFixed(2).replace('.', ',')}</span>
                    <span className="text-xs text-[#667784]">/ consulta</span>
                  </div>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Histórico de logradouros atribuídos em fontes públicas, confirmação de UF e microrregião associada.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/cadastro?src=home-telefone&type=telefone"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Conhecer modalidade</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Perguntas e Respostas Comerciais Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left pt-6 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-[#0061D9]" />
                  Posso pagar por Pix?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Sim. O painel disponibiliza recarga imediata por Pix com liberação automática de saldo para realizar consultas avulsas.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#0ACF06]" />
                  Existe mensalidade?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. O PuxarTelefone opera sem assinaturas obrigatórias ou mensalidades. Você adiciona saldo e utiliza apenas conforme a sua necessidade.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#00B7C2]" />
                  Consulta completa é um módulo?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não necessariamente. O valor de um módulo individual corresponde ao seu escopo específico, permitindo combinar somente os dados que você desejar.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0BD976]" />
                  E se nenhum dado for achado?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Caso o identificador não possua registros disponíveis nas bases pesquisadas, a plataforma informa a ausência conforme a política comercial de cada módulo.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 09 — CONSULTA DE NÚMERO DESCONHECIDO */}
        <section id="numero-desconhecido" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Segurança do Usuário
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Recebeu uma ligação desconhecida? Saiba como pesquisar o número
              </h2>
              <p className="text-sm sm:text-base text-[#667784] dark:text-slate-300 leading-relaxed">
                Receber uma chamada de um número desconhecido pode gerar dúvidas, principalmente quando não há uma mensagem ou identificação clara da origem. Antes de retornar a ligação, é possível adotar algumas medidas para compreender melhor o contexto.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#667784] dark:text-slate-300 leading-relaxed">
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Confira o DDD</h3>
                <p>O código DDD pode indicar a região associada à numeração. Isso não significa que a pessoa que ligou esteja fisicamente naquela região.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Pesquise informações públicas</h3>
                <p>Se o número estiver associado a uma empresa, vale procurar referências em sites oficiais e canais públicos de atendimento.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Evite retornar automaticamente</h3>
                <p>Quando uma ligação parecer suspeita, não é necessário retornar imediatamente. Verifique o contexto e procure canais oficiais caso alguém tenha afirmado representar uma empresa ou instituição.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Não compartilhe códigos ou senhas</h3>
                <p>Desconfie de solicitações inesperadas de senhas, códigos de verificação, transferências e informações bancárias.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Entenda os limites da identificação</h3>
                <p>O número apresentado na tela pode não corresponder ao verdadeiro originador da chamada devido à falsificação de identificador (spoofing). Mesmo que uma consulta apresente um cadastro relacionado ao número, isso não comprova quem telefonou.</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl space-y-1">
                <h3 className="font-bold text-sm text-[#172B3A] dark:text-white">Utilize canais oficiais em caso de suspeita</h3>
                <p>Quando existirem sinais de fraude, ameaça ou uso indevido de informações, procure os canais apropriados de atendimento ou denúncia.</p>
              </div>
            </div>

            <div>
              <Link
                href="#consultar-telefone"
                className="inline-flex items-center gap-2 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-sm"
              >
                <span>Pesquisar número desconhecido</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* BLOCO 10 — CONSULTA REVERSA DE TELEFONE */}
        <section id="consulta-reversa" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Conceito Técnico
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                O que é consulta reversa de telefone?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  A consulta reversa de telefone é uma modalidade de pesquisa que começa pelo número, em vez de começar pelo nome de uma pessoa ou empresa.
                </p>
                <p>
                  Em uma pesquisa convencional, você conhece a identidade ou a empresa e procura informações de contato. Na pesquisa reversa, o número telefônico é a informação inicial.
                </p>
                <p>
                  Dependendo do serviço e das fontes acessíveis, podem existir referências empresariais ou cadastrais relacionadas à numeração. Entretanto, a existência de um registro não garante que aquela informação esteja atualizada.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  É possível descobrir de quem é um número?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Determinados serviços podem apresentar possíveis vínculos cadastrais, quando disponíveis e legalmente acessíveis. Porém, telefones podem ser transferidos, compartilhados, desativados ou reutilizados. Por isso, a presença de um nome em um registro não comprova necessariamente quem utiliza o telefone atualmente.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Consulta reversa identifica quem ligou?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não obrigatoriamente. Uma pesquisa cadastral e a identificação efetiva da origem de uma chamada são procedimentos diferentes. O número exibido em uma ligação também pode ter sido falsificado.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  A consulta reversa funciona com celular?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  A pesquisa pode utilizar um número de celular com DDD, desde que a modalidade efetivamente oferecida seja compatível.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  A consulta reversa funciona com telefone fixo?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Telefones fixos também podem ser utilizados em pesquisas compatíveis. A cobertura depende dos registros acessíveis.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 11 — CONSULTAR CELULAR */}
        <section id="consultar-celular" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Telefonia Móvel
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como consultar um número de celular com DDD?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Os números móveis brasileiros utilizam DDD e nove dígitos no número do assinante. O formato nacional comum é: <strong>(11) 99999-9999</strong>. O código de área identifica uma região de numeração e os demais dígitos compõem o número móvel.
                </p>
                <p>
                  No PuxarTelefone, você pode informar a numeração completa para verificar o formato e continuar para as modalidades de pesquisa disponíveis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Preciso digitar o número 9?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Sim. Para números móveis brasileiros no padrão atual, o nono dígito integra a numeração oficial da Anatel.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  A consulta mostra se a linha está ativa?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  A validação do formato não verifica se uma linha está ativa. Somente uma modalidade específica com fonte adequada realizaria tal verificação.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Posso consultar celular de outro estado?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  O formulário deve aceitar DDDs brasileiros válidos de qualquer estado. A disponibilidade de registros depende da cobertura do serviço.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 12 — CONSULTAR TELEFONE FIXO */}
        <section id="consultar-fixo" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Telefonia Fixa
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como pesquisar um número de telefone fixo?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Os números fixos brasileiros utilizam um código DDD acompanhado de oito dígitos no padrão nacional comum. Exemplo: <strong>(21) 3333-4444</strong>.
                </p>
                <p>
                  Uma pesquisa de telefone fixo pode ser útil para conferir o formato da numeração ou encontrar referências públicas de contatos empresariais. A disponibilidade de dados cadastrais dependerá da modalidade contratada e das fontes acessíveis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Telefone fixo e celular utilizam o mesmo formato?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. Os dois utilizam DDD, mas os padrões comuns de numeração possuem quantidades de dígitos diferentes (fixo com 8 dígitos e celular com 9 dígitos).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Posso pesquisar telefone comercial?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Sim, o formulário pode aceitar números fixos utilizados por empresas, desde que estejam dentro dos padrões suportados. Para confirmar contatos empresariais, utilize também canais oficiais.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 13 — CONSULTAR DDD GRATUITAMENTE */}
        <DddLookupTool />

        {/* BLOCO 14 — VERIFICADOR GRATUITO DE NÚMERO */}
        <PhoneValidatorTool />

        {/* BLOCO 15 — ENTENDA O DDD E A NUMERAÇÃO BRASILEIRA */}
        <section id="numeracao-brasileira" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Plano de Numeração
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como funcionam os números de telefone no Brasil?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  A numeração telefônica brasileira utiliza códigos que ajudam a organizar as ligações e identificar os tipos de serviço. No formato internacional, o Brasil utiliza o código de país +55. O DDD possui dois dígitos, e o número do assinante segue padrões específicos conforme o serviço telefônico.
                </p>
                <p>
                  Compreender essa estrutura ajuda a evitar erros de digitação e interpretar o resultado de uma verificação básica.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O que significa +55?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  É o código internacional atribuído ao Brasil. Quando um telefone brasileiro é apresentado para chamadas internacionais, o +55 aparece antes do DDD e dos demais dígitos.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O que é DDD?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  É a Discagem Direta a Distância, o código de área de dois dígitos utilizado na numeração telefônica nacional.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O DDD identifica a cidade exata?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não necessariamente. Um mesmo código DDD pode abranger dezenas de diferentes municípios dentro da mesma região geográfica.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O DDD mostra onde o telefone está?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. O DDD representa apenas a área original de numeração e não funciona como rastreador geográfico da linha.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O prefixo identifica a operadora?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não de maneira confiável para determinar a prestadora atual, uma vez que a portabilidade numérica brasileira permite ao usuário mudar de operadora mantendo o mesmo número intacto.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-xl text-xs text-[#667784] dark:text-slate-400">
              <span>Referência oficial: </span>
              <a 
                href="https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0061D9] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Plano de Numeração Brasileiro — Anatel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </section>

        {/* BLOCO 16 — CONSULTAR NÚMERO DE WHATSAPP */}
        <section id="consultar-whatsapp" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Aplicativos de Mensagem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                É possível consultar um número usado no WhatsApp?
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Um número utilizado no WhatsApp também pode corresponder a uma linha de telefonia móvel. Por isso, ele pode ser informado no formulário do PuxarTelefone como qualquer outro número brasileiro compatível.
                </p>
                <p>
                  Entretanto, consultar um número <strong>não significa acessar uma conta de WhatsApp</strong>. O serviço não é uma ferramenta para obter mensagens privadas, conversas, fotos restritas, histórico de atividades ou localização de usuários.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Posso descobrir quem usa um número de WhatsApp?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Uma eventual referência cadastral relacionada ao telefone não comprova necessariamente quem utiliza a conta do aplicativo.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  É possível ler mensagens pelo número?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. A consulta telefônica não concede acesso a conversas privadas ou mensagens de qualquer aplicativo.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Posso descobrir a localização de um contato?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não por meio da simples consulta cadastral do número telefônico.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Posso consultar um número comercial?
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  É possível utilizar um telefone comercial brasileiro como entrada, desde que o formato seja suportado. Para confirmar se uma conta representa determinada empresa, verifique seus canais oficiais.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 17 — COMO RECONHECER LIGAÇÕES SUSPEITAS */}
        <section id="ligacoes-suspeitas" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Prevenção a Golpes
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como reconhecer números desconhecidos e possíveis ligações fraudulentas?
              </h2>
              <p className="text-sm sm:text-base text-[#667784] dark:text-slate-300 leading-relaxed">
                Nem toda ligação desconhecida representa fraude. Entretanto, algumas situações exigem atenção, principalmente quando alguém solicita informações ou pagamentos inesperados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Solicitações urgentes de dinheiro
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Desconfie de ligações que exigem transferências imediatas, principalmente quando acompanhadas de ameaças ou pressão psicológica.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Pedidos de códigos de verificação
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não compartilhe códigos recebidos por SMS, WhatsApp ou aplicativos de autenticação com pessoas desconhecidas.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Supostos contatos bancários
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Se alguém afirma representar seu banco, encerre a chamada e procure os canais oficiais de atendimento da instituição.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Número aparentemente legítimo
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  A identificação exibida durante uma chamada pode ser falsificada (spoofing). Reconhecer o número na tela não basta para confirmar a identidade.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">
                  Ligações repetitivas
                </h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Se você recebe chamadas indesejadas frequentes, pode utilizar recursos de bloqueio do celular e canais oficiais de reclamação (como Não Me Perturbe).
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-xl text-xs text-[#667784] dark:text-slate-400">
              <span>Referência Anatel: </span>
              <a 
                href="https://www.gov.br/anatel/pt-br/regulado/acompanhamento-e-controle/autenticacao-e-identificacao-de-chamadas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0061D9] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Autenticação e identificação de chamadas — Anatel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </section>

        {/* BLOCO 18 — INFORMAÇÕES CADASTRAIS E SEUS LIMITES */}
        <section id="informacoes-cadastrais" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Conformidade e Ética
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Quais informações podem estar relacionadas a um número de telefone?
              </h2>
              <p className="text-sm sm:text-base text-[#667784] dark:text-slate-300 leading-relaxed">
                Um número de telefone pode aparecer em diferentes contextos cadastrais, como registros empresariais, serviços de contato ou informações administrativas. Entretanto, a existência de uma referência cadastral não significa que ela esteja atualizada ou represente o usuário atual do telefone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Informações de numeração</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Incluem formato, código DDD e classificação compatível com o padrão nacional brasileiro.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Referências empresariais</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Determinados telefones podem estar publicados em canais oficiais de empresas, estabelecimentos e organizações.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Possíveis vínculos cadastrais</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Modalidades específicas podem trabalhar com registros que relacionem números a determinados cadastros, quando o acesso for legalmente permitido.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Dados complementares</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Categorias adicionais só são anunciadas quando existirem no catálogo real e houver base legal adequada.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Informações ausentes</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  A ausência de retorno pode resultar de falta de registros, limitações da modalidade ou diferenças entre fontes públicas.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
              <strong>Aviso obrigatório:</strong> O PuxarTelefone não promete acesso irrestrito a CPF, endereço, nome completo, e-mail pessoal, localização ou informações privadas de terceiros. A disponibilidade de qualquer categoria é específica e juridicamente validada.
            </div>

          </div>
        </section>

        {/* BLOCO 19 — COMO INTERPRETAR OS RESULTADOS */}
        <section id="interpretar-resultados" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Análise Cadastral
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Como interpretar o resultado de uma consulta por telefone?
              </h2>
              <p className="text-sm sm:text-base text-[#667784] dark:text-slate-300 leading-relaxed">
                Uma consulta pode retornar diferentes níveis de informação. É fundamental compreender o significado de cada status e suas limitações técnicas:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Formato válido</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Indica que o número possui estrutura compatível com o padrão verificado. Isso não confirma existência ou atividade da linha.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Registro encontrado</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Significa que determinada modalidade retornou uma informação correspondente aos seus critérios segundo sua fonte e data de referência.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Registro parcial</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Alguns campos podem estar disponíveis enquanto outros permanecem sem informação. A plataforma não preenche lacunas com conteúdo fictício.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Nenhum registro disponível</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Pode ocorrer quando o serviço não possui dados relacionados ao identificador ou quando a modalidade não cobre a informação desejada.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Informação desatualizada</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Telefones podem mudar de usuário, ser compartilhados ou reutilizados. Uma referência antiga não é prova de titularidade atual.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Informações divergentes</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Divergências cadastrais exigem verificação adicional e não representam automaticamente fraude.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 20 — APLICAÇÕES DA CONSULTA TELEFÔNICA (6 CARDS) */}
        <section id="aplicacoes" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Finalidades Legítimas
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Em quais situações uma pesquisa por telefone pode ser útil?
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Aplicações profissionais e pessoais éticas em conformidade com as diretrizes legais brasileiras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: 'Pesquisa de contato empresarial',
                  desc: 'Verificar se um telefone aparece nos canais públicos de determinada empresa.'
                },
                {
                  title: 'Conferência de numeração',
                  desc: 'Verificar se um telefone foi digitado no formato brasileiro correto antes de cadastrá-lo.'
                },
                {
                  title: 'Identificação de DDD',
                  desc: 'Compreender a área de numeração associada ao código informado em contatos recebidos.'
                },
                {
                  title: 'Organização de cadastros autorizados',
                  desc: 'Em contextos empresariais legítimos, a verificação de dados ajuda a identificar inconsistências em cadastros próprios.'
                },
                {
                  title: 'Análise inicial de ligação desconhecida',
                  desc: 'Pesquisar referências públicas relacionadas a um número, sem tratar o resultado como identificação definitiva do autor da ligação.'
                },
                {
                  title: 'Consulta de contato comercial',
                  desc: 'Conhecer modalidades disponíveis para pesquisa de informações relacionadas a telefones de negócios.'
                }
              ].map((card, i) => (
                <div key={i} className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 space-y-2.5 shadow-2xs">
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">{card.title}</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl text-xs text-[#667784] dark:text-slate-400 max-w-2xl mx-auto">
              * O PuxarTelefone não deve ser utilizado como ferramenta de vigilância, perseguição, rastreamento ou exposição indevida de dados pessoais de terceiros.
            </div>

          </div>
        </section>

        {/* BLOCO 21 — BENEFÍCIOS DO PUXARTELEFONE (6 DIFERENCIAIS REAIS) */}
        <section id="beneficios" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Vantagens da Plataforma
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Por que utilizar o PuxarTelefone?
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Uma solução projetada para entregar agilidade, transparência comercial e respeito às normas de dados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: 'Busca diretamente pelo telefone',
                  desc: 'Comece informando apenas o número com DDD no formulário principal sem fricção.'
                },
                {
                  title: 'Experiência otimizada para celular',
                  desc: 'Acesse o formulário e conheça as modalidades disponíveis utilizando o navegador do seu smartphone com total fluidez.'
                },
                {
                  title: 'Orientação antes de contratar',
                  desc: 'Entenda previamente as categorias de consulta e suas limitações técnicas e legais.'
                },
                {
                  title: 'Conferidor gratuito',
                  desc: 'Verifique o formato do número e o DDD sem realizar uma consulta cadastral paga.'
                },
                {
                  title: 'Preços informados',
                  desc: 'Confira os valores dos módulos disponíveis antes da contratação, sem taxas escondidas.'
                },
                {
                  title: 'Informações sobre privacidade',
                  desc: 'Conheça com transparência as condições de tratamento de dados e os canais de atendimento disponíveis.'
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-[#F7FAFC] dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 space-y-2.5 shadow-2xs hover:border-[#0061D9]/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">{card.title}</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BLOCO 22 — OUTROS SERVIÇOS CADASTRAIS (LINKS FUNCIONAIS) */}
        <section id="outros-servicos" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#667784] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 px-3 py-1 rounded-full">
                Serviços Complementares
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Além de telefone, conheça outras consultas disponíveis
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                O PuxarTelefone é especializado em pesquisas iniciadas por números telefônicos, mas a plataforma também oferece outras modalidades cadastrais. Cada serviço utiliza um identificador próprio e possui regras específicas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              
              {/* CPF */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center">
                    <UserCheck className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de CPF online</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Conheça as modalidades disponíveis para pesquisas cadastrais iniciadas por CPF, observando os requisitos legais aplicáveis.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/consulta-cpf"
                    className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consultar CPF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* CNPJ */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de CNPJ</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Pesquise informações empresariais conforme as modalidades disponíveis no catálogo da plataforma.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/consulta-cnpj"
                    className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consultar CNPJ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Placa */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center">
                    <Car className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta de placa de veículo</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Inicie pesquisas veiculares utilizando uma placa brasileira, conforme os relatórios disponíveis no catálogo.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/consulta-placa"
                    className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consultar placa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Nome */}
              <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:border-[#0061D9]/40 transition-colors">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EFFBFC] text-[#0061D9] flex items-center justify-center">
                    <Search className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Consulta cadastral por nome</h3>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    Conheça modalidades de pesquisa iniciadas por nome, observando limitações relacionadas a homônimos e identificação.
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-[#E2EAF0] dark:border-white/10">
                  <Link
                    href="/consulta-nome"
                    className="text-xs font-bold text-[#0061D9] hover:text-[#0050b5] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consultar por nome</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BLOCO 23 — PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD) */}
        <section id="privacidade" className="py-16 md:py-24 bg-white dark:bg-[#090E17]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Privacidade e Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight leading-tight">
                Consulta de telefone, privacidade e uso responsável das informações
              </h2>
              <div className="text-sm sm:text-base text-[#667784] dark:text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Um número de telefone pode constituir dado pessoal quando estiver relacionado a uma pessoa identificada ou identificável. Por isso, pesquisas que envolvam registros telefônicos e informações cadastrais devem respeitar as finalidades do tratamento e os direitos previstos na legislação aplicável.
                </p>
                <p>
                  A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) estabelece princípios e requisitos para a coleta, utilização, armazenamento e compartilhamento de dados pessoais. A existência de informações em fontes publicamente acessíveis não significa autorização irrestrita para qualquer utilização.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EAF0] dark:border-white/10">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Posso pesquisar qualquer telefone?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  O formulário permite iniciar verificações de formato de números compatíveis. O acesso a informações pessoais associadas depende de finalidade legítima e das condições legais aplicáveis.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Os dados podem ser divulgados livremente?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. A utilização ou divulgação de dados pessoais deve observar estritamente a finalidade e o fundamento legal adequado.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">A consulta permite rastrear pessoas?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. A pesquisa cadastral não representa rastreamento GPS ou acesso à localização atual de alguém.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">O serviço acessa WhatsApp ou mensagens?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Não. A consulta não permite acessar conversas privadas, códigos de autenticação ou conteúdos protegidos de aplicativos.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <h3 className="font-bold text-base text-[#172B3A] dark:text-white">Como solicitar informações sobre meus dados?</h3>
                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Disponibilizamos um canal específico para solicitações relacionadas ao tratamento de dados pessoais e aos direitos dos titulares (Opt-out e exclusão).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-5 pt-4 text-xs font-bold text-[#0061D9]">
              <Link href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</Link>
              <span className="text-[#E2EAF0] dark:text-slate-700">|</span>
              <Link href="/termos" className="hover:underline">Termos de Uso</Link>
              <span className="text-[#E2EAF0] dark:text-slate-700">|</span>
              <Link href="/protecao-de-dados" className="hover:underline">Proteção de Dados (LGPD)</Link>
              <span className="text-[#E2EAF0] dark:text-slate-700">|</span>
              <Link href="/contato" className="hover:underline">Fale Conosco</Link>
              <span className="text-[#E2EAF0] dark:text-slate-700">|</span>
              <Link href="/sobre" className="hover:underline">Sobre o PuxarTelefone</Link>
            </div>

          </div>
        </section>

        {/* BLOCO 24 — FAQ COMPLETO PARA SEO (26 PERGUNTAS E RESPOSTAS) */}
        <section id="faq" className="py-16 md:py-24 bg-[#F7FAFC] dark:bg-[#0e1726] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/5 border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Base de Conhecimento
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Perguntas frequentes sobre consulta de telefone
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Tire suas dúvidas sobre consultas cadastrais, formatos suportados, DDD, celulares, fixos e proteção de dados.
              </p>
            </div>

            <FaqAccordion />

          </div>
        </section>

        {/* BLOCO 25 — CONTEÚDOS EDUCATIVOS E BLOG */}
        <section id="conteudos" className="py-16 md:py-24 bg-white dark:bg-[#090E17] border-t border-[#E2EAF0] dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-[#0061D9] text-xs font-bold uppercase tracking-wider bg-[#EFFBFC] border border-[#00B7C2]/30 px-3 py-1 rounded-full">
                Educação Telefônica
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
                Aprenda mais sobre números de telefone e consultas online
              </h2>
              <p className="text-sm md:text-base text-[#667784] dark:text-slate-300">
                Compreender como funciona a numeração telefônica, os códigos DDD e as possibilidades de pesquisa ajuda a interpretar informações corretamente e evitar conclusões equivocadas.
              </p>
            </div>

            {/* Artigos Dinâmicos Publicados */}
            {latestArticles.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#172B3A] dark:text-white">Artigos Publicados no Blog</h3>
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
            )}

            {/* Grupos Temáticos de Guias Prioritários */}
            <div className="pt-8 border-t border-[#E2EAF0] dark:border-white/10 text-left">
              <h3 className="text-base font-bold text-[#172B3A] dark:text-white mb-6 text-center">
                Tópicos e Guias Educativos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#667784] dark:text-slate-300">
                <div className="p-5 rounded-2xl bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#172B3A] dark:text-white">Números Desconhecidos</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Como pesquisar um número desconhecido</li>
                    <li>O que fazer quando um número estranho liga</li>
                    <li>Como reconhecer possíveis golpes por telefone</li>
                    <li>O que é falsificação de número em chamadas (spoofing)</li>
                    <li>Como conferir um telefone de empresa</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#172B3A] dark:text-white">DDD e Numeração</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Como descobrir a região de um DDD</li>
                    <li>O que significa DDD 11 e DDD 21</li>
                    <li>Como funcionam os códigos DDD brasileiros</li>
                    <li>DDD mostra onde uma pessoa está?</li>
                    <li>Como funciona a portabilidade numérica</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#172B3A] dark:text-white">Consultas e Privacidade</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>O que é consulta reversa de telefone</li>
                    <li>Como funciona uma consulta cadastral por telefone</li>
                    <li>Quais são os limites de uma pesquisa por número</li>
                    <li>Telefone é considerado dado pessoal pela LGPD?</li>
                    <li>Como proteger seu número contra chamadas indevidas</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* BLOCO 26 — CTA FINAL */}
        <section className="relative py-20 md:py-28 bg-[#EFFBFC]/50 dark:bg-[#0061D9]/5 border-t border-[#E2EAF0] dark:border-white/10 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
            
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 text-[#0061D9] flex items-center justify-center mx-auto shadow-sm">
              <Phone className="w-7 h-7 text-[#0061D9]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#172B3A] dark:text-white tracking-tight leading-tight">
              Comece sua consulta de telefone agora
            </h2>

            <p className="text-[#667784] dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Informe um número de celular ou telefone fixo com DDD e conheça as modalidades de pesquisa disponíveis no PuxarTelefone. Confira os serviços oferecidos, os valores e as condições antes de contratar.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <Link
                href="#consultar-telefone"
                className="w-full sm:w-auto bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3.5 px-8 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Consultar telefone agora</span>
              </Link>
              <Link
                href="/cadastro"
                className="w-full sm:w-auto bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-[#E2EAF0] dark:border-white/10 text-[#172B3A] dark:text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-sm shadow-2xs"
              >
                <span>Criar conta</span>
              </Link>
            </div>

            <p className="text-[#667784] dark:text-slate-400 text-xs font-medium">
              A disponibilidade de informações depende da modalidade escolhida e dos registros legalmente acessíveis.
            </p>

          </div>
        </section>
      </main>

      {/* BLOCO 27 — FOOTER */}
      <Footer logoUrl={settings?.logoUrl} />

      {/* BLOCO 34 — BOTÃO FLUTUANTE NO MOBILE */}
      <MobileFloatingCta />

    </div>
  );
}
