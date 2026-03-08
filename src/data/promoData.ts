import type { Promo } from "@/components/menu/PromoSection";

export const dailyPromos: Promo[] = [
  {
    item: {
      id: "promo-xis-bacon",
      name: "Xis Bacon",
      description: "Pão, hambúrguer, bacon crocante, queijo, alface, tomate e maionese especial",
      price: 17.90,
      category: "xis",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    },
    originalPrice: 22.90,
    badge: "-22%",
  },
  {
    item: {
      id: "promo-dog-duplo",
      name: "Dog Duplo Cheddar",
      description: "Pão, duas salsichas, cheddar cremoso, bacon e cebola crispy",
      price: 14.90,
      category: "cachorro-quente",
      image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop",
    },
    originalPrice: 19.90,
    badge: "-25%",
  },
  {
    item: {
      id: "promo-batata",
      name: "Batata Frita Grande",
      description: "Porção gigante de batatas fritas crocantes — só hoje!",
      price: 13.90,
      category: "porcoes",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    },
    originalPrice: 18.90,
    badge: "-26%",
  },
];
