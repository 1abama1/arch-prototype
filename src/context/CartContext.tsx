import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  addItem: (dish: MenuItem, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  setDishQuantity: (dishId: string, quantity: number) => void;
  getDishQuantity: (dishId: string) => number;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  currentTableId: number | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'altyn_qr_table_carts_v1';

export const CartProvider: React.FC<{
  currentTableId: number | null;
  children: React.ReactNode;
}> = ({ currentTableId, children }) => {
  // Store per-table carts: { [tableId: number]: CartItem[] }
  const [tableCarts, setTableCarts] = useState<Record<number, CartItem[]>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to load table carts from localStorage:', e);
    }
    return {};
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tableCarts));
    } catch (e) {
      console.error('Failed to save table carts to localStorage:', e);
    }
  }, [tableCarts]);

  // Current items for active table
  const items: CartItem[] = useMemo(() => {
    if (!currentTableId) return [];
    return tableCarts[currentTableId] || [];
  }, [tableCarts, currentTableId]);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return Math.round(
      items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0)
    );
  }, [items]);

  const addItem = useCallback(
    (dish: MenuItem, quantity = 1) => {
      if (!currentTableId) return;

      setTableCarts((prev) => {
        const currentCart = prev[currentTableId] ? [...prev[currentTableId]] : [];
        const existingIdx = currentCart.findIndex((i) => i.dish.id === dish.id);

        if (existingIdx >= 0) {
          currentCart[existingIdx] = {
            ...currentCart[existingIdx],
            quantity: currentCart[existingIdx].quantity + quantity,
          };
        } else {
          currentCart.push({ dish, quantity });
        }

        return { ...prev, [currentTableId]: currentCart };
      });
    },
    [currentTableId]
  );

  const removeItem = useCallback(
    (dishId: string) => {
      if (!currentTableId) return;

      setTableCarts((prev) => {
        const currentCart = prev[currentTableId] ? [...prev[currentTableId]] : [];
        const filtered = currentCart.filter((i) => i.dish.id !== dishId);
        return { ...prev, [currentTableId]: filtered };
      });
    },
    [currentTableId]
  );

  const updateQuantity = useCallback(
    (dishId: string, delta: number) => {
      if (!currentTableId) return;

      setTableCarts((prev) => {
        const currentCart = prev[currentTableId] ? [...prev[currentTableId]] : [];
        const existingIdx = currentCart.findIndex((i) => i.dish.id === dishId);

        if (existingIdx < 0) return prev;

        const newQty = currentCart[existingIdx].quantity + delta;
        if (newQty <= 0) {
          currentCart.splice(existingIdx, 1);
        } else {
          currentCart[existingIdx] = {
            ...currentCart[existingIdx],
            quantity: newQty,
          };
        }

        return { ...prev, [currentTableId]: currentCart };
      });
    },
    [currentTableId]
  );

  const setDishQuantity = useCallback(
    (dishId: string, quantity: number) => {
      if (!currentTableId) return;

      setTableCarts((prev) => {
        const currentCart = prev[currentTableId] ? [...prev[currentTableId]] : [];
        const existingIdx = currentCart.findIndex((i) => i.dish.id === dishId);

        if (quantity <= 0) {
          if (existingIdx >= 0) {
            currentCart.splice(existingIdx, 1);
          }
        } else if (existingIdx >= 0) {
          currentCart[existingIdx] = {
            ...currentCart[existingIdx],
            quantity,
          };
        }

        return { ...prev, [currentTableId]: currentCart };
      });
    },
    [currentTableId]
  );

  const getDishQuantity = useCallback(
    (dishId: string) => {
      const match = items.find((i) => i.dish.id === dishId);
      return match ? match.quantity : 0;
    },
    [items]
  );

  const clearCart = useCallback(() => {
    if (!currentTableId) return;

    setTableCarts((prev) => {
      const next = { ...prev };
      delete next[currentTableId];
      return next;
    });
  }, [currentTableId]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      setDishQuantity,
      getDishQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      currentTableId,
    }),
    [
      items,
      totalCount,
      totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      setDishQuantity,
      getDishQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      currentTableId,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
