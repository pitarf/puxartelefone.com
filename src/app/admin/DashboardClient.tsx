'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Calendar } from 'lucide-react';

const PERIODS = [
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: '7 Dias' },
  { value: 'month', label: 'Mês Atual' },
  { value: 'year', label: 'Ano' },
  { value: 'all', label: 'Tudo' }
];

interface Props {
  currentPeriod: string;
  initialStart?: string;
  initialEnd?: string;
}

export default function DashboardClient({ currentPeriod, initialStart, initialEnd }: Props) {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(currentPeriod === 'custom');
  const [startDate, setStartDate] = useState(initialStart || '');
  const [endDate, setEndDate] = useState(initialEnd || '');

  const applyCustomFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      router.push(`/admin?period=custom&start=${startDate}&end=${endDate}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto min-w-0">
      {/* Filtros Rápidos com rolagem suave horizontal no mobile sem quebrar o layout */}
      <div className="flex items-center bg-black/20 dark:bg-black/35 p-1 rounded-2xl border border-white/10 shadow-inner gap-1 overflow-x-auto no-scrollbar w-full max-w-full">
        {PERIODS.map((p) => {
          const active = currentPeriod === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => {
                setShowDatePicker(false);
                router.push(`/admin?period=${p.value}`);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentPeriod === 'custom'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Filtrar Data
        </button>
      </div>

      {/* Inputs de Data (Colapsável) adaptados para caber com folga em telas de 360px */}
      {showDatePicker && (
        <form onSubmit={applyCustomFilter} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-800/90 dark:bg-card border border-white/10 rounded-2xl p-2.5 animate-in fade-in slide-in-from-top-1 duration-200 w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-1.5">
            <span className="text-[10px] font-bold text-white/60 shrink-0">De:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500 w-full sm:w-auto"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-1.5">
            <span className="text-[10px] font-bold text-white/60 shrink-0">Até:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500 w-full sm:w-auto"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-md transition-all active:scale-95 text-center mt-1 sm:mt-0"
          >
            Aplicar
          </button>
        </form>
      )}
    </div>
  );
}
