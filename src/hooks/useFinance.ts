import { useState, useEffect, useCallback } from "react";

export interface FinanceEntry {
  id: string;
  type: "salary" | "extra" | "expense";
  description: string;
  amount: number;
  date: string;
}

const STORAGE_KEY = "finance-entries";

function loadEntries(): FinanceEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFinance() {
  const [entries, setEntries] = useState<FinanceEntry[]>(loadEntries);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry: Omit<FinanceEntry, "id">) => {
    setEntries((prev) => [...prev, { ...entry, id: crypto.randomUUID() }]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const totalSalary = entries
    .filter((e) => e.type === "salary")
    .reduce((s, e) => s + e.amount, 0);

  const totalExtra = entries
    .filter((e) => e.type === "extra")
    .reduce((s, e) => s + e.amount, 0);

  const totalExpenses = entries
    .filter((e) => e.type === "expense")
    .reduce((s, e) => s + e.amount, 0);

  const totalIncome = totalSalary + totalExtra;
  const profit = totalIncome - totalExpenses;

  return {
    entries,
    addEntry,
    removeEntry,
    totalSalary,
    totalExtra,
    totalExpenses,
    totalIncome,
    profit,
  };
}
