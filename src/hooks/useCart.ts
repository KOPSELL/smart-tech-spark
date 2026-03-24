import { useState, useCallback } from "react";
import type { MenuItem, Additional } from "@/data/menuData";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAdditionals: Additional[];
  observation: string; // ✅ novo
  totalPrice: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, selectedAdditionals: Additional[] = [], observation: string = "") => {
    const cartItemId = `${item.id}-${selectedAdditionals.map((a) => a.id).sort().join("-") || "plain"}-${observation}`;
    const additionalsPrice = selectedAdditionals.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = item.price + additionalsPrice;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { cartItemId, item, quantity: 1, selectedAdditionals, observation, totalPrice }];
    });
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.cartItemId !== cartItemId);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);

  return { items, addItem, removeItem, clearCart, totalItems, totalPrice };
}