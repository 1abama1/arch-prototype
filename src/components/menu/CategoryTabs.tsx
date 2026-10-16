import React from 'react';
import {
  Coffee,
  Salad,
  UtensilsCrossed,
  Pizza,
  Sandwich,
  GlassWater,
  Cake,
  Sparkles,
} from 'lucide-react';
import { CategoryId } from '../../types';
import { CATEGORIES } from '../../data/categories';

interface CategoryTabsProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'breakfast':
      return <Coffee className="w-4 h-4" />;
    case 'salads':
      return <Salad className="w-4 h-4" />;
    case 'mains':
      return <UtensilsCrossed className="w-4 h-4" />;
    case 'pizza':
      return <Pizza className="w-4 h-4" />;
    case 'burgers':
      return <Sandwich className="w-4 h-4" />;
    case 'drinks':
      return <GlassWater className="w-4 h-4" />;
    case 'desserts':
      return <Cake className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {/* All Items Pill */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white shadow-soft'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Все блюда</span>
        </button>

        {/* Categories */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-soft'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              <span className={isSelected ? 'text-amber-400' : 'text-stone-500'}>
                {getCategoryIcon(cat.id)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
