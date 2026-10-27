'use client';

import React, { useState } from 'react';
import { acceptComplianceTerms } from '@/app/actions/perfil';
import { toast } from 'sonner';
import { ShieldCheck, ArrowRight, Loader2, Scale } from 'lucide-react';

interface TermoCienciaModalProps {
  isOpen: boolean;
  onAccepted: () => void;
}

/**
 * Modal Obrigatório de Compliance LGPD:
 * "Termo de Ciência, Responsabilidade e Uso Legítimo".
 * Exibido no primeiro acesso após a criação de conta, antes de qualquer outra ação ou popup promocional.
 */
export default function TermoCienciaModal({ isOpen, onAccepted }: TermoCienciaModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await acceptComplianceTerms();
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Termo de Ciência registrado com sucesso.');
        onAccepted();
      }
    } catch (err) {
      toast.error('Erro ao registrar aceite. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow de fundo */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#0061D9]/20 via-[#00B7C2]/20 to-transparent blur-2xl -z-10 pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-white/10 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-[#0061D9] shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#0061D9] uppercase">Conformidade Legal & LGPD</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
              Termo de Ciência, Responsabilidade e Uso Legítimo
            </h3>
          </div>
        </div>

        {/* Corpo do Termo com rolagem suave */}
        <div className="my-5 overflow-y-auto pr-2 space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-gray-300 scrollbar-thin">
          <p>
            Ao criar uma conta e utilizar os serviços desta plataforma, o usuário declara estar ciente de que o acesso e o tratamento de informações pessoais de terceiros estão sujeitos à Lei nº 13.709/2018 (LGPD) e às demais normas aplicáveis.
          </p>

          <p>
            O usuário compromete-se a utilizar os serviços exclusivamente para finalidades legítimas, específicas e juridicamente fundamentadas.
          </p>

          <p className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 font-medium text-xs leading-relaxed">
            É expressamente proibida a utilização de informações obtidas por meio da plataforma para perseguição, ameaças, fraudes, discriminação, exposição indevida de dados pessoais, engenharia social ou outras atividades ilícitas.
          </p>

          <p>
            O usuário assume responsabilidade pelas próprias condutas, declarações e operações de tratamento que realizar, inclusive eventual compartilhamento posterior das informações, nos limites previstos na legislação.
          </p>

          <p>
            A responsabilidade por danos será apurada conforme a atuação de cada parte e os artigos 42 e 43 da LGPD, sem exclusão das obrigações legais da empresa operadora.
          </p>

          <p>
            A plataforma poderá solicitar comprovação da finalidade da consulta, limitar funcionalidades, suspender acessos em situações justificadas e adotar medidas legalmente cabíveis para prevenir ou investigar utilizações abusivas.
          </p>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 font-semibold text-slate-900 dark:text-white text-xs">
            Ao prosseguir, o usuário confirma que leu e aceita os Termos de Uso e declara ciência da Política de Privacidade.
          </div>
        </div>

        {/* Botão Prosseguir */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/10 shrink-0">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="w-full btn-premium py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] transition-transform active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <span>Prosseguir</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
