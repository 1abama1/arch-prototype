import React, { useState, useMemo, useRef } from 'react';
import { TableConfig, CategoryId, MenuItem } from '../types';
import { HeroSection } from '../components/layout/HeroSection';
import { SearchBar } from '../components/menu/SearchBar';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { DishCard } from '../components/menu/DishCard';
import { DishDetailModal } from '../components/menu/DishDetailModal';
import { MENU_ITEMS } from '../data/menu';
import { UtensilsCrossed } from 'lucide-react';

interface MenuPageProps {
  tableConfig: TableConfig;
  onSelectTable: (tableId: number) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ tableConfig, onSelectTable }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleScrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter items by category and search text
  const filteredDishes = useMemo(() => {
    let result = MENU_ITEMS;

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-10 pb-20">
      {/* Hero Section with unique table image */}
      <HeroSection
        tableConfig={tableConfig}
        onSelectTable={onSelectTable}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Menu Section Target */}
      <div
        ref={menuRef}
        id="menu-section"
        className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 pt-2"
      >
        {/* Search & Category Filter Controls */}
        <div className="space-y-3 bg-white/60 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight self-start sm:self-center">
              Меню ресторана
            </h2>
            <div className="w-full sm:max-w-xs">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Dishes Counter info */}
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 px-1">
          <span>
            {filteredDishes.length}{' '}
            {filteredDishes.length === 1
              ? 'блюдо найдено'
              : filteredDishes.length < 5
              ? 'блюда найдено'
              : 'блюд найдено'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-700 hover:underline"
            >
              Сбросить поиск
            </button>
          )}
        </div>

        {/* Dish Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              По вашему запросу ничего не найдено
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Попробуйте изменить формулировку поиска или выбрать другую категорию меню.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold transition-all"
            >
              Показать все блюда
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenDetails={(selected) => setActiveDish(selected)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={activeDish}
        onClose={() => setActiveDish(null)}
      />
    </div>
  );
};
