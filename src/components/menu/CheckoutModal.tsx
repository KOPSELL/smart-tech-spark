import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import type { CartItem } from "@/hooks/useCart";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onAdd: (item: CartItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const DELIVERY_FEE = 10;

const CheckoutModal = ({
  open,
  onClose,
  items,
  totalPrice,
  onAdd,
  onRemove,
  onClear,
}: CheckoutModalProps) => {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<"entrega" | "retirada" | "">("");

  const isDelivery = deliveryMode === "entrega";
  const finalTotal = isDelivery ? totalPrice + DELIVERY_FEE : totalPrice;

  const paymentOptions = ["Pix", "Dinheiro", "Cartão na entrega"];

  const handleSendWhatsApp = () => {
    if (!name.trim() || !deliveryMode || !payment) return;
    if (isDelivery && !address.trim()) return;

    const itemsText = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.name} — R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`
      )
      .join("\n");

    const deliveryText = isDelivery
      ? `📍 *Endereço:* ${address.trim()}\n🚚 *Modo:* Entrega (+R$ ${DELIVERY_FEE.toFixed(2).replace(".", ",")})`
      : `🏪 *Modo:* Retirada no local`;

    const message = `🍔 *Novo Pedido — Lanches da Cassi*\n\n` +
      `👤 *Nome:* ${name.trim()}\n` +
      `${deliveryText}\n` +
      `💳 *Pagamento:* ${payment}\n\n` +
      `📋 *Itens:*\n${itemsText}\n\n` +
      `💰 *Total: R$ ${finalTotal.toFixed(2).replace(".", ",")}*`;

    const url = `https://api.whatsapp.com/send?phone=5554991491157&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    onClear();
    setStep("cart");
    setName("");
    setAddress("");
    setPayment("");
    setDeliveryMode("");
    onClose();
  };

  const handleClose = () => {
    setStep("cart");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-foreground">
            {step === "cart" ? "🛒 Sua Sacola" : "📝 Finalizar Pedido"}
          </DialogTitle>
        </DialogHeader>

        {step === "cart" ? (
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Sua sacola está vazia
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground truncate">
                          {item.name}
                        </h4>
                        <span className="text-sm font-extrabold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="h-7 w-7 rounded-full bg-card border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-3.5 w-3.5" />
                          ) : (
                            <Minus className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <span className="w-6 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-xl font-extrabold text-primary">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <Button
                  onClick={() => setStep("checkout")}
                  className="w-full h-12 text-base font-bold rounded-xl"
                >
                  Finalizar Pedido
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-bold text-foreground mb-1 block">
                  Nome
                </label>
                <Input
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                  maxLength={100}
                />
              </div>

              {/* Modo de recebimento */}
              <div>
                <label className="text-sm font-bold text-foreground mb-1 block">
                  Como deseja receber?
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryMode("retirada")}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all border ${
                      deliveryMode === "retirada"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
                    }`}
                  >
                    🏪 Retirada
                  </button>
                  <button
                    onClick={() => setDeliveryMode("entrega")}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all border ${
                      deliveryMode === "entrega"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
                    }`}
                  >
                    🚚 Entrega (+R$ 10)
                  </button>
                </div>
              </div>

              {isDelivery && (
                <div>
                  <label className="text-sm font-bold text-foreground mb-1 block">
                    Endereço de entrega
                  </label>
                  <Input
                    placeholder="Rua, número, bairro..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="rounded-xl"
                    maxLength={200}
                  />
                </div>
              )}

              {/* Pagamento */}
              <div>
                <label className="text-sm font-bold text-foreground mb-1 block">
                  Forma de pagamento
                </label>
                <div className="flex gap-2">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPayment(opt)}
                      className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all border ${
                        payment === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo com taxa */}
            <div className="pt-2 border-t space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              {isDelivery && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxa de entrega</span>
                  <span className="font-bold text-foreground">
                    R$ {DELIVERY_FEE.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-xl font-extrabold text-primary">
                  R$ {finalTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <Button
              onClick={handleSendWhatsApp}
              disabled={!name.trim() || !deliveryMode || !payment || (isDelivery && !address.trim())}
              className="w-full h-12 text-base font-bold rounded-xl gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))]/90"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar Pedido via WhatsApp
            </Button>

            <button
              onClick={() => setStep("cart")}
              className="w-full text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar para a sacola
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
