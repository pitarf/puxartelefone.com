import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import NavbarClient from '@/components/NavbarClient';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Home } from 'lucide-react';
import { SeoPageContent } from '@/components/SeoPageContent';

interface Props {
  params: Promise<{ slug: string }>;
}

// Helper para verificar se a página deve ser considerada rascunho (não publicada ou agendada para o futuro)
function isPageDraft(page: any) {
  if (!page) return true;
  if (!page.published) return true;
  if (page.publishedAt && new Date(page.publishedAt) > new Date()) return true;
  return false;
}

// 1. GERAÇÃO DE METADADOS DINÂMICOS (OpenGraph e Twitter Cards completos)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Verifica se há um redirecionamento cadastrado primeiro
  const redirect = await prisma.redirect.findUnique({ where: { oldSlug: slug } });
  if (redirect) return {};

  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page || isPageDraft(page)) {
    return {
      title: 'Página não encontrada',
      robots: 'noindex, nofollow',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://puxartelefone.com';
  const canonicalUrl = page.canonical || `${baseUrl}/${page.slug}`;

  // Processa Open Graph
  let extraOg: any = {};
  if (page.openGraph) {
    try {
      extraOg = JSON.parse(page.openGraph);
    } catch (e) {
      console.error('Erro ao fazer parse do OpenGraph da página:', e);
    }
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: page.robotsIndex,
      follow: true, // Garante que robôs sigam links internos mesmo em noindex (noindex, follow)
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription || undefined,
      url: `${baseUrl}/${page.slug}`,
      images: page.image ? [{ url: page.image, alt: page.imageAlt || page.title }] : undefined,
      type: 'website',
      ...extraOg,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription || undefined,
      images: page.image ? [page.image] : undefined,
    }
  };
}

// 2. COMPONENTE DE PÁGINA CORINGA
export default async function DynamicCoringaPage({ params }: Props) {
  const { slug } = await params;

  // Verifica redirecionamento 301
  const redirectEntry = await prisma.redirect.findUnique({
    where: { oldSlug: slug },
  });

  if (redirectEntry) {
    permanentRedirect(`/${redirectEntry.newSlug}`);
  }

  let page = await prisma.page.findUnique({ where: { slug } });

  // Auto-seeding dinâmico e auto-curativo das páginas institucionais padrão
  if (!page) {
    const defaultPages: Record<string, { title: string; content: string; description: string }> = {
      'sobre': {
        title: 'Sobre o PuxarTelefone',
        description: 'Conheça nossa trajetória, nosso propósito corporativo e como estruturamos a maior plataforma de enriquecimento e consulta telefônica do país.',
        content: `<h2>Quem Somos</h2>
<p>O <strong>PuxarTelefone</strong> é uma plataforma tecnológica de ponta dedicada ao enriquecimento de dados cadastrais e à facilitação de consultas institucionais a partir de números telefônicos. Voltada estritamente para o ambiente de negócios (B2B), a plataforma ajuda empresas na prevenção de fraudes, validação de identidades (KYC - Know Your Customer) e higienização de registros internos.</p>
<h2>Nossa Missão</h2>
<p>Nossa missão é democratizar o acesso à inteligência cadastral de forma transparente e flexível. Por meio do modelo pay-per-use, permitimos que negócios de qualquer porte tenham acesso a dados valiosos sem a necessidade de contratos engessados de fidelidade ou taxas fixas mensais.</p>
<h2>Nossos Valores</h2>
<ul>
  <li><strong>Transparência:</strong> Preços claros, sem taxas escondidas ou mensalidades fixas.</li>
  <li><strong>Privacidade:</strong> Conformidade total com a LGPD e respeito aos direitos dos titulares.</li>
  <li><strong>Tecnologia:</strong> Consultas em milissegundos e cache inteligente otimizado.</li>
</ul>`
      },
      'contato': {
        title: 'Fale Conosco',
        description: 'Precisa de ajuda com o seu saldo, dúvidas sobre os módulos ou deseja fechar uma parceria comercial? Entre em contato por um de nossos canais oficiais.',
        content: `<h2>Canais Oficiais</h2>
<p>Precisa de ajuda com o seu saldo, dúvidas sobre os módulos ou deseja fechar uma parceria comercial? Entre em contato por um de nossos canais oficiais abaixo.</p>
<h3>E-mail de Suporte</h3>
<p>Envie sua mensagem para: <strong>suporte@puxartelefone.com</strong></p>
<h3>Horário de Atendimento</h3>
<p>Segunda a Sexta-feira • 09:00 às 18:00 (Horário de Brasília).</p>
<h3>Atendimento 100% Digital</h3>
<p>Nosso prazo médio de resposta para solicitações via e-mail é de até 24 horas úteis. Tenha sempre em mãos o comprovante de recarga Pix ou o e-mail cadastrado para acelerar o processo.</p>`
      },
      'suporte': {
        title: 'Central de Suporte',
        description: 'Encontre respostas rápidas para dúvidas frequentes sobre saldos, faturas e consultas.',
        content: `<h2>Dúvidas Frequentes</h2>
<p>Encontre respostas para as principais dúvidas sobre o funcionamento da plataforma.</p>
<h3>Como funcionam as recargas Pix?</h3>
<p>O valor mínimo de recarga é de R$ 5,00. Assim que o pagamento é efetuado, nosso sistema confirma e libera o saldo em poucos segundos de forma automática.</p>
<h3>O saldo expira?</h3>
<p>Não, o saldo depositado não tem prazo de validade e você pode utilizá-lo para consultas a qualquer momento.</p>
<h3>Como tirar dúvidas sobre consultas?</h3>
<p>Você pode acessar o histórico de consultas no painel ou entrar em contato com o suporte enviando um e-mail com os dados da transação.</p>`
      },
      'termos': {
        title: 'Termos de Uso',
        description: 'Estes termos de uso regem a utilização da plataforma PuxarTelefone.',
        content: `<h2>Termos e Condições Gerais</h2>
<p>Ao utilizar o site e os serviços do PuxarTelefone, você aceita integralmente as condições descritas nestes Termos de Uso.</p>
<h3>1. Finalidade Legítima</h3>
<p>O usuário declara utilizar as ferramentas de consultas de dados cadastrais estritamente para finalidades legítimas, como prevenção de fraudes, validação cadastral ou enriquecimento de dados em conformidade com as legislações pertinentes.</p>
<h3>2. Responsabilidade pelas Credenciais</h3>
<p>A segurança de seu usuário e senha é de sua exclusiva responsabilidade. Quaisquer transações ou recargas efetuadas na sua conta serão de sua inteira responsabilidade.</p>
<h3>3. Política de Cobrança e Reembolsos</h3>
<p>Os créditos comprados através de recarga Pix destinam-se ao consumo de serviços da plataforma e não possuem direito a reembolso ou saque após confirmados.</p>`
      },
      'politica-de-privacidade': {
        title: 'Política de Privacidade',
        description: 'Entenda como tratamos e protegemos suas informações de cadastro e transações.',
        content: `<h2>Tratamento de Dados Pessoais</h2>
<p>Sua privacidade é prioritária. Esta política descreve quais dados coletamos, armazenamos e tratamos na plataforma.</p>
<h3>1. Dados Coletados</h3>
<p>No momento do cadastro de novos usuários, solicitamos exclusivamente nome completo, endereço de e-mail e criação de senha segura. Não exigimos documento de identificação pessoal (como CPF ou CNPJ) para a abertura de conta pública.</p>
<h3>2. Segurança e Comunicação</h3>
<p>Adotamos protocolos rígidos de segurança, tráfego criptografado via HTTPS/TLS (SSL) e práticas avançadas de proteção e isolamento em nossos bancos de dados para que suas informações e históricos de pesquisas permaneçam confidenciais.</p>
<h3>3. Direitos de Acesso e LGPD</h3>
<p>Você tem o direito de solicitar a alteração, confirmação ou exclusão de seus dados cadastrais a qualquer momento através do suporte ou de nossa página de proteção de dados.</p>`
      },
      'politica-de-cookies': {
        title: 'Política de Cookies',
        description: 'Saiba como e por que utilizamos cookies no nosso site.',
        content: `<h2>Uso de Cookies no Site</h2>
<p>Utilizamos cookies para personalizar a sua experiência e guardar suas preferências.</p>
<h3>1. O que são cookies?</h3>
<p>Cookies são pequenos fragmentos de texto enviados ao seu navegador pelo site que você visita para fins de recordação de sessões e dados.</p>
<h3>2. Tipos de Cookies que Utilizamos</h3>
<ul>
  <li><strong>Essenciais:</strong> Mantêm você logado na sua conta com segurança.</li>
  <li><strong>Atribuição (Marketing/Afiliados):</strong> Rastreiam cliques de links de afiliados pelo período de 30 dias para repasse correto das comissões Pix.</li>
</ul>`
      },
      'protecao-de-dados': {
        title: 'Proteção de Dados (LGPD)',
        description: 'Saiba como exercemos a proteção de dados dos cidadãos e a política de opt-out.',
        content: `<h2>Conformidade com a LGPD</h2>
<p>O PuxarTelefone preza pelo respeito integral à Lei Geral de Proteção de Dados (Lei nº 13.709/18).</p>
<h3>1. Direitos dos Cidadãos</h3>
<p>Garantimos a todo cidadão brasileiro a transparência sobre a existência de dados em nossa plataforma.</p>
<h3>2. Exclusão e Bloqueio de Dados (Opt-out)</h3>
<p>Caso você seja titular de um CPF ou Telefone e deseje que o mesmo seja permanentemente bloqueado para pesquisas em nosso site, basta preencher nosso formulário de Opt-out.</p>`
      },
      'consulta-cpf': {
        title: 'Consulta de CPF Online | Validação Cadastral',
        description: 'Consulte informações cadastrais de pessoas físicas pelo CPF. Validação rápida da situação na Receita Federal, histórico de endereços e contatos vinculados.',
        content: `<h2>Consulta e Validação de CPF</h2>
<p>O serviço de <strong>Consulta de CPF</strong> do PuxarTelefone permite que empresas e profissionais realizem validações cadastrais de pessoas físicas com agilidade, transparência e segurança jurídica.</p>
<h2>O que você pode validar com esta consulta?</h2>
<ul>
  <li><strong>Situação Cadastral:</strong> Verificação imediata do status junto à Receita Federal (Regular, Suspensa, Cancelada).</li>
  <li><strong>Confirmação de Dados:</strong> Nome completo, data de nascimento e conferência de dígitos verificadores.</li>
  <li><strong>Contatos e Vínculos:</strong> Identificação de números de telefone e e-mails associados para enriquecimento de cadastros e KYC.</li>
  <li><strong>Histórico de Localização:</strong> Registro de endereços prévios para localização e correspondência legítima.</li>
</ul>
<h2>Como realizar a consulta?</h2>
<p>Nossa plataforma opera no modelo pay-per-use, sem taxas mensais fixas ou contratos engessados. Você recarrega apenas o saldo que desejar via Pix e utiliza para as consultas necessárias.</p>
<div style="margin: 32px 0; text-align: center;">
  <a href="/cadastro" style="background: #0061D9; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0, 97, 217, 0.3);">Criar Conta e Consultar CPF</a>
</div>`
      },
      'consulta-cnpj': {
        title: 'Consulta de CNPJ Online | Quadro Societário e Dados Empresariais',
        description: 'Consulte dados cadastrais completos de empresas através do CNPJ. Situação cadastral, sócios (QSA), CNAE e contatos corporativos.',
        content: `<h2>Consulta Cadastral de Empresas por CNPJ</h2>
<p>A <strong>Consulta de CNPJ</strong> do PuxarTelefone foi desenvolvida para agilizar o processo de homologação de fornecedores, análise de risco B2B, prevenção de fraudes e qualificação de parceiros comerciais.</p>
<h2>Informações disponíveis na consulta empresarial</h2>
<ul>
  <li><strong>Dados Básicos da Pessoa Jurídica:</strong> Razão Social, Nome Fantasia, data de abertura, porte empresarial e natureza jurídica.</li>
  <li><strong>Quadro de Sócios e Administradores (QSA):</strong> Relação de sócios, cargos e participações societárias.</li>
  <li><strong>Atividades Econômicas:</strong> Código e descrição do CNAE Principal e CNAEs Secundários.</li>
  <li><strong>Contatos Institucionais:</strong> Telefones comerciais, e-mails cadastrados e endereços corporativos.</li>
</ul>
<h2>Agilidade e Conformidade</h2>
<p>Obtenha os dados essenciais para o seu negócio em segundos. Comece hoje mesmo sem fidelidade, pagando apenas pelas consultas realizadas.</p>
<div style="margin: 32px 0; text-align: center;">
  <a href="/cadastro" style="background: #0061D9; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0, 97, 217, 0.3);">Consultar CNPJ Agora</a>
</div>`
      },
      'consulta-placa': {
        title: 'Consulta de Veículos por Placa | Informações e Restrições',
        description: 'Consulte dados de veículos pela placa. Marca, modelo, ano de fabricação, características técnicas e status cadastral em base pública.',
        content: `<h2>Consulta Veicular por Placa</h2>
<p>A <strong>Consulta de Veículos por Placa</strong> permite identificar as características técnicas e a situação cadastral de veículos em território nacional para prevenção de fraudes em compras, vistorias e negociações.</p>
<h2>O que você verifica na consulta veicular?</h2>
<ul>
  <li><strong>Dados Técnicos do Veículo:</strong> Marca, modelo, versão, cor, ano de fabricação e ano do modelo.</li>
  <li><strong>Características Cadastrais:</strong> Tipo de combustível, potência, cilindradas e número de eixos.</li>
  <li><strong>Situação Cadastral:</strong> Verificação de status público e regularidade cadastral.</li>
</ul>
<h2>Sem Mensalidades</h2>
<p>Acesse o painel do PuxarTelefone, recarregue créditos via Pix com ativação instantânea e realize consultas pontuais conforme a sua demanda.</p>
<div style="margin: 32px 0; text-align: center;">
  <a href="/cadastro" style="background: #0061D9; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0, 97, 217, 0.3);">Realizar Consulta de Placa</a>
</div>`
      },
      'consulta-nome': {
        title: 'Consulta por Nome Completo | Localização e Apoio Cadastral',
        description: 'Pesquise dados e referências cadastrais a partir do nome completo para localização de titulares e conferência de registros.',
        content: `<h2>Consulta Cadastral por Nome Completo</h2>
<p>A <strong>Consulta por Nome</strong> auxilia empresas, advogados e investigadores legítimos a localizar registros e vínculos cadastrais quando há carência de documentos primários, como CPF ou telefone.</p>
<h2>Finalidades e Funcionalidades</h2>
<ul>
  <li><strong>Localização de Contatos:</strong> Identificação de números telefônicos ou municípios associados ao nome completo.</li>
  <li><strong>Desambiguação Cadastral:</strong> Triagem de registros com cruzamento de data aproximada ou estado (UF).</li>
  <li><strong>Conformidade e Ética:</strong> Uso estritamente condicionado à comprovação de finalidade legítima em conformidade com as diretrizes da LGPD.</li>
</ul>
<h2>Como começar?</h2>
<p>Crie sua conta em menos de 1 minuto e tenha acesso imediato a todas as ferramentas de consulta da plataforma PuxarTelefone.</p>
<div style="margin: 32px 0; text-align: center;">
  <a href="/cadastro" style="background: #0061D9; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0, 97, 217, 0.3);">Acessar Consulta por Nome</a>
</div>`
      }
    };

    if (defaultPages[slug]) {
      const def = defaultPages[slug];
      page = await prisma.page.create({
        data: {
          slug,
          title: def.title,
          h1: def.title,
          metaDescription: def.description,
          content: def.content,
          published: true,
          showInMenu: false,
          showInFooter: true,
          robotsIndex: true
        }
      });
      const { revalidatePath } = require('next/cache');
      revalidatePath('/[slug]');
      revalidatePath('/sitemap.xml');
    }
  }

  // Busca configurações e páginas de menu em paralelo
  const [settings, menuPages] = await Promise.all([
    prisma.systemSetting.findFirst(),
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

  // Se não existir ou estiver em rascunho/agendada, 404
  if (!page || isPageDraft(page)) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://puxartelefone.com';

  // 3. SCHEMA.ORG AUTOMÁTICO (WebPage, Service se for comercial, e BreadcrumbList)
  const schemas: any[] = [];

  // Breadcrumb Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title,
        "item": `${baseUrl}/${page.slug}`
      }
    ]
  });

  // WebPage Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/${page.slug}#webpage`,
    "url": `${baseUrl}/${page.slug}`,
    "name": page.title,
    "description": page.metaDescription || page.title,
    "breadcrumb": `${baseUrl}/${page.slug}#breadcrumb`
  });

  // Service Schema (se for página comercial com palavra 'consulta')
  if (page.slug.includes('consulta') || page.slug.includes('background-check')) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Consulta Cadastral e Inteligência de Dados",
      "provider": {
        "@type": "Organization",
        "name": settings?.siteTitle?.split(' - ')[0] || "PuxarTelefone",
        "url": baseUrl
      },
      "name": page.title,
      "description": page.metaDescription || page.title
    });
  }

  const isCustomLandingPage = /<style\b/i.test(page.content);

  // Extrai styles para renderização no SSR (evitando flashes e garantindo CSS inicial)
  const styles: string[] = [];
  page.content.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
    if (css.trim()) styles.push(css.trim());
    return '';
  });

  // Limpa tags estruturais para não renderizá-las literalmente
  const cleanHtml = page.content
    .replace(/<!DOCTYPE html>/gi, '')
    .replace(/<\/?(html|head|body)\b[^>]*>/gi, '')
    .trim();

  if (isCustomLandingPage) {
    return (
      <div className="flex flex-col min-h-screen bg-background antialiased overflow-x-hidden">
        {/* ===================== NAVBAR ===================== */}
        <NavbarClient logoUrl={settings?.logoUrl} siteTitle={settings?.siteTitle} menuPages={menuPages} />

        {/* Estilos renderizados no SSR */}
        {styles.map((css, idx) => (
          <style key={`custom-css-${idx}`} dangerouslySetInnerHTML={{ __html: css }} />
        ))}

        {/* Renderiza o conteúdo usando o componente SeoPageContent e executa scripts de forma segura */}
        <main className="flex-1 w-full">
          <SeoPageContent html={cleanHtml} isAdminCreated={true} />
        </main>

        {/* Schemas Auto-gerados (SEO) */}
        {schemas.map((schema, index) => (
          <script
            key={`schema-auto-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Schema JSON-LD Extra (Manual do Admin) */}
        {page.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: page.jsonLd }}
          />
        )}

        {/* ===================== FOOTER ===================== */}
        <Footer logoUrl={settings?.logoUrl} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden">
      {/* ===================== NAVBAR ===================== */}
      <NavbarClient logoUrl={settings?.logoUrl} siteTitle={settings?.siteTitle} menuPages={menuPages} />

      {/* ===================== CONTEÚDO PRINCIPAL ===================== */}
      <main className="flex-1 py-10 bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Navegação Breadcrumb Física (HTML) */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 border-b border-slate-100 pb-4">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-600 truncate max-w-[250px]">
              {page.title.split(' - ')[0]}
            </span>
          </nav>

          {/* Header do artigo/página */}
          <header className="mb-8 text-center md:text-left space-y-4">
            {page.h1 ? (
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#243b56] tracking-tight leading-tight">
                {page.h1}
              </h1>
            ) : (
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#243b56] tracking-tight leading-tight">
                {page.title}
              </h1>
            )}
            {page.excerpt && (
              <p className="text-slate-500 text-lg leading-relaxed pt-2">
                {page.excerpt}
              </p>
            )}
          </header>

          {/* Imagem em destaque se houver */}
          {page.image && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img 
                src={page.image} 
                alt={page.imageAlt || page.title}
                className="w-full h-auto object-cover max-h-[450px]"
              />
            </div>
          )}

          {/* Conteúdo HTML Dinâmico renderizado de forma limpa */}
          <div 
            className="prose prose-slate dark:prose-invert max-w-none 
              prose-headings:text-[#243b56] prose-headings:font-extrabold 
              prose-p:leading-relaxed prose-p:text-slate-600 prose-p:text-base
              prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:underline
              prose-strong:text-[#243b56] prose-strong:font-bold
              prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* Schemas Auto-gerados */}
          {schemas.map((schema, index) => (
            <script
              key={`schema-auto-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}

          {/* Schema JSON-LD Extra (Manual do Admin) */}
          {page.jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: page.jsonLd }}
            />
          )}
        </article>
      </main>

      {/* ===================== FOOTER ===================== */}
      <Footer logoUrl={settings?.logoUrl} />
    </div>
  );
}
