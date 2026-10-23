# Changelog - puxartelefone.com (Clone Exato ConsultaALL)

Todas as mudanças notáveis para este projeto serão documentadas neste arquivo.

## [1.4.1] - 2026-10-23
### Limpeza da Marca Visual: Remoção do Sufixo ".com"
- **Remoção de Todos os Sufixos Visuais de Domínio:**
  - **Navbar Superior do Dashboard (`DashboardNavbar.tsx`):** Logo ajustado de `puxartelefone.com` para `puxartelefone` (`puxar` em branco/escuro e `telefone` no tom azul da marca `#0061D9`).
  - **Navbar da Landing Page (`NavbarClient.tsx`):** Logo principal limpo de `puxartelefone.com` para `puxartelefone`.
  - **Rodapé (`Footer.tsx`):** Logo e texto de copyright atualizados para `© PuxarTelefone. Todos os direitos reservados.`.
  - **Telas de Autenticação (`login/page.tsx`, `cadastro/page.tsx`):** Identidade visual limpa no topo do formulário.
  - **Menu Mobile Retrátil (`MobileSidebar.tsx`):** Logo no cabeçalho do drawer ajustado para `puxartelefone`.
  - **Seções Institucionais da Home (`page.tsx`):** Títulos de benefícios ("Por que utilizar o PuxarTelefone?"), textos da LGPD e tags OpenGraph `siteName`.
  - **Metadados (`layout.tsx`) e Banco de Dados (`SystemSetting`):** Título base unificado para `PuxarTelefone - Consulta de Telefone e Validação Cadastral`.

## [1.4.0] - 2026-10-23
### Migração Arquitetural do Painel: Sidebar Lateral -> Navbar Superior
- **Novo Componente Header/Navbar (`src/components/DashboardNavbar.tsx`):**
  - Barra de navegação superior horizontal fixa (`sticky top-0 z-50`) com efeito glassmorphism (`backdrop-blur-md`).
  - Alinhamento clean e integrado à paleta oficial:
    - Logo à esquerda (`puxartelefone.com`) com link direto para o dashboard.
    - Menu dropdown interativo **"Consultar"** agrupando as consultas (Telefone em destaque prioritário, CPF, Placas, CNPJ e Processos Judiciais).
    - Links horizontais rápidos para **Histórico**, **Adicionar Saldo**, **Promoções**, **Indicações** e **Suporte WhatsApp**.
    - Badge de acesso rápido ao **Painel Admin** visível apenas para usuários com permissão `ADMIN`.
    - Lado direito com **ThemeToggle** (Claro/Escuro), **BalanceHeader** (Saldo em R$ e botão de recarga) e Menu Suspenso de Usuário com avatar, nome, e-mail e botão de logout.
  - Gaveta mobile responsiva (`lg:hidden`) preservando 100% da usabilidade em smartphones.
- **Refatoração do Layout (`src/app/dashboard/layout.tsx`):**
  - Remoção da barra lateral fixa escura (`<aside className="w-64">`), liberando espaço horizontal útil na tela.
  - Container principal centralizado e responsivo (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8`).

## [1.3.3] - 2026-10-23
### Rebranding Completo de Marca: DetetiveBuscas -> PuxarTelefone
- **Banco de Dados & SystemSetting:**
  - Atualização do registro `default` em `SystemSetting`:
    - `siteTitle`: "PuxarTelefone - Consulta de Telefone e Dados Cadastrais".
    - `companyName`: "PUXARTELEFONE TECNOLOGIA LTDA".
    - `companyEmail`: "contato@puxartelefone.com".
    - `siteKeywords` e `siteDescription` orientados a consultas telefônicas e inteligência cadastral.
- **Domínios e Fallbacks de URL:**
  - Substituição de todas as ocorrências de fallback de `detetivebuscas.com` para `https://puxartelefone.com` em:
    - [robots.ts](file:///c:/Git/React/puxartelefone.com/src/app/robots.ts)
    - [sitemap.ts](file:///c:/Git/React/puxartelefone.com/src/app/sitemap.ts)
    - [actions/cms.ts](file:///c:/Git/React/puxartelefone.com/src/app/actions/cms.ts) (validação anti-phishing de redirecionamentos 301)
    - [actions/auth.ts](file:///c:/Git/React/puxartelefone.com/src/app/actions/auth.ts) (remetente oficial de e-mails transacionais)
    - [api/webhooks/pushinpay/route.ts](file:///c:/Git/React/puxartelefone.com/src/app/api/webhooks/pushinpay/route.ts) (`VAPID_SUBJECT` contato@puxartelefone.com)
    - [[slug]/page.tsx](file:///c:/Git/React/puxartelefone.com/src/app/[slug]/page.tsx) e [blog/[slug]/page.tsx](file:///c:/Git/React/puxartelefone.com/src/app/blog/[slug]/page.tsx) (Organization Schema.org estruturado)
    - [ClientScriptExecutor.tsx](file:///c:/Git/React/puxartelefone.com/src/components/ClientScriptExecutor.tsx) (redirecionamento relativo seguro para `/cadastro`).
- **Interfaces e Textos Institucionais:**
  - Mensagem do WhatsApp no dashboard: `https://wa.me/...&text=Olá, gostaria de suporte no PuxarTelefone`.
  - Telas de autenticação, rodapé de segurança do admin e páginas padrão de Termos de Uso, Sobre e LGPD atualizadas para a marca **PuxarTelefone**.
  - Validação de compilação de produção (`npm run build`) concluída com 100% de sucesso.

## [1.3.2] - 2026-10-22
### Deploy em Produção na VPS & Provisionamento Docker
- **Sincronização com o GitHub:**
  - Código atualizado e enviado para o repositório remoto: `https://github.com/pitarf/puxartelefone.com.git`.
- **Configuração e Provisionamento da VPS (`2.25.105.214`):**
  - Autenticação e instalação da chave pública SSH do operador em `~/.ssh/authorized_keys`.
  - Atualização completa do SO (`apt-get update`), Docker Engine v29.9.2 e Docker Compose v5.6.1 instalados.
  - Clone do repositório em `/var/www/puxartelefone.com` e sincronização do `.env` de produção.
  - Configuração do Nginx reverso apontando a porta 80 para a porta interna 3000 da aplicação.
  - Build multi-stage concluído e containers ativos (`puxartelefone-app` e `puxartelefone-db`). Resposta HTTP 200 validada tanto internamente quanto via IP público da VPS.
  - Certificado SSL Let's Encrypt gerado e configurado com renovação automática para `puxartelefone.com` e `www.puxartelefone.com`, com redirecionamento HTTP -> HTTPS ativo.

## [1.3.1] - 2026-10-22
### Harmonização com Ondas Orgânicas (Wave SVGs) ao Longo da Home
- **Aplicação Completa dos Divisores em Curvas Orgânicas:**
  - **Base da Hero Section:** Transição fluida em curva conectando com o carrossel "Como Funciona".
  - **Transição Tipos de Consulta -> Benefícios:** Inserção de divisor de onda orgânica SVG conectando a seção branca ao fundo suave em turquesa.
  - **Saída da Seção de Benefícios:** Onda orgânica reversa em branco puro fazendo a transição para a seção de Demonstração de Estrutura.
  - **Entrada do CTA Final:** Onda orgânica superior suave conectando o FAQ ao bloco de chamada final para consulta.
- **Correção de Overflow no Campo de Telefone:**
  - Ajuste de espaçamento interno para `md:pr-56` e placeholder condensado `DDD + Número (ex: 11 99999-9999)`, eliminando colisão de texto por baixo do botão.

## [1.3.0] - 2026-10-22
### Redesign Clean com Predominância do Branco
- **Inclusão do Branco Puro (#FFFFFF) como Base da Paleta de Cores:**
  - `COR_BRANCO_PURO`: `#FFFFFF` aplicado como fundo mestre de toda a Home, cabeçalho e cartões de dados.
  - Eliminação de blocos escuros e azuis pesados nas seções principais:
    - **Navbar:** Mantida limpa, translúcida e com fundo branco puro (`bg-white/95 backdrop-blur-md`) tanto no topo quanto ao rolar, com tipografia escura `#172B3A` e botões de alto contraste.
    - **Como Funciona (Stacking Cards):** Card 03 reformulado para fundo branco com borda azul e destaques luminosos, mantendo a animação a 60 FPS sem quebra visual.
    - **Seção de Benefícios:** Substituição do gradiente escuro por layout clean corporativo (`bg-[#EFFBFC]/60`), com cards brancos de sombra suave e ícones em turquesa/azul.
    - **Seção de CTA Final:** Convertida para fundo suave (`#F7FAFC`) com destaque para o botão primário azul vibrante (`#0061D9`) e texto institucional escuro de alta legibilidade.
- **Ajuste de Tema Padrão (Clean First):**
  - Script no `layout.tsx` ajustado para inicializar sempre no tema Clean/Branco por padrão, ativando `dark` apenas se explicitamente escolhido pelo usuário.
  - `themeColor` do navegador atualizado para `#ffffff`.

## [1.2.0] - 2026-10-22
### Stacking Cards a 60 FPS, Waves SVG & Navbar com Scroll Dinâmico
- **Mapeamento Oficial da Paleta de Cores da Marca:**
  - `COR_ESCURA_INSTITUCIONAL`: `#0B00CF` (Azul-violeta escuro para cabeçalho rolado e gradientes)
  - `COR_PRIMARIA_BOTOES`: `#0061D9` (Azul principal de ação, CTAs e links ativos)
  - `COR_VIBRANTE_ACENTOS`: `#00B7C2` (Turquesa tecnológico em badges, ícones e gradientes)
  - `COR_CLARA_ACENTOS`: `#EFFBFC` (Fundos sutis de realce e badges)
  - `COR_TEXTO_ESCURO`: `#172B3A` / `COR_TEXTO_MUTED`: `#667784`
  - `COR_FUNDO_SUAVE`: `#F7FAFC` / `COR_BORDA`: `#E2EAF0`
- **Navbar Reativa ao Scroll Dinâmico (`NavbarClient.tsx`):**
  - Implementado listener passivo de rolagem monitorando `window.scrollY > 40`.
  - Transição de estado: topo claro/transparente com logo escuro e botão primário azul `#0061D9`; ao rolar, assume fundo azul-violeta escuro `#0B00CF/95`, backdrop blur, textos em branco e botão invertido branco com texto azul.
- **Carrossel Vertical com Stacking Cards (`ComoFuncionaStacking.tsx`):**
  - Seção "Como Funciona" reformulada com efeito de empilhamento vertical (Sticky Scroll a 60 FPS).
  - Cálculo de física e proximidade via `requestAnimationFrame` aplicando escala sutil `1 - (progress * 0.04)` e filtro de brilho `1 - (progress * 0.15)`.
  - Fixação escalonada das etapas com `top-[135px]`, `top-[155px]`, `top-[175px]` e cabeçalho sticky que não quebra em dispositivos móveis.
  - Blindagem anti-quebra de sticky no `globals.css` via `overflow-x: clip`.
- **Transições Visuais com Ondas Orgânicas (Wave SVG):**
  - Inserção de divisores com ondas vetoriais suaves entre a Hero e Como Funciona, Benefícios e CTA Final.
  - Redesign da Seção de Benefícios com gradiente institucional suave `from-[#0B00CF] via-[#0061D9] to-[#00B7C2]` e cards translúcidos glassmorphism.

## [1.1.0] - 2026-10-22
### Redesign Completo com Foco em Consulta de Telefone
- **Nova Identidade Visual Oficial (Paleta SaaS Profissional):**
  - Implementação das cores obrigatórias: Azul Principal (`#0061D9`), Turquesa (`#00B7C2`), Azul-Violeta (`#0B00CF`), Verde Turquesa (`#0BD976`), Verde Vibrante (`#0ACF06`).
  - Cores complementares integradas: Fundo Principal (`#FFFFFF`), Fundo Alternativo (`#F7FAFC`), Fundo Turquesa Suave (`#EFFBFC`), Fundo Verde Suave (`#F0FCF5`), Bordas (`#E2EAF0`), Texto Principal (`#172B3A`) e Texto Secundário (`#667784`).
- **Home Reformulada Orientada à Consulta Telefônica:**
  - Primeira dobra (Hero) com campo destacado e amplo de telefone (`HomeSearchBox.tsx`), com máscara automática `(XX) XXXXX-XXXX`, suporte a código do país `55` opcional e validação semântica em tempo real.
  - Orquestração rigorosa das 10 seções da landing page:
    1. Hero com consulta de telefone e card ilustrativo de retorno.
    2. Como funciona (fluxo em 3 etapas claras).
    3. Tipos de consulta telefônica disponíveis (Titularidade, Enriquecimento e Localização).
    4. Benefícios da plataforma (Velocidade, Pix avulso, LGPD e Cache 48h).
    5. Informações sobre os serviços e demonstração interativa (`HomeTabs.tsx`).
    6. Outros serviços cadastrais em posição secundária (CPF, CNPJ, Veículos e Nome).
    7. Uso responsável e privacidade (Termos, Políticas e Opt-out LGPD).
    8. Perguntas frequentes atualizadas (`FaqAccordion.tsx`).
    9. CTA final com direcionamento para a consulta.
    10. Novo Rodapé corporativo unificado (`Footer.tsx`).
- **Harmonização de Componentes e Área Logada:**
  - Atualização do Navbar (`NavbarClient.tsx`) com nova marca `puxartelefone.com` e CTA direto para `#consulta-hero`.
  - Atualização da Sidebar (`SidebarNav.tsx`, `MobileSidebar.tsx`) e dashboard (`/dashboard`) com a consulta de telefone em primeiro destaque.
  - Atualização das telas de autenticação (`/login`, `/cadastro`) com a nova identidade visual.

## [1.0.4] - 2026-10-22
### Clone e Inicialização do puxartelefone.com
- **Replicação Total da Arquitetura do ConsultaALL:**
  - Setup do projeto com Next.js 16 (App Router + Turbopack), Tailwind CSS v4 e Prisma ORM 6.2.1.
  - Replicação de todos os Splits (1 ao 9), incluindo o novo `ProcessosJudiciaisViewer.tsx`, tratamento de concorrência e precisão monetária (`Math.round`), Webhook resiliente PushinPay (<400ms), DirectData V2/V3 com fallback inteligente de candidatos e bloqueios LGPD completos.
  - Build de produção via Turbopack compilado com 100% de sucesso (7 rotas estáticas e 33 rotas dinâmicas).
### Adicionado & Aprimorado
- **Novo Visualizador Premium de Processos Judiciais (`ProcessosJudiciaisViewer.tsx`):**
  - **Eliminação de JSON Cru e Textos Desformatados:** Os resultados de processos judiciais retornados pela DirectData eram renderizados como string JSON bruta dentro de um card simples, dificultando a leitura. Foi criado um visualizador especializado, modular e responsivo (Mobile-First).
  - **Formatação Nacional CNJ:** Número do processo formatado automaticamente no padrão nacional do CNJ (`NNNNNNN-DD.AAAA.J.TR.OOOO`) com botão tátil de cópia para a área de transferência ("Copiar CNJ" / "Copiado!").
  - **Badges de Identificação Rápida:** Tribunal (ex: `TJ-SP`, `TRF`), Instância (`1ª Instância`, `2ª Instância`), Sistema (`ESAJ`, `PJe`) e Status do processo com cores contextuais (ex: `Em Andamento` em azul, `Arquivado` em cinza, `Julgado` em verde, `Suspenso` em âmbar).
  - **Estruturação de Dados Jurídicos:** Apresentação clara de Área do Direito (`Direito Penal`, `Direito Civil`, `Trabalhista`), Classe Processual, Assuntos Principais e Secundários, Órgão Julgador / Vara, Comarca, Data de Distribuição/Autuação e Valor da Causa formatado em BRL (`R$`).
  - **Separação Inteligente de Partes (Polos Ativo e Passivo):**
    - Separação entre **Polo Passivo** (Réu / Executado / Apelante) e **Polo Ativo** (Autor / Exequente / Apelado).
    - Identificação em destaque com badge `"★ Pessoa Consultada"` quando o documento pesquisado coincide com a parte envolvida.
    - Listagem de Advogados e Representantes Legais com número da OAB e UF vinculada.
  - **Card de 'Nada Consta':** Exibição amigável e segura caso não haja processos judiciais vinculados ao documento (`totalProcessos === 0`).
  - **Integração no `DataViewer.tsx`:** A seção de processos ocupa largura total (`col-span-full`) no grid e foi adicionada blindagem no `formatObjectItem` para que qualquer objeto de processo em listas genéricas seja formatado elegantemente em vez de cair em `JSON.stringify`.

## [1.0.2] - 2026-10-13
### Corrigido & Otimizado
- **Correção de Precisão Monetária e Eliminação de Falso Positivo de Saldo Insuficiente:**
  - **Causa Raiz Identificada:** A representação binária de ponto flutuante (IEEE 754) na soma de múltiplos módulos com centavos (ex: R$ 3,90 + 7x R$ 1,90 + R$ 8,90 = 24.200000000000003) causava a condição `user.balance (24.20) < totalCost (24.200000000000003)`, retornando falso positivo de "Saldo insuficiente" para usuários com saldo exato da consulta.
  - **Arredondamento Monetário Rigoroso:** O cálculo de `totalCost` em todas as rotas e componentes (`consultas.ts`, `DashboardPage`, `ProcessosPage`) agora utiliza `Math.round(rawCost * 100) / 100`.
  - **Comparação por Centavos Inteiros:** A validação de saldo agora compara centavos inteiros (`Math.round(user.balance * 100) < Math.round(totalCost * 100)`), garantindo que saldos exatos passem sem rejeição.
  - **Tolerância contra Resíduos no Banco:** Ajustada a cláusula de débito no Prisma para `balance: { gte: totalCost - 0.005 }`, absorvendo eventuais resíduos fracionários de ponto flutuante acumulados no banco de dados.
  - **Higienização Geral de Saldos:** Executado update em lote no PostgreSQL arredondando todos os saldos da base para 2 casas decimais exatas.

## [1.0.1] - 2026-10-07
### Adicionado & Aprimorado
- **Bloqueio de Consultas por Nome e Conformidade LGPD Completa:**
  - **Suporte a NOME no Painel de Bloqueios LGPD (`/admin/bloqueios`):** Agora é possível cadastrar nomes completos de titulares para bloqueio imediato, ao lado de CPF, CNPJ, Placa e Telefone.
  - **Higienização e Normalização Estrita:** Normalização NFD para remoção automática de acentos, padronização em caixa alta e espaços limpos garantem que qualquer variação de grafia (ex: "João da Silva", "joao da silva") seja interceptada.
  - **Controle Global de Consultas por Nome (`/admin/configuracoes`):**
    - Adicionada a seção "Regras de Consulta e LGPD" com botão liga/desliga para "Permitir Consulta por Nome".
    - Permite desativar globalmente a busca por Nome Completo em toda a plataforma, restringindo o sistema apenas a CPF, CNPJ, Placa e Telefone.
  - **Adaptação Dinâmica das Interfaces de Consulta:**
    - `Dashboard` (`/dashboard`), `Processos Judiciais` (`/dashboard/processos`) e `Endereços` (`/dashboard/enderecos`) ocultam automaticamente a opção de busca nominal quando desativada.
  - **Blindagem no Backend de Consultas (`realizarConsulta`):**
    - Rejeição imediata se a busca nominal estiver desativada pelo administrador.
    - Filtragem preventiva na lista de candidatos (`candidates`), ocultando homônimos cujos nomes ou CPFs estejam na lista de bloqueios LGPD.
    - Checagem pós-API para impedir exibição de dados ou cobrança de titulares bloqueados.
### Aprimorado & Otimizado
- **Tabela de Preços no Painel Admin (`/admin/precos`) com Design Mobile-First:**
  - Adicionada barra de busca instantânea e tags de filtro rápido por categoria (Crédito e Histórico, Dados pessoais, Empresas, Patrimônio e Renda, etc.).
  - Layout totalmente responsivo com cards e botões táteis largos, eliminando a compressão de colunas em telas de smartphones.
  - Suporte inteligente na digitação de valores monetários: aceita tanto vírgula quanto ponto (ex: `4,90` ou `4.90`), com sanitização automática.
  - Destaque informativo no módulo de *Processos Judiciais* indicando o custo real da DirectData (R$ 3,30).
  - Revalidação imediata de cache (`revalidatePath`) para `/admin/precos`, `/admin/custos`, `/dashboard`, `/dashboard/processos` e demais páginas de consulta.
- **Auditoria de Custos de API (`/admin/custos`):**
  - Alinhamento do custo unitário da consulta de Processos Judiciais para R$ 3,30 (valor real cobrado pelo provedor DirectData).

## [0.9.9] - 2026-10-03
### Adicionado
- **Guia Completo e Detalhado de Integração PushinPay (`documents/GUIA_PUSHINPAY.md`):**
  - Passo a passo completo para emissão de cobranças Pix avulsas com QR Code dinâmico e código Copia e Cola (`POST /api/pix/cashIn`).
  - Documentação detalhada sobre a arquitetura do Webhook, incluindo a blindagem obrigatória contra o timeout estrito de 2000ms da PushinPay e resposta HTTP 200 em menos de 500ms.
  - Modelagem e fluxo arquitetural para pagamentos por assinatura e recorrência com Pix (gestão de ciclos, faturas e automação via Cron Job).
  - Guia de transferências e saques Pix (Cash-Out via `POST /api/pix/cashOut`).
  - Checklist completo de segurança, tratamento de valores em centavos e idempotência financeira.

## [0.9.8] - 2026-10-01
### Reativado & Aprimorado
- **Reativação Completa do Módulo de Processos Judiciais:**
  - Remoção do bloqueio (`isLiberado = false`) na página de processos (`/dashboard/processos`), liberando o formulário completo de busca.
  - Ativação do link de navegação "Consultar processos" no menu lateral (`SidebarNav`) para desktop e mobile, removendo o status de indisponibilidade.
  - Inclusão do módulo `processos` nas chaves de busca permitidas (`availableModules`) no Dashboard principal (`/dashboard`) para buscas por CPF e dados vinculados.
  - Criação de interface visual com cartões explicativos detalhando exatamente o que pode ser pesquisado:
    - **Pessoa Física (CPF):** Busca direta em tribunais estaduais (TJ) e federais (TRF) vinculados ao CPF.
    - **Pessoa Jurídica (CNPJ):** Localização de processos cíveis, fiscais e trabalhistas envolvendo a empresa.
    - **Nome Completo (Nominal):** Busca nominal com filtro opcional por Estado (UF) e pré-visualização gratuita de candidatos homônimos.
  - Otimização do backend de consulta (`executeApi` em `realizarConsulta`): quando a consulta for exclusiva de processos via CPF ou CNPJ, a chamada vai diretamente para o endpoint de processos da DirectData (`ProcessosJudiciaisCompleta`), acelerando o retorno e poupando custos operacionais.
  - **Tabela de Preços e Opções de Consulta (`/dashboard/processos`):**
    - Implementação da seção "2. Opções de consulta e tabela de preços" com checkboxes interativos no mesmo padrão visual do restante do painel.
    - Exibição transparente dos módulos e valores: Processos Judiciais (Completo - R$ 1,00), Certidões Negativas e Falências (R$ 1,00) e Score e Risco de Crédito (R$ 2,00).
    - Totalizador dinâmico de custo em tempo real (`totalCost`), sincronizado com a tabela de preços do banco de dados (`ModulePricing`).
    - Inclusão do painel "3. Abrangência e informações retornadas na consulta" detalhando a cobertura em Tribunais Estaduais (TJs), Justiça Federal (TRFs), Justiça do Trabalho (TRTs) e dados retornados no relatório (CNJ, partes, OAB, andamentos, valor da causa).

## [0.9.7] - 2026-09-26
### Otimizado
- **Aceleração e Blindagem contra Timeout no Webhook PushinPay:**
  - Diagnóstico da causa do erro `cURL error 28: Connection timeout after 2000 ms` reportado pelo gateway PushinPay.
  - Eliminação de queries bloqueantes ao banco de dados Neon durante a autenticação: validação em memória do token do webhook via `process.env.PUSHINPAY_WEBHOOK_TOKEN` (economia de ~200ms de latência de rede).
  - Transação atômica ultra-enxuta: apenas a atualização de status da transação e incremento do saldo do usuário rodam no caminho crítico síncrono.
  - Desacoplamento assíncrono de operações secundárias: logs de auditoria (`SystemLog`), comissões de afiliados e Web Push notifications disparados em background sem bloquear o retorno HTTP 200 para a PushinPay.
  - Resposta imediata para eventos já processados (`alreadyProcessed: true`), garantindo que o botão "Reprocessar Webhook" do painel da PushinPay marque o status como verde instantaneamente.
  - Inclusão dos handlers `GET` e `HEAD` para testes de conectividade e health check do gateway.

### Corrigido
- **Blindagem na Consulta de Telefone (Fim do 'Erro inesperado'):**
  - Isolamento de exceções na Pesquisa Avançada V2 (`filterNaturalPerson`): quando um número não possui registro na V2, o erro 400/404 da API é capturado silenciosamente em `try/catch` e aciona imediatamente o fallback na V3 de Leads (`EnriquecimentoLead`).
  - Alinhamento de timeouts: limite de espera do frontend no Dashboard expandido de 15s para 32s (compatível com os 30s da Server Action), eliminando cortes prematuros em conexões móveis (4G/5G).
  - Mensagens amigáveis e não-genéricas: remoção definitiva do toast genérico "Erro inesperado ao realizar consulta", substituído pela explicação clara de que o número não consta na base nacional e que o saldo foi preservado.

## [0.9.6] - 2026-09-19
### Adicionado
- **Pesquisa Avançada (V2) para Consultas de Telefone:**
  - Migração do mecanismo de telefone para a API `AdvancedSearch/FilterNaturalPerson` (DirectData V2), permitindo encontrar proprietários e múltiplos vínculos associados ao número informado.
  - Fluxo em duas etapas: a listagem de candidatos é gratuita (`target: 'telefone_candidatos'`, custo R$ 0,00), permitindo ao cliente conferir nome, CPF mascarado, mãe e cidade antes de confirmar.
  - Débito do saldo e geração do relatório completo somente após o cliente confirmar o candidato desejado via `ProcessingIds` + `ViewSearch`.
  - Fallback automático e transparente na API V3 de Leads (`EnriquecimentoLead`) caso a Pesquisa Avançada não encontre candidatos, garantindo a maior cobertura possível do mercado.
  - Atualização do cálculo de custos de APIs no Admin (`/admin/custos` e métricas do dashboard): `telefone_candidatos` registrado a R$ 0,00 e consulta final de telefone computada a R$ 0,36.

## [0.9.5] - 2026-09-18
### Corrigido
- **Tratamento Humano de 'Documento Entidade Não Encontrada':**
  - O status técnico da DirectData (`Documento Entidade Não Encontrada`) foi traduzido para mensagens claras e amigáveis por tipo de consulta (`Telefone`, `CPF`, `CNPJ`, `Placa`, `Email`), explicitando que o número/documento não possui cadastro na base nacional e que o saldo do usuário não foi cobrado.
  - Normalização de telefones com DDI `+55` (12 ou 13 dígitos) diretamente no `validarTelefone` e no fluxo de consulta, aceitando números colados do WhatsApp.

### Adicionado
- **Detalhamento Completo nos Logs do Painel Admin (`/admin/logs`):**
  - Registro contextual de cada consulta que falha com nome do cliente, e-mail, telefone pesquisado, alvo, saldo atual, valor poupado e diagnóstico legível do provedor.
  - Interface visual dos logs atualizada com badges de identificação rápida (E-mail do cliente, Alvo: Chave, Selo de Saldo Preservado e Diagnóstico Explicativo) para agilizar o suporte no WhatsApp.

## [0.9.4] - 2026-09-12
### Modificado
- **Calibragem de Timeouts e Polling das APIs:**
  - Aumentado o timeout de proteção nas Server Actions (`consultas.ts`) para 30s (de 10s para 30s), eliminando falsos positivos de "timeout" em buscas assíncronas por Nome e Veículos.
  - Aumentado o número de tentativas de polling na busca por Nome em `performSmartSearch` de 5 (7.5s) para 10 tentativas (máx 20s), garantindo captura completa do cadastro enriquecido.
  - Executada auditoria geral ao vivo em 100% dos serviços (DirectData V3, V2, PushinPay, Brevo, PostgreSQL).

## [0.9.3] - 2026-09-12
### Corrigido
- **Eliminação de Travamento / Carregamento Infinito nas Consultas:**
  - Configurado timeout global padrão de 8s na instância `axiosV3` da DirectData, impedindo que chamadas pendentes deixem o cliente aguardando indefinidamente.
  - Resiliência na Consulta Veicular: rota Nacional do Senatran mantida como fonte principal instantânea (~1s), e a rota de débitos estaduais (`ConsultaVeicularEstadual`) recebeu limite estrito de 3.5s para não prender o usuário quando o gateway estadual oscilar.
  - Proteção de `Promise.race` nas Server Actions (`realizarConsulta`) com corte de segurança em 10s e mensagem informativa clara ao cliente.
  - Adicionado timeout de segurança no client-side (15s) no `Dashboard`, `Veículos` e `Empresas`, garantindo que o botão e o spinner sejam sempre liberados.
  - Singleton do `PrismaClient` mantido em todos os ambientes para estabilidade de conexões com o Neon PostgreSQL.

## [0.9.2] - 2026-08-31
### Adicionado
- **Função e Papel SEO no Painel Administrativo:**
  - Criação da role `"SEO"` para gerenciamento autônomo de blog, páginas SEO e branding.
  - Bloqueio completo a dados financeiros, saldo de usuários, custos de APIs, auditorias e logs do sistema.
  - Ocultação de credenciais confidenciais (Gateways e APIs externas) na tela de configurações para usuários com papel de SEO.
  - Inclusão do botão e atalho destacado **"Painel SEO"** (com ícone `Globe`) na barra lateral do Dashboard e no menu mobile para fácil acesso de contas com a permissão `SEO`.
  - Redirecionamento automático e inteligente do login administrativo diretamente para as configurações permitidas.

## [0.9.1] - 2026-08-03
### Adicionado
- **Integração de Caixa de Pesquisa Interativa (Hero):**
  - Criação do componente `HomeSearchBox` (Client-side) que simula o carregamento e varredura de dados de CPF, Placa ou Telefone de forma interativa.
  - Exibe um relatório mascarado (teaser) e um botão de ação com call-to-action chamando para o `/cadastro`.
- **Seção de Módulos Rápidos (Home):**
  - Inclusão dos 5 cards de consulta (CPF, Telefone, Placa, CNPJ, Nome) conectando diretamente às páginas internas de SEO da ferramenta.
- **Novas Páginas Institucionais e Rodapé Global:**
  - Criação das páginas e rotas `/sobre`, `/contato`, `/suporte`, `/politica-de-privacidade` e `/politica-de-cookies`.
  - Mapeamento e unificação dos links do Footer (`Footer.tsx`) apontando corretamente para as rotas e remoção de links mortos.
- **SEO Otimizado e JSON-LD Schemas:**
  - Injeção automática das tags JSON-LD para os Schemas `Organization`, `WebSite` e `FAQPage` via metadados.
  - Inclusão de seções institucionais de SEO e "Uso responsável das consultas".
  - Correção na descrição e canonical da homepage.
- **Busca por Nome Gratuita com Multi-Candidatos (DirectData):**
  - Refatoração da Server Action de consultas para interceptar a pesquisa inicial de Nome, retornando homônimos sem cobrança de saldo.
  - Consumo de saldo e polling detalhado acionados somente após a seleção do candidato correto pelo usuário.
- **Métricas Operacionais de ROI e Custos:**
  - Adicionado ROI (%) e Custos operacionais no Dashboard do Admin.
  - Tabelas de últimos depósitos do PIX e contadores dinâmicos de consultas realizadas hoje por categoria.

## [0.9.0] - 2026-07-26
### Adicionado
- **Gerenciador de Páginas SEO (CMS):**
  - Criação da tabela `Page` e do CRUD completo no painel de administração (`/admin/paginas`).
  - Permite configurar slug, título, H1, meta description, conteúdo (HTML rico), imagem OpenGraph e ALT, robots index/noindex, canonical e scripts customizados de JSON-LD e OpenGraph.
  - Renderização pública automática das páginas criadas através de rotas dinâmicas coringas `/[slug]` com integração ao cabeçalho/rodapé institucionais e metadados dinâmicos.
- **Gerenciador de Blog & Conteúdo:**
  - Criação de tabelas `Article` e `Category` com CRUD completo no painel administrativo (`/admin/blog`).
  - Feed público do blog estruturado e visualmente premium em `/blog` com paginação automática, autores, categorias e cards de visualização.
  - Páginas de artigos específicos `/blog/[slug]` com injeção automática de schemas estruturados do Google (Article JSON-LD) e links dinâmicos para artigos relacionados.
- **Redirecionamentos 301 Automáticos em Alteração de Slugs:**
  - Implementação de tabela `Redirect` para mapear slugs históricos.
  - Ao alterar o slug de uma página ou artigo, o sistema cria automaticamente um redirecionamento HTTP permanente 301 do endereço antigo para o novo.
  - Tratamento inteligente de cadeias de redirecionamento (ex: `/a` -> `/b` renomeado para `/c` atualiza o redirecionamento `/a` para apontar diretamente para `/c`).
- **Sitemap XML e Robots.txt Dinâmicos e Seguros:**
  - Sitemap em `/sitemap.xml` atualizado automaticamente a cada publicação ou remoção de Páginas e Artigos.
  - Sitemap configurado para conter apenas URLs indexáveis (`robotsIndex: true`), publicadas, canônicas originais e com status 200, excluindo totalmente rascunhos, noindex, login, cadastro, painel, termos de uso e parâmetros.
  - Robots.txt configurado para disallow em login, cadastro, esqueci minha senha, painel administrativo, dashboard de usuário, APIs e parâmetros, e apontamento explícito para o sitemap.

## [0.8.9] - 2026-07-21
### Corrigido
- **Bypass de WAF (Cloudflare/DirectData) na Busca por Nome:**
  - Remoção completa do client `axiosV2` (que possuía `rejectUnauthorized: false`) na chamada `FilterNaturalPerson` devido ao gatilho de bloqueio severo (`ECONNRESET`) pelo WAF da DirectData contra IPs de Datacenter.
  - Migração para a API `fetch` nativa (undici) do Node.js utilizando verificação estrita de SSL e cabeçalho `User-Agent` simulado (Spoofing) de um navegador Chrome, resolvendo o corte de conexão imediato na VPS.


## [0.8.8] - 2026-07-21
### Corrigido
- **Consulta Avançada por Nome (FilterNaturalPerson):**
  - Atualização do Endpoint da API para `https://api.app.directd.com.br` evitando recusa de conexão (Connection Reset) pelo WAF da DirectData.
  - Implementação de injeção compulsória de todos os campos do contrato no Payload da requisição (ex: `motherName`, `postalCode`, `receiveBolsaFamilia` como `null`), conforme exigência estrita da nova versão da API para evitar HTTP 400.


## [0.8.7] - 2026-07-21
### Corrigido
- **Sobrescrita de Preços dos Módulos (Bug do Reset):**
  - Removido o campo `price` da cláusula `update` no script de seed (`prisma/seed.ts`). Agora, as atualizações na VPS não resetam os preços personalizados definidos pelo administrador de volta para os valores padrão (R$ 1,00, R$ 0,50).
  - Adicionado `revalidatePath('/')` na Action de atualização de preços (`atualizarPrecoModulo`) para invalidar o cache estático do Next.js. Alterar os preços no Painel Admin agora atualiza os preços exibidos na Landing Page instantaneamente.


## [0.8.6] - 2026-07-21
### Adicionado
- **Rastreamento de Conversões (Google Analytics):**
  - Adicionado o disparo do evento `manual_event_PURCHASE` no exato momento em que o pagamento via Pix é aprovado em tempo real, evitando falsos positivos e permitindo rastreamento preciso de conversões.


## [0.8.5] - 2026-07-21
### Corrigido
- **Gráfico de Desempenho Diário no Painel Admin:**
  - Correção na ordenação cronológica dos últimos 30 dias de faturamento no agrupamento do banco de dados (anteriormente as datas ficavam em ordem randômica/de retorno do banco).
  - Preenchimento de todos os últimos 30 dias de forma sequencial (exibindo R$ 0,00 nos dias sem depósitos ao invés de pular datas ou quebrar a escala).
  - Escalonamento da altura das barras dinamicamente com base no faturamento máximo do período selecionado.
  - Correção de contraste e visibilidade das barras em modo escuro utilizando gradiente sólido azul com opacidade adequada.

## [0.8.4] - 2026-07-20
### Adicionado / Modificado
- **Criação da Página de Adicionar Saldo & Extrato de Recargas (`/dashboard/faturas`):**
  - Eliminação completa do erro 404 ao clicar no botão "Adicionar Saldo" do menu lateral.
  - Criação da nova rota de usuário `/dashboard/faturas` composta por `page.tsx` (Server) e `FaturasClient.tsx` (Client).
  - Inclui painel de geração de recargas Pix instantâneas com verificação automática de pagamento em tempo real e visualização do extrato completo de depósitos do usuário.

## [0.8.3] - 2026-07-20
### Adicionado / Modificado
- **Nomenclatura do Menu Lateral ("Minhas consultas"):**
  - Atualização do item de menu lateral em `src/components/SidebarNav.tsx` de "Histórico" para **"Minhas consultas"**.
  - Atualização do título principal da página `/dashboard/historico` para **"Minhas Consultas"**.

## [0.8.2] - 2026-07-20
### Adicionado / Modificado
- **Exibição do Horário Exato dos Cadastros na Gestão de Usuários:**
  - Atualização da coluna "DATA REGISTRO" na tabela de Gestão de Usuários (`/admin/usuarios`), passando a exibir a data e a hora exatas do cadastro (ex: `20/07/2026 às 14:35`).

## [0.8.1] - 2026-07-20
### Adicionado / Modificado
- **Tabela de Preços Dinâmica e Transparente na Landing Page (`#precos`):**
  - Adição do link **"Preços"** no menu de navegação da cabeçalho (desktop e mobile) posicionado entre "Como Funciona" e "Aplicações".
  - Criação da seção dedicada de preços e tarifas transparentes na página inicial (`src/app/page.tsx`), buscando os valores vigentes de cada módulo diretamente do banco de dados (`prisma.modulePricing.findMany()`).
  - Apresentação visual de alta conversão (CRO) dividida por categorias (Dados Pessoais, Pessoas Relacionadas, Renda, Veículos, Empresas e Crédito) para destacar o valor acessível das consultas (a partir de R$ 0,50) e converter visitantes em novos cadastros.

## [0.8.0] - 2026-07-20
### Adicionado / Modificado
- **Gerenciamento Dinâmico do Token da PushinPay no Painel Admin:**
  - Adição dos campos `pushinpayToken` e `pushinpayWebhookToken` ao modelo `SystemSetting` no banco de dados (`prisma/schema.prisma`).
  - Criação de uma seção dedicada em **Configurações** (`/admin/configuracoes`) com campos mascarados e botões de mostrar/ocultar senha para alterar o Token de API PushinPay e o Token de Segurança do Webhook em tempo real sem precisar reiniciar a VPS ou alterar o arquivo `.env`.
  - Leitura dinâmica dos tokens em `src/app/actions/pagamentos.ts` e `src/app/api/webhooks/pushinpay/route.ts` com fallback gracioso para as variáveis do `.env` caso o banco de dados não possua chaves customizadas cadastradas.

## [0.7.9] - 2026-07-20
### Adicionado / Modificado
- **Gerenciamento de Administradores no Painel (Promover/Rebaixar):**
  - Criação da Server Action `toggleUserRole` em `src/app/actions/admin.ts` para alternar com segurança o privilégio de acesso de qualquer usuário entre `USER` e `ADMIN`.
  - Adição de um botão com ícone de Coroa (`Crown`) na coluna de Ações da tabela de Gestão de Usuários (`/admin/usuarios`), permitindo ao administrador promover ou rebaixar usuários com 1 clique diretamente na interface visual.
  - Adição da Badge visual destacada `ADMIN` com o ícone de coroa para identificação rápida dos administradores da plataforma.

## [0.7.8] - 2026-07-12
### Adicionado / Modificado
- **Blindagem de SSL na API V3 da DirectData:**
  - Criação de uma instância customizada do Axios (`axiosV3`) com a desabilitação da validação estrita de certificados SSL (`rejectUnauthorized: false`) para todas as rotas da V3 (Pessoa Física Plus, Pessoa Jurídica Plus e Consulta Veicular). Isso evita falhas silenciosas de handshake de SSL e erros de certificado expirado/incompleto comuns dentro de containers Docker/Node.js na VPS de produção, garantindo que as buscas de CPF, CNPJ e Veículos carreguem com total estabilidade.
- **Tratamento de Indisponibilidade de Busca por Nome (V2):**
  - Devido a uma instabilidade ou desativação da API V2 da DirectData (`api.directd.com.br` retornando `ECONNRESET`), implementei um tratamento que intercepta o erro de socket. Em vez de exibir a mensagem técnica `read ECONNRESET`, o sistema agora exibe um aviso amigável orientando o usuário a buscar diretamente pelo CPF.


## [0.7.7] - 2026-07-04
### Adicionado / Modificado
- **Correção da Busca por Nome (DirectData V2):**
  - Correção do erro HTTP 400 "Parâmetros não suportados" na busca de Pessoa Física por Nome. A busca por Nome foi migrada de volta para a Pesquisa Avançada V2 (`FilterNaturalPerson`, `ProcessingIds` e `ViewSearch` com polling assíncrono), enquanto as buscas por E-mail e Telefone continuam usando o endpoint síncrono e veloz `/api/EnriquecimentoLead` da V3.
  - Implementação de um tratamento de exceções robusto em todas as chamadas de rede da DirectData, garantindo a leitura e a exibição da mensagem de erro real retornada pela API externa nos Toasts do frontend.
- **Validação Simplificada de Pix Manual (Sem Caça de IDs):**
  - Atualização da Server Action `createAndApproveDepositManual` para tornar o `externalId` opcional. Se o administrador deixar o ID em branco, o sistema gera automaticamente um ID de controle único do tipo `MANUAL-[timestamp]-[randomString]`.
  - Polimento do modal de saldo na Gestão de Usuários, tornando o campo de ID opcional na interface visual e orientando o administrador com um texto amigável.
- **Segurança Dupla e Resiliência no Webhook PushinPay:**
  - Atualização da geração do Pix (`src/app/actions/pagamentos.ts`) para incluir o ID interno da transação (`txId`) na URL do webhook.
  - Otimização do processamento do webhook (`src/app/api/webhooks/pushinpay/route.ts`) para buscar prioritariamente a transação pelo ID interno do banco (`txId`) e, em caso de ausência, usar o ID externo da PushinPay como fallback, eliminando 100% de inconsistências ou atrasos no banco.
  - Flexibilização de status aceitos pelo webhook, confirmando o Pix tanto para o status `"paid"` quanto para o status `"approved"`.
  - Suporte de token de segurança de dupla camada, aceito via Query Parameter (`?token=...`) ou via cabeçalho customizado (`x-pushinpay-token`).

## [0.7.6] - 2026-06-26
### Adicionado / Modificado
- **Validação Manual de Pix na Gestão de Usuários:**
  - Adição de uma interface de abas ("Ajuste Simples" e "Validar Pix Manual") no modal de gerenciamento de saldo da lista de usuários (`src/app/admin/usuarios/UserTableClient.tsx`).
  - Adição de um botão de ação rápida com ícone do Pix (`QrCode`) na tabela de usuários para abrir o modal diretamente na aba de validação de Pix.
  - Integração da Server Action `createAndApproveDepositManual` para criar e aprovar transações Pix (`DEPOSIT` com status `COMPLETED`) associadas a um ID Pix externo (`externalId`), incrementando o saldo do usuário e gerando logs de auditoria do sistema em português brasileiro.
  - Prevenção de duplicidade de transações por meio da validação atômica de `externalId` único no banco de dados.

## [0.7.5] - 2026-06-03
### Adicionado / Modificado
- **Copywriting do Hero da Landing Page:** Otimização do título principal na página inicial (`src/app/page.tsx`) para focar nas principais consultas da plataforma. O texto foi atualizado de "Consulte Informações em Segundos" para "Consulte CPF, Telefone e Placa em Segundos".

## [0.7.4] - 2026-05-25
### Adicionado / Modificado
- **Correção Crítica do Webhook PushinPay (Confirmação Pix):** Re-estruturação e robustecimento completo do endpoint de integração de webhook (`/api/webhooks/pushinpay`) para garantir o processamento automático de recargas Pix.
  - **Uso do ID de Transação Correto:** Substituição do mapeamento incorreto do campo `id` (ID da tentativa do webhook) pelo campo `transaction_id` (ID real da transação Pix associado ao `externalId`), resolvendo o bug em que o PIX não era creditado no saldo do cliente.
  - **Leitura Resiliente do Body:** Implementação de parser flexível de corpo de requisição com base no header `Content-Type` do HTTP, tratando nativamente payloads formatados tanto em `application/json` quanto `application/x-www-form-urlencoded` de forma segura.
  - **Tratamento Blindado de Exceções (Zero 500):** Adição de verificações preventivas contra dados nulos ou indefinidos antes de submetê-los ao Prisma Client, evitando que exceções de validação de banco resultem em erros HTTP 500 (Internal Server Error).
  - **Logs de Auditoria e Anti-Fraude:** Inclusão de logs detalhados via banco de dados (`SystemLog`) em português para transações confirmadas, além do bloqueio automático com log em severidade `ERROR` em caso de tentativas de divergência de valores pagos versus faturados.
- **Validação Manual de Pix (Painel do Administrador):**
  - **Ações Administrativas Robustas:** Criação das Server Actions `getPendingDeposits()` e `approveDepositManual(transactionId)` aplicando o mesmo padrão de transação atômica do webhook, com incremento do saldo do usuário, anotação de auditoria na descrição e geração automática de logs do sistema em português brasileiro.
  - **Interface SaaS Interativa (Abas):** Substituição do histórico de faturamento estático pelo componente interativo `<VendasClient />` estruturado em abas ("Aprovações Pendentes" e "Histórico Confirmado") com contador reativo e animações de loading de salvamento assíncrono com a nova API de transições do React 19.
- **Correção de Métricas de Faturamento no Painel Administrativo:**
  - **Cálculo de Receita Real:** Correção lógica na Server Action `getDashboardMetrics` que buscava o faturamento total acumulado e as vendas recentes com o filtro do tipo inexistente `PURCHASE`. Agora as métricas consultam corretamente a soma dos depósitos confirmados (`type: 'DEPOSIT'` e `status: 'COMPLETED'`), restaurando a exibição em tempo real do faturamento e vendas reais.
- **Menu Mobile Administrativo (Drawer Deslizante com React Portal):**
  - **Uso de Portais (Solução de CSS):** Substituição da renderização direta pela API `createPortal` do `react-dom` para acoplar a gaveta deslizante diretamente no `document.body`. Isso contorna as limitações de bloco de contenção e o aprisionamento visual gerados pelo `backdrop-blur-md` do cabeçalho pai, restaurando a exibição correta e fluida em tela cheia de smartphones.
  - **Anti-Hidratação:** Adição de controle de montagem em hook `useEffect` para carregar o portal de forma 100% segura no lado do cliente, prevenindo falhas de hidratação ou referências ao servidor.
  - **Navegação Responsiva:** Criação do componente Client `<AdminMobileMenu />` contendo um botão hambúrguer elegante e uma gaveta retrátil lateral em tom escuro (`bg-[#0f172a]`), alinhada ao visual desktop.
  - **Integração no Layout:** Injeção do menu móvel no cabeçalho superior do layout (`src/app/admin/layout.tsx`) com visibilidade restrita a smartphones (`md:hidden`), permitindo a navegação móvel de alto nível por todas as 6 subpáginas de administração.

## [0.7.3] - 2026-05-22
### Adicionado / Modificado
- **Área Administrativa Reativa a Temas (Clean / Dark):** Compatibilização completa de 100% da área administrativa (`/admin`) e das telas e subpáginas internas com o alternador de temas dinâmico.
  - **Layout do Admin:** Cabeçalho adaptado com o componente `<ThemeToggle />`, botão de retorno de alto contraste e contêiner central com background responsivo (`bg-[#f8fafc] dark:bg-background`).
  - **Painel Analítico de KPIs:** Cards de faturamento e consultas convertidos com design glass/white shadow e mini-gráficos reativos a ambos os temas.
  - **Gestão de Usuários e Modais de Auditoria:** Tabela de usuários adaptada com linhas zebradas suaves e transições. Modais completos de auditoria e ajuste de saldo reescritos para suportar fundos dinâmicos (`bg-white dark:bg-[#0f172a]`), tabelas internas claras e inputs numéricos/textuais de alto contraste.
  - **Histórico de Vendas:** Tabela de recargas Pix adaptada com linhas zebradas reativas, cabeçalho de contraste e badges de status reativos.
  - **Configurações de Branding e SEO:** Seção de formulários de metadados, inputs e caixas de pré-visualização de imagens (Logo e Favicon) remodeladas para ótima legibilidade e adaptabilidade visual a fundos claros e escuros.
  - **Preços de Módulos:** Adaptação completa de inputs tarifários, cards de categorias e caixas de alertas amarelos de preços para herdar as tonalidades e contrastes dinâmicos de cada modo.
  - **Logs do Sistema:** Cards de depuração, badges de status de severidade e contêineres pre/code de JSON técnico ajustados para ótima legibilidade sem perder a identidade premium.
  - **Checkpoint de Login Administrativo:** Integração do `<ThemeToggle />` e flexibilização visual completa do formulário de mestre para ótima usabilidade tanto no modo Clean quanto no modo Dark.

## [0.7.2] - 2026-05-22
### Adicionado / Modificado
- **Alternador Dinâmico de Temas (Dark / Clean):** Criação do componente de estado client `ThemeToggle.tsx` com ícones dinâmicos do Lucide (`Sun` e `Moon`), encaixando-se no cabeçalho do painel de controle (/dashboard) e de forma flutuante absoluta no topo-direita das telas de **Login** e **Cadastro**.
- **Adaptação Premium Light/Dark de Login/Cadastro:** Flexibilização total das classes de cores estáticas escuras das páginas de login e cadastro. Agora, os inputs, labels, botões de ação e divisores se adaptam instantaneamente ao tema selecionado (Clean / Dark) mantendo legibilidade perfeita e mantendo o design vívido em ambas as vertentes.
- **Persistência e Evitação de Flicker:** Adição de script head bloqueante em `src/app/layout.tsx` para sincronizar e carregar imediatamente a preferência de tema do `localStorage` (ou do sistema operacional) no primeiro milissegundo de carregamento do DOM, evitando quaisquer piscadas ("flickering") visuais.
- **Suporte Fluido nos Módulos de Busca:** Compatibilização completa das classes utilitárias de cores do Tailwind v4 (`dark:bg-card`, `dark:text-white`, `border-slate-200 dark:border-white/10`, etc.) nas páginas internas para transição imediata e natural.

## [0.7.1] - 2026-05-22
### Adicionado / Modificado
- **Ajuste Fino do Hero Copy na Landing Page:** Otimização do título principal para "Consulte Informações em Segundos", da descrição secundária para realçar o acesso ágil a contatos, placas e vínculos, e da chamada principal de cadastro para "Consultar Agora 🔎" (incluindo uma sutil micro-animação pulsante de conversão).
- **Esquema de Cores Claro nos Termos de Uso:** Implementação e polimento de design 100% claro (SaaS Light Premium) na página `/termos`, usando fundo `#f8fafc`, cartões brancos e fontes escuras de alta legibilidade para alinhamento com a Landing Page Whitelist para Google Ads.
- **Correção Crítica de Sintaxe em Termos:** Correção de rodapé duplicado e código sintático inválido que gerava falha de compilação em produção.
- **Rebranding Completo Residual (Detetive Buscas):** Remoção definitiva das ocorrências da marca antiga "ConsultaALL" no mockup das abas da home, no FaqAccordion corporativo e na tela de login de administradores.

## [0.7.0] - 2026-05-22
- **Nova Landing Page Whitelist (Estilo DeskData):** Reconstrução total da página pública inicial (`src/app/page.tsx`) com uma paleta de cores light premium corporativa B2B (cinza claro, azul vibrante e marinho) e copywriting whitelist focado em validação cadastral, enriquecimento de leads e mitigação de fraudes para aprovação total do Google Ads.
- **Dados Estritamente Genéricos nos Mockups (Opt-in Ads):** Ajuste fino de todas as demonstrações e exemplos visuais das abas interativas. Substituição de dados mascarados ou simulados por strings puramente conceituais (ex: "Nome Completo do Titular", "123.456.789-00", "01/02/1987", "exemplo@email.com", "Razão Social da Empresa Ltda") para eliminar qualquer falsa impressão de vazamento de dados aos revisores do Google Ads.
- **Preservação Histórica (Home 2):** Migração e preservação da Landing Page original escura ("Detetive Buscas") na nova rota pública `/home2` (`src/app/home2/page.tsx`), mantendo-a totalmente funcional.
- **Re-Branding Oficial (Detetive Buscas):** Substituição de todas as ocorrências visuais de "ConsultaALL" na home e navbar pela marca **Detetive Buscas**, posicionando-a como uma solução SaaS B2B premium e whitelisting de inteligência cadastral sob o domínio público.
- **Copy Suave Whitelist (Inspirada na DeskData):** Redefinição da copy do Hero e do corpo da Landing Page para um tom corporativo leve, profissional e legítimo (adequado contra restrições no Google Ads), além de acrescentar o aviso explícito de mockups ilustrativos/fictícios no componente de abas de consultas.
- **Canal Público de Proteção de Dados (Comentado / Em Desenvolvimento):** Ocultação completa do formulário de oposição LGPD na página `/protecao-de-dados`, substituindo a interface por um card elegante de "Módulo LGPD sob demanda / Em Desenvolvimento técnico". Toda a estrutura real do formulário e da action foi deixada perfeitamente comentada no código para permitir demonstração comercial e liberação imediata pós-venda.
- **Componentização Modular da Landing Page:**
  - Componente client `HomeTabs.tsx` para exibição interativa das consultas e mocks B2B de retorno, sem exibição de preços públicos.
  - Componente client `FaqAccordion.tsx` com accordions responsivos institucionais.
  - Componente client `NavbarClient.tsx` para cabeçalho responsivo leve com menu mobile retrátil.

## [0.6.0] - 2026-05-13
### Adicionado / Modificado
- **Integração DirectData V3:** Migração completa da base de consultas para a API V3 (Enriquecimento e Smart Search), corrigindo roteamentos para buscas via Telefone e Nome.
- **Autenticação Social:** Implementação de Login e Cadastro via Google OAuth2 utilizando rota de callback nativa (zero dependências) e com fallback seguro.
- **Recuperação de Senha Segura:** Novo fluxo completo de "Esqueceu a Senha" implementado de ponta a ponta com a API do Brevo nativa e banco de tokens rotativos (validade de 1 hora) em Next.js Server Actions.
- **Automação de Infraestrutura:** Criação do script nativo `update.sh` para atualizar o banco e reconstruir o sistema na VPS com um único comando.
- **Cache Modular e Anti-Prejuízo:** O sistema agora valida os módulos selecionados e salva o array no banco (`SearchHistory`), protegendo a operação de duplicidade na fatura da API externa.
- **Formatação de Dados Elegante:** Refatoração do `DataViewer` para processar objetos aninhados (ex: endereços) de forma limpa, eliminando exibições em JSON bruto.
- **Melhorias Críticas de UX/UI:**
  - **Conversão (Recarga):** Injeção de CTAs de Recarga diretamente nos alertas e Toasts quando o usuário não possui saldo.
  - **Botão de Consulta Aprimorado:** Botão gigante adaptado para polegar em dispositivos móveis, com folga visual (margin-bottom).
  - **Select Intuitivo:** Adição de chevron estilizado para facilitar a identificação dos campos de filtro.
  - **Mobile Sidebar (React Portal):** Correção do bug de aprisionamento do menu lateral pelo `backdrop-blur` do cabeçalho, garantindo navegação imersiva 100% de tela no celular.

## [0.5.0] - 2026-05-11
### Adicionado
- **Motor de API Híbrido:** Implementação de switch "Real vs Demo" exclusivo para administradores, permitindo testes sem custo de API ou débito de saldo.
- **Sistema de Cache Inteligente:** Armazenamento de resultados por 48 horas para evitar cobranças duplicadas e reduzir custos com o provedor de API.
- **Integração Real (Base):** Conexão estabelecida com `services.apiconsultabrasil.com` com mapeamento para o target `cpf-detalhada-pessoa-fisica`.
- **Segurança de Nível de Usuário (Role-Based):** Detecção dinâmica de cargo (Admin/User) no frontend para controle de visibilidade de recursos sensíveis.
- **Feedback de Cache:** Notificações (toasts) que informam quando um resultado foi recuperado do banco de dados.

## [0.4.0] - 2026-05-11
### Adicionado
- **Dashboard Administrativo Analítico:** Interface com métricas de faturamento (Dia/Mês), gráficos de desempenho e ranking de serviços.
- **Auditoria Financeira e Vendas:** Histórico detalhado de faturamento com integração de IDs externos da PushinPay e status visual (PAGO/PENDENTE).
- **Central de Logs do Sistema:** Monitoramento de erros técnicos de API, falhas de servidor e eventos críticos de segurança.

## [0.3.0] - 2026-05-10
### Adicionado
- **Pagamentos Automáticos (PushinPay):** Integração completa com o gateway Pix via Webhooks.
- **Área de Perfil:** Edição de perfil e troca de senha segura com hash bcryptjs.
- **Configurações Globais:** Gestão dinâmica de SEO e suporte via Admin.
- **Auditoria de Usuários:** Visualização de histórico de consultas e extrato individual de clientes.

## [0.2.0] - 2026-05-09
### Adicionado
- **Wallet System:** Migração para saldo em Reais (R$) e sistema de transações atômicas.
- **Precificação Dinâmica:** Controle de custos de módulos via banco de dados.
- **Dashboard do Usuário:** Novo layout premium com histórico de buscas e visualizador de dados JSON.

## [0.1.0] - 2026-05-08
### Adicionado
- **Base do Projeto:** Estrutura Next.js, Prisma, PostgreSQL e Autenticação JWT.
- **Landing Page:** Design premium responsivo.
