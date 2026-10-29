'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

interface NavbarClientProps {
  logoUrl?: string | null;
  siteTitle?: string | null;
  menuPages?: Array<{ title: string; slug: string }>;
}

/**
 * Header & Navegação (Bloco 01)
 * Links padronizados:
 * - Consultar Telefone -> #consultar-telefone
 * - Como Funciona -> #como-funciona
 * - Tipos de Consulta -> #tipos-de-consulta
 * - Preços -> #precos
 * - Consultar DDD -> #consultar-ddd
 * - FAQ -> #faq
 * - Blog -> /blog
 * Botões à direita: Entrar (/login) e Criar Conta (/cadastro)
 */
export default function NavbarClient({ logoUrl, siteTitle, menuPages = [] }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const source = params.get('src') || params.get('utm_source');
      if (source) {
        document.cookie = `trafficSource=${encodeURIComponent(source)}; path=/; max-age=2592000; SameSite=Lax`;
      }
      const ref = params.get('ref');
      if (ref) {
        document.cookie = `referral=${encodeURIComponent(ref)}; path=/; max-age=2592000; SameSite=Lax`;
      }

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 40);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const getHref = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0B00CF]/95 backdrop-blur-md border-b border-[#E2EAF0] shadow-sm text-[#172B3A] dark:text-white'
          : 'bg-white/95 dark:bg-[#090E17]/95 backdrop-blur-md border-b border-[#E2EAF0]/60 text-[#172B3A] dark:text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo puxartelefone.com */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={siteTitle || "PuxarTelefone"} 
              className="h-8 w-auto object-contain" 
              onError={(e) => {
                // Fallback para logo local se a URL do banco falhar
                (e.target as HTMLImageElement).src = '/logo.webp';
              }}
            />
          ) : (
            <img 
              src="/logo.webp" 
              alt="PuxarTelefone" 
              className="h-8 w-auto object-contain" 
            />
          )}
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight leading-tight text-[#172B3A] dark:text-white">
              puxar<span className="text-[#0061D9]">telefone</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-[#667784] dark:text-slate-400">
              Consultas Cadastrais
            </span>
          </div>
        </Link>

        {/* Links de navegação desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href={getHref('#consultar-telefone')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Consultar Telefone
          </Link>
          <Link 
            href={getHref('#como-funciona')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Como Funciona
          </Link>
          <Link 
            href={getHref('#tipos-de-consulta')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Tipos de Consulta
          </Link>
          <Link 
            href={getHref('#precos')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Preços
          </Link>
          <Link 
            href={getHref('#consultar-ddd')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Consultar DDD
          </Link>
          <Link 
            href={getHref('#faq')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            FAQ
          </Link>
          <Link 
            href="/blog" 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Blog
          </Link>
          {menuPages.map((page) => (
            <Link 
              key={page.slug} 
              href={`/${page.slug}`} 
              className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
            >
              {page.title.split(' - ')[0]}
            </Link>
          ))}
        </nav>

        {/* Ações desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <Link 
            href="/login" 
            className="text-sm font-bold px-4 py-2 rounded-xl text-[#172B3A] dark:text-white hover:text-[#0061D9] transition-colors"
          >
            Entrar
          </Link>
          <Link 
            href="/cadastro" 
            className="text-sm font-bold px-4.5 py-2.5 rounded-xl shadow-sm bg-[#0061D9] hover:bg-[#0050b5] text-white flex items-center gap-1.5 transition-all active:scale-95 shadow-[#0061D9]/20"
          >
            <span>Criar Conta</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <Link 
            href="#consultar-telefone" 
            className="sm:hidden text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 bg-[#0061D9] text-white shadow-sm"
          >
            <Phone className="w-3 h-3" />
            <span>Consultar</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg focus:outline-none text-[#172B3A] dark:text-white hover:text-[#0061D9]"
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile expansível */}
      <div 
        className={`lg:hidden border-b border-[#E2EAF0] shadow-xl overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-[#0F172A] text-[#172B3A] dark:text-white ${
          isOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-5 pt-3 pb-6 space-y-3">
          <Link
            href={getHref('#consultar-telefone')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Consultar Telefone
          </Link>
          <Link
            href={getHref('#como-funciona')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Como Funciona
          </Link>
          <Link
            href={getHref('#tipos-de-consulta')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Tipos de Consulta
          </Link>
          <Link
            href={getHref('#precos')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Preços
          </Link>
          <Link
            href={getHref('#consultar-ddd')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Consultar DDD
          </Link>
          <Link
            href={getHref('#faq')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Perguntas Frequentes (FAQ)
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] dark:text-white hover:text-[#0061D9]"
          >
            Blog
          </Link>

          <div className="pt-4 border-t border-[#E2EAF0] dark:border-white/10 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold rounded-xl border bg-[#F7FAFC] dark:bg-white/5 text-[#172B3A] dark:text-white border-[#E2EAF0] dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold rounded-xl shadow-md bg-[#0061D9] text-white hover:bg-[#0050b5]"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
