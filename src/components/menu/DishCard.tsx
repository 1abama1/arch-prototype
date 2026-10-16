import React from 'react';
import { Plus, Minus, Flame, Sparkles, Clock } from 'lucide-react';
import { MenuItem } from '../../types';
import { DishVisual } from './DishVisual';
import { formatPrice } from '../../utils';
import { useCart } from '../../context/CartContext';

interface DishCardProps {
  dish: MenuItem;
  onOpenDetails: (dish: MenuItem) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onOpenDetails }) => {
  const { getDishQuantity, addItem, updateQuantity } = useCart();
  const quantity = getDishQuantity(dish.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(dish.id, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(dish.id, -1);
  };

  return (
    <div
      onClick={() => onOpenDetails(dish)}
      className="group relative bg-white rounded-3xl border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer active:scale-[0.99]"
    >
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <DishVisual
          id={dish.id}
          category={dish.category}
          name={dish.name}
          imageUrl={dish.imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Dish Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {dish.badge === 'popular' && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              <Sparkles className="w-3 h-3" />
              Хит
            </span>
          )}
          {dish.badge === 'new' && (
            <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              Новинка
            </span>
          )}
          {dish.badge === 'spicy' && (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <Flame className="w-3 h-3" />
              Острое
            </span>
          )}
        </div>

        {/* Cooking Time Overlay Pill */}
        {dish.cookingTime && (
          <div className="absolute bottom-2.5 right-2.5 bg-stone-900/75 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-stone-300" />
            <span>{dish.cookingTime}</span>
          </div>
        )}
      </div>

      {/* Content & Actions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Weight */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-amber-800 transition-colors">
              {dish.name}
            </h3>
            {dish.weight && (
              <span className="text-[11px] font-medium text-stone-400 whitespace-nowrap pt-0.5">
                {dish.weight}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
            {dish.description}
          </p>
        </div>

        {/* Price & Add to Cart Controls */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
          <span className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
            {formatPrice(dish.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Добавить в корзину"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>В заказ</span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-stone-900 text-white rounded-xl p-1 shadow-sm"
            >
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 active:scale-90 flex items-center justify-center text-stone-200 transition-all"
                title="Уменьшить"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-xs font-bold min-w-[20px] text-center text-amber-400">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 active:scale-90 flex items-center justify-center transition-all"
                title="Увеличить"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
