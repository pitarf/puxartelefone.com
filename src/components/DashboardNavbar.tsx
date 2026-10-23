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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ================= 1. LOGO & BRAND ================= */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                  <Database className="w-4 h-4" />
                </div>
              )}
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
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
          <div className="flex items-center gap-3">
            {/* Alternar Tema */}
            <ThemeToggle />

            {/* Saldo / Recarga */}
            <BalanceHeader initialBalance={user.balance} />

            {/* Menu do Usuário (Desktop) */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
              >
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight">
                    {user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] text-white flex items-center justify-center font-bold text-xs shadow-sm">
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
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Encerrar Sessão</span>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Botão Hambúrguer Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 4. MENU MOBILE EXPANSÍVEL ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Consultas Disponíveis
          </div>
          
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0061D9] bg-[#EFFBFC] dark:bg-white/10"
          >
            <Phone className="w-4 h-4 text-[#0061D9]" />
            <span>Consultar Telefone</span>
          </Link>

          <Link
            href="/dashboard?tab=cpf"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>Consultar Pessoas (CPF)</span>
          </Link>

          <Link
            href="/dashboard/veiculos"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Car className="w-4 h-4 text-slate-400" />
            <span>Consultar Veículos (Placa)</span>
          </Link>

          <Link
            href="/dashboard/empresas"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Consultar Empresas (CNPJ)</span>
          </Link>

          <Link
            href="/dashboard/processos"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Scale className="w-4 h-4 text-slate-400" />
            <span>Consultar Processos</span>
          </Link>

          <div className="border-t border-slate-100 dark:border-white/5 my-2" />

          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Sua Conta
          </div>

          <Link
            href="/dashboard/historico"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Minhas Consultas</span>
          </Link>

          <Link
            href="/dashboard/faturas"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Package className="w-4 h-4 text-slate-400" />
            <span>Adicionar Saldo</span>
          </Link>

          <Link
            href="/dashboard/promocoes"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Gift className="w-4 h-4 text-slate-400" />
            <span>Promoções</span>
          </Link>

          <Link
            href="/dashboard/indicacoes"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Award className="w-4 h-4 text-slate-400" />
            <span>Indicações</span>
          </Link>

          <Link
            href="/dashboard/perfil"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <UserCircle className="w-4 h-4 text-slate-400" />
            <span>Meu Perfil</span>
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Suporte WhatsApp</span>
          </a>

          {user.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 dark:bg-red-500/10"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Painel Admin</span>
            </Link>
          )}

          <div className="border-t border-slate-100 dark:border-white/5 pt-2">
            <form action={logout}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
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
