import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {}

  createProduct(title: string, price: string, category: string) {
    // En una aplicación real, se mostraría un mensaje después de añadir el producto
    this.productsService
      .addProduct({
        title,
        price: Number(price),
        category,
      })
      .then(() => {
        this.router.navigate(['/products']);
      });
  }
}
