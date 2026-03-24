import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";

interface ProductCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const ProductCard = ({ item, onAdd }: ProductCardProps) => {
  return (
    <div className="flex gap-3 bg-card rounded-xl border shadow-sm p-3 transition-shadow hover:shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-foreground text-sm leading-tight truncate">
            {item.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-extrabold text-primary">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </span>
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
  );
};

export default ProductCard;
