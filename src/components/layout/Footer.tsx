import React from 'react';
import { Utensils, ClipboardList, MapPin, Sparkles } from 'lucide-react';
import { TABLES } from '../../data/tables';

interface FooterProps {
  onNavigateView: (view: 'qr' | 'orders' | 'table-select') => void;
  onSelectTable: (tableId: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView, onSelectTable }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-16 border-t border-stone-800 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  ALTYN Gastro Bistro
                </span>
                <p className="text-xs text-stone-400">QR Ordering &amp; Digital Menu</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Интерактивный прототип ресторанной системы самообслуживания. 6 независимых столов с индивидуальными QR-кодами, уникальными изображениями и изолированными корзинами.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>г. Бишкек, ул. Токтогула, 125 • Все цены в сомах (сом)</span>
            </div>
          </div>

          {/* Quick Demo Tables */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Быстрый переход к 6 столикам
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {TABLES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTable(t.id)}
                  className="text-left py-1 text-stone-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  <span className="truncate">{t.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Инструменты демонстрации
            </h4>
            <div className="space-y-1.5 text-xs">
              {/* Генератор 6 QR-кодов (закомментирован по запросу)
              <button
                onClick={() => onNavigateView('qr')}
                className="w-full text-left py-1 text-stone-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Генератор 6 QR-кодов</span>
              </button>
              */}

              <button
                onClick={() => onNavigateView('orders')}
                className="w-full text-left py-1 text-stone-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <ClipboardList className="w-3.5 h-3.5 text-amber-500" />
                <span>Журнал демо-заказов</span>
              </button>

              <button
                onClick={() => onNavigateView('table-select')}
                className="w-full text-left py-1 text-stone-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Экран выбора столика</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-stone-800 text-center sm:flex sm:justify-between sm:text-left text-xs text-stone-500">
          <p>© 2026 ALTYN Gastro Bistro. Прототип QR Ordering System.</p>
          <p className="mt-2 sm:mt-0">React 18 • TypeScript • Tailwind CSS • Vite</p>
        </div>
      </div>
    </footer>
  );
};
