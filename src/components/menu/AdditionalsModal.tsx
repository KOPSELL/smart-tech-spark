import { useState } from "react";
import { X } from "lucide-react"; // ✅ removido Plus e Minus que não são usados
import type { MenuItem, Additional } from "@/data/menuData";

interface AdditionalsModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, selectedAdditionals: Additional[]) => void;
}

const AdditionalsModal = ({ item, onClose, onConfirm }: AdditionalsModalProps) => {
  const [selected, setSelected] = useState<Additional[]>([]);

  if (!item) return null;

  const toggle = (additional: Additional) => {
    setSelected((prev) =>
      prev.find((a) => a.id === additional.id)
        ? prev.filter((a) => a.id !== additional.id)
        : [...prev, additional]
    );
  };

  const additionalsTotal = selected.reduce((sum, a) => sum + a.price, 0);
  const total = item.price + additionalsTotal;

  const handleConfirm = () => {
    onConfirm(item, selected);
    setSelected([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-background rounded-t-2xl p-5 shadow-xl">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">{item.name}</h2>
            <p className="text-sm text-muted-foreground">Deseja adicionar algo a mais?</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          {item.additionals?.map((additional) => {
            const isSelected = !!selected.find((a) => a.id === additional.id);
            return (
              <div
                key={additional.id}
                onClick={() => toggle(additional)}
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {additional.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  +R$ {additional.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-extrabold text-base flex items-center justify-between px-5 shadow-md hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          <span>Adicionar ao pedido</span>
          <span>R$ {total.toFixed(2).replace(".", ",")}</span>
        </button>
      </div>
    </div>
  );
};

export default AdditionalsModal;