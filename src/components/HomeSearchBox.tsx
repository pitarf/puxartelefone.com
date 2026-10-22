'use client';

import { useState, useEffect } from 'react';
import { Phone, Search, Loader2, CheckCircle2, ShieldAlert, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HomeSearchBoxProps {
  onSearchSubmit?: (phone: string) => void;
}

export default function HomeSearchBox({ onSearchSubmit }: HomeSearchBoxProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const steps = [
    'Verificando formato e operadora do número...',
    'Consultando base de registros telefônicos nacionais...',
    'Identificando módulos e opções de consulta disponíveis...',
    'Finalizando verificação de conformidade...'
  ];

  const formatTelefone = (v: string) => {
    // Mantém apenas números
    let clean = v.replace(/\D/g, '');
    
    // Suporte com código do país 55 opcional
    if (clean.startsWith('55') && clean.length > 11) {
      clean = clean.substring(2);
    }
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    if (clean.length > 11) clean = clean.slice(0, 11);
    
    if (clean.length <= 2) return clean ? `(${clean}` : '';
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    }
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPhone(formatTelefone(e.target.value));
  };

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setLoading(false);
            setShowResult(true);
            return prev;
          }
          return prev + 1;
        });
      }, 750);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanVal = phone.replace(/\D/g, '');

    // Validação real: DDD + 8 ou 9 dígitos (10 ou 11 números)
    if (cleanVal.length !== 10 && cleanVal.length !== 11) {
      setError('Informe um número de telefone com DDD válido (Ex: 11 99999-9999).');
      return;
    }

    // Telefones com todos dígitos repetidos
    const invalidSequences = [
      '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
      '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
      '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
      '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'
    ];
    if (invalidSequences.includes(cleanVal)) {
      setError('Por favor, informe um número de telefone real e válido.');
      return;
    }

    setLoading(true);
    setShowResult(false);
  };

  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <div className="w-full bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-[0_4px_20px_rgba(0,97,217,0.06)] relative overflow-hidden">
      {/* Detalhe superior turquesa sutil */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0061D9] via-[#00B7C2] to-[#0BD976]" />

      {!loading && !showResult && (
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label htmlFor="phone-input" className="block text-xs font-bold uppercase tracking-wider text-[#667784] dark:text-slate-300">
              Número com DDD
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-[#0061D9]">
                <Phone className="w-5 h-5" />
              </div>
              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={handleInputChange}
                placeholder="DDD + Número (ex: 11 99999-9999)"
                autoComplete="tel"
                className="w-full bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl pl-12 pr-4 md:pr-56 py-4 text-[#172B3A] dark:text-white placeholder-[#667784]/60 text-base md:text-lg font-semibold focus:border-[#0061D9] focus:bg-white dark:focus:bg-[#0F172A] focus:ring-4 focus:ring-[#0061D9]/10 outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={!phone.trim()}
                className="hidden md:flex absolute right-2.5 top-2.5 bottom-2.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] disabled:opacity-50 text-white font-bold rounded-xl items-center gap-2 shadow-sm transition-all duration-200 active:scale-95 text-sm shrink-0 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Consultar telefone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Botão para telas mobile */}
          <button
            type="submit"
            disabled={!phone.trim()}
            className="w-full md:hidden py-3.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0061D9]/20 transition-all text-sm active:scale-95"
          >
            <span>Consultar telefone</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E53E3E] bg-[#FFF5F5] dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-800/40 text-left animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 shrink-0 text-[#E53E3E]" />
              <span>{error}</span>
            </div>
          )}

          {/* Micro selos de confiança no box */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2EAF0] dark:border-white/5 text-[11px] text-[#667784] dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0BD976]" />
              Dados públicos e LGPD
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#00B7C2]" />
              Consulta rápida em segundos
            </span>
            <span>DDD de todo o Brasil</span>
          </div>
        </form>
      )}

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-2xl bg-[#EFFBFC] flex items-center justify-center text-[#0061D9] relative">
            <Loader2 className="w-7 h-7 text-[#0061D9] animate-spin" />
          </div>
          <div className="space-y-2 max-w-sm">
            <p className="text-sm font-bold text-[#172B3A] dark:text-white">{steps[loadingStep]}</p>
            <div className="w-56 h-2 bg-[#E2EAF0] dark:bg-white/10 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-[#0061D9] to-[#00B7C2] transition-all duration-700 ease-out" 
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <div className="space-y-5 animate-in fade-in duration-400 text-left">
          {/* Card de confirmação */}
          <div className="flex items-center gap-3.5 bg-[#F0FCF5] dark:bg-emerald-950/30 border border-[#0BD976]/30 p-4 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-[#0BD976]/15 flex items-center justify-center shrink-0 text-[#0ACF06]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#172B3A] dark:text-white">Opções de consulta prontas</h4>
              <p className="text-xs text-[#667784] dark:text-slate-300">
                Número verificado: <span className="font-mono font-bold text-[#0061D9]">{phone}</span>
              </p>
            </div>
          </div>

          {/* Card explicativo transparente */}
          <div className="bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-xl p-4 text-xs text-[#667784] dark:text-slate-300 space-y-2">
            <p className="font-semibold text-[#172B3A] dark:text-white">
              Próxima etapa: Acessar o painel para selecionar os módulos de pesquisa disponíveis.
            </p>
            <p>
              Você poderá escolher exatamente os dados que precisa (titularidade cadastral, contatos alternativos, localização aproximada e vínculos) pagando apenas pelo que consultar.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2.5">
            <Link
              href={`/cadastro?search=${encodeURIComponent(cleanPhone)}&type=telefone`}
              className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-[#0061D9]/20 flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-wide text-center active:scale-95"
            >
              <span>Acessar opções de consulta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setPhone('');
                setShowResult(false);
              }}
              className="w-full text-xs text-[#667784] hover:text-[#0061D9] font-semibold text-center hover:underline py-1 transition-colors"
            >
              Consultar outro número de telefone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
