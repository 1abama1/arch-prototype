import React from 'react';
import { AlertTriangle, ArrowRight, Sparkles, Users, MapPin } from 'lucide-react';
import { TABLES } from '../data/tables';

interface TableSelectPageProps {
  isInvalidTable?: boolean;
  onSelectTable: (tableId: number) => void;
  onOpenQrGenerator?: () => void;
}

export const TableSelectPage: React.FC<TableSelectPageProps> = ({
  isInvalidTable,
  onSelectTable,
  onOpenQrGenerator: _onOpenQrGenerator,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Invalid Table Alert Banner */}
      {isInvalidTable && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-start gap-3 shadow-soft">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Номер столика не найден или указан некорректно</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              В демонстрационной системе настроено ровно 6 столиков (от №1 до №6). Пожалуйста, выберите нужный столик ниже или перейдите в генератор QR-кодов.
            </p>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-amber-400 text-xs font-bold shadow-soft">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Добро пожаловать в ALTYN Bistro</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
          Выберите столик для просмотра меню
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          В обычном сценарии гость сканирует QR-код на своем столе и сразу попадает в меню. Для демонстрации выберите любой из 6 доступных залов и столиков:
        </p>
      </div>

      {/* Grid of 6 Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TABLES.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTable(t.id)}
            className="group bg-white rounded-3xl p-5 border border-stone-200/90 shadow-soft hover:shadow-soft-lg hover:border-amber-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image Thumbnail */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-stone-100">
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  <span>Столик №{t.id}</span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-extrabold text-stone-900 text-base group-hover:text-amber-800 transition-colors">
                {t.name}
              </h3>

              <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  {t.zone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-stone-400" />
                  {t.capacity} места
                </span>
              </div>

              <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 leading-relaxed">
                {t.welcomeDescription}
              </p>
            </div>

            {/* Action button */}
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                style={{
                  backgroundColor: t.accentLight,
                  color: t.accentColor,
                  border: `1px solid ${t.accentBorder}`,
                }}
              >
                <span>Сесть за этот столик</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alternative Callout: QR Generator (закомментирован по запросу)
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-floating">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold">
            <span>Презентационный режим</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold">
            Хотите распечатать или протестировать настоящие QR-коды?
          </h3>
          <p className="text-xs text-stone-400 max-w-xl">
            Откройте генератор 6 QR-кодов, чтобы скачать их в формате PNG, распечатать или отсканировать камерой вашего смартфона.
          </p>
        </div>

        <button
          onClick={_onOpenQrGenerator}
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow-soft transition-all active:scale-95"
        >
          Открыть генератор QR
        </button>
      </div>
      */}
    </div>
  );
};
