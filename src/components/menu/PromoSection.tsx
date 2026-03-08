import { Flame, Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";

export interface Promo {
  item: MenuItem;
  originalPrice: number;
  badge: string;
}

interface PromoSectionProps {
  promos: Promo[];
  onAdd: (item: MenuItem) => void;
}

const PromoSection = ({ promos, onAdd }: PromoSectionProps) => {
  if (promos.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pt-4 pb-2">
      <h2 className="text-lg font-extrabold text-foreground mb-3 flex items-center gap-2">
        <Flame className="h-5 w-5 text-destructive" />
        Promoções do Dia
      </h2>
      <div className="grid gap-3">
        {promos.map(({ item, originalPrice, badge }) => (
          <div
            key={item.id}
            className="relative flex gap-3 bg-card rounded-xl border-2 border-primary/30 shadow-md p-3 overflow-hidden"
          >
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-black px-3 py-1 rounded-bl-xl">
              {badge}
            </div>

            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground text-sm leading-tight truncate pr-16">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground line-through">
                    R$ {originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-base font-extrabold text-primary">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <button
                  onClick={() => onAdd(item)}
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors active:scale-95"
                  aria-label={`Adicionar ${item.name}`}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
