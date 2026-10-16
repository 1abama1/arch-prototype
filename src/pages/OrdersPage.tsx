import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Clock,
  ArrowLeft,
  Trash2,
  AlertCircle,
  ChefHat,
  CheckCircle,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import { formatPrice, formatDateTime } from '../utils';

interface OrdersPageProps {
  onBackToMenu: () => void;
  onOpenTable: (tableId: number) => void;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  new: {
    label: 'Новый',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  preparing: {
    label: 'Готовится',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    icon: <ChefHat className="w-3.5 h-3.5" />,
  },
  ready: {
    label: 'Готов к выдаче',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  completed: {
    label: 'Завершён',
    bg: 'bg-stone-100 border-stone-200',
    text: 'text-stone-600',
    icon: <PackageCheck className="w-3.5 h-3.5" />,
  },
};

const ALL_STATUSES: OrderStatus[] = ['new', 'preparing', 'ready', 'completed'];

export const OrdersPage: React.FC<OrdersPageProps> = ({ onBackToMenu, onOpenTable }) => {
  const [orders, setOrders] = useState<Order[]>(() => orderService.getOrders());

  useEffect(() => {
    // Subscribe to orderService changes
    const unsubscribe = orderService.subscribe(() => {
      setOrders(orderService.getOrders());
    });
    return unsubscribe;
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await orderService.updateOrderStatus(orderId, newStatus);
  };

  const handleDelete = async (orderId: string) => {
    if (window.confirm('Удалить этот заказ из демонстрационного списка?')) {
      await orderService.deleteOrder(orderId);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Очистить всю историю демонстрационных заказов?')) {
      await orderService.clearAllOrders();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к меню</span>
        </button>

        {orders.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1.5"
            title="Очистить историю заказов"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить все</span>
          </button>
        )}
      </div>

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Демонстрационный кухонный журнал</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Локальные заказы браузера
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
          Здесь отображаются заказы, оформленные в текущем браузере. Вы можете протестировать полный сценарий POS-системы: оформить заказ с любого столика и вручную переключить его статус.
        </p>

        {/* Disclaimer Callout */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Важное техническое пояснение:</strong> Хранилище{' '}
            <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">localStorage</code>{' '}
            работает изолированно в каждом отдельном браузере. Чтобы заказы со смартфонов гостей появлялись на мониторе повара в реальном времени, подключается серверная часть (WebSocket / REST API на Spring Boot, Django или Node.js).
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-soft space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">Заказов пока нет</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Откройте любой из 6 столиков, добавьте блюда в корзину и нажмите «Оформить заказ».
            </p>
          </div>
          <button
            onClick={onBackToMenu}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-soft transition-all"
          >
            Сделать первый демонстрационный заказ
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusMeta = STATUS_CONFIG[order.status];
            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-soft space-y-4 transition-all"
              >
                {/* Order Top Bar: ID, Table, Timestamp, Delete */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-sm sm:text-base text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <button
                      onClick={() => onOpenTable(order.tableId)}
                      className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                      title="Перейти к столику"
                    >
                      Столик №{order.tableId}
                    </button>
                    <span className="text-xs text-stone-400 hidden sm:inline">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusMeta.bg} ${statusMeta.text}`}
                    >
                      {statusMeta.icon}
                      <span>{statusMeta.label}</span>
                    </span>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-stone-300 hover:text-red-500 p-1.5 transition-colors"
                      title="Удалить заказ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-700 min-w-[20px]">
                          {item.quantity}×
                        </span>
                        <span className="font-medium text-stone-800">
                          {item.dishName}
                        </span>
                      </div>
                      <span className="font-bold text-stone-900 whitespace-nowrap ml-2">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Comment if any */}
                {order.comment && (
                  <div className="text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 text-stone-600">
                    <strong className="text-stone-800">Комментарий гостя:</strong>{' '}
                    {order.comment}
                  </div>
                )}

                {/* Total & Interactive Status Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <div className="text-xs sm:text-sm">
                    <span className="text-stone-500">Итоговая сумма: </span>
                    <strong className="text-base sm:text-lg font-black text-stone-900 ml-1">
                      {formatPrice(order.totalAmount)}
                    </strong>
                  </div>

                  {/* Manual Status Buttons for Presentation */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-stone-400 mr-1">
                      Статус:
                    </span>
                    {ALL_STATUSES.map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(order.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          order.status === st
                            ? 'bg-stone-900 text-white shadow-sm'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                        }`}
                      >
                        {STATUS_CONFIG[st].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
