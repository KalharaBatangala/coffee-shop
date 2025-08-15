// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Espresso",
    price: 3.5,
    image: "/assets/espresso.jpg",
    description: "Rich and bold espresso shot.",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 4,
    image: "/assets/cappuccino.jpg",
    description: "Creamy cappuccino with milk froth.",
  },
  {
    id: 3,
    name: "Latte",
    price: 4.5,
    image: "/assets/latte.jpg",
    description: "Smooth latte with steamed milk.",
  },
  {
    id: 4,
    name: "Chocolate Muffin",
    price: 2.5,
    image: "/assets/muffin.jpg",
    description: "Delicious chocolate muffin.",
  },
];
