import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  input,
  OnChanges,
  OnDestroy,
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
export class ProductDetail implements OnInit, OnChanges, OnDestroy {
  product = input<Product>();
  added = output();

  constructor(destroyRef: DestroyRef) {
    console.log('Product Constructor:', this.product());
    destroyRef.onDestroy(() => {
      console.log('Product onDestroy desde destroyRef:', this.product());
    });
  }

  ngOnInit() {
    console.log('Product onInit:', this.product());
  }

  ngOnDestroy() {
    console.log('Product onDestroy desde ngOnDestroy:', this.product());
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
