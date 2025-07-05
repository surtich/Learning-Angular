export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string; // La propiedad `image` es una URL que apunta al archivo de imagen del producto en la `Fake Store API`.
}
