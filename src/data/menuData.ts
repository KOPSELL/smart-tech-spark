export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
}

export const categories = [
  { id: "xis", label: "🍔 Xis" },
  { id: "cachorro-quente", label: "🌭 Cachorro-Quente" },
  { id: "porcoes", label: "🍟 Porções" },
  { id: "picadao", label: "🥩 Picadão" },
  { id: "alaminuta", label: "🥘 Alaminuta" },
];

export const menuItems: MenuItem[] = [
  // Xis
  {
    id: "xis-1",
    name: "Xis Bacon",
    description: "Pão, hambúrguer, bacon crocante, queijo, alface, tomate e maionese especial",
    price: 22.90,
    category: "xis",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: "xis-2",
    name: "Xis Coração",
    description: "Pão, coração de frango, queijo, alface, tomate e molho especial",
    price: 25.90,
    category: "xis",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: "xis-3",
    name: "Xis Salada",
    description: "Pão, hambúrguer, queijo, alface, tomate, milho e ervilha",
    price: 19.90,
    category: "xis",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
  },
  {
    id: "xis-4",
    name: "Xis Egg",
    description: "Pão, hambúrguer, ovo, queijo, alface, tomate e maionese",
    price: 21.90,
    category: "xis",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
  },

  // Cachorro-Quente
  {
    id: "dog-1",
    name: "Dog Tradicional",
    description: "Pão, salsicha, purê, vinagrete, batata palha e ketchup",
    price: 14.90,
    category: "cachorro-quente",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop",
  },
  {
    id: "dog-2",
    name: "Dog Duplo Cheddar",
    description: "Pão, duas salsichas, cheddar cremoso, bacon e cebola crispy",
    price: 19.90,
    category: "cachorro-quente",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: "dog-3",
    name: "Dog Calabresa",
    description: "Pão, salsicha, calabresa, queijo, milho e catupiry",
    price: 17.90,
    category: "cachorro-quente",
    image: "https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?w=400&h=300&fit=crop",
  },

  // Porções
  {
    id: "porcao-1",
    name: "Batata Frita",
    description: "Porção generosa de batatas fritas crocantes com sal e temperos",
    price: 18.90,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  },
  {
    id: "porcao-2",
    name: "Polenta Frita",
    description: "Polenta frita em palitos dourados e crocantes",
    price: 16.90,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop",
  },
  {
    id: "porcao-3",
    name: "Frango à Passarinho",
    description: "Pedaços de frango temperados e fritos, acompanha molho",
    price: 32.90,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    featured: true,
  },

  // Picadão
  {
    id: "picadao-1",
    name: "Picadão Misto",
    description: "Carne bovina, frango, linguiça, batata frita e farofa",
    price: 39.90,
    category: "picadao",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: "picadao-2",
    name: "Picadão de Frango",
    description: "Cubos de frango grelhado, batata frita, arroz e farofa",
    price: 34.90,
    category: "picadao",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
  },

  // Alaminuta
  {
    id: "alaminuta-1",
    name: "Alaminuta Completa",
    description: "Bife, arroz, feijão, ovo frito, batata frita e salada",
    price: 36.90,
    category: "alaminuta",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  },
  {
    id: "alaminuta-2",
    name: "Alaminuta Especial",
    description: "Bife acebolado, arroz, feijão, ovo, batata frita, banana e salada",
    price: 42.90,
    category: "alaminuta",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    featured: true,
  },
];
