import { useState, useCallback, useMemo } from "react";
import type { MenuItem, Additional } from "@/data/menuData";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAdditionals: Additional[];
  observation: string;
  totalPrice: number; // Este será o preço unitário (item + adicionais)
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, selectedAdditionals: Additional[] = [], observation: string = "") => {
    // 1. Garante que o preço base seja um número
    const basePrice = Number(item.price) || 0;
    
    // 2. Garante que adicionais seja um array e calcula o preço deles com segurança
    const safeAdditionals = Array.isArray(selectedAdditionals) ? selectedAdditionals : [];
    const additionalsPrice = safeAdditionals.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    
    // Preço total da unidade (Base + Adicionais)
    const unitPrice = basePrice + additionalsPrice;

    // 3. Gera ID Único baseado no item + adicionais + observação (evita duplicar itens diferentes)
    const additionalsId = safeAdditionals.map((a) => a.id).sort().join("-") || "plain";
    const cartItemId = `${item.id}-${additionalsId}-${observation}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      
      if (existing) {
        // Se o item já existe exatamente igual, apenas aumenta a quantidade
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Se for novo ou tiver adicionais/obs diferentes, adiciona como nova linha
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
  }, []); // Dependência vazia para manter a função estável

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

  // ✅ Cálculos memorizados para evitar "NaN" e erros de soma na interface
  const totalItems = useMemo(() => 
    items.reduce((sum, i) => sum + (i.quantity || 0), 0), 
  [items]);

  const totalPrice = useMemo(() => 
    items.reduce((sum, i) => sum + ((i.totalPrice || 0) * (i.quantity || 0)), 0), 
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