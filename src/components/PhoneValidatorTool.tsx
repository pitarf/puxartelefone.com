'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Phone, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { analisarTelefoneBrasileiro, AnaliseTelefone } from '@/lib/dddData';

/**
 * Bloco 14 — Verificador Gratuito de Número
 * Ferramenta 100% funcional client-side com ID `verificar-numero`.
 * Analisa estrutura Anatel (celular 9 dígitos ou fixo 8 dígitos, DDD válido de 11 a 99, suporte +55).
 * Deixa explícito que se trata apenas de verificação estrutural e de formato.
 */
export default function PhoneValidatorTool() {
  const [inputVal, setInputVal] = useState('');
  const [analise, setAnalise] = useState<AnaliseTelefone | null>(null);
  const router = useRouter();

  const handleVerificar = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const resultado = analisarTelefoneBrasileiro(inputVal);
    setAnalise(resultado);
  };

  const handleLimpar = () => {
    setInputVal('');
    setAnalise(null);
  };

  const handlePreencherExemplo = (exemplo: string) => {
    setInputVal(exemplo);
    const res = analisarTelefoneBrasileiro(exemplo);
    setAnalise(res);
  };

  const handleContinuar = () => {
    if (analise?.valido) {
      const clean = analise.formatado.replace(/\D/g, '');
      try {
        sessionStorage.setItem('puxar_telefone_preenchido', analise.formatado);
        sessionStorage.setItem('puxar_telefone_clean', clean);
      } catch {
        // continua
      }
      router.push(`/cadastro?src=home-validador&type=telefone&phone=${encodeURIComponent(clean)}`);
    }
  };

  return (
    <section id="verificar-numero" className="py-16 md:py-24 bg-white dark:bg-[#090E17] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FCF5] dark:bg-white/5 border border-[#0BD976]/40 text-[#0ACF06] dark:text-[#0BD976] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0ACF06]" />
            <span>Validador Estrutural Gratuito</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
            Verificar número de telefone: confira o formato de celular ou fixo
          </h2>
          <p className="text-base text-[#667784] dark:text-slate-300 leading-relaxed font-normal">
            Antes de iniciar uma consulta cadastral, é importante confirmar que os dígitos do telefone foram informados corretamente. O verificador gratuito analisa o formato nacional do número, identifica o DDD e verifica se a estrutura é compatível com os padrões brasileiros de celular ou telefone fixo. A ferramenta não acessa cadastros pessoais e não confirma se a linha está ativa.
          </p>
        </div>

        {/* Card do Verificador */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <form onSubmit={handleVerificar} className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="validador-input" className="block text-xs font-bold uppercase tracking-wider text-[#667784] dark:text-slate-300">
                Digite o telefone com DDD
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-[#0061D9]">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  id="validador-input"
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ex: 11999999999 ou +55 21 3333-4444"
                  className="w-full bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl pl-12 pr-4 md:pr-44 py-3.5 text-[#172B3A] dark:text-white placeholder-[#667784]/60 text-base font-semibold focus:border-[#0061D9] focus:bg-white dark:focus:bg-[#0F172A] focus:ring-4 focus:ring-[#0061D9]/10 outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="hidden md:flex absolute right-2 top-2 bottom-2 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl items-center gap-2 text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <span>Verificar número</span>
                </button>
              </div>
              <p className="text-[11px] text-[#667784] dark:text-slate-400">
                Aceita números com formatação, apenas dígitos ou com prefixo internacional +55.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="w-full md:hidden py-3.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-[#0061D9]/20 transition-all active:scale-95"
              >
                <span>Verificar número</span>
              </button>
              {inputVal && (
                <button
                  type="button"
                  onClick={handleLimpar}
                  className="px-4 py-3 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>

          {/* Atalhos com exemplos rápidos para testar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500 text-left">
            <span className="text-[11px] font-semibold text-slate-400">Testar formatos:</span>
            <button
              type="button"
              onClick={() => handlePreencherExemplo('11999999999')}
              className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg font-mono text-[11px] text-[#0061D9] dark:text-[#00B7C2] transition-colors"
            >
              Celular SP (11)
            </button>
            <button
              type="button"
              onClick={() => handlePreencherExemplo('2133334444')}
              className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg font-mono text-[11px] text-[#0061D9] dark:text-[#00B7C2] transition-colors"
            >
              Fixo RJ (21)
            </button>
            <button
              type="button"
              onClick={() => handlePreencherExemplo('+55 31 98888-7777')}
              className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg font-mono text-[11px] text-[#0061D9] dark:text-[#00B7C2] transition-colors"
            >
              Com +55 e traço
            </button>
          </div>

          {/* Resultado da Análise */}
          {analise && (
            <div className="space-y-4 animate-in fade-in duration-300 text-left pt-2">
              {analise.valido ? (
                <div className="bg-[#F0FCF5] dark:bg-emerald-950/20 border border-[#0BD976]/40 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0BD976]/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0BD976]/20 text-[#0ACF06] flex items-center justify-center">
                        <Check className="w-5 h-5 font-bold" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">
                          Estrutura Numérica Compatível
                        </h4>
                        <p className="text-xs text-[#667784] dark:text-slate-300">
                          Padrão nacional reconhecido pela Anatel
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-white dark:bg-white/10 text-[#0ACF06] border border-[#0BD976]/30 rounded-full text-[10px] font-bold">
                      VÁLIDO
                    </span>
                  </div>

                  {/* Detalhamento do Número */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#0BD976]/20">
                      <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Número Formatado:</span>
                      <span className="font-bold font-mono text-[#0061D9] dark:text-[#00B7C2] text-sm">{analise.formatado}</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#0BD976]/20">
                      <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Tipo de Linha:</span>
                      <span className="font-bold text-[#172B3A] dark:text-white">{analise.tipoLabel}</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#0BD976]/20">
                      <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Código DDD:</span>
                      <span className="font-semibold text-[#172B3A] dark:text-white">{analise.ddd} ({analise.estado} - {analise.uf})</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#0BD976]/20">
                      <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Região Geográfica:</span>
                      <span className="font-semibold text-[#172B3A] dark:text-white">{analise.regiao}</span>
                    </div>
                  </div>

                  {/* CTA de continuidade */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#0BD976]/30">
                    <p className="text-[11px] text-[#667784] dark:text-slate-300">
                      Deseja prosseguir para consultar informações cadastrais deste telefone?
                    </p>
                    <button
                      type="button"
                      onClick={handleContinuar}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Avançar para consulta</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-red-900 dark:text-red-100">
                        {analise.tipoLabel}
                      </h4>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        {analise.mensagem}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nota de conformidade legal */}
              <div className="p-3 bg-[#F7FAFC] dark:bg-white/5 rounded-xl border border-[#E2EAF0] dark:border-white/10 text-[11px] text-[#667784] dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0061D9] shrink-0" />
                <span>
                  <strong>Aviso:</strong> A verificação analisa unicamente a sintaxe do número e sua conformidade com a Anatel. Não são debitados créditos e nenhuma consulta de crédito ou atividade de linha é efetuada nesta etapa.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
