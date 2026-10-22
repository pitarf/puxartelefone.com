'use client';

import { useState } from 'react';
import { Phone, UserCheck, ShieldCheck, MapPin, Database, Check } from 'lucide-react';

type TabId = 'telefone' | 'cpf' | 'cnpj' | 'veiculos';

interface TabContent {
  title: string;
  badge: string;
  icon: any;
  subtitle: string;
  description: string;
  benefits: string[];
  mockupTitle: string;
  mockupFields: { label: string; value: string; isChecked?: boolean }[];
}

export default function HomeTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('telefone');

  const tabs: Record<TabId, TabContent> = {
    telefone: {
      title: 'Consulta Telefônica (Principal)',
      badge: 'Foco da Plataforma',
      icon: Phone,
      subtitle: 'Enriquecimento de Lead e Validação de Contato',
      description: 'Informe um número com DDD para identificar cadastros públicos vinculados, validar a titularidade de pessoas físicas ou jurídicas e otimizar seus processos de atendimento e prevenção de fraudes.',
      benefits: [
        'Identificação de titularidade cadastral vinculada ao número',
        'Confirmação de operadora original e status do prefixo',
        'Localização aproximada baseada na região e DDD',
        'Mapeamento de contatos alternativos e e-mails legítimos',
        'Zero cobrança quando não houver registros localizados'
      ],
      mockupTitle: 'Resultado Conceitual: Consulta de Telefone',
      mockupFields: [
        { label: 'Número Pesquisado', value: '(11) 98765-4321', isChecked: true },
        { label: 'Titular Cadastral', value: 'Nome Completo do Titular', isChecked: true },
        { label: 'Documento (Parcial)', value: '***.456.789-**', isChecked: true },
        { label: 'Operadora / Região', value: 'Operadora Móvel • São Paulo/SP', isChecked: true },
        { label: 'Status da Linha', value: 'Cadastrado e Ativo em Base Pública', isChecked: true },
        { label: 'Canais Alternativos', value: '2 telefones e 1 e-mail vinculados', isChecked: true }
      ]
    },
    cpf: {
      title: 'Consulta de CPF',
      badge: 'Serviço Complementar',
      icon: UserCheck,
      subtitle: 'Validação Cadastral de Pessoas Físicas',
      description: 'Verifique a consistência cadastral de uma pessoa física a partir do número de CPF, cruzando informações da Receita Federal e registros administrativos.',
      benefits: [
        'Confirmação de Nome Completo e Data de Nascimento',
        'Situação Cadastral na Receita Federal',
        'Histórico de endereços anteriores documentados',
        'Vínculos de parentesco e pessoas relacionadas'
      ],
      mockupTitle: 'Resultado Conceitual: Validação de CPF',
      mockupFields: [
        { label: 'CPF Pesquisado', value: '123.456.789-00', isChecked: true },
        { label: 'Nome do Titular', value: 'Nome Completo da Pessoa', isChecked: true },
        { label: 'Situação Cadastral', value: 'REGULAR na Receita Federal', isChecked: true },
        { label: 'Data de Nascimento', value: '15/05/1988', isChecked: true }
      ]
    },
    cnpj: {
      title: 'Consulta de CNPJ',
      badge: 'Serviço Complementar',
      icon: Database,
      subtitle: 'Dados Corporativos e Quadro Societário',
      description: 'Consulte informações cadastrais de empresas a partir do número do CNPJ para homologação de fornecedores e parceiros.',
      benefits: [
        'Razão Social, Nome Fantasia e Data de Abertura',
        'Quadro de Sócios e Administradores (QSA)',
        'CNAE Principal e Atividades Secundárias',
        'Situação Cadastral oficial na Receita'
      ],
      mockupTitle: 'Resultado Conceitual: Empresa / CNPJ',
      mockupFields: [
        { label: 'CNPJ Pesquisado', value: '12.345.678/0001-90', isChecked: true },
        { label: 'Razão Social', value: 'Empresa Brasileira de Tecnologia Ltda', isChecked: true },
        { label: 'Situação Cadastral', value: 'ATIVA', isChecked: true },
        { label: 'Quadro Societário', value: 'Sócios e Administradores mapeados', isChecked: true }
      ]
    },
    veiculos: {
      title: 'Consulta de Veículos',
      badge: 'Serviço Complementar',
      icon: MapPin,
      subtitle: 'Informações Veiculares por Placa',
      description: 'Consulte informações públicas de veículos pelo padrão antigo ou Mercosul para checagem rápida de dados técnicos e procedência.',
      benefits: [
        'Marca, Modelo, Ano de Fabricação e Cor',
        'Município e UF de emplacamento',
        'Situação do licenciamento e restrições públicas'
      ],
      mockupTitle: 'Resultado Conceitual: Veículo / Placa',
      mockupFields: [
        { label: 'Placa Pesquisada', value: 'ABC1D23', isChecked: true },
        { label: 'Marca / Modelo', value: 'Veículo Nacional', isChecked: true },
        { label: 'Ano Modelo', value: '2023 / 2024', isChecked: true },
        { label: 'Situação', value: 'CIRCULAÇÃO REGULAR', isChecked: true }
      ]
    }
  };

  const currentTab = tabs[activeTab];
  const Icon = currentTab.icon;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Abas Superiores */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-2xl max-w-3xl mx-auto">
        {(Object.keys(tabs) as TabId[]).map((tabId) => {
          const tab = tabs[tabId];
          const TabIcon = tab.icon;
          const isActive = activeTab === tabId;

          return (
            <button
              key={tabId}
              type="button"
              onClick={() => setActiveTab(tabId)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#0061D9] text-white shadow-sm shadow-[#0061D9]/20'
                  : 'text-[#667784] hover:text-[#172B3A] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.title.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aba Ativa */}
      <div className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        {/* Lado Esquerdo: Descrição e Benefícios */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFFBFC] border border-[#00B7C2]/30 text-[#0061D9] text-xs font-bold uppercase tracking-wider">
            <Icon className="w-3.5 h-3.5 text-[#00B7C2]" />
            {currentTab.badge}
          </div>

          <h3 className="text-2xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
            {currentTab.subtitle}
          </h3>

          <p className="text-sm md:text-base text-[#667784] dark:text-slate-300 leading-relaxed">
            {currentTab.description}
          </p>

          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold text-[#172B3A] dark:text-white uppercase tracking-wider">
              Informações verificáveis:
            </h4>
            <ul className="space-y-2">
              {currentTab.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-[#172B3A] dark:text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#F0FCF5] text-[#0BD976] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-3 h-3 text-[#0ACF06]" />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lado Direito: Mockup Estruturado */}
        <div className="lg:col-span-5 bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2EAF0] dark:border-white/10 pb-3">
            <span className="text-xs font-bold text-[#172B3A] dark:text-white">
              {currentTab.mockupTitle}
            </span>
            <span className="text-[10px] font-bold text-[#0ACF06] bg-[#F0FCF5] px-2 py-0.5 rounded-full border border-[#0BD976]/30">
              DISPONÍVEL
            </span>
          </div>

          <div className="space-y-2.5">
            {currentTab.mockupFields.map((field, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl p-3 flex flex-col gap-0.5 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-[#667784] dark:text-slate-400">
                  {field.label}
                </span>
                <span className="text-xs font-semibold text-[#172B3A] dark:text-white font-mono">
                  {field.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#667784] dark:text-slate-500 text-center font-medium">
            * Estrutura ilustrativa do retorno dos dados no painel logado.
          </p>
        </div>
      </div>
    </div>
  );
}
