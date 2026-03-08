import { useState, useMemo } from "react";
import MenuHeader from "@/components/menu/MenuHeader";
import CategoryFilter from "@/components/menu/CategoryFilter";
import FeaturedSection from "@/components/menu/FeaturedSection";
import ProductCard from "@/components/menu/ProductCard";
import CartBar from "@/components/menu/CartBar";
import CheckoutModal from "@/components/menu/CheckoutModal";
import { menuItems } from "@/data/menuData";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const featured = useMemo(() => menuItems.filter((i) => i.featured), []);

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

  return (
    <div className="min-h-screen bg-muted pb-24">
      <MenuHeader search={search} onSearchChange={setSearch} />
      <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

      {!search && !activeCategory && (
        <FeaturedSection items={featured} onAdd={addItem} />
      )}

      <main className="container mx-auto px-4 py-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} onAdd={addItem} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum item encontrado 😕
          </p>
        )}
      </main>

      <CartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpen={() => setCartOpen(true)}
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
