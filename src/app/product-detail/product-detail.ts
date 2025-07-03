import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit, OnChanges {
  product = input<Product>();
  added = output();

  constructor() {
    console.log('Product Constructor:', this.product());
  }

  ngOnInit() {
    console.log('Product onInit:', this.product());
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Product onChanges:', this.product());
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log('Old value', oldValue);
      console.log('New value', newValue);
    }
  }

  addToCart() {
    this.added.emit();
  }

  get productTitle() {
    return this.product()!.title;
  }
}
