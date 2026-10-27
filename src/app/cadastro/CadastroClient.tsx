'use client';

import { useActionState, useEffect, useState } from 'react';
import { register, loginWithGoogle } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Lock, Mail, User, ShieldCheck, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BrandLogo } from '@/components/BrandLogo';

interface CadastroClientProps {
  logoUrl?: string | null;
  faviconUrl?: string | null;
}

/**
 * Componente cliente do Formulário de Cadastro.
 * Inclui validação de Termos de Uso e Responsabilidade (LGPD) e Política de Privacidade.
 */
export default function CadastroClient({ logoUrl, faviconUrl }: CadastroClientProps) {
  const [state, formAction, isPending] = useActionState(register, null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados de conformidade jurídica dos termos
  const [showTerms, setShowTerms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  useEffect(() => {
    // Captura erros vindos da URL (ex: redirecionamento do Google OAuth)
    const urlError = searchParams.get('error');
    if (urlError) {
      toast.error(urlError.replace(/_/g, ' '));
      // Limpa a URL
      router.replace('/cadastro');
    }

    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success) {
      toast.success('Conta criada com sucesso!');
      router.push('/dashboard');
    }
  }, [state, router, searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!acceptTerms || !acceptPrivacy) {
      e.preventDefault();
      toast.warning('Você precisa aceitar os Termos de Uso e a Política de Privacidade para prosseguir.');
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4 py-8">
      {/* Botão de Alternar Tema */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col items-center mb-6">
          {/* Logo dinâmico configurado no painel administrativo */}
          <BrandLogo logoUrl={logoUrl} faviconUrl={faviconUrl} className="mb-5" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Crie sua conta</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 text-center">Comece a consultar dados com segurança agora mesmo.</p>
        </div>

        <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500" />
              <input 
                type="text" 
                name="name"
                required
                className="w-full bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="Seu nome"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500" />
              <input 
                type="email" 
                name="email"
                required
                className="w-full bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500" />
              <input 
                type="password" 
                name="password"
                required
                className="w-full bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* TERMOS DE USO E RESPONSABILIDADE + CHECKBOXES DE ACEITE */}
          {/* ========================================================= */}
          <div className="pt-2 pb-1 space-y-3">
            {/* Título Retrátil */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-white/5 overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs font-bold text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0061D9]" />
                  <span>Termos de Uso e Responsabilidade</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showTerms ? 'rotate-180' : ''}`} />
              </button>

              {showTerms && (
                <div className="px-3.5 pb-3 pt-1 text-[11px] leading-relaxed text-slate-600 dark:text-gray-400 border-t border-slate-200/60 dark:border-white/5 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p>
                    Antes de criar sua conta, leia e aceite as condições de utilização da plataforma.
                    Os serviços destinam-se exclusivamente a consultas com finalidade legítima e fundamento jurídico adequado.
                  </p>
                  <p>
                    É proibido utilizar as informações para perseguição, fraude, discriminação, exposição indevida, ameaças ou qualquer atividade ilícita.
                  </p>
                  <p>
                    O usuário responde por suas condutas e pelo tratamento posterior que realizar, sem prejuízo das responsabilidades legais da operadora.
                  </p>
                </div>
              )}
            </div>

            {/* 2 Caixinhas Visíveis Obrigatórias */}
            <div className="space-y-2 text-xs pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-white/20 text-[#0061D9] focus:ring-[#0061D9] cursor-pointer"
                />
                <span className="text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-snug">
                  Li e aceito os <strong>Termos de Uso</strong> e as regras de utilização responsável.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-white/20 text-[#0061D9] focus:ring-[#0061D9] cursor-pointer"
                />
                <span className="text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-snug">
                  Declaro ter tomado conhecimento da <strong>Política de Privacidade</strong>.
                </span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className={`w-full py-3 rounded-xl font-bold mt-4 flex items-center justify-center transition-all cursor-pointer shadow-md ${
              acceptTerms && acceptPrivacy && !isPending
                ? 'btn-premium text-white opacity-100 hover:scale-[1.01]'
                : 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-gray-500 cursor-not-allowed shadow-none'
            }`}
          >
            {isPending ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#f8fafc] dark:bg-[#080b11] text-slate-500 dark:text-gray-400 font-medium rounded-full">Ou cadastre-se com</span>
            </div>
          </div>

          <form action={loginWithGoogle} className="mt-5">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer border border-slate-200 text-sm"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continuar com Google</span>
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-6">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:text-blue-400 font-semibold transition-colors">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
