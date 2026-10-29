'use client';

import { useState, useEffect } from 'react';
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  LogIn, 
  Loader2,
  Database,
  Lock,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analisarTelefoneBrasileiro, AnaliseTelefone } from '@/lib/dddData';

interface HomeSearchBoxProps {
  onSearchSubmit?: (phone: string) => void;
  phonePrice?: number;
}

/**
 * Componente Principal de Busca da Homepage (Blocos 02 e 03)
 * Fluxo de alta conversão:
 * 1. O visitante digita o número com DDD.
 * 2. Ao clicar em 'Consultar telefone' (ou Enter), roda uma animação de carregamento (barra de progresso) por ~3 segundos.
 * 3. Exibe o resultado de que os dados cadastrais da linha foram encontrados, mostrando o valor real da consulta (R$ 0,50 / R$ 1,00).
 * 4. Botão direto para Criar Conta / Fazer Login para liberar o acesso.
 */
export default function HomeSearchBox({ onSearchSubmit, phonePrice = 0.50 }: HomeSearchBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const [analise, setAnalise] = useState<AnaliseTelefone | null>(null);
  const [jaSubmeteu, setJaSubmeteu] = useState(false);
  
  // Estado de carregamento por 3 segundos
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('Conectando aos registros telefônicos...');
  const [buscaConcluida, setBuscaConcluida] = useState(false);

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

    // Reseta o estado de busca concluída se o usuário alterar o número
    if (buscaConcluida) {
      setBuscaConcluida(false);
      setIsLoading(false);
    }

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

      // Inicia a barra de carregamento de ~3 segundos
      iniciarCarregamentoSimulado();
    }
  };

  const iniciarCarregamentoSimulado = () => {
    setIsLoading(true);
    setLoadingProgress(10);
    setBuscaConcluida(false);
    setLoadingStepText('Identificando operadora e código DDD...');

    // Passo 1 (0.8s)
    setTimeout(() => {
      setLoadingProgress(45);
      setLoadingStepText('Buscando registros cadastrais associados...');
    }, 800);

    // Passo 2 (1.8s)
    setTimeout(() => {
      setLoadingProgress(80);
      setLoadingStepText('Compilando dados de titularidade e vínculos...');
    }, 1800);

    // Passo 3 (2.8s) -> Concluído
    setTimeout(() => {
      setLoadingProgress(100);
      setLoadingStepText('Registros localizados com sucesso!');
      setTimeout(() => {
        setIsLoading(false);
        setBuscaConcluida(true);
      }, 400);
    }, 2800);
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

  const valorFormatado = Number(phonePrice).toFixed(2).replace('.', ',');

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
              disabled={isLoading}
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              className="w-full bg-[#F7FAFC] dark:bg-black/20 border border-[#E2EAF0] dark:border-white/10 rounded-2xl pl-12 pr-4 md:pr-56 py-4 text-[#172B3A] dark:text-white placeholder-[#667784]/60 text-base md:text-lg font-semibold focus:border-[#0061D9] focus:bg-white dark:focus:bg-[#0F172A] focus:ring-4 focus:ring-[#0061D9]/10 outline-none transition-all shadow-inner disabled:opacity-75"
            />
            {/* Botão para telas Desktop */}
            <button
              type="submit"
              disabled={isLoading}
              className="hidden md:flex absolute right-2.5 top-2.5 bottom-2.5 px-6 bg-[#0061D9] hover:bg-[#0050b5] disabled:bg-[#0061D9]/70 text-white font-bold rounded-xl items-center gap-2 shadow-sm transition-all duration-200 active:scale-95 text-sm shrink-0 whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consultando...</span>
                </>
              ) : (
                <>
                  <span>Consultar telefone</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Botão de largura total para telas Mobile */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:hidden py-4 px-6 bg-[#0061D9] hover:bg-[#0050b5] disabled:bg-[#0061D9]/70 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0061D9]/20 transition-all text-base active:scale-95 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Consultando...</span>
            </>
          ) : (
            <>
              <span>Consultar telefone</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Texto auxiliar e micro selos */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2EAF0] dark:border-white/5 text-[11px] text-[#667784] dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0BD976]" />
            Aceita números brasileiros de celular e telefone fixo com DDD.
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#0061D9] dark:text-[#00B7C2]">
            <Zap className="w-3.5 h-3.5" />
            Consulta a partir de R$ {valorFormatado} por pesquisa.
          </span>
        </div>
      </form>

      {/* ANIMAÇÃO DA BARRINHA DE CARREGAMENTO (DURAÇÃO ~3s) */}
      {isLoading && (
        <div className="mt-5 pt-5 border-t border-[#E2EAF0] dark:border-white/10 animate-in fade-in duration-300 text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#172B3A] dark:text-white">
            <span className="flex items-center gap-2 text-[#0061D9] dark:text-[#00B7C2]">
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingStepText}
            </span>
            <span className="font-mono text-[11px] text-[#667784] dark:text-slate-400">{loadingProgress}%</span>
          </div>

          {/* Barra de Progresso Animada */}
          <div className="w-full h-3 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#0061D9] via-[#00B7C2] to-[#0BD976] rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-[#667784] dark:text-slate-400 text-center">
            Aguarde um momento enquanto verificamos os vínculos cadastrais do número...
          </p>
        </div>
      )}

      {/* BLOCO 03: ÁREA DE RETORNO IMEDIATO DA BUSCA */}
      {!isLoading && analise && (
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

          {/* ESTADO 4: BUSCA CONCLUÍDA - DADOS ENCONTRADOS E VALOR DO SERVIÇO */}
          {buscaConcluida && analise.status === 'reconhecido' && (
            <div className="space-y-4 animate-in zoom-in-95 duration-300">
              
              {/* Card de Sucesso / Dados Encontrados */}
              <div className="bg-gradient-to-br from-[#F0FCF5] to-[#EFFBFC] dark:from-emerald-950/30 dark:to-cyan-950/30 border-2 border-[#0BD976] p-4.5 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0BD976] flex items-center justify-center shrink-0 text-white shadow-xs">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#0BD976]/20 text-[#0ACF06] dark:text-[#0BD976] font-extrabold text-[10px] uppercase tracking-wider rounded-md">
                          Registros Localizados
                        </span>
                        <span className="text-xs text-[#667784] dark:text-slate-400">DDD {analise.ddd} ({analise.estado})</span>
                      </div>
                      <h4 className="text-base font-extrabold text-[#172B3A] dark:text-white mt-0.5">
                        Dados cadastrais encontrados para o número!
                      </h4>
                    </div>
                  </div>

                  {/* Preço em destaque */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-[#667784] dark:text-slate-400 block font-semibold uppercase">Apenas</span>
                    <span className="text-lg md:text-xl font-black text-[#0061D9] dark:text-[#00B7C2]">
                      R$ {valorFormatado}
                    </span>
                  </div>
                </div>

                {/* Resumo dos dados localizados prontos para liberação */}
                <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xs border border-[#E2EAF0]/80 dark:border-white/10 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#667784] dark:text-slate-400 block">Número:</span>
                    <span className="font-bold text-[#172B3A] dark:text-white font-mono">{analise.formatado}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#667784] dark:text-slate-400 block">Tipo da Linha:</span>
                    <span className="font-bold text-[#172B3A] dark:text-white capitalize">{analise.tipoLabel}</span>
                  </div>
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#667784] dark:text-slate-400 block">Titularidade:</span>
                    <span className="font-bold text-[#0ACF06] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#0ACF06]" />
                      Pronto para liberar
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#667784] dark:text-slate-300 leading-relaxed">
                  Os dados do titular, histórico de contatos e informações cadastrais vinculadas a este telefone estão prontos para consulta imediata por apenas <strong>R$ {valorFormatado}</strong>.
                </p>
              </div>

              {/* Bloco de Ação: Criar Conta para Visualizar */}
              <div className="bg-[#F7FAFC] dark:bg-white/5 border border-[#E2EAF0] dark:border-white/10 rounded-2xl p-4.5 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#172B3A] dark:text-white flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-[#0061D9]" />
                      Crie sua conta para visualizar os dados
                    </p>
                    <p className="text-xs text-[#667784] dark:text-slate-400 mt-0.5">
                      Cadastro em menos de 30 segundos. Sem mensalidade, pague apenas a consulta de R$ {valorFormatado}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleContinuarConsulta('cadastro')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#0061D9] to-[#00B7C2] hover:from-[#0050b5] hover:to-[#00a3ad] text-white font-extrabold rounded-xl shadow-lg shadow-[#0061D9]/25 flex items-center justify-center gap-2 text-sm uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Criar conta e ver dados</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Opção se já tiver conta */}
                <div className="pt-2.5 border-t border-[#E2EAF0] dark:border-white/10 flex items-center justify-between text-xs text-[#667784] dark:text-slate-400">
                  <span className="flex items-center gap-1 text-xs">
                    <UserCheck className="w-3.5 h-3.5 text-[#00B7C2]" />
                    Já possui conta no PuxarTelefone?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleContinuarConsulta('login')}
                    className="font-bold text-[#0061D9] dark:text-[#00B7C2] hover:underline flex items-center gap-1 cursor-pointer text-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Entrar e consultar</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ESTADO RECONHECIDO (ANTES DE CLICAR EM CONSULTAR) */}
          {!buscaConcluida && analise.status === 'reconhecido' && (
            <div className="flex items-center justify-between p-3.5 bg-[#EFFBFC] dark:bg-cyan-950/20 border border-[#00B7C2]/30 rounded-xl text-xs">
              <span className="text-[#172B3A] dark:text-slate-200">
                Número válido: <strong>{analise.formatado}</strong> ({analise.tipoLabel} — DDD {analise.ddd}).
              </span>
              <button
                type="button"
                onClick={() => executarValidacao()}
                className="font-bold text-[#0061D9] dark:text-[#00B7C2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Buscar agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
