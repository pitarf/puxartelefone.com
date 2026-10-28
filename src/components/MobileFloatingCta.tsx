'use client';

import { useState, useEffect } from 'react';
import { Search, Phone, ArrowUp } from 'lucide-react';

/**
 * Bloco 34 — Botão Flutuante no Mobile
 * - Surge somente no mobile (md:hidden) quando o formulário principal (#consultar-telefone)
 *   estiver fora da tela visível (via IntersectionObserver).
 * - Oculta suavemente caso o usuário se aproxime do formulário ou do rodapé.
 * - Ao clicar, rola suavemente até o input do formulário hero e foca no campo.
 * - Respeita áreas seguras e não sobrepõe menus ou rodapé.
 */
export default function MobileFloatingCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Monitora o formulário de consulta principal
    const heroBox = document.getElementById('consultar-telefone');
    const footer = document.querySelector('footer');

    if (!heroBox) return;

    let isHeroVisible = true;
    let isFooterVisible = false;

    const checkVisibility = () => {
      // Exibe apenas se o hero estiver fora da tela e o footer NÃO estiver na tela
      setIsVisible(!isHeroVisible && !isFooterVisible);
    };

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
          checkVisibility();
        });
      },
      { threshold: 0.1 }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible = entry.isIntersecting;
          checkVisibility();
        });
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroBox);
    if (footer) footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      if (footer) footerObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    const heroBox = document.getElementById('consultar-telefone');
    if (heroBox) {
      heroBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = heroBox.querySelector('input');
      if (input) {
        setTimeout(() => {
          input.focus();
        }, 500);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 z-40 md:hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      <button
        type="button"
        onClick={handleClick}
        className="w-full bg-[#0061D9] hover:bg-[#0050b5] text-white font-bold py-3.5 px-5 rounded-2xl shadow-xl shadow-[#0061D9]/40 border border-white/20 flex items-center justify-between transition-all active:scale-98 cursor-pointer"
        aria-label="Rolar para o formulário e consultar telefone"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight">Consultar telefone</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
          <span>Ir ao topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
}
