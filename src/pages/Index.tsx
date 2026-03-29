import { useState, useMemo } from "react";
import MenuHeader from "@/components/menu/MenuHeader";
import CategoryFilter from "@/components/menu/CategoryFilter";
import FeaturedSection from "@/components/menu/FeaturedSection";
import PromoSection from "@/components/menu/PromoSection";
import FloatingBurgers from "@/components/menu/FloatingBurgers";
import ProductCard from "@/components/menu/ProductCard";
import CartBar from "@/components/menu/CartBar";
import CheckoutModal from "@/components/menu/CheckoutModal";
import AdditionalsModal from "@/components/menu/AdditionalsModal";
import { menuItems } from "@/data/menuData";
import { getDailyPromos } from "@/data/promoData";
import { useCart } from "@/hooks/useCart";
import { useStoreStatus } from "@/hooks/useStoreStatus"; 
import { Clock, AlertTriangle } from "lucide-react";
import type { MenuItem, Additional } from "@/data/menuData";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { items, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart();
  
  // Hook de Horário (Almoço e Jantar)
  const { isOpen, lunchRange, dinnerRange } = useStoreStatus();

  const featured = useMemo(() => menuItems.filter((i) => i.featured), []);
  const dailyPromos = useMemo(() => getDailyPromos(), []);

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = !activeCategory || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const handleAdd = (item: MenuItem) => {
    // Trava de segurança: Se estiver fechado, não deixa adicionar
    if (!isOpen) {
      alert("A Lanches da Cassi está fechada no momento!");
      return;
    }

    if (item.additionals && item.additionals.length > 0) {
      setSelectedItem(item);
    } else {
      addItem(item, [], "");
    }
  };

  const handleConfirm = (item: MenuItem, selectedAdditionals: Additional[], observation: string) => {
    addItem(item, selectedAdditionals, observation);
  };

  return (
    <div className="relative min-h-screen bg-muted pb-24">
      {/* 🔴 FAIXA DE TESTE (Se isso não aparecer, o arquivo não subiu!) */}
      <div className="bg-red-600 text-white text-[10px] text-center py-1 font-bold z-[100] relative uppercase tracking-widest">
        Sistema de Horário Ativo: {isOpen ? "ABERTO" : "FECHADO AGORA"}
      </div>

      <FloatingBurgers />

      <div className="relative z-10">
        <MenuHeader search={search} onSearchChange={setSearch} />
        
        {/* 🟠 AVISO PARA O CLIENTE (Só aparece se estiver fora do horário) */}
        {!isOpen && (
          <div className="bg-orange-500/20 border-b border-orange-500/30 py-4 px-4 flex flex-col items-center justify-center gap-1 text-orange-500 animate-pulse">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span className="text-base font-black uppercase italic">Fechado Agora</span>
            </div>
            <p className="text-xs font-medium opacity-90">
              Almoço: {lunchRange} • Jantar: {dinnerRange}
            </p>
          </div>
        )}

        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

        {!search && !activeCategory && (
          <>
            <PromoSection promos={dailyPromos} onAdd={handleAdd} />
            <FeaturedSection items={featured} onAdd={handleAdd} />
          </>
        )}

        <main className="container mx-auto px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onAdd={handleAdd} 
                disabled={!isOpen} // Desativa o botão visualmente
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Nenhum item encontrado 😕
            </p>
          )}
        </main>
      </div>

      {/* Só mostra a barra se estiver aberto ou se já tiver algo no carrinho */}
      {(isOpen || totalItems > 0) && (
        <CartBar
          totalItems={totalItems}
          totalPrice={totalPrice}
          onOpen={() => setCartOpen(true)}
        />
      )}

      <AdditionalsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={handleConfirm}
      />

      <CheckoutModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        totalPrice={totalPrice}
        onAdd={addItem}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </div>
  );
};

export default Index;