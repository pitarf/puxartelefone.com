'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TermoCienciaModal from '@/components/TermoCienciaModal';

interface TermsComplianceGuardProps {
  hasAcceptedTerms: boolean;
}

/**
 * Guardião Global de Compliance e LGPD para a Área Logada.
 * Intercepta qualquer rota interna do Dashboard e bloqueia a navegação até que
 * o usuário confirme formalmente o Termo de Ciência, Responsabilidade e Uso Legítimo.
 */
export function TermsComplianceGuard({ hasAcceptedTerms: initialAccepted }: TermsComplianceGuardProps) {
  const [hasAccepted, setHasAccepted] = useState(initialAccepted);
  const router = useRouter();

  if (hasAccepted) return null;

  return (
    <TermoCienciaModal
      isOpen={!hasAccepted}
      onAccepted={() => {
        setHasAccepted(true);
        router.refresh();
      }}
    />
  );
}
