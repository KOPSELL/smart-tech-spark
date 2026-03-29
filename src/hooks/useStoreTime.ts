import { useMemo } from "react";
import { storeConfig } from "@/data/config";

export function useStoreStatus() {
  const { lunchOpen, lunchClose, dinnerOpen, dinnerClose } = storeConfig;

  const status = useMemo(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const checkPeriod = (open: string, close: string) => {
      const [openH, openM] = open.split(":").map(Number);
      const [closeH, closeM] = close.split(":").map(Number);
      const openTotal = openH * 60 + openM;
      const closeTotal = closeH * 60 + closeM;
      return currentTime >= openTotal && currentTime <= closeTotal;
    };

    const isLunchTime = checkPeriod(lunchOpen, lunchClose);
    const isDinnerTime = checkPeriod(dinnerOpen, dinnerClose);

    return isLunchTime || isDinnerTime;
  }, [lunchOpen, lunchClose, dinnerOpen, dinnerClose]);

  return { 
    isOpen: status,
    lunchRange: `${lunchOpen} às ${lunchClose}`,
    dinnerRange: `${dinnerOpen} às ${dinnerClose}`
  };
}