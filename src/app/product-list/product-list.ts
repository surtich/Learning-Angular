import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetail],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [
    { id: 1, title: 'Keyboard' },
    { id: 2, title: 'Microphone' },
    { id: 3, title: 'Web camera' },
    { id: 4, title: 'Tablet' },
  ];
  selectedProduct: Product | undefined = this.products[0];
  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}
