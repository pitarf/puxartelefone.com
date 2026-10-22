'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Phone, CheckCircle2, ArrowRight, ShieldCheck, Zap, Database, UserCheck } from 'lucide-react';

export default function ComoFuncionaStacking() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.stack-card'));
    if (cards.length === 0) return;

    let ticking = false;

    function updateCards() {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const currentRect = card.getBoundingClientRect();
          const nextRect = nextCard.getBoundingClientRect();

          const overlap = currentRect.bottom - nextRect.top;
          const totalHeight = currentRect.height;

          if (overlap > 0) {
            const progress = Math.min(Math.max(overlap / (totalHeight * 0.85), 0), 1);
            const scale = 1 - (progress * 0.04);
            const brightness = 1 - (progress * 0.15);
            const translateY = progress * -4;

            card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            card.style.filter = `brightness(${brightness})`;
          } else {
            card.style.transform = 'scale(1) translateY(0px)';
            card.style.filter = 'brightness(1)';
          }
        } else {
          card.style.transform = 'scale(1) translateY(0px)';
          card.style.filter = 'brightness(1)';
        }
      });

      ticking = false;
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCards);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <section id="como-funciona" className="py-12 md:py-16 bg-[#F7FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho Sticky com Efeito Blur */}
        <div className="services-sticky-header rounded-2xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0061D9] tracking-wider uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#00B7C2]/30 shadow-2xs inline-block mb-1.5">
                Passo a Passo Interativo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172B3A]">
                Como funciona a consulta de telefone
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#667784] max-w-md">
              Processo ágil em 3 etapas transparentes para identificar registros e opções cadastrais disponíveis.
            </p>
          </div>
        </div>

        {/* Stacking Cards Container */}
        <div className="stacking-container relative max-w-4xl mx-auto">
          
          {/* Card 01 - Digitação e Validação */}
          <div className="stack-card sticky top-[135px] sm:top-[165px] md:top-[190px] z-10 w-full rounded-3xl bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 shadow-md p-6 sm:p-10 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2EAF0] dark:border-white/10">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#EFFBFC] border border-[#00B7C2]/30 text-[#0061D9] flex items-center justify-center text-lg font-black shrink-0">
                  01
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00B7C2]">
                    Etapa 1 • Entrada de Dados
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-white">
                    Informe o número de telefone com DDD
                  </h3>
                </div>
              </div>
              <span className="self-start md:self-auto text-xs font-bold text-[#0ACF06] bg-[#F0FCF5] px-3 py-1 rounded-full border border-[#0BD976]/30">
                VERIFICAÇÃO IMEDIATA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <p className="text-sm text-[#667784] dark:text-slate-300 leading-relaxed">
                  Digite o número telefônico desejado na primeira dobra da plataforma. O sistema aceita qualquer DDD nacional com 10 ou 11 dígitos e realiza a higienização instantânea de formato.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#0BD976]" />
                    <span>Aceita fixo e celular de todos os estados</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#0BD976]" />
                    <span>Higienização e máscara automática</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667784]">Exemplo de entrada</span>
                  <div className="font-mono text-base font-bold text-[#0061D9] bg-white dark:bg-[#0F172A] p-2.5 rounded-xl border border-[#E2EAF0] dark:border-white/10">
                    (11) 98765-4321
                  </div>
                </div>
                <div className="pt-3 text-[11px] text-[#667784] flex items-center justify-between">
                  <span>Varredura de bases públicas</span>
                  <span className="text-[#0BD976] font-bold">~0.4s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 02 - Seleção de Módulos */}
          <div className="stack-card sticky top-[155px] sm:top-[185px] md:top-[215px] z-20 w-full rounded-3xl bg-[#EFFBFC] dark:bg-[#071E28] border border-[#00B7C2]/40 shadow-lg p-6 sm:p-10 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#00B7C2]/20">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#00B7C2]/40 text-[#0061D9] flex items-center justify-center text-lg font-black shrink-0">
                  02
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0061D9] dark:text-[#00B7C2]">
                    Etapa 2 • Flexibilidade Total
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-white">
                    Conheça os módulos e escolha o que precisa
                  </h3>
                </div>
              </div>
              <span className="self-start md:self-auto text-xs font-bold text-[#0061D9] bg-white dark:bg-[#0F172A] px-3 py-1 rounded-full border border-[#00B7C2]/30">
                PAGUE POR MÓDULO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <p className="text-sm text-[#667784] dark:text-slate-300 leading-relaxed">
                  Dentro do painel, visualize exatamente quais informações estão disponíveis para o número pesquisado. Você escolhe se deseja apenas dados de titularidade cadastral ou enriquecimento completo de contatos.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00B7C2]" />
                    <span>Módulos avulsos a partir de R$ 0,50</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A] dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00B7C2]" />
                    <span>Recarga imediata com Pix e aprovação instantânea</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-black/30 border border-[#00B7C2]/20 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#667784]">Módulos Disponíveis</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-white/5 font-medium">
                    <span>Titularidade Cadastral</span>
                    <span className="font-mono text-[#0061D9] font-bold">R$ 1,00</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-white/5 font-medium">
                    <span>Enriquecimento de Contato</span>
                    <span className="font-mono text-[#0061D9] font-bold">R$ 0,50</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-white/5 font-medium">
                    <span>Localização e Geografia</span>
                    <span className="font-mono text-[#0061D9] font-bold">R$ 1,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 03 - Visualização e Relatório */}
          <div className="stack-card sticky top-[175px] sm:top-[205px] md:top-[240px] z-30 w-full rounded-3xl bg-white border-2 border-[#0061D9] shadow-2xl p-6 sm:p-10 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2EAF0]">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[#0061D9] text-white flex items-center justify-center text-lg font-black shrink-0 shadow-md">
                  03
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0061D9]">
                    Etapa 3 • Conclusão Imediata
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#172B3A]">
                    Acesse o relatório cadastral organizado
                  </h3>
                </div>
              </div>
              <span className="self-start md:self-auto text-xs font-bold text-[#0061D9] bg-[#EFFBFC] border border-[#00B7C2]/40 px-3 py-1 rounded-full">
                CACHE ATIVO 48H
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4">
                <p className="text-sm text-[#667784] leading-relaxed">
                  Os dados são estruturados na tela em cartões categorizados, com visualizadores dedicados, opção de cópia com um clique e histórico salvo em sua conta.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A]">
                    <CheckCircle2 className="w-4 h-4 text-[#0BD976]" />
                    <span>Zero cobranças repetidas se consultar novamente em 48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#172B3A]">
                    <CheckCircle2 className="w-4 h-4 text-[#0BD976]" />
                    <span>Exportação e visualização otimizada para celular</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7FAFC] border border-[#E2EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-[#172B3A]">Pronto para iniciar?</span>
                  <p className="text-xs text-[#667784] leading-relaxed">
                    Comece informando um número de telefone no formulário acima ou crie sua conta gratuitamente.
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="#consulta-hero"
                    className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-[#0061D9]/20 transition-all active:scale-95 text-center"
                  >
                    <span>Fazer consulta agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
