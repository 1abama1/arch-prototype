import React, { useState } from 'react';
import { CategoryId } from '../../types';

interface DishVisualProps {
  id: string;
  category: CategoryId;
  name: string;
  imageUrl?: string;
  className?: string;
}

export const DishVisual: React.FC<DishVisualProps> = ({
  category,
  name,
  imageUrl,
  className = 'w-full h-full',
}) => {
  const [imageError, setImageError] = useState(false);

  // If a valid external or public image is supplied and hasn't errored, try rendering it
  if (imageUrl && !imageError) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`object-cover ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Vector culinary illustration based on category and dish ID
  return (
    <div className={`relative flex items-center justify-center overflow-hidden select-none ${className}`}>
      {renderCategoryIllustration(category, name)}
    </div>
  );
};

const renderCategoryIllustration = (category: CategoryId, name: string) => {
  switch (category) {
    case 'breakfast':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="bfBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FEF3C7" />
              <stop offset="100%" stop-color="#FDE68A" />
            </linearGradient>
            <filter id="bfShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#78350F" flood-opacity="0.12" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#bfBg)" />
          {/* Ceramic Plate */}
          <circle cx="100" cy="100" r="75" fill="#FFFFFF" filter="url(#bfShadow)" />
          <circle cx="100" cy="100" r="66" fill="#FFFDF8" stroke="#F3F4F6" stroke-width="2" />
          
          {name.includes('Сырники') ? (
            <g transform="translate(45, 50)">
              {/* Golden Syrniki Cakes */}
              <circle cx="45" cy="35" r="24" fill="#F59E0B" />
              <circle cx="45" cy="35" r="20" fill="#FDE68A" />
              <circle cx="70" cy="55" r="24" fill="#F59E0B" />
              <circle cx="70" cy="55" r="20" fill="#FDE68A" />
              {/* Sour cream dollop */}
              <circle cx="45" cy="35" r="8" fill="#FFFFFF" />
              <circle cx="70" cy="55" r="8" fill="#FFFFFF" />
              {/* Berries */}
              <circle cx="32" cy="65" r="7" fill="#E11D48" />
              <circle cx="24" cy="56" r="6" fill="#3B82F6" />
              <circle cx="85" cy="35" r="7" fill="#E11D48" />
              {/* Mint */}
              <ellipse cx="60" cy="38" rx="6" ry="3" fill="#10B981" />
            </g>
          ) : (
            <g transform="translate(45, 45)">
              {/* Toasted Brioche / Bread */}
              <rect x="20" y="20" width="70" height="70" rx="16" fill="#D97706" />
              <rect x="23" y="23" width="64" height="64" rx="14" fill="#FBBF24" />
              {/* Salmon / Avocado layer */}
              <path d="M 28 40 Q 55 25 82 40 Q 55 55 28 40 Z" fill="#FB7185" />
              <path d="M 30 65 Q 55 50 80 65 Q 55 80 30 65 Z" fill="#84CC16" />
              {/* Poached Egg */}
              <ellipse cx="55" cy="55" rx="26" ry="22" fill="#FFFFFF" filter="url(#bfShadow)" />
              {/* Runny Yolk */}
              <circle cx="55" cy="55" r="14" fill="#F59E0B" />
              <circle cx="58" cy="52" r="4" fill="#FEF08A" />
              {/* Microgreens */}
              <circle cx="44" cy="48" r="2" fill="#059669" />
              <circle cx="68" cy="58" r="2" fill="#059669" />
              <circle cx="55" cy="66" r="2" fill="#059669" />
            </g>
          )}
        </svg>
      );

    case 'salads':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="saladBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ECFDF5" />
              <stop offset="100%" stop-color="#D1FAE5" />
            </linearGradient>
            <filter id="saladShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#065F46" flood-opacity="0.12" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#saladBg)" />
          {/* Ceramic Salad Bowl */}
          <circle cx="100" cy="100" r="74" fill="#FFFFFF" filter="url(#saladShadow)" />
          <circle cx="100" cy="100" r="66" fill="#F8FAFC" />
          {/* Fresh Crispy Greens */}
          <path d="M 60 85 C 45 70 70 45 95 65 C 115 45 145 65 135 90 C 155 110 135 145 105 135 C 75 155 45 125 60 85 Z" fill="#10B981" />
          <path d="M 75 95 C 65 80 85 65 105 78 C 120 65 140 80 130 100 C 145 115 125 135 105 125 C 85 140 65 115 75 95 Z" fill="#34D399" />
          
          {/* Cherry Tomatoes */}
          <circle cx="75" cy="80" r="10" fill="#EF4444" />
          <circle cx="73" cy="78" r="3" fill="#FCA5A5" />
          <circle cx="125" cy="90" r="11" fill="#EF4444" />
          <circle cx="123" cy="88" r="3" fill="#FCA5A5" />
          <circle cx="95" cy="120" r="9" fill="#EF4444" />
          {/* Avocado Slices */}
          <path d="M 85 65 Q 105 70 95 90 Q 75 85 85 65 Z" fill="#84CC16" stroke="#4D7C0F" stroke-width="1.5" />
          <path d="M 105 100 Q 125 105 115 125 Q 95 120 105 100 Z" fill="#84CC16" stroke="#4D7C0F" stroke-width="1.5" />
          {/* Burrata or Croutons */}
          {name.includes('Буратта') ? (
            <ellipse cx="100" cy="95" rx="20" ry="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
          ) : (
            <g fill="#D97706">
              <rect x="70" y="105" width="10" height="10" rx="2" />
              <rect x="110" y="70" width="11" height="11" rx="2" />
              <rect x="90" y="85" width="9" height="9" rx="2" />
            </g>
          )}
        </svg>
      );

    case 'mains':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF7ED" />
              <stop offset="100%" stop-color="#FFEDD5" />
            </linearGradient>
            <filter id="mainShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#7C2D12" flood-opacity="0.14" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#mainBg)" />
          {/* Gourmet Dark Slate / Porcelain Plate */}
          <circle cx="100" cy="100" r="75" fill="#1C1917" filter="url(#mainShadow)" />
          <circle cx="100" cy="100" r="67" fill="#292524" />
          <circle cx="100" cy="100" r="60" stroke="#44403C" stroke-width="1" fill="none" />

          {name.includes('Лосось') ? (
            <g transform="translate(50, 60)">
              {/* Salmon Steak */}
              <polygon points="15,40 50,15 85,35 55,65" fill="#F43F5E" />
              <polygon points="20,40 50,18 80,35 55,60" fill="#FB7185" />
              {/* Grill marks */}
              <line x1="30" y1="28" x2="65" y2="52" stroke="#BE123C" stroke-width="3" stroke-linecap="round" />
              <line x1="45" y1="22" x2="75" y2="44" stroke="#BE123C" stroke-width="3" stroke-linecap="round" />
              {/* Asparagus Spears */}
              <line x1="10" y1="65" x2="60" y2="15" stroke="#10B981" stroke-width="4" stroke-linecap="round" />
              <line x1="15" y1="72" x2="65" y2="22" stroke="#059669" stroke-width="4" stroke-linecap="round" />
              {/* Lemon Wedge */}
              <path d="M 75 55 C 90 65 85 85 65 75 Z" fill="#FACC15" />
            </g>
          ) : (
            <g transform="translate(50, 55)">
              {/* Juicy Tenderloin / Mignon */}
              <ellipse cx="50" cy="45" rx="36" ry="28" fill="#7C2D12" />
              <ellipse cx="50" cy="43" rx="32" ry="24" fill="#9A3412" />
              {/* Diamond Grill Marks */}
              <line x1="30" y1="35" x2="70" y2="55" stroke="#431407" stroke-width="3" stroke-linecap="round" />
              <line x1="25" y1="48" x2="65" y2="30" stroke="#431407" stroke-width="3" stroke-linecap="round" />
              {/* Rosemary Sprig */}
              <path d="M 60 25 Q 75 35 85 20" stroke="#10B981" stroke-width="2.5" fill="none" />
              <line x1="68" y1="28" x2="70" y2="22" stroke="#10B981" stroke-width="2" />
              <line x1="75" y1="31" x2="80" y2="27" stroke="#10B981" stroke-width="2" />
              {/* Pepper Flakes & Demi-Glace Drizzle */}
              <path d="M 20 60 Q 50 75 80 55" stroke="#D97706" stroke-width="4" fill="none" opacity="0.8" stroke-linecap="round" />
              <circle cx="35" cy="32" r="1.5" fill="#FEF08A" />
              <circle cx="62" cy="50" r="1.5" fill="#FEF08A" />
            </g>
          )}
        </svg>
      );

    case 'pizza':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="pizBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FEF2F2" />
              <stop offset="100%" stop-color="#FEE2E2" />
            </linearGradient>
            <filter id="pizShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#991B1B" flood-opacity="0.15" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#pizBg)" />
          {/* Pizza Round Pie with Rustic Char */}
          <circle cx="100" cy="100" r="74" fill="#D97706" filter="url(#pizShadow)" />
          {/* Crust */}
          <circle cx="100" cy="100" r="67" fill="#F59E0B" />
          {/* Tomato Sauce */}
          <circle cx="100" cy="100" r="60" fill="#DC2626" />
          {/* Melted Mozzarella Cheese Layer */}
          <path d="M 60 70 Q 100 50 140 70 Q 155 100 135 135 Q 100 155 65 135 Q 45 100 60 70 Z" fill="#FEF08A" />
          
          {/* Pepperoni / Toppings */}
          <circle cx="80" cy="80" r="11" fill="#B91C1C" />
          <circle cx="120" cy="80" r="11" fill="#B91C1C" />
          <circle cx="100" cy="115" r="11" fill="#B91C1C" />
          <circle cx="70" cy="115" r="10" fill="#B91C1C" />
          <circle cx="130" cy="115" r="10" fill="#B91C1C" />

          {/* Fresh Basil Leaves */}
          <path d="M 95 75 Q 105 65 110 75 Q 100 85 95 75 Z" fill="#15803D" />
          <path d="M 85 100 Q 95 90 100 100 Q 90 110 85 100 Z" fill="#15803D" />
          <path d="M 115 95 Q 125 85 130 95 Q 120 105 115 95 Z" fill="#15803D" />

          {/* Pizza Slice Cut Lines */}
          <line x1="100" y1="33" x2="100" y2="167" stroke="#92400E" stroke-width="1.5" opacity="0.3" stroke-dasharray="3 3" />
          <line x1="33" y1="100" x2="167" y2="100" stroke="#92400E" stroke-width="1.5" opacity="0.3" stroke-dasharray="3 3" />
        </svg>
      );

    case 'burgers':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="burgerBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFBEB" />
              <stop offset="100%" stop-color="#FEF3C7" />
            </linearGradient>
            <filter id="burgShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#78350F" flood-opacity="0.16" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#burgerBg)" />
          <g transform="translate(40, 40)" filter="url(#burgShadow)">
            {/* Bottom Bun */}
            <path d="M 15 95 Q 60 115 105 95 L 100 85 Q 60 90 20 85 Z" fill="#D97706" />
            {/* Grilled Patty */}
            <rect x="16" y="74" width="88" height="14" rx="7" fill="#451A03" />
            {/* Melted Cheddar Corners */}
            <polygon points="25,75 40,75 32,88" fill="#F59E0B" />
            <polygon points="55,75 72,75 63,90" fill="#F59E0B" />
            <polygon points="85,75 98,75 92,86" fill="#F59E0B" />
            {/* Crispy Ruffled Lettuce */}
            <path d="M 10 70 Q 25 78 40 70 Q 55 78 70 70 Q 85 78 100 70 Q 112 78 114 68 L 10 68 Z" fill="#10B981" />
            {/* Ripe Tomato Slices */}
            <rect x="20" y="58" width="38" height="10" rx="4" fill="#EF4444" />
            <rect x="62" y="58" width="38" height="10" rx="4" fill="#EF4444" />
            {/* Brioche Top Bun Dome */}
            <path d="M 15 56 C 15 20 105 20 105 56 Z" fill="#F59E0B" />
            {/* Sesame Seeds */}
            <ellipse cx="40" cy="35" rx="2" ry="1.2" fill="#FEF3C7" />
            <ellipse cx="60" cy="30" rx="2" ry="1.2" fill="#FEF3C7" />
            <ellipse cx="80" cy="36" rx="2" ry="1.2" fill="#FEF3C7" />
            <ellipse cx="50" cy="45" rx="2" ry="1.2" fill="#FEF3C7" />
            <ellipse cx="70" cy="44" rx="2" ry="1.2" fill="#FEF3C7" />
          </g>
        </svg>
      );

    case 'drinks':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="drinkBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#EFF6FF" />
              <stop offset="100%" stop-color="#DBEAFE" />
            </linearGradient>
            <linearGradient id="juiceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#EA580C" />
            </linearGradient>
            <filter id="glassShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1E3A8A" flood-opacity="0.12" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#drinkBg)" />
          <g transform="translate(55, 30)">
            {/* Straw */}
            <line x1="60" y1="10" x2="40" y2="140" stroke="#F43F5E" stroke-width="5" stroke-linecap="round" />
            {/* Tall Glass Silhouette */}
            <path d="M 20 40 L 28 140 Q 45 145 62 140 L 70 40 Z" fill="#FFFFFF" opacity="0.3" filter="url(#glassShadow)" />
            {/* Liquid Fill */}
            <path d="M 22 65 L 28 138 Q 45 143 62 138 L 68 65 Z" fill={name.includes('Матча') ? '#10B981' : name.includes('Гранатовый') ? '#9F1239' : 'url(#juiceGrad)'} opacity="0.9" />
            {/* Ice Cubes */}
            <rect x="35" y="75" width="18" height="18" rx="3" fill="#FFFFFF" opacity="0.6" />
            <rect x="42" y="100" width="16" height="16" rx="3" fill="#FFFFFF" opacity="0.6" />
            {/* Bubbles */}
            <circle cx="34" cy="115" r="2.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="56" cy="85" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="48" cy="125" r="2" fill="#FFFFFF" opacity="0.8" />
            {/* Glass Rim */}
            <ellipse cx="45" cy="40" rx="25" ry="5" fill="#E2E8F0" opacity="0.8" />
            {/* Orange / Lemon wheel on glass rim */}
            <circle cx="68" cy="40" r="14" fill="#FACC15" />
            <circle cx="68" cy="40" r="11" fill="#F59E0B" />
            <circle cx="68" cy="40" r="3" fill="#FFFFFF" />
            {/* Mint sprig */}
            <ellipse cx="35" cy="38" rx="8" ry="4" fill="#10B981" />
          </g>
        </svg>
      );

    case 'desserts':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="desBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FDF2F8" />
              <stop offset="100%" stop-color="#FCE7F3" />
            </linearGradient>
            <filter id="desShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#831843" flood-opacity="0.14" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#desBg)" />
          {/* Porcelain Dessert Plate */}
          <ellipse cx="100" cy="115" rx="72" ry="48" fill="#FFFFFF" filter="url(#desShadow)" />
          <ellipse cx="100" cy="113" rx="64" ry="42" fill="#FFFDF8" stroke="#F1F5F9" stroke-width="1.5" />
          
          <g transform="translate(45, 55)">
            {/* Cheesecake slice / Fondant */}
            <polygon points="20,70 65,30 90,70" fill="#FDE68A" />
            <polygon points="65,30 90,70 95,65 70,25" fill="#F59E0B" />
            {/* Burnt basque / Caramel top crust */}
            <polygon points="20,70 65,30 70,25 25,65" fill="#78350F" />
            
            {/* Strawberry / Raspberry Coulis Splash */}
            <path d="M 10 75 Q 35 85 70 78 Q 95 82 105 75" stroke="#E11D48" stroke-width="4" fill="none" stroke-linecap="round" />
            {/* Fresh Berries */}
            <circle cx="58" cy="38" r="7" fill="#E11D48" />
            <circle cx="68" cy="42" r="6" fill="#3B82F6" />
            {/* Mint leaf */}
            <ellipse cx="64" cy="30" rx="5" ry="3" fill="#10B981" />
            {/* Powdered sugar sparkles */}
            <circle cx="45" cy="55" r="1.5" fill="#FFFFFF" />
            <circle cx="78" cy="62" r="1.5" fill="#FFFFFF" />
          </g>
        </svg>
      );

    default:
      return (
        <div className="w-full h-full bg-amber-50 flex items-center justify-center">
          <span className="text-2xl">🍽️</span>
        </div>
      );
  }
};
