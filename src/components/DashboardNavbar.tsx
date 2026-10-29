'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Database,
  Phone,
  Users, 
  Car, 
  Building2, 
  Scale, 
  History, 
  Package, 
  UserCircle, 
  LifeBuoy, 
  ShieldCheck,
  ChevronDown,
  LogOut,
  Gift,
  Award,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BalanceHeader } from '@/components/BalanceHeader';

interface DashboardNavbarProps {
  user: {
    name: string | null;
    email: string;
    balance: number;
    role: string;
  };
  logoUrl?: string | null;
  whatsappLink: string;
}

export function DashboardNavbar({ user, logoUrl, whatsappLink }: DashboardNavbarProps) {
  const pathname = usePathname();
  const [consultasOpen, setConsultasOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const consultasRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (consultasRef.current && !consultasRef.current.contains(event.target as Node)) {
        setConsultasOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
    setConsultasOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  };

  const isConsultasActive = 
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/veiculos') ||
    pathname.startsWith('/dashboard/empresas') ||
    pathname.startsWith('/dashboard/processos') ||
    pathname.startsWith('/dashboard/enderecos');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* ================= 1. LOGO & BRAND ================= */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-7 sm:h-8 w-auto object-contain" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.webp';
                  }}
                />
              ) : (
                <img 
                  src="/logo.webp" 
                  alt="Logo" 
                  className="h-7 sm:h-8 w-auto object-contain" 
                />
              )}
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                puxar<span className="text-[#0061D9]">telefone</span>
              </span>
            </Link>

            {/* ================= 2. LINKS PRINCIPAIS (DESKTOP) ================= */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              
              {/* Menu Suspenso: Consultas Cadastrais */}
              <div className="relative" ref={consultasRef}>
                <button
                  type="button"
                  onClick={() => setConsultasOpen(!consultasOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isConsultasActive
                      ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Phone className="w-4 h-4 text-[#0061D9]" />
                  <span>Consultas</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${consultasOpen ? 'rotate-180' : ''}`} />
                </button>

                {consultasOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-[#EFFBFC] dark:hover:bg-white/5 hover:text-[#0061D9] font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-[#0061D9]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Consultar Telefone</div>
                        <div className="text-[11px] text-slate-500 dark:text-gray-400">Titularidade, operadora e dados</div>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard?tab=cpf"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-[#EFFBFC] dark:hover:bg-white/5 hover:text-[#0061D9] font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Pessoas (CPF)</div>
                        <div className="text-[11px] text-slate-500 dark:text-gray-400">Dados pessoais e parentes</div>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard/veiculos"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-[#EFFBFC] dark:hover:bg-white/5 hover:text-[#0061D9] font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <Car className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Veículos (Placa)</div>
                        <div className="text-[11px] text-slate-500 dark:text-gray-400">Débitos, multas e proprietário</div>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard/empresas"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-[#EFFBFC] dark:hover:bg-white/5 hover:text-[#0061D9] font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Empresas (CNPJ)</div>
                        <div className="text-[11px] text-slate-500 dark:text-gray-400">Quadro societário e filiais</div>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard/processos"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-[#EFFBFC] dark:hover:bg-white/5 hover:text-[#0061D9] font-medium transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
                        <Scale className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Processos Judiciais</div>
                        <div className="text-[11px] text-slate-500 dark:text-gray-400">Tribunais e polos ativos</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Link: Minhas Consultas */}
              <Link
                href="/dashboard/historico"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/dashboard/historico')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Histórico</span>
              </Link>

              {/* Link: Adicionar Saldo */}
              <Link
                href="/dashboard/faturas"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/dashboard/faturas')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Adicionar Saldo</span>
              </Link>

              {/* Link: Promoções */}
              <Link
                href="/dashboard/promocoes"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/dashboard/promocoes')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>Promoções</span>
              </Link>

              {/* Link: Afiliados */}
              <Link
                href="/dashboard/indicacoes"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive('/dashboard/indicacoes')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Indicações</span>
              </Link>

              {/* Link: Suporte WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Suporte</span>
              </a>

              {/* Painel Admin (se autorizado) */}
              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 hover:bg-red-100 transition-colors ml-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          </div>

          {/* ================= 3. AÇÕES DA DIREITA ================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Alternar Tema (Desktop) */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Saldo / Recarga */}
            <BalanceHeader initialBalance={user.balance} />

            {/* Menu do Usuário (Desktop) */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight">
                    {user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {(user.name?.[0] || user.email[0]).toUpperCase()}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                    <p className="text-xs text-slate-400 dark:text-gray-500">Conectado como</p>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard/perfil"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-medium"
                  >
                    <UserCircle className="w-4 h-4 text-slate-500" />
                    <span>Meu Perfil</span>
                  </Link>

                  <Link
                    href="/dashboard/faturas"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-medium"
                  >
                    <Wallet className="w-4 h-4 text-slate-500" />
                    <span>Extrato & Recargas</span>
                  </Link>

                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-bold"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Painel Administrativo</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 dark:border-white/5 my-1" />

                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Encerrar Sessão</span>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Botão Hambúrguer Mobile (Sempre visível e de fácil toque em celulares) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-white/15 transition-all active:scale-95 shrink-0 cursor-pointer shadow-2xs"
              aria-label={mobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 4. MENU MOBILE EXPANSÍVEL ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white/98 dark:bg-[#0f172a]/98 backdrop-blur-xl px-4 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Card do Usuário Logado */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {(user.name?.[0] || user.email[0]).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {user.name || user.email.split('@')[0]}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Alternar Tema no Mobile */}
            <div className="shrink-0 flex items-center bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-white/10 p-0.5 shadow-2xs">
              <ThemeToggle />
            </div>
          </div>

          {/* Seção 1: Consultas Cadastrais */}
          <div>
            <div className="px-2 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Consultas Cadastrais
            </div>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/dashboard'
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-[#0061D9]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div>Consultar Telefone</div>
                  <div className="text-[11px] font-normal text-slate-400">Titularidade e operadora</div>
                </div>
              </Link>

              <Link
                href="/dashboard?tab=cpf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div>Pessoas (CPF)</div>
                  <div className="text-[11px] font-normal text-slate-400">Dados cadastrais completos</div>
                </div>
              </Link>

              <Link
                href="/dashboard/veiculos"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith('/dashboard/veiculos')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Car className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div>Veículos (Placa)</div>
                  <div className="text-[11px] font-normal text-slate-400">Débitos e proprietário</div>
                </div>
              </Link>

              <Link
                href="/dashboard/empresas"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith('/dashboard/empresas')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div>Empresas (CNPJ)</div>
                  <div className="text-[11px] font-normal text-slate-400">Sócios, filiais e capital</div>
                </div>
              </Link>

              <Link
                href="/dashboard/processos"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith('/dashboard/processos')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Scale className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div>Processos Judiciais</div>
                  <div className="text-[11px] font-normal text-slate-400">Tribunais de todo o Brasil</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Seção 2: Financeiro & Serviços */}
          <div>
            <div className="px-2 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Painel & Financeiro
            </div>
            <div className="space-y-1">
              <Link
                href="/dashboard/historico"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/historico')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <History className="w-4 h-4 text-slate-400" />
                <span>Minhas Consultas (Histórico)</span>
              </Link>

              <Link
                href="/dashboard/faturas"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/faturas')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4 text-slate-400" />
                <span>Adicionar Saldo / Recargas</span>
              </Link>

              <Link
                href="/dashboard/promocoes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/promocoes')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Gift className="w-4 h-4 text-slate-400" />
                <span>Promoções & Cupons</span>
              </Link>

              <Link
                href="/dashboard/indicacoes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/indicacoes')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Award className="w-4 h-4 text-slate-400" />
                <span>Indicações (Ganhe Saldo)</span>
              </Link>

              <Link
                href="/dashboard/perfil"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/dashboard/perfil')
                    ? 'text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10 font-semibold'
                    : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <UserCircle className="w-4 h-4 text-slate-400" />
                <span>Meu Perfil</span>
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
              >
                <LifeBuoy className="w-4 h-4 text-emerald-600" />
                <span>Suporte WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Painel Administrativo */}
          {user.role === 'ADMIN' && (
            <div className="pt-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
              >
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Painel Administrativo Master</span>
              </Link>
            </div>
          )}

          {/* Botão Sair */}
          <div className="border-t border-slate-200/80 dark:border-white/10 pt-3">
            <form action={logout}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Encerrar Sessão</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
