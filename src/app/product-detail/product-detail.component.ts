import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  added = output();
  deleted = output();

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this.productService.getProduct(Number(params.get('id')));
    });
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
