const addItem = useCallback((item: MenuItem, selectedAdditionals: Additional[] = [], observation: string = "") => {
  // 1. Garantir que o preço seja um número (evita o NaN)
  const basePrice = Number(item.price) || 0;
  
  // 2. Garantir que adicionais seja um array e calcular o preço deles
  const safeAdditionals = Array.isArray(selectedAdditionals) ? selectedAdditionals : [];
  const additionalsPrice = safeAdditionals.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
  
  const unitPrice = basePrice + additionalsPrice;

  // 3. Gerar ID Único
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