import { useState } from "react";
import { useFinance } from "@/hooks/useFinance";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  Trash2,
  Briefcase,
  Banknote,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

type EntryType = "salary" | "extra" | "expense";

const typeConfig: Record<
  EntryType,
  { label: string; icon: typeof DollarSign; colorClass: string; bgClass: string }
> = {
  salary: {
    label: "Salário Fixo",
    icon: Briefcase,
    colorClass: "text-[hsl(var(--finance-salary))]",
    bgClass: "bg-[hsl(var(--finance-salary)/0.12)]",
  },
  extra: {
    label: "Renda Extra",
    icon: Banknote,
    colorClass: "text-[hsl(var(--finance-extra))]",
    bgClass: "bg-[hsl(var(--finance-extra)/0.12)]",
  },
  expense: {
    label: "Conta / Despesa",
    icon: CreditCard,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
  },
};

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Finance = () => {
  const {
    entries,
    addEntry,
    removeEntry,
    totalSalary,
    totalExtra,
    totalExpenses,
    totalIncome,
    profit,
  } = useFinance();

  const [modalOpen, setModalOpen] = useState(false);
  const [newType, setNewType] = useState<EntryType>("expense");
  const [newDesc, setNewDesc] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAdd = () => {
    const amount = parseFloat(newAmount.replace(",", "."));
    if (!newDesc.trim() || isNaN(amount) || amount <= 0) return;
    addEntry({
      type: newType,
      description: newDesc.trim(),
      amount,
      date: new Date().toISOString(),
    });
    setNewDesc("");
    setNewAmount("");
    setModalOpen(false);
  };

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[hsl(220_20%_97%)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(220_50%_18%)] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Minhas Finanças
            </h1>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 font-medium">Receita Total</p>
              <p className="text-lg font-extrabold text-emerald-300">
                {formatCurrency(totalIncome)}
              </p>
              <div className="mt-1 space-y-0.5">
                <p className="text-[10px] text-white/50">
                  Salário: {formatCurrency(totalSalary)}
                </p>
                <p className="text-[10px] text-white/50">
                  Extra: {formatCurrency(totalExtra)}
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/60 font-medium">Despesas</p>
              <p className="text-lg font-extrabold text-red-300">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>

          {/* Profit bar */}
          <div className="mt-3 bg-white/10 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {profit >= 0 ? (
                <TrendingUp className="h-5 w-5 text-emerald-300" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-300" />
              )}
              <span className="text-sm font-bold text-white/80">Lucro</span>
            </div>
            <span
              className={`text-xl font-black ${
                profit >= 0 ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {formatCurrency(profit)}
            </span>
          </div>
        </div>
      </header>

      {/* Entries list */}
      <main className="container mx-auto px-4 py-4 pb-24">
        <h2 className="text-sm font-bold text-[hsl(220_20%_40%)] mb-3">
          Lançamentos
        </h2>

        {sorted.length === 0 ? (
          <div className="text-center py-16 text-[hsl(220_10%_60%)]">
            <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhum lançamento ainda</p>
            <p className="text-sm mt-1">
              Toque no botão + para adicionar
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((entry) => {
              const config = typeConfig[entry.type];
              const Icon = config.icon;
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-[hsl(220_20%_92%)]"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.bgClass}`}
                  >
                    <Icon className={`h-5 w-5 ${config.colorClass}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[hsl(220_20%_20%)] truncate">
                      {entry.description}
                    </p>
                    <p className="text-[11px] text-[hsl(220_10%_55%)]">
                      {config.label} •{" "}
                      {new Date(entry.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-extrabold shrink-0 ${
                      entry.type === "expense"
                        ? "text-destructive"
                        : "text-emerald-600"
                    }`}
                  >
                    {entry.type === "expense" ? "- " : "+ "}
                    {formatCurrency(entry.amount)}
                  </span>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[hsl(220_10%_70%)] hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                    aria-label="Remover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setModalOpen(true)}
          className="h-14 w-14 rounded-full bg-[hsl(220_50%_18%)] text-white shadow-xl flex items-center justify-center hover:bg-[hsl(220_50%_25%)] transition-colors active:scale-95"
        >
          <Plus className="h-7 w-7" />
        </button>
      </div>

      {/* Add entry modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-extrabold">
              Novo Lançamento
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Tipo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(typeConfig) as EntryType[]).map((t) => {
                  const c = typeConfig[t];
                  const Icon = c.icon;
                  return (
                    <button
                      key={t}
                      onClick={() => setNewType(t)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-bold transition-all ${
                        newType === t
                          ? "border-[hsl(220_50%_18%)] bg-[hsl(220_50%_18%/0.06)]"
                          : "border-transparent bg-muted hover:bg-accent"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${c.colorClass}`} />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-foreground mb-1 block">
                Descrição
              </label>
              <Input
                placeholder="Ex: Aluguel, Freelance..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="rounded-xl"
                maxLength={100}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground mb-1 block">
                Valor (R$)
              </label>
              <Input
                placeholder="0,00"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="rounded-xl"
                inputMode="decimal"
              />
            </div>

            <Button
              onClick={handleAdd}
              disabled={!newDesc.trim() || !newAmount}
              className="w-full h-12 text-base font-bold rounded-xl bg-[hsl(220_50%_18%)] hover:bg-[hsl(220_50%_25%)]"
            >
              Adicionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Finance;
