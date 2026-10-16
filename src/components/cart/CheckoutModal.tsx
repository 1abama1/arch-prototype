import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { TableConfig } from '../../types';
import { orderService } from '../../services/orderService';
import { formatPrice } from '../../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableConfig: TableConfig;
  onViewOrders: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  tableConfig,
  onViewOrders,
}) => {
  const { items, totalAmount, clearCart } = useCart();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmOrder = async () => {
    if (isSubmitting || items.length === 0) return;
    setIsSubmitting(true);

    try {
      const order = await orderService.createOrder({
        tableId: tableConfig.id,
        tableName: tableConfig.name,
        items: items.map((i) => ({
          dishId: i.dish.id,
          dishName: i.dish.name,
          price: i.dish.price,
          quantity: i.quantity,
          imageUrl: i.dish.imageUrl,
        })),
        totalAmount,
        comment,
      });

      // Clear the cart for this table
      clearCart();
      setConfirmedOrderId(order.id);

      // Trigger celebratory confetti burst!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#EF4444'],
        });
      } catch (confettiErr) {
        console.log('Confetti effect triggered:', confettiErr);
      }
    } catch (err) {
      console.error('Failed to create order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedOrderId(null);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Dialog Box */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-floating overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-extrabold text-stone-900 text-lg">
              {confirmedOrderId ? 'Заказ подтвержден' : 'Подтверждение заказа'}
            </h3>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5"
              style={{
                backgroundColor: tableConfig.accentLight,
                color: tableConfig.accentColor,
              }}
            >
              {tableConfig.shortName}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors"
            title="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {confirmedOrderId ? (
            /* --- SUCCESS VIEW --- */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-soft animate-bounce-once">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Успешно оформлен
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
                  Ваш заказ №{confirmedOrderId} принят в демонстрационном режиме!
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  Заказ зафиксирован для столика{' '}
                  <strong className="text-stone-800">{tableConfig.shortName}</strong>{' '}
                  в локальном хранилище браузера.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Демонстрационный прототип</span>
                </div>
                <p className="text-amber-800 leading-normal">
                  В реальной боевой версии данный заказ моментально отправляется на кухонный POS-терминал по WebSocket / REST API.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    handleClose();
                    onViewOrders();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <ClipboardList className="w-4 h-4 text-amber-400" />
                  <span>Смотреть в заказах</span>
                </button>

                <button
                  onClick={handleClose}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm transition-all"
                >
                  Вернуться в меню
                </button>
              </div>
            </div>
          ) : (
            /* --- REVIEW VIEW --- */
            <>
              {/* Order Items Review */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Позиции в чеке ({items.length})
                </h4>

                <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto pr-1">
                  {items.map(({ dish, quantity }) => (
                    <div key={dish.id} className="py-2 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-600 min-w-[20px]">
                          {quantity}x
                        </span>
                        <span className="font-medium text-stone-800">{dish.name}</span>
                      </div>
                      <span className="font-bold text-stone-900 whitespace-nowrap">
                        {formatPrice(dish.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Row */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-stone-500 font-medium">К оплате официанту</span>
                  <span className="text-lg font-black text-stone-900">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Готовность: ~15-20 мин</span>
                </div>
              </div>

              {/* Special Instructions / Comment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                  <span>Комментарий к заказу (необязательно)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: без лука, соус отдельно, аллергия на орехи..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none transition-all"
                />
              </div>

              {/* Confirm Order Button */}
              <div className="pt-2">
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 text-stone-950 font-bold text-sm sm:text-base shadow-soft flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Формирование заказа...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Подтвердить заказ • {formatPrice(totalAmount)}</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Заказ будет сохранен в локальную демонстрационную базу
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
