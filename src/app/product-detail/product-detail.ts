import { Component, input, output } from '@angular/core';
import { Product } from '../product';
import { CurrencyPipe, KeyValuePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [KeyValuePipe, CurrencyPipe, LowerCasePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = input<Product>();
  added = output();

  addToCart() {
    this.added.emit();
  }
}
