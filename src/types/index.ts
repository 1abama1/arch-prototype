export type BadgeType = 'popular' | 'new' | 'spicy';

export interface TableConfig {
  id: number;
  name: string;
  shortName: string;
  zone: string;
  imageUrl: string;
  accentColor: string;
  accentLight: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  welcomeTitle: string;
  welcomeDescription: string;
  capacity: number;
}

export type CategoryId = 
  | 'breakfast'
  | 'salads'
  | 'mains'
  | 'pizza'
  | 'burgers'
  | 'drinks'
  | 'desserts';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in Kyrgyz Soms (сом)
  category: CategoryId;
  imageUrl: string;
  badge?: BadgeType;
  weight?: string;
  cookingTime?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed';

export interface OrderItem {
  dishId: string;
  dishName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  tableId: number;
  tableName: string;
  items: OrderItem[];
  totalAmount: number;
  comment?: string;
  createdAt: string; // ISO date string
  status: OrderStatus;
}
