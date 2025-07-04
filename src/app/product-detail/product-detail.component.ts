import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  // No podemos usar tipo `number` porque los parámetros de enrutamiento se pasan como cadenas.
  id = input<string>();
  added = output();
  deleted = output();

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.product = this.productService.getProduct(Number(this.id()));
  }

  addToCart() {
    // Esto lo dejamos para el capítulo 10
  }

  async changePrice(product: Product, price: string) {
    this.product = await this.productService.updateProduct(
      product.id,
      Number(price),
    );
    this.router.navigate(['/products']);
  }

  async remove(product: Product) {
    await this.productService.deleteProduct(product.id);
    this.router.navigate(['/products']);
  }
}
