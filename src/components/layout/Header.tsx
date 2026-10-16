import React from 'react';
import { ShoppingBag, ClipboardList, Utensils, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { TableConfig } from '../../types';

interface HeaderProps {
  tableConfig?: TableConfig;
  onOpenCart: () => void;
  onNavigateView: (view: 'qr' | 'orders' | 'table-select') => void;
  onNavigateMenu: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  tableConfig,
  onOpenCart,
  onNavigateView,
  onNavigateMenu,
  currentView,
}) => {
  const { totalCount, totalAmount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand & Table Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateMenu}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            title="На главную"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-soft group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-900 tracking-tight text-base sm:text-lg">
                  ALTYN
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Bistro
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">QR Ordering System</p>
            </div>
          </button>

          {/* Table Pill */}
          {tableConfig && currentView === 'menu' && (
            <button
              onClick={() => onNavigateView('table-select')}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: tableConfig.accentLight,
                color: tableConfig.accentColor,
                border: `1px solid ${tableConfig.accentBorder}`,
              }}
              title="Сменить столик"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tableConfig.accentColor }} />
              <span>{tableConfig.shortName}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* QR Generator Nav Button (закомментирован по запросу)
          <button
            onClick={() => onNavigateView('qr')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              currentView === 'qr'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            title="6 QR-кодов столиков"
          >
            <span className="hidden md:inline">Генератор QR</span>
            <span className="md:hidden">QR</span>
          </button>
          */}

          {/* Orders Nav Button */}
          <button
            onClick={() => onNavigateView('orders')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              currentView === 'orders'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            title="Демо-панель заказов"
          >
            <ClipboardList className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">Заказы</span>
          </button>

          {/* Cart Trigger Button */}
          {tableConfig && (
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-900 font-bold text-xs sm:text-sm shadow-soft transition-all duration-150"
              title="Открыть корзину"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Корзина</span>
              {totalCount > 0 && (
                <span className="ml-0.5 sm:ml-1 bg-stone-950 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalCount}
                </span>
              )}
              {totalAmount > 0 && (
                <span className="hidden lg:inline text-xs font-semibold pl-1 border-l border-amber-600/40">
                  {totalAmount.toLocaleString('ru-RU')} сом
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
