import { TableConfig } from '../types';

export const TABLES: TableConfig[] = [
  {
    id: 1,
    name: 'Столик №1 — Панорамная терраса',
    shortName: 'Столик №1',
    zone: 'Терраса на крыше',
    imageUrl: '/images/tables/table-1.svg',
    accentColor: '#059669', // Emerald 600
    accentLight: '#ECFDF5', // Emerald 50
    accentBorder: '#A7F3D0', // Emerald 200
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-emerald-700',
    welcomeTitle: 'Добро пожаловать на Панорамную террасу!',
    welcomeDescription: 'Свежий горный воздух, вид на вечерний город и легкая авторская гастрономия под открытым небом.',
    capacity: 4,
  },
  {
    id: 2,
    name: 'Столик №2 — Уютный лаунж',
    shortName: 'Столик №2',
    zone: 'Каминный лаунж',
    imageUrl: '/images/tables/table-2.svg',
    accentColor: '#D97706', // Amber 600
    accentLight: '#FFFBEB', // Amber 50
    accentBorder: '#FDE68A', // Amber 200
    badgeBg: 'bg-amber-600',
    badgeText: 'text-amber-700',
    welcomeTitle: 'Добро пожаловать в Уютный Лаунж!',
    welcomeDescription: 'Мягкие велюровые кресла, теплый свет ламп и расслабляющая уединенная обстановка для душевных бесед.',
    capacity: 2,
  },
  {
    id: 3,
    name: 'Столик №3 — Винный зал',
    shortName: 'Столик №3',
    zone: 'Винный погреб',
    imageUrl: '/images/tables/table-3.svg',
    accentColor: '#BE123C', // Rose 700
    accentLight: '#FFF1F2', // Rose 50
    accentBorder: '#FECDD3', // Rose 200
    badgeBg: 'bg-rose-700',
    badgeText: 'text-rose-700',
    welcomeTitle: 'Добро пожаловать в Винный зал!',
    welcomeDescription: 'Богатая коллекция благородных вин, выдержанные крафтовые сыры и аутентичные сводчатые арки.',
    capacity: 4,
  },
  {
    id: 4,
    name: 'Столик №4 — Chef’s Table',
    shortName: 'Столик №4',
    zone: 'Открытая кухня',
    imageUrl: '/images/tables/table-4.svg',
    accentColor: '#C2410C', // Orange 700
    accentLight: '#FFF7ED', // Orange 50
    accentBorder: '#FED7AA', // Orange 200
    badgeBg: 'bg-orange-700',
    badgeText: 'text-orange-700',
    welcomeTitle: 'Добро пожаловать за Chef’s Table!',
    welcomeDescription: 'Прямой обзор открытой кухни: наблюдайте за виртуозным мастерством шеф-повара и подачей авторских сетов.',
    capacity: 6,
  },
  {
    id: 5,
    name: 'Столик №5 — Барный остров',
    shortName: 'Столик №5',
    zone: 'Коктейльный бар',
    imageUrl: '/images/tables/table-5.svg',
    accentColor: '#4F46E5', // Indigo 600
    accentLight: '#EEF2FF', // Indigo 50
    accentBorder: '#C7D2FE', // Indigo 200
    badgeBg: 'bg-indigo-600',
    badgeText: 'text-indigo-700',
    welcomeTitle: 'Добро пожаловать в Барную зону!',
    welcomeDescription: 'Эксклюзивные авторские коктейли, крафтовые настойки, освежающие лимонады и ритмичная атмосфера.',
    capacity: 2,
  },
  {
    id: 6,
    name: 'Столик №6 — Семейный зал',
    shortName: 'Столик №6',
    zone: 'Большой банкетный зал',
    imageUrl: '/images/tables/table-6.svg',
    accentColor: '#E11D48', // Rose 600
    accentLight: '#FFF1F2', // Rose 50
    accentBorder: '#FDA4AF', // Rose 300
    badgeBg: 'bg-rose-600',
    badgeText: 'text-rose-700',
    welcomeTitle: 'Добро пожаловать в Семейный зал!',
    welcomeDescription: 'Большой круглый стол для самых близких людей: щедрое восточное гостеприимство, чайные традиции и уют.',
    capacity: 8,
  },
];

export const getTableById = (tableId: number | null | undefined): TableConfig | undefined => {
  if (typeof tableId !== 'number' || isNaN(tableId)) return undefined;
  return TABLES.find((t) => t.id === tableId);
};
