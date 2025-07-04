import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnChanges {
  id = input<number>();
  product$: Observable<Product> | undefined;
  added = output();
  deleted = output();

  constructor(private productService: ProductsService) {}

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  addToCart() {
    this.added.emit();
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
