import { useState, useCallback, useMemo } from "react";
import type { MenuItem, Additional } from "@/data/menuData";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAdditionals: Additional[];
  observation: string;
  totalPrice: number; 
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, selectedAdditionals: Additional[] = [], observation: string = "") => {
    const basePrice = Number(item.price) || 0;
    const safeAdditionals = Array.isArray(selectedAdditionals) ? selectedAdditionals : [];
    const additionalsPrice = safeAdditionals.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    
    const unitPrice = basePrice + additionalsPrice;

    const additionalsId = safeAdditionals.map((a) => a.id).sort().join("-") || "plain";
    const cartItemId = `${item.id}-${additionalsId}-${observation}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev, 
        { 
          cartItemId, 
          item, 
          quantity: 1, 
          selectedAdditionals: safeAdditionals, 
          observation, 
          totalPrice: unitPrice 
        }
      ];
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

  // ✅ CÁLCULO FINAL BLINDADO (Garante que saia do 0)
  const totalItems = useMemo(() => 
    items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0), 
  [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, i) => {
      // Recalcula o valor unitário garantindo que sejam números
      const itemPrice = Number(i.item.price) || 0;
      const addsPrice = i.selectedAdditionals.reduce((s, a) => s + (Number(a.price) || 0), 0);
      const totalUnit = itemPrice + addsPrice;
      
      return sum + (totalUnit * (Number(i.quantity) || 0));
    }, 0);
  }, [items]);

  return { 
    items, 
    addItem, 
    removeItem, 
    clearCart, 
    totalItems, 
    totalPrice 
  };
}