'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarClientProps {
  logoUrl?: string | null;
  siteTitle?: string | null;
  menuPages?: Array<{ title: string; slug: string }>;
}

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

      // Listener de scroll para transição suave da Navbar
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
              alt={siteTitle || "puxartelefone.com"} 
              className="h-8 w-auto object-contain" 
            />
          ) : (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] text-white transition-transform group-hover:scale-105">
              <Phone className="w-4.5 h-4.5" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight leading-tight text-[#172B3A] dark:text-white">
              puxar<span className="text-[#0061D9]">telefone</span><span className="text-[#00B7C2]">.com</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-[#667784] dark:text-slate-400">
              Consultas Cadastrais
            </span>
          </div>
        </Link>

        {/* Links de navegação desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link 
            href={getHref('#como-funciona')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Como Funciona
          </Link>
          <Link 
            href={getHref('#tipos-consulta')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Tipos de Consulta
          </Link>
          <Link 
            href={getHref('#beneficios')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Benefícios
          </Link>
          <Link 
            href={getHref('#outros-servicos')} 
            className="text-sm font-semibold text-[#667784] hover:text-[#0061D9] transition-colors"
          >
            Outros Serviços
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
            className="text-sm font-bold px-4 py-2 rounded-xl text-[#172B3A] hover:text-[#0061D9] transition-colors"
          >
            Entrar
          </Link>
          <Link 
            href="#consulta-hero" 
            className="text-sm font-bold px-4.5 py-2.5 rounded-xl shadow-sm bg-[#0061D9] hover:bg-[#0050b5] text-white flex items-center gap-1.5 transition-all active:scale-95 shadow-[#0061D9]/20"
          >
            <span>Consultar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <Link 
            href="#consulta-hero" 
            className="sm:hidden text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 bg-[#0061D9] text-white shadow-sm"
          >
            <Phone className="w-3 h-3" />
            <span>Consultar</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg focus:outline-none text-[#172B3A] hover:text-[#0061D9]"
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div 
        className={`lg:hidden border-b border-[#E2EAF0] shadow-xl overflow-hidden transition-all duration-300 ease-in-out bg-white text-[#172B3A] ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-5 pt-3 pb-6 space-y-3">
          <Link
            href={getHref('#como-funciona')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Como Funciona
          </Link>
          <Link
            href={getHref('#tipos-consulta')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Tipos de Consulta Telefônica
          </Link>
          <Link
            href={getHref('#beneficios')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Benefícios da Plataforma
          </Link>
          <Link
            href={getHref('#outros-servicos')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Outros Serviços (CPF, CNPJ, Veículos)
          </Link>
          <Link
            href={getHref('#faq')}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Perguntas Frequentes
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold text-[#172B3A] hover:text-[#0061D9]"
          >
            Blog
          </Link>

          <div className="pt-4 border-t border-[#E2EAF0] flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold rounded-xl border bg-[#F7FAFC] text-[#172B3A] border-[#E2EAF0] hover:bg-slate-100"
            >
              Entrar na Conta
            </Link>
            <Link
              href="/cadastro"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold rounded-xl shadow-md bg-[#0061D9] text-white hover:bg-[#0050b5]"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
