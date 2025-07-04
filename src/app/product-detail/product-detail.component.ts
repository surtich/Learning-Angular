import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnChanges {
  id = input<number>();
  product: Product | undefined;
  added = output();
  deleted = output();

  constructor(private productService: ProductsService) {}

  ngOnChanges(): void {
    this.product = this.productService.getProduct(this.id()!);
  }

  addToCart() {
    this.added.emit();
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price));
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).then(() => {
      this.deleted.emit();
    });
  }
}
