import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetail {
  product = input<Product>();
  added = output();
  addToCart() {
    this.added.emit();
  }
  
}
