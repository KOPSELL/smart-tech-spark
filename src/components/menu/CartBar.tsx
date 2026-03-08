import { ShoppingBag } from "lucide-react";

interface CartBarProps {
  totalItems: number;
  totalPrice: number;
  onOpen: () => void;
}

const CartBar = ({ totalItems, totalPrice, onOpen }: CartBarProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-xl hover:bg-primary/95 transition-colors active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-secondary text-secondary-foreground rounded-full text-xs font-black flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span className="font-bold text-sm">Ver sacola</span>
        </div>
        <span className="font-extrabold text-lg">
          R$ {totalPrice.toFixed(2).replace(".", ",")}
        </span>
      </button>
    </div>
  );
};

export default CartBar;
