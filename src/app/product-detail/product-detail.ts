import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  product = input<Product>();
  added = output();
  addToCart() {
    this.added.emit();
  }
  get productTitle() {
    return this.product()!.title;
  }
}
