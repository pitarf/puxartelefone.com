# Roadmap de Desenvolvimento - puxartelefone.com

## SPLIT 16: Remoção do Sufixo ".com" da Identidade Visual da Marca (✅ 100% CONCLUÍDO)
*Este split removeu o sufixo de domínio ".com" de todas as ocorrências visuais, garantindo um logotipo e identidade visual mais limpos, corporativos e diretos: PuxarTelefone.*
- [x] **Remoção de Logos & Elementos Visuais:**
  - `DashboardNavbar.tsx`: Logo alterado para `puxartelefone`.
  - `NavbarClient.tsx`: Logo da landing page alterado para `puxartelefone`.
  - `Footer.tsx`: Logo e copyright atualizados para `PuxarTelefone`.
  - `login/page.tsx` e `cadastro/page.tsx`: Identidade visual limpa no topo dos cards.
  - `MobileSidebar.tsx`: Cabeçalho do menu mobile atualizado.
- [x] **Textos Institucionais, Metadados e Banco:**
  - `page.tsx`: Seções "Por que utilizar o PuxarTelefone?", textos da LGPD e OpenGraph `siteName`.
  - `layout.tsx` e `SystemSetting`: Título mestre unificado para `PuxarTelefone`.
- [x] **Compilação e Validação de Produção:**
  - `npm run build` aprovado com 100% de sucesso.

## SPLIT 15: Migração da Sidebar para Navbar Superior Horizontal (✅ 100% CONCLUÍDO)
*Este split removeu a barra lateral escura fixa do painel e implementou uma Navbar moderna superior horizontal com dropdowns, liberando área útil de tela e alinhando o design com a identidade clean da marca.*
- [x] **Criação da Nova Navbar do Dashboard (`DashboardNavbar.tsx`):**
  - Barra superior fixa (`sticky top-0 z-50`) com efeito glassmorphism translúcido.
  - Dropdown elegante de **Consultas** priorizando a Consulta Telefônica em primeiro lugar.
  - Links horizontais rápidos para Histórico, Saldo, Promoções, Indicações e Suporte.
  - Card de Saldo (`BalanceHeader`) e menu de perfil de usuário integrados no topo à direita.
  - Gaveta móvel responsiva retrátil para smartphones.
- [x] **Refatoração do Layout Principal (`src/app/dashboard/layout.tsx`):**
  - Remoção da `aside` lateral de 256px de largura.
  - Conteúdo do painel centralizado em container de alta resolução (`max-w-7xl mx-auto`).
- [x] **Compilação e Validação de Produção:**
  - `npm run build` aprovado sem erros (40 rotas compiladas no Next.js 16).

## SPLIT 14: Rebranding Integral da Marca (DetetiveBuscas -> PuxarTelefone) (✅ 100% CONCLUÍDO)
*Este split eliminou qualquer ocorrência residual de DetetiveBuscas, atualizando o banco de dados e todo o ecossistema de metadados, e-mails, rotas e páginas institucionais para PuxarTelefone.*
- [x] **Atualização do Registro Mestre em Banco (`SystemSetting`):**
  - Título oficial definido: `PuxarTelefone - Consulta de Telefone e Dados Cadastrais`.
  - Razão social atualizada para `PUXARTELEFONE TECNOLOGIA LTDA` e e-mail `contato@puxartelefone.com`.
- [x] **Substituição de Fallbacks de Domínio & Schemas Estruturados:**
  - Fallbacks em `robots.ts`, `sitemap.ts`, `actions/cms.ts` e `actions/auth.ts` atualizados de `detetivebuscas.com` para `https://puxartelefone.com`.
  - Rich Snippets Schema.org (`Organization`, `WebPage`, `BlogPosting`) atualizados para nome `PuxarTelefone`.
- [x] **Ajustes de UI & Comunicação com o Usuário:**
  - Link de suporte via WhatsApp atualizado com mensagem de saudação para `PuxarTelefone`.
  - Rodapés de segurança do admin-login e páginas legais padrão (Termos de Uso, Sobre, LGPD) devidamente atualizados.
- [x] **Validação e Build:** Compilação de produção (`npm run build`) executada com sucesso absoluto.

## SPLIT 13: Deploy em Produção na VPS & Provisionamento Docker (✅ 100% CONCLUÍDO)
*Este split cobriu a sincronização do repositório no GitHub, configuração da VPS Ubuntu 24.04, instalação do Docker Engine e Nginx reverso, e ativação dos containers em produção.*
- [x] **Sincronização com GitHub:** Repositório oficial atualizado em `https://github.com/pitarf/puxartelefone.com.git`.
- [x] **Configuração e Segurança da VPS (`2.25.105.214`):**
  - Chave SSH pública do operador configurada com permissões seguras em `/root/.ssh/authorized_keys`.
  - Instalação dos pacotes de infraestrutura (`git`, `curl`, `nginx`, `certbot`, `docker.io`, `docker-compose-v2`).
- [x] **Configuração do Nginx Proxy Reverso:**
  - Bloco em `/etc/nginx/sites-available/puxartelefone.com` encaminhando porta 80 para a porta local `3000`.
- [x] **Build e Deploy Docker Multi-Stage:**
  - Build otimizado standalone do Next.js 16 (`puxartelefone-app`) e container de banco de dados (`puxartelefone-db`).
  - Containers iniciados com sucesso via `docker compose up -d` com mapeamento de volume persistente.
  - Resposta HTTP 200 confirmada em `http://2.25.105.214` e `http://127.0.0.1:3000`.
- [x] **Certificado SSL / HTTPS Ativo:**
  - Emissão bem-sucedida de certificado Let's Encrypt para `puxartelefone.com` e `www.puxartelefone.com`.
  - Redirecionamento automático HTTP para HTTPS configurado e testado no Nginx.
  - Renovação automática programada via timer do Certbot.

## SPLIT 12: Redesign Clean com Predominância do Branco Puro (✅ 100% CONCLUÍDO)
*Este split removeu a sensação dark da landing page, integrando o Branco Puro (#FFFFFF) como cor central da paleta e garantindo uma experiência SaaS limpa, iluminada e profissional.*
- [x] **Inclusão do Branco Puro (#FFFFFF) na Identidade Visual:**
  - Aplicação de fundo mestre branco em 100% da primeira dobra, cabeçalho e componentes de demonstração.
  - Substituição de gradientes e blocos escuros pesados por fundos sutis (`#FFFFFF`, `#F7FAFC`, `#EFFBFC`).
- [x] **Navbar Clean e Translúcida:**
  - Fundo branco com backdrop-blur suave tanto no topo quanto ao rolar a página.
  - Links em `#667784` com hover para `#0061D9` e menu mobile inteiramente branco.
- [x] **Stacking Cards Clean:**
  - Card 03 reformulado para fundo branco com destaque na borda `#0061D9` e tipografia escura `#172B3A`.
- [x] **Benefícios e CTA Final Luminosos:**
  - Seção de benefícios em fundo turquesa suave com 4 cards brancos elegantes.
  - CTA final reformulado com fundo `#F7FAFC` e botão de conversão azul vibrante.
- [x] **Padrão Clean First:**
  - `themeColor` atualizado para `#ffffff` e script de inicialização configurado para exibir o modo clean/branco por padrão.

## SPLIT 11: Stacking Cards a 60 FPS, Waves SVG & Navbar Reativa ao Scroll (✅ 100% CONCLUÍDO)
*Este split foca na implementação da animação tátil de Stacking Cards verticais na seção Como Funciona, Navbar com scroll dinâmico e divisores orgânicos em ondas SVG seguindo a paleta de cores oficial.*
- [x] **Configuração e Mapeamento da Paleta Oficial:**
  - `COR_ESCURA_INSTITUCIONAL`: `#0B00CF` (Azul-violeta para navbar com scroll e contrastes institucionais)
  - `COR_PRIMARIA_BOTOES`: `#0061D9` (Azul principal de ação, CTAs e links interativos)
  - `COR_VIBRANTE_ACENTOS`: `#00B7C2` (Turquesa vibrante para gradientes, ícones e badges)
  - `COR_CLARA_ACENTOS`: `#EFFBFC` (Fundo turquesa suave)
  - `COR_TEXTO_ESCURO`: `#172B3A` / `COR_TEXTO_MUTED`: `#667784`
  - `COR_FUNDO_SUAVE`: `#F7FAFC` / `COR_BORDA`: `#E2EAF0`
- [x] **Navbar Reativa ao Scroll Dinâmico (`NavbarClient.tsx`):**
  - Listener passivo de scroll (`window.scrollY > 40`).
  - Fase Superior (0-40px): Transparente/Branco, texto escuro e botão azul.
  - Fase Rolada (>40px): Fundo azul-violeta escuro `#0B00CF/95`, backdrop blur, texto branco e botão invertido branco com texto azul.
- [x] **Carrossel Vertical com Stacking Cards a 60 FPS (`ComoFuncionaStacking.tsx`):**
  - Sticky Scroll animado via `requestAnimationFrame` sem travas e com interpolação de escala `1 - (progress * 0.04)`.
  - Escalonamento das cartas (`top-[135px]`, `top-[155px]`, `top-[175px]`) e cabeçalho sticky com `backdrop-blur-md`.
  - Prevenção rigorosa de bugs de layout com `overflow-x: clip` no `html, body` em `globals.css`.
- [x] **Transições Fluidas com Ondas Orgânicas (Wave SVG):**
  - Divisores orgânicos integrados entre a Hero Section, Como Funciona, Benefícios e CTA Final.
  - Seção de Benefícios com gradiente institucional suave `from-[#0B00CF] via-[#0061D9] to-[#00B7C2]` e cards glassmorphism.
- [x] **Compilação e Validação de Produção:**
  - `npm run build` aprovado sem erros (Turbopack, Next.js 16, 40 rotas compiladas).

## SPLIT 10: Redesign Completo com Foco em Consulta de Telefone (✅ 100% CONCLUÍDO)
*Este split foca na reformulação visual corporativa (SaaS), na priorização absoluta de consulta por número telefônico e na aplicação da nova paleta de cores.*
- [x] **Nova Identidade Visual & Design System:**
  - Aplicação oficial das cores: Azul Principal (`#0061D9`), Turquesa (`#00B7C2`), Azul-Violeta (`#0B00CF`), Verde Turquesa (`#0BD976`), Verde Vibrante (`#0ACF06`).
  - Fundos e bordas limpos: `#FFFFFF`, `#F7FAFC`, `#EFFBFC`, `#F0FCF5`, `#E2EAF0`, com tipografia em `#172B3A` e `#667784`.
- [x] **Primeira Dobra (Hero) Focada em Telefone:**
  - H1 direto e sem promessas irreais: *"Consulte informações a partir de um número de telefone"*.
  - Componente `HomeSearchBox` ampliado com foco em telefone, suporte com/sem 55 e máscara `(XX) XXXXX-XXXX`.
  - Botão principal destacado: *"Consultar telefone"*.
- [x] **Orquestração Completa das 10 Seções da Home:**
  - 1. Hero com formulário de telefone e card demonstrativo conceitual.
  - 2. Como funciona (fluxo claro em 3 etapas).
  - 3. Tipos de consulta telefônica (Titularidade, Enriquecimento e Localização).
  - 4. Benefícios (Milissegundos, Pix avulso, LGPD e Cache 48h).
  - 5. Informações sobre os serviços com `HomeTabs` priorizando telefonia.
  - 6. Outros serviços cadastrais organizados em posição secundária (CPF, CNPJ, Veículos e Nome).
  - 7. Seção ética de uso responsável e proteção de dados LGPD.
  - 8. Perguntas frequentes atualizadas no `FaqAccordion`.
  - 9. CTA final com botão *"Consultar telefone"*.
  - 10. Novo rodapé unificado `Footer`.
- [x] **Preservação Integral de Funcionalidades e Validação:**
  - 100% dos fluxos reais de API, cache, autenticação e banco de dados preservados.
  - Build de produção compilado com sucesso (Turbopack, código de saída 0).

## SPLIT 1: Fundação, Design e Estrutura Core (✅ CONCLUÍDO)
*Este split foca na base sólida do sistema e na experiência do usuário.*
- [x] Arquitetura Next.js 16 + Prisma + PostgreSQL.
- [x] **UI/UX Premium:** Interface Glassmorphism com suporte a Dark/Light Mode.
- [x] **Sistema de Autenticação:** Login seguro via JWT e Gestão de Perfil.
- [x] **SEO Gerenciável:** Painel para controle de Metadados e Branding.
- [x] **Estrutura de Dashboard:** Menu lateral funcional e navegação responsiva.

## SPLIT 2: Financeiro, Auditoria e Inteligência de Dados (✅ CONCLUÍDO)
*Este split foca na monetização, controle administrativo e performance.*
- [x] **Wallet System:** Carteira digital em Reais (R$) com histórico de transações.
- [x] **Integração PushinPay:** Automação total de depósitos via Pix (Webhook).
- [x] **Painel Administrativo Analítico:** Visão de faturamento, lucros e logs técnicos.
- [x] **Auditoria e Segurança:** Rastreamento de IDs externos e central de logs proativa.
- [x] **Sistema de Cache Inteligente (48h):** Redução de custos operacionais e prevenção de gastos duplicados.
- [x] **Integração Real (CPF):** Conexão oficial com o provedor de consultas e Modo Demo para Admin.
- [x] **Migração Cloud:** Banco de dados migrado para Neon PostgreSQL e pronto para Vercel.

## SPLIT 3: Deploy Docker, Segurança Admin e API V3 (✅ 100% CONCLUÍDO)
*Este split foca na escala final, infraestrutura de produção e blindagem do sistema.*

### 🚀 Deploy e Infraestrutura Profissional (✅ 100% CONCLUÍDO)
- [x] **Containerização com Docker:**
    - `Dockerfile` e `docker-compose.yml` otimizados para modo standalone.
    - Persistência de volumes e isolamento de banco de dados.
- [x] **Deploy em VPS:**
    - Deploy realizado com sucesso na VPS Hostinger (srv1664973).
    - Automação de backup diário às 03:00 AM.
- [x] **Certificados e Proxy:**
    - Configuração de Nginx para Proxy Reverso.
    - Certificados SSL (HTTPS) via Certbot.

### 💎 Identidade e Conversão (✅ CONCLUÍDO)
- [x] **Landing Page "WolfBuscas":** Nova interface premium em Dark Mode com foco em conversão.
- [x] **Mecanismo de Isca (SearchTeaser):** Simulação de busca com animação e loading para atrair cadastros.
- [x] **Branding Dinâmico:** Gerenciamento de Logo e Favicon via Painel Admin com URL externa.
- [x] **Metadata Inteligente:** SEO Dinâmico gerado automaticamente a partir do banco de dados.

### 🔐 Segurança e Gestão Admin (✅ CONCLUÍDO)
- [x] **Gestão de Preços:** Aba administrativa para alterar valores de cada módulo em tempo real.
- [x] **Checkpoint de Segurança Admin:** Senha secundária mestra (@212121@) no ambiente (.env).
- [x] **Proteção Anti-Brute Force:** Limite de 3 tentativas na senha admin com bloqueio automático de 1h.

### 📱 Experiência e Engajamento (V3 & UX) (✅ CONCLUÍDO)
- [x] **Estabilização da API V3:** Migração para DirectData V3 (Smart Search e Enriquecimento) para CPF, Nome, Telefone e Email.
- [x] **Cache Modular:** Prevenção inteligente de dupla cobrança por até 48 horas validando módulos exatos no banco.
- [x] **Visualizador de Dados:** Renderização formatada e legível de arrays/objetos complexos (Endereços).
- [x] **Mobile-First Real:** Implementação da Sidebar retrátil com `React Portal` para quebrar bloqueios de blur e usabilidade de botões gigantes.
- [x] **Fluxo de Conversão (Saldo):** Banner e botões de "Recarregar" integrados a falhas de tentativa de busca sem saldo.

## SPLIT 4: Adaptação de Temas (Clean / Dark) na Área Admin (✅ CONCLUÍDO)
*Este split foca em estender o alternador de temas dinâmico para toda a área administrativa e login de admin.*
- [x] Adaptar o layout do Admin (`src/app/admin/layout.tsx`) com `ThemeToggle` e suporte a contraste.
- [x] Adaptar a página principal de métricas (`src/app/admin/page.tsx` & `DashboardClient.tsx`).
- [x] Adaptar a página de Vendas (`src/app/admin/vendas/page.tsx`).
- [x] Adaptar a gestão de usuários e auditoria (`src/app/admin/usuarios/page.tsx` & `UserTableClient.tsx`).
- [x] Adaptar a página de Configurações de Branding e SEO (`src/app/admin/configuracoes/page.tsx`).
- [x] Adaptar a tabela de Preços de Módulos (`src/app/admin/precos/PrecosClient.tsx`).
- [x] Adaptar os logs do sistema (`src/app/admin/logs/page.tsx`).
- [x] Adaptar a tela de Checkpoint de Login Administrativo (`src/app/admin-login/page.tsx`).

### 🛠️ Próximas Tarefas Prioritárias
- [x] Implementação de Login Social (Google OAuth2).
- [x] Configuração final do SSL/Nginx no domínio oficial.
- [x] Correção técnica e estabilização do Webhook da PushinPay (Resiliência, IDs corretos e idempotência).
- [x] Teste de ponta a ponta do Webhook da PushinPay em ambiente de produção.
- [x] Correção de cálculo de faturamento e vendas no painel administrativo.
- [x] Criação de navegação deslizante premium móvel (AdminMobileMenu) para administradores no celular.
- [x] Implementação de aba e Server Actions para Confirmação/Aprovação Manual de Pix pelo Administrador.
- [x] Correção do menu mobile do administrador com React Portal (solução de aprisionamento de CSS por backdrop-blur).
- [x] Otimização da chamada principal (Hero) na Landing Page para focar em "CPF, Telefone e Placa".
- [x] Criação de opção de validação manual de Pix na Gestão de Usuários para criar e aprovar Pix manualmente (Pix IDs não registrados).
- [x] Correção do erro 400 na busca por Nome (Migrando para a Pesquisa Avançada V2 da DirectData com polling e tratamento de erro robusto).
- [x] Validação simplificada de recargas Pix manuais na Gestão de Usuários (tornando o campo ID opcional com fallback autogerado).
- [x] Implementação de blindagem de SSL (axiosV3 com rejectUnauthorized: false) nas chamadas V3 da DirectData para evitar falhas de carregamento e incompatibilidade de certificados em containers.
- [x] Criação de botão de ação (Promover/Rebaixar Admin) na Gestão de Usuários e Server Action `toggleUserRole` para gerenciar administradores pela interface.
- [x] Criação de campos dinâmicos no Painel de Configurações (`/admin/configuracoes`) para alterar o Token da API PushinPay e o Token do Webhook em tempo real.
- [x] Adição do link "Preços" no menu e da seção de Tabela de Preços Dinâmica na Landing Page (`/` e `#precos`).
- [x] Exibição do horário exato do cadastro dos usuários na coluna "Data Registro" da Gestão de Usuários (`/admin/usuarios`).
- [x] Alteração do nome do menu lateral e cabeçalho de "Histórico" para **"Minhas consultas"**.
- [x] Criação da rota `/dashboard/faturas` para eliminar o erro 404 do botão "Adicionar Saldo" no menu lateral.
- [x] Correção da ordenação cronológica, escala dinâmica e cores do gráfico "Desempenho Diário" no Painel Admin.
- [x] Injeção do evento Google Analytics (`manual_event_PURCHASE`) exatamente no momento de aprovação bem-sucedida do pagamento Pix (em tempo real).
- [x] Correção do Bug de Reset de Preços (removendo `price` do update no prisma seed e adicionando revalidação de cache estático na rota principal `/`).
- [x] Correção Definitiva da Consulta por Nome (ajuste para o Endpoint `api.app` exigido pela DirectData e preenchimento de contrato nulo obrigatório).
- [x] Bypass do WAF (Cloudflare/Firewall) na Busca por Nome migrando a chamada de `axios` para `fetch` nativo e removendo flag insegura de SSL.

## SPLIT 5: Sistema CMS de Páginas SEO, Blog, 301 Redirects e Sitemap (✅ CONCLUÍDO)
*Este split foca na indexação orgânica profissional, aquisição de tráfego (SEO) e gerenciamento de conteúdo institucional.*
- [x] **Modelagem Prisma CMS:** Criação das tabelas `Page`, `Category`, `Article` e `Redirect`.
- [x] **Gerenciador de Páginas SEO no Admin (`/admin/paginas`):** Criação de CRUD completo com controle de slugs, H1, meta descrições, scripts customizados JSON-LD/OpenGraph e status (rascunho/publicado).
- [x] **Gerenciador de Blog no Admin (`/admin/blog`):** Cadastro de categorias de artigos e gerenciamento completo de publicações de blog.
- [x] **Rotas Dinâmicas Públicas:** Renderização automática de páginas na raiz `/[slug]` e feed do blog em `/blog` / `/blog/[slug]`.
- [x] **Redirecionamento 301 Automático:** Criação automática de redirecionamentos permanentes de slugs antigos ao editar URLs, evitando erros 404 e links quebrados.
- [x] **Evitação de Redirecionamentos em Cadeia:** Atualização de links históricos redundantes quando um slug já redirecionado é renomeado novamente.
- [x] **Sitemap.xml e Robots.txt Dinâmicos:** Sitemap síncrono e limpo, contendo apenas URLs válidas e indexáveis. Robots.txt blindando painéis internos (`/admin`, `/dashboard/`), APIs (`/api/`), login, cadastro e URLs com parâmetros (`/*?*`).
- [x] **Injeção de Metadados e Canonical:** Tags `<link rel="canonical">` auto-referentes injetadas no layout e controle dinâmico da tag `robots` (`noindex, nofollow` em painéis protegidos).
- [x] **Blocos de Links Internos:** Exibição dinâmica de links de consulta adicionados pelo admin e das últimas 3 postagens do blog diretamente na homepage para indexação natural.

## SPLIT 6: Reestruturação Comercial, Páginas Institucionais e Busca por Nome (✅ CONCLUÍDO)
*Este split foca no aumento da taxa de conversão cadastral (CRO), conformidade jurídica avançada e refinamento das buscas por nome.*
- [x] **Campo de Busca Interativo no Hero (Teaser):** Simulação de busca com loading de conformidade e preview mascarado para atrair cadastros (componente `HomeSearchBox`).
- [x] **Cards de Links Rápidos (CRO/SEO):** Inclusão de 5 cards na Home apontando para as páginas de pesquisas (CPF, Telefone, Placa, CNPJ, Nome).
- [x] **Indicadores Comerciais Reais:** Atualização da faixa de métricas com indicadores focados (24h online, Pix imediato, sem mensalidade, organização por categorias).
- [x] **Páginas Institucionais Legais:** Rotas e páginas estáticas `/sobre`, `/contato`, `/suporte`, `/politica-de-privacidade` e `/politica-de-cookies`.
- [x] **Footer Global Corrigido:** Ajuste dos links e descrições no rodapé para apontar para as novas rotas.
- [x] **SEO Avançado e Schemas JSON-LD:** Configuração de injeção dos metadados Open Graph e schemas JSON-LD `Organization`, `WebSite` e `FAQPage` estruturados.
- [x] **Busca por Nome com Homônimos (Multi-Candidato):** Listagem inicial de candidatos de forma gratuita, permitindo o consumo de saldo somente após confirmação do perfil correto.
- [x] **Eliminação de Carregamento Infinito e Blindagem de Timeouts:** Timeouts seguros no `axiosV3` (8s), otimização da rota veicular (3.5s no gateway estadual com resposta instantânea pelo Senatran nacional), Promise.race em Server Actions (10s) e timeout preventivo no frontend (15s).
- [x] **Auditoria Completa ao Vivo de APIs e Calibragem de Timeouts (30s):** Diagnóstico em tempo real de CPF, CNPJ, Telefone, Email, Processos, Veículos, Nome, PushinPay, Brevo e Banco Neon. Ajuste dos timeouts de Server Action para 30s e ampliação do polling da Pesquisa Avançada por Nome (até 20s).
- [x] **Tratamento Amigável de 'Entidade Não Encontrada' e Logs Ricos no Admin:** Tradução de erros técnicos da DirectData para mensagens humanas e transparentes (informando que o saldo não foi cobrado), suporte a números com `+55` e enriquecimento dos logs do sistema (`/admin/logs`) com dados do cliente (Nome, E-mail, Saldo) e diagnóstico explicativo.
- [x] **Pesquisa Avançada (V2) para Telefone com Multi-Candidatos:** Integração com a API `AdvancedSearch/FilterNaturalPerson` (DirectData V2) com listagem prévia gratuita de candidatos (`telefone_candidatos`), seleção do perfil correto, cobrança somente na confirmação com `ProcessingIds` + `ViewSearch` e fallback automático para V3 (`EnriquecimentoLead`).
- [x] **Auditoria de Custos de APIs para Telefone no Admin:** Inclusão de `telefone_candidatos` (R$ 0,00) e `telefone` V2 (R$ 0,36) nos cálculos de custos operacionais e margem de lucro em `/admin/custos` e no Dashboard Admin.
- [x] **Otimização Crítica do Webhook PushinPay (Anti-Timeout 2000ms):** Diagnóstico de latência da rota e aceleração da resposta para menos de 400ms através de validação em memória do token, transação atômica enxuta e desacoplamento assíncrono de logs, comissões e push notifications.
- [x] **Blindagem na Consulta de Telefone e Eliminação de Erro Inesperado:** Tratamento com `try/catch` no `FilterNaturalPerson` (V2) para garantir acionamento do fallback V3 e resposta transparente sem erros não tratados, com alinhamento de timeout no frontend para 32s.
- [x] **Tabela de Preços Mobile-First no Admin (`/admin/precos`):** Refatoração da interface de gestão de preços para dispositivos móveis com barra de busca rápida, tags de categorias, suporte inteligente a vírgula/ponto, destaque informativo do custo real de APIs (Processos Judiciais R$ 3,30) e revalidação instantânea de rotas.

## SPLIT 7: Bloqueio de Consultas por Nome e Blindagem LGPD (✅ CONCLUÍDO)
*Este split foca na conformidade com a LGPD e no controle administrativo granular de chaves de busca.*
- [x] **Suporte a NOME no Painel de Bloqueios LGPD (`/admin/bloqueios`):**
  - Inclusão da opção "Nome Completo" no formulário de inclusão de bloqueios ao lado de CPF, CNPJ, Placa e Telefone.
  - Higienização com normalização NFD (remoção de acentos), caixa alta e exigência de nome e sobrenome.
  - Exibição de badge e valor formatado na tabela de registros bloqueados.
- [x] **Controle Global de Consultas por Nome (`/admin/configuracoes`):**
  - Adição do campo `allowNameSearch` no schema do banco (`SystemSetting`).
  - Seção visual "Regras de Consulta e LGPD" com botão liga/desliga para ativar ou desativar consultas nominais no sistema.
- [x] **Ocultação Dinâmica nas Telas de Consulta:**
  - `Dashboard` (`/dashboard`), `Processos Judiciais` (`/dashboard/processos`) e `Endereços` (`/dashboard/enderecos`) respeitam a flag `allowNameSearch`, ocultando cartões e opções de busca por nome caso desativada.
- [x] **Blindagem no Backend (`realizarConsulta`):**
  - Bloqueio imediato caso o usuário tente consultar por nome enquanto o recurso estiver desativado.
  - Interceptação automática na blocklist `BlockedData` por nome completo normalizado.
  - Filtragem preventiva na listagem de candidatos homônimos (`candidates`), expurgando candidatos bloqueados por Nome ou CPF.
  - Checagem pós-API para impedir exibição de dados e cobrança indevida de titulares bloqueados.

## SPLIT 8: Precisão Monetária e Eliminação de Falso Positivo de Saldo (✅ CONCLUÍDO)
*Este split foca na integridade de cálculos monetários e eliminação de falhas causadas por ponto flutuante IEEE 754.*
- [x] **Diagnóstico da Causa Raiz:** Identificada falha de precisão na soma de módulos decimais (ex: 3.9 + 1.9x6 + 8.9 = 24.200000000000003), provocando rejeição indevida para clientes com saldo exato (24.20).
- [x] **Arredondamento Centesimal no Backend e Frontend:** `Math.round(total * 100) / 100` aplicado em `consultas.ts`, `DashboardPage` e `ProcessosPage`.
- [x] **Comparação de Saldo por Centavos Inteiros:** `Math.round(user.balance * 100) < Math.round(totalCost * 100)` para eliminar discrepâncias binárias.
- [x] **Tolerância contra Resíduos no Prisma Update:** `where: { balance: { gte: totalCost - 0.005 } }` para evitar falha no update atômico.
- [x] **Higienização de Saldos no PostgreSQL da VPS:** Atualização em lote arredondando saldos com resíduos acumulados na base de produção.

## SPLIT 9: Visualizador Premium de Processos Judiciais (✅ CONCLUÍDO)
*Este split foca na reformulação visual e estrutural do relatório de processos judiciais para eliminar JSON bruto e proporcionar UX impecável no celular e desktop.*
- [x] **Criação do `ProcessosJudiciaisViewer.tsx`:**
  - Formatação oficial CNJ com regex (`NNNNNNN-DD.AAAA.J.TR.OOOO`).
  - Botão tátil "Copiar CNJ" com feedback visual de confirmação ("Copiado!").
  - Badges de Tribunal, Instância, Sistema e Status processual colorido.
  - Metadados: Vara, Comarca, Data de Distribuição, Valor da Causa em BRL e Trânsito em Julgado.
  - Separação clara de partes em Polo Passivo e Polo Ativo.
  - Destaque com badge `"Pessoa Consultada"` para o titular da busca.
  - Advogados e defensores com número da OAB e UF.
  - Card de "Nada Consta" com selo de segurança quando nenhum processo for localizado.
- [x] **Integração no `DataViewer.tsx`:**
  - Renderização da seção em largura total (`col-span-full`).
  - Proteção e fallback elegante no `formatObjectItem` contra vazamento de `JSON.stringify`.
- [x] **Validação e Compilação:** Teste de build do Next.js aprovado com 100% de sucesso.

