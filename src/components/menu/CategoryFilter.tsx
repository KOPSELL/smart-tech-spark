import { cn } from "@/lib/utils";
import { categories } from "@/data/menuData";

interface CategoryFilterProps {
  active: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryFilter = ({ active, onSelect }: CategoryFilterProps) => {
  return (
    <div className="sticky top-[105px] z-40 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => onSelect(null)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all",
              active === null
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                active === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
