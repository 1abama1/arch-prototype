import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DishVisual } from '../menu/DishVisual';
import { formatPrice } from '../../utils';
import { TableConfig } from '../../types';

interface CartDrawerProps {
  tableConfig?: TableConfig;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  tableConfig,
  onProceedToCheckout,
}) => {
  const {
    items,
    totalCount,
    totalAmount,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    closeCart,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-floating flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">Ваш заказ</h2>
                {tableConfig && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: tableConfig.accentLight,
                      color: tableConfig.accentColor,
                    }}
                  >
                    {tableConfig.shortName}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {totalCount > 0
                  ? `${totalCount} ${totalCount === 1 ? 'позиция' : totalCount < 5 ? 'позиции' : 'позиций'}`
                  : 'Корзина пока пуста'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {totalCount > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-red-600 transition-colors px-2 py-1"
                  title="Очистить корзину"
                >
                  Очистить
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
                title="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  Корзина пуста
                </h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Выберите блюда из меню, чтобы сформировать заказ для вашего столика.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition-all"
                >
                  Перейти к меню
                </button>
              </div>
            ) : (
              items.map(({ dish, quantity }) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/70"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                    <DishVisual
                      id={dish.id}
                      category={dish.category}
                      name={dish.name}
                      imageUrl={dish.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {dish.name}
                    </h4>
                    <p className="text-xs font-extrabold text-stone-700 mt-0.5">
                      {formatPrice(dish.price)}
                    </p>
                  </div>

                  {/* Stepper & Remove */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white rounded-xl border border-stone-200 p-0.5 shadow-sm">
                      <button
                        onClick={() => updateQuantity(dish.id, -1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                        title="Уменьшить"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-6 text-center text-xs font-bold text-stone-900">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(dish.id, 1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                        title="Увеличить"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(dish.id)}
                      className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200/80 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Позиций в заказе</span>
                  <span className="font-semibold text-stone-900">{totalCount} шт.</span>
                </div>
                <div className="flex justify-between">
                  <span>Обслуживание столика</span>
                  <span className="font-semibold text-emerald-600">0 сом (Демо)</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Итого к оплате</span>
                  <span className="text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-stone-950 font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
