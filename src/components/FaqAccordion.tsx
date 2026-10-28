'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_LIST, FaqItem } from '@/lib/faqData';
export { FAQ_LIST };
export type { FaqItem };

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5 text-left">
      {FAQ_LIST.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white dark:bg-[#0F172A] border border-[#E2EAF0] dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-[#172B3A] dark:text-white hover:text-[#0061D9] dark:hover:text-[#00B7C2] transition-colors focus:outline-none cursor-pointer"
            >
              <span className="pr-4 text-sm md:text-base leading-snug">{faq.question}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isOpen ? 'bg-[#EFFBFC] text-[#0061D9]' : 'bg-[#F7FAFC] text-[#667784]'
              }`}>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#0061D9]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#667784]" />
                )}
              </div>
            </button>

            {/* Mantemos visível ou com renderização acessível para SEO */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'block border-t border-[#E2EAF0] dark:border-white/10' : 'hidden'
              }`}
            >
              <div className="px-6 py-4.5 text-[#667784] dark:text-slate-300 text-sm leading-relaxed bg-[#F7FAFC]/50 dark:bg-black/10">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
