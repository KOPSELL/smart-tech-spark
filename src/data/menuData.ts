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
  { id: "adicionais", label: "➕ Adicionais" },
  { id: "dogs", label: "🌭 Dogs" },
  { id: "porcoes", label: "🍟 Porções" },
  { id: "bebidas", label: "🥤 Bebidas" },
  { id: "picadao", label: "🥘 Picadão" },
  { id: "alaminuta", label: "🍽️ Alaminuta" },
];

export const menuItems: MenuItem[] = [
  // Xis
  {
    id: "xis-1",
    name: "Xis Salada",
    description: "Pão de xis, maionese caseira, catchup, ervilha, milho, alface, tomate, bife, presunto, ovo",
    price: 18.00,
    category: "xis",
    image: "https://i.ibb.co/fzgj6WTN/Whats-App-Image-2024-09-17-at-11-18-50-1-1.jpg",
  },
  {
    id: "xis-2",
    name: "Xis Frango",
    description: "Pão de xis, maionese caseira, catchup, mostarda, ervilha, milho, alface, tomate, frango desfiado, presunto, ovo",
    price: 20.00,
    category: "xis",
    image: "https://i.ibb.co/r2Np1hYv/x-frango.png",
  },
  {
    id: "xis-3",
    name: "Xis Calabresa",
    description: "Pão de xis, maionese caseira, catchup, mostarda, ervilha, milho, alface, tomate, calabresa, bacon, ovo",
    price: 22.00,
    category: "xis",
    image: "https://i.ibb.co/fzgj6WTN/Whats-App-Image-2024-09-17-at-11-18-50-1-1.jpg",
  },
  {
    id: "xis-4",
    name: "Xis Bacon",
    description: "Pão de xis, maionese caseira, catchup, ervilha, milho, alface, tomate, bife, bacon, ovo",
    price: 22.00,
    category: "xis",
    image: "https://i.ibb.co/fzgj6WTN/Whats-App-Image-2024-09-17-at-11-18-50-1-1.jpg",
    featured: true,
  },
  {
    id: "xis-5",
    name: "Xis da Casa",
    description: "Pão de xis, maionese caseira, catchup, mostarda, ervilha, milho, alface, tomate, calabresa, bacon, frango desfiado, bife, presunto, queijo, ovo",
    price: 25.00,
    category: "xis",
    image: "https://i.ibb.co/27MDCJq5/x-entrevero-e-da-casa.jpg",
    featured: true,
  },
  {
    id: "xis-6",
    name: "Xis Strogonoff",
    description: "Pão de xis, maionese caseira, catchup, mostarda, ervilha, milho, alface, tomate, strogonoff de frango ou bovino, batata palha, presunto, queijo e ovo",
    price: 25.00,
    category: "xis",
    image: "https://i.ibb.co/fzgj6WTN/Whats-App-Image-2024-09-17-at-11-18-50-1-1.jpg",
    featured: true,
  },
  {
    id: "xis-7",
    name: "Xis Entrevero",
    description: "Bife, calabresa, bacon, frango, presunto, queijo, tomate, alface, milho, ervilha, maionese caseira, catchup, mostarda",
    price: 28.00,
    category: "xis",
    image: "https://i.ibb.co/27MDCJq5/x-entrevero-e-da-casa.jpg",
    featured: true,
  },
  {
    id: "xis-8",
    name: "Xis Coração",
    description: "Pão de xis, maionese caseira, catchup, mostarda, ervilha, milho, alface, tomate, coração de frango, presunto, queijo e ovo",
    price: 22.00,
    category: "xis",
    image: "https://i.ibb.co/vv6rBP4t/x-cora-ao.jpg",
  },

  // Adicionais
  {
    id: "add-1",
    name: "Cebola Caramelizada",
    description: "Porção extra de cebola caramelizada",
    price: 2.00,
    category: "adicionais",
    image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=300&fit=crop",
  },
  {
    id: "add-2",
    name: "Bife Extra",
    description: "Porção extra de bife",
    price: 5.00,
    category: "adicionais",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  },
  {
    id: "add-3",
    name: "Ovo Extra",
    description: "Ovo frito adicional",
    price: 2.00,
    category: "adicionais",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
  },

  // Dogs
  {
    id: "dog-1",
    name: "Dog Tradicional",
    description: "Pão de dog, molho especial, maionese caseira, catchup, mostarda, salsicha, tomate, batata palha",
    price: 15.00,
    category: "dogs",
    image: "https://i.ibb.co/d0CHhH96/images.jpg",
  },
  {
    id: "dog-2",
    name: "Dog Strogonoff",
    description: "Pão de dog, molho especial, maionese caseira, catchup, mostarda, salsicha, milho, tomate, strogonoff, batata palha",
    price: 20.00,
    category: "dogs",
    image: "https://i.ibb.co/d0CHhH96/images.jpg",
    featured: true,
  },
  {
    id: "dog-3",
    name: "Dog da Casa",
    description: "Pão de dog, molho especial, maionese caseira, catchup, mostarda, ervilha, milho, tomate, calabresa, bacon, frango desfiado, salsicha, batata palha",
    price: 22.00,
    category: "dogs",
    image: "https://i.ibb.co/d0CHhH96/images.jpg",
  },

  // Porções
  {
    id: "porcao-1",
    name: "Porção de Batata P",
    description: "Porção pequena de batatas fritas crocantes",
    price: 10.00,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  },
  {
    id: "porcao-2",
    name: "Porção de Batata G",
    description: "Porção grande de batatas fritas crocantes",
    price: 20.00,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  },
  {
    id: "porcao-3",
    name: "Batata com Bacon",
    description: "Porção de batatas fritas com bacon crocante",
    price: 25.00,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    featured: true,
  },
  {
    id: "porcao-4",
    name: "Porção de Peixe",
    description: "Porção de peixe empanado e frito",
    price: 40.00,
    category: "porcoes",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
  },

  // Bebidas
  {
    id: "bebida-1",
    name: "Refrigerante Lata",
    description: "Refrigerante em lata 350ml",
    price: 5.00,
    category: "bebidas",
    image: "https://i.ibb.co/4RpDQWQD/coca-lata.jpg",
  },
  {
    id: "bebida-2",
    name: "Água",
    description: "Água mineral 500ml",
    price: 3.00,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea55?w=400&h=300&fit=crop",
  },
  {
    id: "bebida-3",
    name: "Refrigerante 2 Litros",
    description: "Refrigerante garrafa 2 litros",
    price: 13.00,
    category: "bebidas",
    image: "https://i.ibb.co/6Rj1bZmV/coca-gelada.jpg",
  },
  {
    id: "bebida-4",
    name: "Cerveja Latão",
    description: "Cerveja latão 473ml",
    price: 7.00,
    category: "bebidas",
    image: "https://i.ibb.co/pr4CcQv7/D-NQ-NP-658608-MLB101283697600-122025-O.webp",
  },
  {
    id: "picadao-1",
    name: "Picadão Completo",
    description: "Carne de gado, frango, calabresa, batata frita, polenta e queijo.",
    price: 90.00,
    category: "picadao",
    image: "https://i.ibb.co/b5WzzzQB/picadao-p-e-g.jpg",
  },
  {
    id: "alaminuta-1",
    name: "Alaminuta de Gado",
    description: "Arroz, feijão, bife de gado, ovo , batata frita , salada.",
    price: 32.00,
    category: "alaminuta",
    image: "https://i.ibb.co/QvN38K6W/alaminuta.jpg",
  },
  {
    id: "picadao-p",
    name: "Picadão P",
    description: "Carne de gado, frango, calabresa, batata frita, polenta e queijo.",
    price: 50.00,
    category: "picadao",
    image: "https://i.ibb.co/b5WzzzQB/picadao-p-e-g.jpg",
  },
  {
    id: "picadao-peixe-p",
    name: "Picadão com Peixe P",
    description: "Peixe frito em iscas, batata frita, polenta, queijo e molho especial.",
    price: 65.00,
    category: "picadao",
    image: "https://i.ibb.co/YFMjny8N/picadao-peixe.jpg",
  },
  {
    id: "picadao-peixe-g",
    name: "Picadão com Peixe G",
    description: "Porção generosa de peixe em iscas, batata frita, polenta, queijo e acompanhamentos.",
    price: 105.00,
    category: "picadao",
    image: "https://i.ibb.co/YFMjny8N/picadao-peixe.jpg",
  }
];