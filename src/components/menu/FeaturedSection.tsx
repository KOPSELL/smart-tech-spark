import type { MenuItem } from "@/data/menuData";
import { Plus } from "lucide-react";

interface FeaturedSectionProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
}

const FeaturedSection = ({ items, onAdd }: FeaturedSectionProps) => {
  if (items.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pt-4 pb-2">
      <h2 className="text-lg font-extrabold text-foreground mb-3">
        ⭐ Os Mais Pedidos da Cassi
      </h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-40 bg-card rounded-xl border shadow-sm overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-28 object-cover"
              loading="lazy"
            />
            <div className="p-2.5">
              <h3 className="font-bold text-sm text-foreground truncate">{item.name}</h3>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-sm font-extrabold text-primary">
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </span>
                <button
                  onClick={() => onAdd(item)}
                  className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow hover:bg-primary/90 transition-colors active:scale-95"
                  aria-label={`Adicionar ${item.name}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
