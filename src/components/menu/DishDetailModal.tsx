import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, Sparkles, Clock, Scale, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../../types';
import { DishVisual } from './DishVisual';
import { formatPrice } from '../../utils';
import { useCart } from '../../context/CartContext';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose }) => {
  const { getDishQuantity, setDishQuantity, addItem } = useCart();
  const [localQty, setLocalQty] = useState(1);

  useEffect(() => {
    if (dish) {
      const existing = getDishQuantity(dish.id);
      setLocalQty(existing > 0 ? existing : 1);
    }
  }, [dish, getDishQuantity]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const currentInCart = getDishQuantity(dish.id);
  const calculatedTotal = dish.price * localQty;

  const handleAction = () => {
    if (currentInCart > 0) {
      setDishQuantity(dish.id, localQty);
    } else {
      addItem(dish, localQty);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Box */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-floating overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          title="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-100 overflow-hidden">
          <DishVisual
            id={dish.id}
            category={dish.category}
            name={dish.name}
            imageUrl={dish.imageUrl}
            className="w-full h-full object-cover"
          />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {dish.badge === 'popular' && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Хит продаж
              </span>
            )}
            {dish.badge === 'new' && (
              <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Новинка меню
              </span>
            )}
            {dish.badge === 'spicy' && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                <Flame className="w-3.5 h-3.5" />
                Острое блюдо
              </span>
            )}
          </div>
        </div>

        {/* Body Details */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
                {dish.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500 font-medium">
                {dish.weight && (
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-stone-400" />
                    {dish.weight}
                  </span>
                )}
                {dish.cookingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    Время: ~{dish.cookingTime}
                  </span>
                )}
              </div>
            </div>

            <span className="text-xl sm:text-2xl font-black text-stone-900 whitespace-nowrap">
              {formatPrice(dish.price)}
            </span>
          </div>

          <div className="border-t border-stone-100 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              Описание блюда
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              {dish.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between gap-3">
          {/* Stepper */}
          <div className="flex items-center bg-white rounded-2xl border border-stone-200 p-1 shadow-sm">
            <button
              onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
              disabled={localQty <= 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 active:scale-95 transition-all"
              title="Уменьшить"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-10 text-center font-bold text-base text-stone-900">
              {localQty}
            </span>

            <button
              onClick={() => setLocalQty((q) => q + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
              title="Увеличить"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add / Update Button */}
          <button
            onClick={handleAction}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-stone-950 font-bold text-sm sm:text-base shadow-soft flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>
              {currentInCart > 0 ? 'Обновить в корзине' : 'Добавить в корзину'}
            </span>
            <span className="font-extrabold ml-1">
              • {formatPrice(calculatedTotal)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
