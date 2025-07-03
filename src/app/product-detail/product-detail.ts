import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit {
  product = input<Product>();
  added = output();

  constructor() {
    console.log('Product Constructor:', this.product());
  }

  ngOnInit() {
    console.log('Product onInit:', this.product());
  }

  addToCart() {
    this.added.emit();
  }

  get productTitle() {
    return this.product()!.title;
  }
}
