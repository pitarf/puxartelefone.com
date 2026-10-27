'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Database } from 'lucide-react';

interface BrandLogoProps {
  logoUrl?: string | null;
  faviconUrl?: string | null;
  className?: string;
  href?: string;
}

/**
 * Componente dinâmico de Logo/Ícone da marca.
 * Utiliza o faviconUrl ou logoUrl configurado pelo administrador no painel,
 * com fallback automático para o ícone padrão com gradiente caso não configurado.
 */
export function BrandLogo({ logoUrl, faviconUrl, className = '', href = '/' }: BrandLogoProps) {
  const iconSrc = faviconUrl || logoUrl;
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={href} className={`flex items-center gap-2.5 group ${className}`}>
      {iconSrc && !imageError ? (
        <img
          src={iconSrc}
          alt="Ícone do Sistema"
          className="w-8 h-8 rounded-xl object-contain shadow-xs transition-transform group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0061D9] to-[#00B7C2] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
          <Database className="w-4 h-4" />
        </div>
      )}
      <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        puxar<span className="text-[#0061D9]">telefone</span>
      </span>
    </Link>
  );
}
