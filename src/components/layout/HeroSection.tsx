import React from 'react';
import { ArrowDown, Users, Sparkles, MapPin } from 'lucide-react';
import { TableConfig } from '../../types';
import { TABLES } from '../../data/tables';

interface HeroSectionProps {
  tableConfig: TableConfig;
  onSelectTable: (tableId: number) => void;
  onScrollToMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  tableConfig,
  onSelectTable,
  onScrollToMenu,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-12">
      {/* Background ambient glow matching table accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 blur-3xl opacity-20 pointer-events-none -z-10 transition-colors duration-500"
        style={{ backgroundColor: tableConfig.accentColor }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Welcome & Info */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left order-2 lg:order-1">
            {/* Table Identification Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm"
                style={{
                  backgroundColor: tableConfig.accentColor,
                  color: '#FFFFFF',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {tableConfig.shortName}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-stone-700 border border-stone-200 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {tableConfig.zone}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-stone-600 border border-stone-200 shadow-sm">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                До {tableConfig.capacity} гостей
              </span>
            </div>

            {/* Dynamic Welcome Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {tableConfig.welcomeTitle}
            </h1>

            {/* Dynamic Table & Restaurant Description */}
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {tableConfig.welcomeDescription}
            </p>

            {/* CTA Button & Quick Table Switcher Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-stone-900 shadow-soft-lg flex items-center justify-center gap-2 group transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: '#F59E0B',
                }}
              >
                <span>Перейти к меню</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Quick Demo Switcher: Direct 6-Table Bar */}
            <div className="pt-2 border-t border-stone-200/80">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mr-1">
                  Демо столиков:
                </span>
                {TABLES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTable(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      t.id === tableConfig.id
                        ? 'text-white shadow-sm scale-105'
                        : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                    style={
                      t.id === tableConfig.id
                        ? { backgroundColor: t.accentColor }
                        : {}
                    }
                    title={t.name}
                  >
                    №{t.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Unique Large Table Image (SVG) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-2 sm:p-3 bg-white shadow-soft-xl border transition-all duration-300"
              style={{ borderColor: tableConfig.accentBorder }}
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={tableConfig.imageUrl}
                  alt={tableConfig.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
                
                {/* Floating Zone Overlay Tag */}
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tableConfig.accentColor }}
                  />
                  <span>{tableConfig.zone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
