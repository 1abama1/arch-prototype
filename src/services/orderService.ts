import { Order, OrderStatus } from '../types';

const STORAGE_KEY = 'altyn_qr_orders_v1';

export interface CreateOrderParams {
  tableId: number;
  tableName: string;
  items: {
    dishId: string;
    dishName: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  totalAmount: number;
  comment?: string;
}

/**
 * Service to handle orders. Decoupled from UI components to allow
 * effortless migration to Spring Boot, Django, or Node.js REST API in the future.
 */
class OrderService {
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in order subscription listener:', err);
      }
    });
  }

  public getOrders(): Order[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (e) {
      console.warn('Failed to parse orders from localStorage, resetting:', e);
      return [];
    }
  }

  public async createOrder(params: CreateOrderParams): Promise<Order> {
    const orders = this.getOrders();
    
    // Generate clean, readable demo ID: e.g. ORD-7821
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ORD-${randomHex}`,
      tableId: params.tableId,
      tableName: params.tableName,
      items: params.items,
      totalAmount: Math.round(params.totalAmount),
      comment: params.comment?.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.notify();
    return newOrder;
  }

  public async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    const orders = this.getOrders();
    const target = orders.find((o) => o.id === orderId);
    if (!target) return null;

    target.status = status;
    this.saveOrders(orders);
    this.notify();
    return target;
  }

  public async deleteOrder(orderId: string): Promise<boolean> {
    const orders = this.getOrders();
    const filtered = orders.filter((o) => o.id !== orderId);
    if (filtered.length === orders.length) return false;

    this.saveOrders(filtered);
    this.notify();
    return true;
  }

  public async clearAllOrders(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    this.notify();
  }

  private saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }
}

export const orderService = new OrderService();
