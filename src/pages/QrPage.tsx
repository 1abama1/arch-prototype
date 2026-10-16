import React, { useState } from 'react';
import { Printer, QrCode, Smartphone, Globe, RefreshCw, ArrowLeft } from 'lucide-react';
import { TABLES } from '../data/tables';
import { QrCard } from '../components/qr/QrCard';
import { getBaseUrl, getTableUrl } from '../utils';

interface QrPageProps {
  onOpenTable: (tableId: number) => void;
  onBackToMenu: () => void;
}

export const QrPage: React.FC<QrPageProps> = ({ onOpenTable, onBackToMenu }) => {
  const [customBaseUrl, setCustomBaseUrl] = useState(() => getBaseUrl());

  const handlePrint = () => {
    window.print();
  };

  const handleResetOrigin = () => {
    setCustomBaseUrl(window.location.origin);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в меню ресторана</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-soft transition-all active:scale-95"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Распечатать все 6 QR-кодов</span>
        </button>
      </div>

      {/* Hero Presentation Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-4 print:border-none print:shadow-none print:p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              <span>Презентационная панель QR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              6 демонстрационных QR-кодов столиков
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Каждый QR-код содержит уникальный адрес <code className="bg-stone-100 text-amber-700 px-1 py-0.5 rounded font-mono">?table=N</code>. При наведении стандартной камеры смартфона открывается сайт ресторана с соответствующим уникальным изображением столика.
            </p>
          </div>

          {/* Smartphone Scan Hint Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 max-w-xs space-y-2 flex-shrink-0 print:hidden">
            <div className="flex items-center gap-2 font-bold text-xs text-stone-800">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Тестирование с телефона</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Если запускаете на ноутбуке в локальной сети Wi-Fi, укажите ниже локальный IP ноутбука (например, <span className="font-mono text-stone-700">http://192.168.1.50:5173</span>).
            </p>
          </div>
        </div>

        {/* Dynamic Base URL Configuration Input */}
        <div className="pt-3 border-t border-stone-100 print:hidden">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>Базовый адрес для генерации QR-кодов:</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customBaseUrl}
              onChange={(e) => setCustomBaseUrl(e.target.value)}
              placeholder="https://your-public-site.vercel.app или http://192.168.x.x:5173"
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <button
              onClick={handleResetOrigin}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              title="Сбросить на текущий origin"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Текущий Origin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Exactly 6 Table QR Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TABLES.map((table) => {
          const tableUrl = getTableUrl(table.id, customBaseUrl);
          return (
            <QrCard
              key={table.id}
              table={table}
              fullUrl={tableUrl}
              onOpenTable={onOpenTable}
            />
          );
        })}
      </div>
    </div>
  );
};
