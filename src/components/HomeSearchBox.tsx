'use client';

import { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck, Zap, AlertCircle, CheckCircle2, UserCheck, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analisarTelefoneBrasileiro, AnaliseTelefone } from '@/lib/dddData';

interface HomeSearchBoxProps {
  onSearchSubmit?: (phone: string) => void;
}

/**
 * Componente Principal de Busca da Homepage (Blocos 02 e 03)
 * - Aceita números de celular e fixo com DDD, suporta +55, espaços e traços.
 * - Valida estritamente de acordo com as regras de numeração da Anatel.
 * - Retorno imediato abaixo do campo (sem rolar a tela).
 * - Preserva o telefone na sessão (sessionStorage) para transição segura.
 * - Não simula consultas falsas.
 */
export default function HomeSearchBox({ onSearchSubmit }: HomeSearchBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const [analise, setAnalise] = useState<AnaliseTelefone | null>(null);
  const [jaSubmeteu, setJaSubmeteu] = useState(false);
  const router = useRouter();

  // Aplica máscara visual dinâmica de acordo com a digitação
  const aplicarMascara = (valor: string) => {
    let clean = valor.replace(/\D/g, '');

    // Se começar com 55 e tiver mais de 11 dígitos, remove código de país
    if (clean.startsWith('55') && clean.length > 11) {
      clean = clean.substring(2);
    }

    if (clean.length > 11) clean = clean.slice(0, 11);

    if (clean.length === 0) return '';
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    }
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const mascarado = aplicarMascara(raw);
    setInputValue(mascarado);

    // Se já tiver submetido ou tiver comprimento suficiente, atualiza a análise em tempo real
    if (jaSubmeteu || raw.replace(/\D/g, '').length >= 10) {
      const res = analisarTelefoneBrasileiro(mascarado);
      setAnalise(res);
    } else if (analise && raw.trim() === '') {
      setAnalise(null);
      setJaSubmeteu(false);
    }
  };

  const executarValidacao = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setJaSubmeteu(true);

    const res = analisarTelefoneBrasileiro(inputValue);
    setAnalise(res);

    if (res.valido) {
      // Salva em sessionStorage para transição segura sem expor dados sensíveis em URL pública
      try {
        sessionStorage.setItem('puxar_telefone_preenchido', res.formatado);
        sessionStorage.setItem('puxar_telefone_clean', res.formatado.replace(/\D/g, ''));
      } catch (err) {
        console.warn('Não foi possível salvar na sessão:', err);
      }

      if (onSearchSubmit) {
        onSearchSubmit(res.formatado);
      }
    }
  };

  const handleContinuarConsulta = (destino: 'cadastro' | 'login') => {
    const cleanNum = inputValue.replace(/\D/g, '');
    try {
      sessionStorage.setItem('puxar_telefone_preenchido', inputValue);
      sessionStorage.setItem('puxar_telefone_clean', cleanNum);
    } catch {
      // continua
    }

    if (destino === 'cadastro') {
      router.push(`/cadastro?src=home-telefone&type=telefone&phone=${encodeURIComponent(cleanNum)}`);
    } else {
      router.push(`/login?src=home-telefone&type=telefone`);
    }
  };

  return (
    <div id="consultar-telefone" className="w-full bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-[0_4px_20px_rgba(0,97,217,0.06)] relative overflow-hidden transition-all">
      {/* Detalhe superior em gradiente turquesa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0061D9] via-[#00B7C2] to-[#0BD976]" />

      <form onSubmit={executarValidacao} className="space-y-4">
        <div className="space-y-1.5 text-left">
          <label htmlFor="phone-hero-input" className="block text-xs font-bold uppercase tracking-wider text-[#667784] dark:text-slate-300">
            Número de telefone com DDD
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-[#0061D9]">
              <Phone className="w-5 h-5" />
            </div>
            <input
              id="phone-hero-input"
              type="tel"
              inputMode="tel"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              className="w-full bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl pl-12 pr-4 md:pr-56 py-4 text-[#172B3A] dark:text-white placeholder-[#667784]/60 text-base md:text-lg font-semibold focus:border-[#0061D9] focus:bg-white dark:focus:bg-[#0F172A] focus:ring-4 focus:ring-[#0061D9]/10 outline-none transition-all shadow-inner"
            />
            {/* Botão para telas Desktop */}
            <button
              type="submit"
              className="hidden md:flex absolute right-2.5 top-2.5 bottom-2.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl items-center gap-2 shadow-sm transition-all duration-200 active:scale-95 text-sm shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Consultar telefone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Botão de largura total para telas Mobile */}
        <button
          type="submit"
          className="w-full md:hidden py-4 px-6 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0061D9]/20 transition-all text-base active:scale-95"
        >
          <span>Consultar telefone</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Texto auxiliar e micro selos */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2EAF0] dark:border-white/5 text-[11px] text-[#667784] dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0BD976]" />
            Aceita números brasileiros de celular e telefone fixo com DDD.
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#0061D9] dark:text-[#00B7C2]">
            <Zap className="w-3.5 h-3.5" />
            Confira as modalidades e preços antes de contratar.
          </span>
        </div>
      </form>

      {/* BLOCO 03: ÁREA DE RETORNO IMEDIATO DA BUSCA (Logo abaixo do campo, sem precisar rolar) */}
      {analise && (
        <div className="mt-5 pt-5 border-t border-[#E2EAF0] dark:border-white/10 animate-in fade-in duration-300 text-left">
          
          {/* ESTADO 1: CAMPO VAZIO */}
          {analise.status === 'vazio' && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="font-semibold">{analise.mensagem}</p>
            </div>
          )}

          {/* ESTADO 2: NÚMERO INCOMPLETO */}
          {analise.status === 'incompleto' && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-amber-800 dark:text-amber-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-bold text-amber-900 dark:text-amber-100">Número incompleto</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">{analise.mensagem}</p>
              </div>
            </div>
          )}

          {/* ESTADO 3: FORMATO INVÁLIDO */}
          {analise.status === 'invalido' && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl text-red-800 dark:text-red-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-bold text-red-900 dark:text-red-100">Formato inválido</p>
                <p className="text-xs text-red-700 dark:text-red-300">{analise.mensagem}</p>
              </div>
            </div>
          )}

          {/* ESTADO 4 & 5: FORMATO RECONHECIDO E PRÓXIMA ETAPA */}
          {analise.status === 'reconhecido' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 bg-[#F0FCF5] dark:bg-emerald-950/30 border border-[#0BD976]/30 p-4 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-[#0BD976]/15 flex items-center justify-center shrink-0 text-[#0ACF06] mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">Formato de telefone reconhecido</h4>
                  <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                    O número <strong className="font-mono text-[#0061D9] dark:text-[#00B7C2]">{analise.formatado}</strong> possui estrutura compatível com um <strong>{analise.tipoLabel}</strong> brasileiro (DDD {analise.ddd} — {analise.estado}). Continue para conhecer as modalidades de consulta cadastral disponíveis.
                  </p>
                </div>
              </div>

              {/* Bloco de Ação Rápida e Transição */}
              <div className="bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#172B3A] dark:text-white">Modalidades de Consulta Cadastral</p>
                    <p className="text-[11px] text-[#667784] dark:text-slate-400">
                      Crie sua conta ou faça login para conhecer os módulos disponíveis e selecionar a pesquisa desejada.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleContinuarConsulta('cadastro')}
                    className="w-full sm:w-auto px-5 py-3 bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold rounded-xl shadow-md shadow-[#0061D9]/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Continuar consulta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Opção se já tiver conta */}
                <div className="pt-2 border-t border-[#E2EAF0] dark:border-white/10 flex items-center justify-between text-xs text-[#667784] dark:text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <UserCheck className="w-3.5 h-3.5 text-[#00B7C2]" />
                    Já possui cadastro no PuxarTelefone?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleContinuarConsulta('login')}
                    className="font-bold text-[#0061D9] dark:text-[#00B7C2] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Fazer login</span>
                  </button>
                </div>
              </div>

              {/* Informação Legal Transparente: Sem simulação falsa de consulta */}
              <p className="text-[11px] text-[#667784] dark:text-slate-400 italic text-center">
                * A validação acima confirma apenas a compatibilidade da estrutura numérica e do DDD (Anatel). Nenhuma consulta cadastral paga foi executada nesta etapa.
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
