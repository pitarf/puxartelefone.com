'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_LIST: FaqItem[] = [
  {
    question: '1. Como consultar um número de telefone online?',
    answer: 'Digite o telefone completo com DDD no formulário do PuxarTelefone. Depois de verificar o formato, continue para a plataforma, onde poderá conhecer as modalidades disponíveis e suas condições de contratação.'
  },
  {
    question: '2. Como descobrir de quem é um número de telefone?',
    answer: 'Uma pesquisa pode encontrar referências públicas ou possíveis vínculos cadastrais, quando legalmente acessíveis. Entretanto, esses registros não garantem a identidade de quem utiliza o telefone atualmente.'
  },
  {
    question: '3. Como saber quem me ligou de um número desconhecido?',
    answer: 'Você pode pesquisar referências públicas e verificar o DDD. Porém, o número exibido pode ter sido falsificado, e uma consulta cadastral não comprova necessariamente quem realizou a ligação.'
  },
  {
    question: '4. O que é consulta reversa de telefone?',
    answer: 'É uma pesquisa iniciada pelo número, com o objetivo de verificar possíveis referências relacionadas a ele, conforme as fontes e a modalidade utilizada.'
  },
  {
    question: '5. Posso consultar número de celular?',
    answer: 'Sim. O formulário aceita números móveis brasileiros com DDD e formato compatível.'
  },
  {
    question: '6. É possível consultar telefone fixo?',
    answer: 'Sim. Telefones fixos brasileiros com DDD podem ser informados, desde que a numeração corresponda aos padrões suportados.'
  },
  {
    question: '7. Preciso informar o DDD?',
    answer: 'Sim. O DDD integra a numeração nacional e deve acompanhar os demais dígitos.'
  },
  {
    question: '8. É possível consultar telefone de outro estado?',
    answer: 'O formulário pode reconhecer DDDs brasileiros válidos. A disponibilidade de informações cadastrais depende da cobertura do serviço.'
  },
  {
    question: '9. A consulta de telefone é gratuita?',
    answer: 'A validação básica do formato e do DDD poderá ser utilizada gratuitamente. Consultas cadastrais específicas podem ser pagas conforme o catálogo.'
  },
  {
    question: '10. Quanto custa consultar telefone?',
    answer: 'O valor depende da modalidade contratada. O preço de cada módulo deve aparecer antes da confirmação.'
  },
  {
    question: '11. Posso pagar por Pix?',
    answer: 'Caso o painel ofereça recarga via Pix, o usuário poderá utilizar esse método conforme as condições apresentadas na plataforma.'
  },
  {
    question: '12. Preciso pagar mensalidade?',
    answer: 'A plataforma poderá trabalhar com contratação avulsa, desde que esse modelo esteja confirmado nas regras comerciais vigentes.'
  },
  {
    question: '13. Posso descobrir o nome pelo número?',
    answer: 'Determinados serviços podem apresentar possíveis vínculos cadastrais, quando disponíveis e legalmente acessíveis. Esses registros não comprovam necessariamente quem utiliza a linha atualmente.'
  },
  {
    question: '14. Posso descobrir CPF pelo telefone?',
    answer: 'A eventual disponibilização de documentos relacionados depende da modalidade, da fonte e dos requisitos legais aplicáveis. Não existe garantia de acesso a documentos pessoais de qualquer titular.'
  },
  {
    question: '15. É possível consultar um número de WhatsApp?',
    answer: 'Um número brasileiro utilizado no WhatsApp pode ser informado como telefone. Isso não permite acessar conversas, contas privadas ou dados internos do aplicativo.'
  },
  {
    question: '16. Consigo descobrir a localização pelo telefone?',
    answer: 'O DDD pode indicar a região de numeração, mas não revela a localização GPS atual de uma pessoa.'
  },
  {
    question: '17. O DDD mostra a cidade exata?',
    answer: 'Não necessariamente. Um DDD pode abranger vários municípios.'
  },
  {
    question: '18. É possível descobrir a operadora pelo número?',
    answer: 'O prefixo não permite determinar com segurança a operadora atual, pois existe portabilidade numérica.'
  },
  {
    question: '19. Como verificar se um número está ativo?',
    answer: 'A verificação do formato não comprova atividade da linha. A confirmação dependeria de serviço específico com capacidade e fonte apropriadas.'
  },
  {
    question: '20. O que significa telefone com formato válido?',
    answer: 'Significa que a sequência informada é compatível com um padrão de numeração reconhecido. Isso não confirma a existência ou titularidade.'
  },
  {
    question: '21. O que acontece quando não existem resultados?',
    answer: 'A plataforma deve informar a ausência de retorno. Eventuais regras de cobrança ou restituição devem corresponder à modalidade contratada.'
  },
  {
    question: '22. Um telefone pode mudar de titular?',
    answer: 'Sim. Linhas podem ser transferidas, compartilhadas, desativadas e reutilizadas, dependendo das condições de serviço.'
  },
  {
    question: '23. A consulta mostra mensagens ou histórico de ligações?',
    answer: 'Não. Uma consulta cadastral não concede acesso a mensagens privadas, gravações ou histórico protegido de comunicações.'
  },
  {
    question: '24. É seguro pesquisar um telefone online?',
    answer: 'O uso responsável depende de controles técnicos adequados, transparência, finalidade legítima e cumprimento das normas aplicáveis. Consulte as condições e a política de privacidade antes de contratar.'
  },
  {
    question: '25. O PuxarTelefone pertence à Anatel?',
    answer: 'Não. O PuxarTelefone deve se apresentar como plataforma independente, sem insinuar vínculo institucional inexistente.'
  },
  {
    question: '26. Como começo uma consulta?',
    answer: 'Digite o número com DDD no formulário principal, confira o formato e continue para conhecer os serviços disponíveis.'
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5 text-left">
      {FAQ_LIST.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-[#172B3A] dark:text-white hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors focus:outline-none cursor-pointer"
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

            {/* Mantemos visível ou com renderização acessível para SEO */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'block border-t border-[#E2EAF0] dark:border-white/10' : 'hidden'
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
