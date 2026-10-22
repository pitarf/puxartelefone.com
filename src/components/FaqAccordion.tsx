'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Como funciona a consulta a partir de um número de telefone?',
      answer: 'Você digita o número telefônico desejado (com DDD) no campo de busca. O sistema verifica os formatos aceitos, pesquisa em bases cadastrais de registros públicos e exibe as opções de módulos disponíveis para consulta dentro do painel seguro.'
    },
    {
      question: 'Quais informações podem estar disponíveis para um telefone?',
      answer: 'Dependendo do registro encontrado nas fontes públicas e cadastrais integradas, podem ser disponibilizados dados como: confirmação da titularidade cadastral vinculada, operadora original, localização aproximada (UF e cidade vinculada ao DDD), outros canais de contato alternativos e eventuais vínculos cadastrais legítimos.'
    },
    {
      question: 'A consulta é gratuita ou paga?',
      answer: 'A verificação inicial de formato e checagem de disponibilidade de opções na primeira dobra é gratuita. Para visualizar o relatório completo e consolidado de dados, você adiciona saldo avulso via Pix e paga somente pelo módulo que escolher consultar, sem taxas mensais nem assinaturas recorrentes.'
    },
    {
      question: 'O que acontece quando não há resultados para o telefone digitado?',
      answer: 'Se o número informado for recente, não constar nas bases cadastrais públicas ou tiver bloqueio solicitado pelo titular (direitos LGPD), o sistema informará com total transparência que nenhum registro foi localizado e nenhum saldo será debitado da sua conta.'
    },
    {
      question: 'A plataforma acessa conversas, mensagens ou localização em tempo real?',
      answer: 'Não. É fundamental esclarecer que a plataforma NÃO acessa WhatsApp, mensagens privadas, gravações, senhas ou localização GPS em tempo real. Trabalhamos exclusivamente com registros cadastrais administrativos e dados públicos, em total conformidade com a LGPD e o Marco Civil da Internet.'
    },
    {
      question: 'Como funciona o tratamento dos dados e a privacidade (LGPD)?',
      answer: 'A plataforma respeita integralmente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). As pesquisas destinam-se exclusivamente a finalidades legítimas, como prevenção a fraudes, validação de cadastros corporativos e enriquecimento de contato. Qualquer titular tem o direito de solicitar o bloqueio de exibição de seus dados a qualquer momento em nosso canal de Opt-out.'
    },
    {
      question: 'Como iniciar uma consulta agora mesmo?',
      answer: 'Basta informar o número com DDD no campo da primeira dobra desta página, clicar em "Consultar telefone", criar ou acessar sua conta na plataforma e escolher os módulos de dados desejados.'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3.5 text-left">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-[#172B3A] dark:text-white hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors focus:outline-none"
            >
              <span className="pr-4 text-sm md:text-base leading-snug">{faq.question}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isOpen ? 'bg-[#EFFBFC] text-[#0061D9]' : 'bg-[#F7FAFC] text-[#667784]'
              }`}>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#0061D9]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667784]" />
                )}
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[350px] border-t border-[#E2EAF0] dark:border-white/10' : 'max-h-0'
              }`}
            >
              <div className="px-6 py-4.5 text-[#667784] dark:text-slate-300 text-sm leading-relaxed bg-[#F7FAFC]/50 dark:bg-black/10">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
