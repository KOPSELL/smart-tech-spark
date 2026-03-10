import type { Promo } from "@/components/menu/PromoSection";

// Promos por dia da semana (0=Dom, 1=Seg, 2=Ter, ...)
const promosByDay: Record<number, Promo[]> = {
  2: [ // Terça-feira
    {
      item: {
        id: "promo-xis-salada",
        name: "Xis Salada",
        description: "Pão de xis, maionese caseira, catchup, ervilha, milho, alface, tomate, bife, presunto, ovo",
        price: 15.00,
        category: "xis",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
      },
      originalPrice: 18.00,
      badge: "-17%",
    },
  ],
};

export function getDailyPromos(): Promo[] {
  const day = new Date().getDay();
  return promosByDay[day] ?? [];
}
