import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils';

export const FloatingCartBar: React.FC = () => {
  const { totalCount, totalAmount, openCart, isCartOpen } = useCart();

  if (totalCount === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-30 px-4 max-w-md mx-auto pointer-events-none md:hidden">
      <button
        onClick={openCart}
        className="pointer-events-auto w-full py-3.5 px-5 rounded-2xl bg-stone-900 text-white shadow-floating hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-between border border-stone-800/80"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900">
              {totalCount}
            </span>
          </div>

          <div className="text-left">
            <span className="block text-xs font-semibold text-stone-300">Корзина столика</span>
            <span className="block text-sm font-bold text-white">{formatPrice(totalAmount)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <span>Открыть</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
