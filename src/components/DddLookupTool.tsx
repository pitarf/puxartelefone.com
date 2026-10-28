'use client';

import { useState } from 'react';
import { Search, MapPin, AlertCircle, CheckCircle2, ArrowRight, Info, Building, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DDD_DATA, TODOS_DDDS, DddInfo } from '@/lib/dddData';

/**
 * Bloco 13 — Consultar DDD Gratuitamente
 * Ferramenta 100% client-side (ID: consultar-ddd).
 * Permite buscar por DDD (2 dígitos) ou pelo número de telefone completo.
 * Exibe detalhes oficiais da área de numeração da Anatel e tabela rápida dos principais DDDs.
 */
export default function DddLookupTool() {
  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState<DddInfo | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [numeroDigitado, setNumeroDigitado] = useState('');
  const router = useRouter();

  // Principais capitais/DDDs para a tabela de consulta rápida
  const principaisDdds = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '91'];

  const consultarDdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErro(null);

    const limpo = query.replace(/\D/g, '');

    if (!limpo) {
      setErro('Informe um DDD ou número de telefone para consultar.');
      setResultado(null);
      return;
    }

    // Se começar com 55 e tiver mais de 4 dígitos, remove código de país
    let cleanLocal = limpo;
    if (cleanLocal.startsWith('55') && cleanLocal.length > 4) {
      cleanLocal = cleanLocal.substring(2);
    }

    // Extrai os 2 primeiros dígitos como DDD
    const dddExtraido = cleanLocal.slice(0, 2);

    if (cleanLocal.length < 2) {
      setErro('O código DDD precisa conter pelo menos 2 dígitos (ex: 11, 21, 31).');
      setResultado(null);
      return;
    }

    const info = DDD_DATA[dddExtraido];

    if (!info) {
      setErro(`O código (${dddExtraido}) não é um DDD oficial reconhecido pela Anatel no Brasil.`);
      setResultado(null);
      return;
    }

    setResultado(info);
    setNumeroDigitado(query.trim());
  };

  const selecionarDddTabela = (ddd: string) => {
    setQuery(ddd);
    const info = DDD_DATA[ddd];
    if (info) {
      setResultado(info);
      setErro(null);
      setNumeroDigitado(`DDD ${ddd}`);
    }
  };

  const handleContinuarConsulta = () => {
    const limpo = query.replace(/\D/g, '');
    try {
      if (limpo.length >= 10) {
        sessionStorage.setItem('puxar_telefone_clean', limpo);
      }
    } catch {
      // continua
    }
    router.push(`/cadastro?src=home-ddd&type=telefone`);
  };

  return (
    <section id="consultar-ddd" className="py-16 md:py-24 bg-[#F8FAFC] dark:bg-[#0B132B]/40 border-y border-[#E2EAF0] dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFFBFC] dark:bg-white/5 border border-[#00B7C2]/40 text-[#0061D9] dark:text-[#00B7C2] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#00B7C2]" />
            <span>Ferramenta Gratuita</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#172B3A] dark:text-white tracking-tight">
            Consultar DDD: descubra a região de numeração de um telefone
          </h2>
          <p className="text-base text-[#667784] dark:text-slate-300 leading-relaxed font-normal">
            O DDD é o código de área utilizado na numeração telefônica brasileira. Ele ajuda a identificar a região originalmente associada ao número, mas não comprova onde uma pessoa está atualmente. Utilize o conferidor gratuito do PuxarTelefone para identificar o código DDD e entender a estrutura de um telefone.
          </p>
        </div>

        {/* Caixa de Pesquisa do DDD */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <form onSubmit={consultarDdd} className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="ddd-input" className="block text-xs font-bold uppercase tracking-wider text-[#667784] dark:text-slate-300">
                Informe um número ou código DDD
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-[#0061D9]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="ddd-input"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (erro) setErro(null);
                  }}
                  placeholder="Ex: 11 ou (11) 99999-9999"
                  className="w-full bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl pl-12 pr-4 md:pr-44 py-3.5 text-[#172B3A] dark:text-white placeholder-[#667784]/60 text-base font-semibold focus:border-[#0061D9] focus:bg-white dark:focus:bg-[#0F172A] focus:ring-4 focus:ring-[#0061D9]/10 outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="hidden md:flex absolute right-2 top-2 bottom-2 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl items-center gap-2 text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <span>Consultar DDD</span>
                </button>
              </div>
              <p className="text-[11px] text-[#667784] dark:text-slate-400">
                Digite apenas os 2 dígitos do DDD (ex: 21) ou o telefone completo com DDD.
              </p>
            </div>

            <button
              type="submit"
              className="w-full md:hidden py-3.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-[#0061D9]/20 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Consultar DDD</span>
            </button>
          </form>

          {/* Erro */}
          {erro && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl text-red-800 dark:text-red-200 text-xs sm:text-sm animate-in fade-in duration-200 text-left">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
              <p className="font-semibold">{erro}</p>
            </div>
          )}

          {/* Retorno do DDD Consultado */}
          {resultado && (
            <div className="space-y-5 animate-in fade-in duration-300 text-left pt-2">
              <div className="bg-[#EFFBFC] dark:bg-white/5 border border-[#00B7C2]/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#00B7C2]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0061D9] text-white flex items-center justify-center font-bold text-sm">
                      {resultado.ddd}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">
                        DDD {resultado.ddd} — {resultado.estado} ({resultado.uf})
                      </h4>
                      <p className="text-xs text-[#667784] dark:text-slate-300">
                        Região {resultado.regiao} do Brasil
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#F0FCF5] text-[#0ACF06] border border-[#0BD976]/30 rounded-full text-[10px] font-bold">
                    OFICIAL ANATEL
                  </span>
                </div>

                {/* Grid com detalhes de retorno */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#E2EAF0] dark:border-white/10">
                    <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Número / Código pesquisado:</span>
                    <span className="font-bold font-mono text-[#0061D9] dark:text-[#00B7C2] text-sm">{numeroDigitado}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#E2EAF0] dark:border-white/10">
                    <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Região de Numeração:</span>
                    <span className="font-bold text-[#172B3A] dark:text-white">{resultado.estado} e arredores</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#E2EAF0] dark:border-white/10">
                    <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Área de Cobertura:</span>
                    <span className="font-semibold text-[#172B3A] dark:text-white">{resultado.descricao}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#0F172A] rounded-xl border border-[#E2EAF0] dark:border-white/10">
                    <span className="text-[#667784] dark:text-slate-400 block text-[11px]">Principais Municípios:</span>
                    <span className="font-semibold text-[#172B3A] dark:text-white">
                      {resultado.cidadesPrincipais.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Status das verificações */}
                <div className="space-y-1.5 pt-2 text-[11px] text-[#667784] dark:text-slate-400 border-t border-[#00B7C2]/20">
                  <div className="flex items-center justify-between">
                    <span>Validação cadastral de titularidade:</span>
                    <span className="font-semibold text-slate-500">Não realizada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Operadora atual da linha:</span>
                    <span className="font-semibold text-slate-500">Não verificada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Localização em tempo real:</span>
                    <span className="font-semibold text-slate-500">Não verificada</span>
                  </div>
                </div>
              </div>

              {/* Aviso obrigatório de conformidade */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-amber-900 dark:text-amber-200 text-xs">
                <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <p>
                  <strong>Aviso Importante:</strong> O código DDD indica uma área de numeração telefônica definida pela Anatel. Ele <strong>não permite</strong> rastrear a localização física ou geográfica de uma pessoa em tempo real.
                </p>
              </div>

              {/* CTA para continuar a consulta cadastral */}
              <div className="p-4 bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#172B3A] dark:text-white">
                    Quer conhecer as opções de consulta cadastral para esse número?
                  </p>
                  <p className="text-[11px] text-[#667784] dark:text-slate-400">
                    Acesse o painel para verificar titularidade, vínculos e canais de contato.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleContinuarConsulta}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                >
                  <span>Continuar consulta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Tabela de Consulta Rápida dos Principais DDDs do Brasil */}
          <div className="pt-4 border-t border-[#E2EAF0] dark:border-white/10 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667784] dark:text-slate-300 mb-3">
              Consulta Rápida — Principais DDDs do Brasil (Anatel)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {principaisDdds.map((codigo) => {
                const info = DDD_DATA[codigo];
                return (
                  <button
                    key={codigo}
                    type="button"
                    onClick={() => selecionarDddTabela(codigo)}
                    className="p-2.5 bg-[#F7FAFC] hover:bg-[#EFFBFC] dark:bg-white/5 dark:hover:bg-white/10 border border-[#E2EAF0] dark:border-white/10 hover:border-[#0061D9]/40 rounded-xl text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-sm text-[#0061D9] group-hover:text-[#0050b5] dark:text-[#00B7C2]">
                        DDD {codigo}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {info.uf}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#172B3A] dark:text-slate-300 font-medium block truncate">
                      {info.estado}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#667784] dark:text-slate-400 mt-2 text-center">
              Clique em qualquer código para preencher a ferramenta ou consulte a base completa de 67 DDDs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
