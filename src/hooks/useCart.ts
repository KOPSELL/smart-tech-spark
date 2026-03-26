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
    // 1. Força a conversão para número para evitar o erro de valor 0 ou NaN
    const itemPrice = Number(item.price) || 0;
    const safeAdditionals = Array.isArray(selectedAdditionals) ? selectedAdditionals : [];
    const additionalsPrice = safeAdditionals.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const unitPrice = itemPrice + additionalsPrice;

    // 2. Gera um ID limpo e padronizado (ID-ADICIONAIS-OBS)
    const additionalsId = safeAdditionals.map((a) => a.id).sort().join("-") || "plain";
    const cleanObservation = (observation || "").trim();
    const cartItemId = `${item.id}-${additionalsId}-${cleanObservation}`;

    setItems((prev) => {
      // 3. Procura se esse EXATO item já está no carrinho
      const existingItem = prev.find((i) => i.cartItemId === cartItemId);

      if (existingItem) {
        // ✅ SE JÁ EXISTE: Mapeia o array e aumenta a quantidade na mesma linha
        return prev.map((i) =>
          i.cartItemId === cartItemId 
            ? { ...i, quantity: i.quantity + 1, totalPrice: unitPrice } 
            : i
        );
      }

      // 🆕 SE É NOVO: Adiciona como uma nova linha no carrinho
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity: 1,
          selectedAdditionals: safeAdditionals,
          observation: cleanObservation,
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

  // ✅ Cálculos Finais Blindados (Recalcula tudo baseado nos itens atuais)
  const totalItems = useMemo(() => 
    items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0), 
  [items]);

  const totalPrice = useMemo(() => 
    items.reduce((sum, i) => sum + (Number(i.totalPrice) * Number(i.quantity)), 0), 
  [items]);

  return { items, addItem, removeItem, clearCart, totalItems, totalPrice };
}