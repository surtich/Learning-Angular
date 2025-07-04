import { Component, effect, inject, signal } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  product = toSignal(inject(ProductsService).getProducts(), {
    initialValue: undefined,
  });

  products = signal<Product[]>([]);
  selectedProduct: Product | undefined;  

  constructor() {
    effect(() => { // Se ejecuta cada vez que uno de los signals que lee cambie.
      const newProduct = this.product();
      if (newProduct) {
        this.products.update((prev) => [...prev, newProduct]);
      }
    });
  }

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}
