import { useState, useCallback, useMemo } from "react";
import type { MenuItem, Additional } from "@/data/menuData";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAdditionals: Additional[];
  observation: string;
  totalPrice: number; // Preço unitário (item + adicionais)
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, selectedAdditionals: Additional[] = [], observation: string = "") => {
    // Gerando ID único baseado no produto + adicionais + observação
    const additionalsId = selectedAdditionals.map((a) => a.id).sort().join("-") || "plain";
    const cartItemId = `${item.id}-${additionalsId}-${observation}`;
    
    // Cálculo do preço unitário com adicionais
    const additionalsPrice = selectedAdditionals.reduce((sum, a) => sum + a.price, 0);
    const unitTotalPrice = item.price + additionalsPrice;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      
      if (existing) {
        // Se já existe, apenas aumenta a quantidade
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Se é novo ou tem adicionais/obs diferentes, adiciona nova linha
      return [
        ...prev, 
        { 
          cartItemId, 
          item, 
          quantity: 1, 
          selectedAdditionals, 
          observation, 
          totalPrice: unitTotalPrice 
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

  // ✅ Cálculos memorizados para evitar bugs de soma na interface
  const totalItems = useMemo(() => 
    items.reduce((sum, i) => sum + i.quantity, 0), 
  [items]);

  const totalPrice = useMemo(() => 
    items.reduce((sum, i) => sum + (i.totalPrice * i.quantity), 0), 
  [items]);

  return { 
    items, 
    addItem, 
    removeItem, 
    clearCart, 
    totalItems, 
    totalPrice 
  };
}