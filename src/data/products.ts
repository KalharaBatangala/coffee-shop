// src/data/products.ts
import { v4 as uuid } from 'uuid';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: uuid(),
    name: "Espresso",
    price: 3.5,
    image: "/assets/espresso.jpg",
    description: "Rich and bold espresso shot.",
  },
  {
    id: uuid(),
    name: "Cappuccino",
    price: 4,
    image: "/assets/cappuccino.jpg",
    description: "Creamy cappuccino with milk froth.",
  },
  {
    id: uuid(),
    name: "Latte",
    price: 4.5,
    image: "/assets/latte.jpg",
    description: "Smooth latte with steamed milk.",
  },
  {
    id: uuid(),
    name: "Chocolate Muffin",
    price: 2.5,
    image: "/assets/muffin.jpg",
    description: "Delicious chocolate muffin.",
  },
];
